// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  baseBid: { type: Number, required: true },
  auctionEndDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
