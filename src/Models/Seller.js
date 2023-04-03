const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const addressSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  floorNum: {
    type: Number,
    required: true
  },
  aptNum: {
    type: Number,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },

}, { _id: false });

const sellerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: addressSchema,
    required: true
  }

}, { timestamps: true });

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
