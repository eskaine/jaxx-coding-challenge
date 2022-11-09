const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Product = require("../models/Product");
const ObjectId = require("mongoose").Types.ObjectId;

const productValidation = [
  body("sku").isAlphanumeric().isLength({ min: 4 }),
  body("title").isAlphanumeric('en-US', {ignore: ' '}).isLength({ min: 6 }),
  body("imageUrl").isURL(),
];

const productIdValidation = [
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

router.post("/add", auth, productValidation, async (req, res, next) => {
  const errors = validationResult(req);

  try {
    const existingSku = errors.isEmpty() && await Product.findOne({sku: req.body.sku});

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

router.put("/edit/:id", auth, [...productIdValidation, ...productValidation], async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  const {body, params} = req;
  console.log({body, params})


  try {
    const updatedSku = errors.isEmpty() &&  await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

    console.log({updatedSku})

    if (!errors.isEmpty() || !updatedSku) {
      return res.status(401).send("Invalid product information!");
    }

    return res.status(200).json({ updatedSku });
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/delete/:id",
  auth,
  productIdValidation,
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).send("Invalid id!");
    }

    try {
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
