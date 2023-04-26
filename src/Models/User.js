const mongoose = require('mongoose');
const addressSchema = require('../Models/Address');
const Address = require('../Models/Address');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
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
        type: Object,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
