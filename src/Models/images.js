const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    productID: {
        type: Number,
        required: true
    },
    imageLink: {
        type:String,
        required: true
    },
}, {timestamps:true});

const Images= mongoose.model('Images',imagesSchema);
module.exports = Images;