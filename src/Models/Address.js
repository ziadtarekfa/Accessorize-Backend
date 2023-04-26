const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: { 
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    floorNum: {
        type: Number,
        required: true
    },
    aptNum: {
        type: Number,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },

}, { _id: false });

module.exports = addressSchema;
