// models/JoinedAuction.js
const mongoose = require('mongoose');

const joinedAuctionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  joinedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinedAuction', joinedAuctionSchema);
