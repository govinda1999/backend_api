const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const SalonCart = require('../model/salonCart');

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

  const newSalonCart = new SalonCart({
    item,
    user: user.user_fk,
  });
  newSalonCart
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Salon Item Added Successfully in Cart',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Salon Item in Cart' + err,
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

  SalonCart.find({ user: user.user_fk })
    .populate('item')
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

  SalonCart.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Deleted from Salon Cart',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Delete Cart' + err, statusCode: 500 });
    });
});

router.delete('/', async (req, res) => {
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

  SalonCart.deleteMany({ user: user.user_fk })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Deleted in Cart',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Deleted Cart' + err, statusCode: 500 });
    });
});

module.exports = router;
