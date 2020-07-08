const express = require('express');
const router = express.Router();
const Item = require('../model/item');
const Token = require('../model/authenticationToken');

router.post('/', async (req, res) => {
  const { name, imageUrl, rate, time, description, price, category } = req.body;
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

  const newItem = new Item({
    name,
    imageUrl,
    rate,
    time,
    description,
    price,
    category,
  });
  newItem
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Item Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Adding Item' + err, statusCode: 500 });
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

  Item.find()
    .populate('category', ['_id', 'name', 'imageUrl'])
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Item',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Item' + err, statusCode: 500 });
    });
});

router.delete('/:id', async (req, res) => {
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

  Item.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is deleted from System',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Delete Item' + err, statusCode: 500 });
    });
});

router.put('/:id', async (req, res) => {
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

  Item.updateOne({ _id: id }, req.body)
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Updated in System',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Update Item' + err, statusCode: 500 });
    });
});

module.exports = router;
