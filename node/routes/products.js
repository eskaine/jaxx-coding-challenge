const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Product = require("../models/Product");

const validation = [
  body("sku").isAlphanumeric().isLength({ min: 6 }),
  body("title").isAlpha().isLength({ min: 6 }),
  body("imageUrl").isURL(),
];

router.get("/", auth, async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ data: products });
  } catch (err) {
    next(err);
  }
});

router.post("/add", auth, validation, async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(401).send("Invalid product information!");
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    return res.status(200).json({ data: savedProduct });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
