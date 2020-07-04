const express = require('express');
const router = express.Router();
const FoodCategory = require('../model/foodcategory');
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

  const newFoodCategory = new FoodCategory({
    name,
    imageUrl,
  });
  newFoodCategory
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Food Category Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Food Category' + err, statusCode: 500 });
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

  FoodCategory.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Food Category',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Food Category' + err, statusCode: 500 });
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

  FoodCategory.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Food Category is deleted from System',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: 'Error in Delete  Food Category' + err,
          statusCode: 500,
        });
    });
});

module.exports = router;
