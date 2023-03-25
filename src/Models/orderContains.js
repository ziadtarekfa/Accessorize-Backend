const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderContainsSchema = new Schema({
    orderID: {
        type: Number,
        required: true,
        unique: true
    },
    productID: {
        type:Number,
        required: true
    },
}, {timestamps:true});

const orderContains= mongoose.model('OrderContains',orderContainsSchema);
module.exports = orderContains;