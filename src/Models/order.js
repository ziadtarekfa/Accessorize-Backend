const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderID: {
        type: Number,
        required: true,
        unique: true
    },
    orderDate: {
        type:Date,
        required: true
    },
    shippingAddress:{
        type:String,
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
    userEmail:{
        type:String,
        required:true
    }
}, {timestamps:true});

const Order= mongoose.model('Order',orderSchema);
module.exports = Order;