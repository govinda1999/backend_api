const express = require('express');
const router = express.Router();
const ItemCategory = require('../model/Itemcategory');
const Token = require('../model/authenticationToken');

router.post('/', async (req, res) => {
  const { name, imageUrl, category } = req.body;
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

  const newItemCategory = new ItemCategory({
    name,
    imageUrl,
    category,
  });
  newItemCategory
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Item Category Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Item Category' + err,
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

  const id = req.params.id;

  ItemCategory.find({ category: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Item Category',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Item Category' + err, statusCode: 500 });
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

  ItemCategory.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Item Category is deleted from System',
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Delete Item Category' + err,
        statusCode: 500,
      });
    });
});

module.exports = router;
