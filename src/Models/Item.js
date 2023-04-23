const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    productID: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true
    }

}, { _id: false });

module.exports = itemSchema;
