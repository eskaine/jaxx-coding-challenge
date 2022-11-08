const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const ObjectId = require("mongoose").Types.ObjectId;

const addProductValidation = [
  body("sku").isAlphanumeric().isLength({ min: 4 }),
  body("title").isAlphanumeric('en-US', {ignore: ' '}).isLength({ min: 6 }),
  body("imageUrl").isURL(),
];

const deleteProductValidation = [
  param("id").custom((value) => ObjectId.isValid(value)),
];

router.get("/", auth, async (req, res, next) => {
  try {
    const products = await Product.find();

    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});

router.post("/add", auth, addProductValidation, async (req, res, next) => {
  const errors = validationResult(req);

  try {
    const existingSku = await Product.findOne({sku: req.body.sku});

    if (!errors.isEmpty() || existingSku) {
      return res.status(401).send("Invalid product information!");
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    return res.status(200).json({ savedProduct });
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/delete/:id",
  auth,
  deleteProductValidation,
  async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(401).send("Invalid id!");
      }

      const result = await Product.deleteOne({ _id: req.params.id });

      if (result.deletedCount) {
        return res.sendStatus(200);
      }

      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
