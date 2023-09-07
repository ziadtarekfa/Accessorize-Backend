const mongoose = require('mongoose');
const addressSchema = require('../Models/Address');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthDate: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,

    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
