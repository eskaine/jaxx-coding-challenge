const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    let isPasswordCorrect;

    if (existingAdmin) {
      isPasswordCorrect = await bcrypt.compare(
        password,
        existingAdmin.password
      );
    }

    if (existingAdmin && isPasswordCorrect) {
      const payload = {
        admin: {
          id: existingAdmin._id,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7 days" });

      return res.status(200).json({ token });
    }

    return res.status(401).send("Invalid Username or Password!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
