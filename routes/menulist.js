const express = require('express');
const router = express.Router();
const MenuList = require('../model/menulist');
const Token = require('../model/authenticationToken');

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

  const newMenuList = new MenuList({
    item,
    hotel,
  });
  newMenuList
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
        error: 'Error in Food Menu List in Store' + err,
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

  MenuList.find({ hotel: hotelId })
    .populate('item')
    .exec()
    .then((doc) => {
      const result = doc.filter(
        (each) => each.item.category + '' === category + ''
      );
      res.status(200).json({
        message: 'List of Item in Store',
        response: result,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Item Menu ' + err, statusCode: 500 });
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

  MenuList.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Food is deleted from Store Menu',
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
