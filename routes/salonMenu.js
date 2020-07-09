const express = require('express');
const router = express.Router();
const Token = require('../model/authenticationToken');
const SalonMenu = require('../model/salonMenu');

router.post('/', async (req, res) => {
  const { name, imageUrl, store, price } = req.body;
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

  const newSalonMenu = new SalonMenu({
    name,
    imageUrl,
    price,
    store,
  });
  newSalonMenu
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Salon Menu Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Adding Salon Menu' + err, statusCode: 500 });
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

  SalonMenu.find({ store: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Salon Menu',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Getting Salon Meenu' + err, statusCode: 500 });
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

  SalonMenu.deleteOne({ _id: id })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Menu Is Deleted',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          error: 'Error in Deleting Salon Meenu' + err,
          statusCode: 500,
        });
    });
});

module.exports = router;
