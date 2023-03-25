const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const adminSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
  
  }, { timestamps: true });

  const Admin = mongoose.model("Admin" , adminSchema);
  module.exports= Admin;
  