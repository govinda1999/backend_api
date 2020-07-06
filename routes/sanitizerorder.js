const express = require('express');
const router = express.Router();
const SanitizerOrder = require('../model/sanitizerOrder');
const Token = require('../model/authenticationToken');

router.post('/', async (req, res) => {
  const { area, sanitizer_type } = req.body;
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

  const newSanitizerOrder = new SanitizerOrder({
    area,
    sanitizer_type,
    user: user.user_fk,
  });
  newSanitizerOrder
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Sanitizer Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Sanitizer ' + err, statusCode: 500 });
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

  SanitizerOrder.find({ user: user.user_fk })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Sanitizer',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Sanitizer' + err, statusCode: 500 });
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

  const { status } = req.body;
  const id = req.params.id;

  SanitizerOrder.update({ _id: id }, { status })
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'Updated Sanitizer Order',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Sanitizer' + err, statusCode: 500 });
    });
});

module.exports = router;
