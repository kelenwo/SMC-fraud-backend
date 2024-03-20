const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    dob: {
        type: Date,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
    facebook: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    telegram: {
        type: String,
        required: false,
    },
    discord: {
        type: String,
        required: false,
    },
    whatsapp: {
        type: String,
        required: false,
    },
    instagram: {
        type: String,
        required: false,
    },
    email_code: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;