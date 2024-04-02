const User = require("../model/User");
const {notify} = require("../auth/email");
const bcrypt = require("bcryptjs");
const {auth} = require("../auth/jwt");

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

const profiles = async (req, res) => {
    const result = {};
    console.log("Here")
    try {

        const user = await User.find({ role: "PROFILE" });
        result.status = 200
        result.profiles = user

    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 500;
    }
    console.log(result);
    res.status(result.status).json(result);
};


module.exports =  {
    newProfile,
    profiles,

};