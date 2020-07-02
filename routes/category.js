const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const Token = require('../model/authenticationToken');

router.post('/', async (req, res) => {
  const { name, imageUrl } = req.body;
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

  const newCategory = new Category({ name, imageUrl });
  newCategory
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Category Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Category' + err, statusCode: 500 });
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

  Category.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Category',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Category' + err, statusCode: 500 });
    });
});

module.exports = router;
