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

// // Register
// router.post('/register', async (req, res) => {
 
//   try {
   
//     const { name, email, password } = req.body;
        
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("Register error:"  +name);
//     const user = await User.create({ name, email, password: hashedPassword });
//     res.status(201).json({ message: 'User registered', user: { email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post('/register',Singup);


// Login
// router.post('/login', async (req, res) => {
//   try {
//     console.log("Login Request Body:", req.body);
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({ message: 'Login successful', token, user: { email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.post('/login',Login);







//       product



router.post('/product',AddProduct);
 
  


router.get('/allproducts',AllProduct);



// BID ------------------------------------------------




router.get('/bids/:productId', async (req, res) => {
  try {
    const bids = await Bid.find({ productId: req.params.productId }).sort({ amount: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bids' });
  }
});



router.post('/bid', async (req, res) => {
  const { productId, user, amount } = req.body;
  try {
    const newBid = await Bid.create({ productId, user, amount });
    res.json(newBid);
  } catch (err) {
    res.status(400).json({ message: 'Failed to place bid' });
  }
});




module.exports = router;
