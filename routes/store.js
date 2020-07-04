const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Hotel = require('../model/hotel');

router.post('/', async (req, res) => {
  const {
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    foodMenu,
  } = req.body;
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

  const newHotel = new Hotel({
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    foodMenu,
  });
  newHotel
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Hotel Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Adding Hotel' + err, statusCode: 500 });
    });
});

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

  Hotel.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Hotel',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Hotel' + err, statusCode: 500 });
    });
});

module.exports = router;
