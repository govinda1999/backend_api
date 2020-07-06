const express = require('express');
const router = express.Router();
const FoodMenuList = require('../model/hotelmenulist');
const Token = require('../model/authenticationToken');
const Category = require('../model/foodcategory');

router.post('/', async (req, res) => {
  const { item, hotel } = req.body;
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

  const newFoodMenuList = new FoodMenuList({
    item,
    hotel,
  });
  newFoodMenuList
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Food Menu is Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Food Menu List in Hotel' + err,
        statusCode: 500,
      });
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

  const hotelId = req.params.id;
  const { category } = req.body;

  FoodMenuList.find({ hotel: hotelId })
    .populate('item')
    .exec()
    .then((doc) => {
      const result = doc.filter(
        (each) => each.item.category + '' === category + ''
      );
      res.status(200).json({
        message: 'List of Food Item',
        response: result,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Food Menu ' + err, statusCode: 500 });
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

  FoodMenuList.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Food is deleted from Hotel Menu',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Delete Food Menu List' + err,
        statusCode: 500,
      });
    });
});

module.exports = router;
