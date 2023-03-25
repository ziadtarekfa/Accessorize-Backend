const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const favouritesSchema = new Schema({
    productID: {
        type: Number,
        required: true
    },
    userEmail: {
        type:String,
        required: true
    },
}, {timestamps:true});

const Favourites= mongoose.model('Favourite',favouritesSchema);
module.exports = Favourites;