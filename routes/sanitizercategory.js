const express = require('express');
const router = express.Router();
const Sanitizer = require('../model/sanitizer');
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

  const newSanitizer = new Sanitizer({ name, imageUrl });
  newSanitizer
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Sanitizer Category Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Sanitizer Category' + err, statusCode: 500 });
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

  Sanitizer.find()
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Sanitizer Category',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Error in Sanitizer Category' + err, statusCode: 500 });
    });
});

module.exports = router;
