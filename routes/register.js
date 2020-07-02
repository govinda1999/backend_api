const express = require('express');
const User = require('../model/userModel');
const router = express.Router();

router.post('/', (req, res) => {
  const { email, password, username, mobile } = req.body;
  const usertemp = new User({
    email,
    password,
    username,
    mobile,
  });

  usertemp
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Register Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'error in register', statusCode: 500 });
    });
});

module.exports = router;
