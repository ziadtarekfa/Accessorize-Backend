const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        unique: true
    },
    position: {
        type: Number,
        required: true
    },
    modelLink: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Model = mongoose.model('Model', modelSchema);
module.exports = Model;