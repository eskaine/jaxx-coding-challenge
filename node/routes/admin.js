const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

router.post('/login', async (req, res, next) => {
  const adminLogin = req.body;
  const existingAdmin = await Admin.findOne({email: adminLogin.email});
  let isPasswordCorrect;

  if(existingAdmin) {
    isPasswordCorrect = await bcrypt.compare(adminLogin.password, existingAdmin.password);
  }

  if(existingAdmin && isPasswordCorrect) {
    return res.sendStatus(200);
  }
  
  return res.status(401).send('Invalid Username or Password!');
});

module.exports = router;
