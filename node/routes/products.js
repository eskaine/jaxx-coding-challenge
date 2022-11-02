const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Product = require("../models/Product");

router.get("/", auth, async (req, res, next) => {
  try {
    const products = await Product.find();
    
    return res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
});

router.post("/add", auth, async (req, res, next) => {
  const { product } = req.body;

  try {
    const product = new Product(product);
    const savedProduct = await product.save();
    
    return res.status(200).json({ data: savedProduct });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
