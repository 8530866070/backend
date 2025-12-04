require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const authRoutes = require('./routers/auth');

const app = express();


app.use(cors({
  origin: ["https://frontend1-c7nh-git-main-rohan-kanades-projects.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auction API is running ✅");
});

app.use('/api/auth', authRoutes);

//app.use('/api/auth', authRoutes);
// app.use('/api/auth', require('./routers/auth'));


console.log("✅ Auth routes loaded");


mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));