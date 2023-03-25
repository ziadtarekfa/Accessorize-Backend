const mongoose = require('mongoose');
const Cart = require('./Cart');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
},
password:{
    type:String,
    required:true
},
firstName: {
    type:String,
    required: true
},
lastName:{
    type:String,
    required:true
},
phoneNumber:{
    type:String,
    required:true
},
birthdate: {
    type:String,
},
city:{
    type:String,
},
zipCode:{
    type:Number,
},
streetAddress:{
    type:String,
},
floorNum:{
    type:Number,
},
aptNum:{
    type:Number,
}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
