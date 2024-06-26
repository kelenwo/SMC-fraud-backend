const User = require("../model/User");
const {notify} = require("../auth/email");
const bcrypt = require("bcryptjs");
const {auth} = require("../auth/jwt");
const Wallet = require("../model/Wallet");

const newProfile = async (req, res) => {
    const result = {};
    try {
        const form = req?.body ?? null;
        if (!form?.name || !form?.email || !form?.phone || !form?.country || !form?.state) {
            result.message = "Fill all empty fields";
            result.status = 409;
        } else {
            const user = await User.findOne({ email: form.email, role: "PROFILE" });
            if (user) {
                result.message = "Profile already exists";
                result.status = 409;
            } else {
                const newUser = new User({
                    name: form.name,
                    email: form.email,
                    password: "password",
                    phone: form.phone,
                    country: form.country,
                    state: form.state,
                    gender: form.gender,
                    dob: form.dob,
                    facebook: form.facebook,
                    whatsapp: form.whatsapp,
                    twitter: form.twitter,
                    telegram: form.telegram,
                    discord: form.discord,
                    instagram: form.instagram,
                    role: "PROFILE"
                });
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;
                await newUser.save()

                if(form.wallet) {
                    const wallet = new Wallet({
                        user: newUser._id,
                        address: form.wallet,
                        type: form.type,
                        wType: form.wType,

                    });
                    await wallet.save();
                }
                result.status = 200;
                result.message = "Profile created successfully";
            }
        }
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 500;
    }
    console.log(result);
    res.status(result.status).json(result);
};

const addWallet = async (req, res) => {
    const result = {};
    try {
        const form = req?.body ?? null;
        if (!form?.email || !form?.wallet) {
            result.message = "Could not find user";
            result.status = 409;
        } else {
            const user = await User.findOne({ email: form.email});
            if (!user) {
                result.message = "Could not find user";
                result.status = 409;
            } else {
                if(form.wallet) {
                    const wallet = new Wallet({
                        user: user._id,
                        address: form.wallet,
                        type: form.type,
                        wType: form.wType,
                        tags: form.tags,
                        tokens: form.tokens,
                    });
                    await wallet.save();
                }
                result.status = 200;
                result.message = "Wallet created successfully";
            }
        }
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 500;
    }
    console.log(result);
    res.status(result.status).json(result);
};

const profiles = async (req, res) => {
    const result = {};
    console.log("Here")
    try {

        const user = await User.find({ role: "PROFILE" });
        const wallet = await Wallet.find();
        result.status = 200
        result.profiles = user
        result.wallet = wallet

    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 500;
    }
    console.log(result);
    res.status(result.status).json(result);
};

const profile = async (req, res) => {
    const result = {};
    console.log("Here")

    const form = req?.body ?? null;
    if (!form?.uid) {
        result.message = "Email address is required";
        result.status = 409;
    }
    else {

        try {
            const user = await User.findOne({ _id: form.uid });
            const wallet = await Wallet.find({user: user._id});
            result.status = 200
            result.profile = user
            result.wallet = wallet

        } catch (error) {
            console.error(error);
            result.message = error.message;
            result.status = 500;
        }
    }
    console.log(result);
    res.status(result.status).json(result);
};


module.exports =  {
    newProfile,
    profiles,
    profile,
    addWallet,
};