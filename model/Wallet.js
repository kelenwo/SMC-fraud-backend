const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    wType: {
        type: String,
        required: false,
    },
    tags: {
        type: String,
        required: false,
    },
    tokens: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

module.exports = Wallet;
