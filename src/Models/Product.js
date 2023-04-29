const mongoose = require('mongoose');
const modelPositionAndSizeSchema = require('./ModelPositionAndSize');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    modelLink: {
        type: String,
    },
    images: {
        type: mongoose.SchemaTypes.Array,
    },
    description: {
        type: String,
        required: true,
    },
    modelPosition: {
        type: modelPositionAndSizeSchema,
        required: true
    },
    modelSize: {
        type: modelPositionAndSizeSchema,
        required: true
    },
    rate: {
        type: Number,
    },
    isTried: {
        type: Boolean,
    },
    isFavourite: {
        type: Boolean
    },
    isCart: {
        type: Boolean
    }


});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
