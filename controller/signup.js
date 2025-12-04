const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Singup= async (req , res ) => {
    try {
        const { name, email, password } = req.body;
    
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already in use' });
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
} 