const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const Favorite = require('../model/favorite');

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

  const newFavorite = new Favorite({
    item,
    user: user.user_fk,
  });
  newFavorite
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Product Added Successfully in Favorite',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Product in Favorite' + err,
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

  Favorite.find({ user: user.user_fk })
    .populate('item')
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Favorite',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Favorite' + err, statusCode: 500 });
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

  Favorite.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item is Deleted',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Delete Favorite' + err, statusCode: 500 });
    });
});

module.exports = router;
