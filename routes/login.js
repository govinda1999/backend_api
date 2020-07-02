const express = require('express');
const User = require('../model/userModel');
const router = express.Router();
const md5 = require('md5');
const Token = require('../model/authenticationToken');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const temp = await User.findOne({ email }).exec();
  if (temp && temp.password === password) {
    const token = md5(temp._id);
    const tempToken = new Token({ token, user_fk: temp._id });
    await tempToken.save();
    res.status(200).json({
      message: 'Login Successfully',
      statusCode: 200,
      token,
    });
  } else {
    res.status(401).json({
      message: 'Error in Login',
      statusCode: 401,
    });
  }
});

module.exports = router;
