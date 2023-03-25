const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const cartSchema = new Schema({

      products:[{ type: Schema.Types.ObjectId, ref: 'Product',default:[] }]
    
  }, { timestamps: true });

  const Cart = mongoose.model("Cart" , cartSchema);
  module.exports= Cart;
  