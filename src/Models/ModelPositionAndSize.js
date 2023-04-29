const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelPositionAndSizeSchema = new Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    z: {
        type: Number,
        required: true
    }
}, { _id: false });

module.exports = modelPositionAndSizeSchema;
