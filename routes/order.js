const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Order = require('../model/orders');
const Cart = require('../model/cart');

router.post('/', async (req, res) => {
  const { orderId, status, payment, payment_mode, payment_done } = req.body;
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

  let cartItem = await Cart.find({ user: user.user_fk });
  cartItem = cartItem.map((item) => item.item);
  await Cart.deleteMany({ user: user.user_fk });
  const newOrder = new Order({
    orderId,
    status,
    payment,
    payment_mode,
    payment_done,
    user: user.user_fk,
    items: cartItem,
  });
  newOrder
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Orders is added',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Orders' + err,
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

  Order.find({ user: user.user_fk })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Orders',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Error in Order' + err, statusCode: 500 });
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
  const { status } = req.body;

  Order.update({ _id: id }, { status })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Order is Updated',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Update Order' + err, statusCode: 500 });
    });
});

module.exports = router;
