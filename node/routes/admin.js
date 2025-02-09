const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin = require("../models/Admin");

const validation = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
];

router.post("/login", validation, async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  try {
    const existingAdmin = await Admin.findOne({ email });

    let isPasswordCorrect;

    if (errors.isEmpty() && existingAdmin) {
      isPasswordCorrect = await bcrypt.compare(
        password,
        existingAdmin.password
      );
    }

    if (errors.isEmpty() && existingAdmin && isPasswordCorrect) {
      const payload = {
        admin: {
          id: existingAdmin._id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
      });

      return res.status(200).send(JSON.stringify(token));
    }

    return res.status(401).send("Invalid Username or Password!");
  } catch (err) {
    next(err);
  }
});

router.post("/register", validation, async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!errors.isEmpty() || existingAdmin) {
      return res.status(401).send("Invalid Username or Password!");
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
    const newAdmin = new Admin({ email, password: hashedPassword });
    const savedAdmin = await newAdmin.save();

    const payload = {
      admin: {
        id: savedAdmin._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });

    return res.status(200).send(JSON.stringify(token));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
