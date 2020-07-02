const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Store = require('../model/store');

router.post('/', async (req, res) => {
  const { name, imageUrl, latitude, longitude, rate, category } = req.body;
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

  const newStore = new Store({
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    category,
  });
  newStore
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Store Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Adding Store' + err, statusCode: 500 });
    });
});

router.get('/:category', async (req, res) => {
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
  const category = req.params.category;

  Store.find({ category })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Store',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Store' + err, statusCode: 500 });
    });
});

module.exports = router;
