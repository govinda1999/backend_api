const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Cart = require('../model/cart');

router.post('/', async (req, res) => {
  const { item } = req.body;
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

  const newCart = new Cart({
    item,
    user: user.user_fk,
  });
  newCart
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Product Added Successfully in Cart',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Product in Cart' + err,
        statusCode: 500,
      });
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

  Cart.find({ user: user.user_fk })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Cart',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Cart' + err, statusCode: 500 });
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

  Cart.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Deleted from Cart',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Delete Cart' + err, statusCode: 500 });
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
  const { quantity } = req.body;

  Cart.updateOne({ _id: id }, { quantity })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Updated in Cart',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Update Cart' + err, statusCode: 500 });
    });
});

module.exports = router;
