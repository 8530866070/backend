const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Bid = require('../models/Bid');
const JoinedAuction = require('../models/JoinedAuction');
const Leaderboard = require('../models/Leaderboard');
const { Singup } = require('../controller/signup');
const {Login} = require('../controller/login');
const {AddProduct , AllProduct} = require('../controller/product');
const User=require('../models/User');




const router = express.Router();

router.get('/test', (req, res) => {
  res.send("✅ Auth test route working");
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});



router.post('/register',Singup);




router.post('/login',Login);







//       product



router.post('/product',AddProduct);
 
  


router.get('/allproducts',AllProduct);



// BID ------------------------------------------------




router.get('/bids/:productId', async (req, res) => {
  try {
    const bids = await Bid.find({ productId: req.params.productId })
      .sort({ amount: -1 })
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});



router.post('/bid/:productId', async (req, res) => {
  const { productId } = req.params;
  const { userId, bidAmount } = req.body;

  try {
    const newBid = await Bid.create({
      productId,
      user: userId,
      amount: bidAmount,
      bidTime: new Date()
    });

    res.json({ message: 'Bid placed successfully', newBid });
  } catch (err) {
    res.status(400).json({ message: 'Failed to place bid', error: err.message });
  }
});



module.exports = router;
