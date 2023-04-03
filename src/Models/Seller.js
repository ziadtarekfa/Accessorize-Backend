const mongoose = require('mongoose');
const addressSchema = require('../Models/Address');
const Schema = mongoose.Schema;

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
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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
