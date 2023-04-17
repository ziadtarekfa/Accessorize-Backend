const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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
    model: {
        type: String,
        required: true,
    },
    images: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }




}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
