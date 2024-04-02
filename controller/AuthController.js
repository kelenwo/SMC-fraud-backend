const User = require("../model/User");
const {notify} = require("../auth/email");
const bcrypt = require("bcryptjs");
const {auth} = require("../auth/jwt");

const register = async (req, res) => {
    const result = {};
    try {
        const form = req?.body ?? null;
        if (!form?.name || !form?.email || !form?.phone || !form?.country || !form?.state) {
            result.message = "Fill all empty fields";
            result.status = 409;
        } else {
            const user = await User.findOne({ email: form.email });
            if (user) {
                result.message = "Email already exists";
                result.status = 409;
            } else {
                const newUser = new User({
                    name: form.name,
                    email: form.email,
                    password: "password",
                    phone: form.phone,
                    country: form.country,
                    state: form.state,
                    role: "ADMIN"
                });
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newUser.password, salt);
                newUser.password = hash;
                await newUser.save()
                result.status = 200;
                result.message = "Account created successfully";
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

const login = async (req, res) => {
    const result = {};
    try {
        const form = req?.body ?? null;
        if (!form?.email) {
            result.message = "Email address is required";
            result.status = 409;
        } else {
            const user = await User.findOne({ email: form.email, role: "ADMIN" });
            if (user) {
                const subject = "Login to your account"
                var code = Math.floor(1000 + Math.random() * 9000);
                const body = `Use the OTP below to login to your account <h1>${code}</h1>`

                await user.set("email_code", code).save()

                await notify(form.email, subject, body)

                result.message = "Email address exists";
                result.status = 200;
            } else {
                result.message = "We could not find an account matching the email address you provided.";
                result.status = 403;
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

const authenticate = async (req, res) => {
    const result = {};
    try {
        const form = req?.body ?? null;
        if (!form?.email) {
            result.message = "Could not find user";
            result.status = 409;
        } else if (!form?.code) {
            result.message = "Provide OTP sent to your email address";
            result.status = 409;
        } else {
            const user = await User.findOne({ email: form.email });
            if (user) {
                if(user.email_code === form.code) {
                    const token = await auth(user)
                    console.log(token)
                    result.access_token = token
                    result.user = user
                    result.message = "Login successful";
                    result.status = 200;
                }
                else {
                    result.message = "OTP incorrect";
                    result.status = 403;
                }

            } else {
                result.message = "We could not find an account matching the email address you provided.";
                result.status = 403;
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


module.exports =  {
    register,
    login,
    authenticate
};