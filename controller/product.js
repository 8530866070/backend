const Product = require('../models/product');

exports.AddProduct= async (req , res ) => {
    try {
        const { name, description, image, baseBid, auctionEndDate } = req.body;
    
        const newProduct = await Product.create({ name, description, image, baseBid, auctionEndDate });
        res.status(201).json({ message: 'your product added successfully', 
                            Product: newProduct });
    
        } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.AllProduct= async (req , res ) => {
    try {
            
        const products = await Product.find();
        
            res.json(products);
        
    } catch (err) {
        console.log("fetching data error", err);
        res.status(500).json({ msg: 'Server Error' });
    }
}


exports.ProductbyId= async (req , res ) => {
    try {
            
        const product = await Product.find(req.params.productId);
        
            res.json(product);
        
    } catch (err) {
        console.log("fetching data error", err);
        res.status(500).json({ msg: 'Server Error' });
    }
}