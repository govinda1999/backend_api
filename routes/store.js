const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Store = require('../model/store');

router.post('/', async (req, res) => {
  const {
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    foodMenu,
    type,
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

  const newStore = new Store({
    name,
    imageUrl,
    latitude,
    longitude,
    rate,
    address,
    foodMenu,
    type,
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

  const { id } = req.body;

  Store.find({ type: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Store',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Getting Store' + err, statusCode: 500 });
    });
});

router.get('/:id', async (req, res) => {
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

  const id = req.params.id;

  Store.findById(id)
    .populate('foodMenu', ['_id', 'name', 'imageUrl'])
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Store',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Store' + err, statusCode: 500 });
    });
});

module.exports = router;
