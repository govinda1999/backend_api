const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const User = require('../model/userModel');

router.get('/', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      message: 'Token is Required',
      statusCode: 403,
    });
  }

  const user = await Token.findOne({ token }).exec();
  if (!user) {
    res.status(403).json({
      message: 'Token is Invalid',
      statusCode: 403,
    });
  }

  User.findByIdy(user.user_fk)
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'User Profile',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Profile' + err, statusCode: 500 });
    });
});

router.put('/', async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      message: 'Token is Required',
      statusCode: 403,
    });
  }

  const user = await Token.findOne({ token }).exec();
  if (!user) {
    res.status(403).json({
      message: 'Token is Invalid',
      statusCode: 403,
    });
  }

  const { name } = req.body;

  User.update({ _id: user.user_fk }, { name })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'User is Updated',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Update User' + err, statusCode: 500 });
    });
});

module.exports = router;
