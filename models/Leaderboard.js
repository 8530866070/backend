// models/Leaderboard.js
const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  topBids: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      bidAmount: Number,
      bidTime: Date
    }
  ]
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
