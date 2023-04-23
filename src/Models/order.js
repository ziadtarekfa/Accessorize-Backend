const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = require('../Models/Address');
const itemSchema = require('../Models/Item');
const orderSchema = new Schema({
    date: {
        type:String,
        required: true
    },
    shippingAddress:{
        type:addressSchema,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    items:{
        type:[itemSchema],
        required:true
    },
    userEmail:{
        type:String,
        required:true
    }
}, {timestamps:true});

const Order= mongoose.model('Order',orderSchema);
module.exports = Order;