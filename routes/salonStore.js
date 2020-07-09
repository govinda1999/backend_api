const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const SalonStore = require('../model/salonStore');

router.post('/', async (req, res) => {
  const {
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    category,
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

  const newSalonStore = new SalonStore({
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    category,
  });
  newSalonStore
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Salon Store Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Adding Salon Store' + err, statusCode: 500 });
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

  const { category } = req.body;

  SalonStore.find({ category })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Salon Store',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Getting Salon Store' + err, statusCode: 500 });
    });
});

module.exports = router;
