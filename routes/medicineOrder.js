const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image.jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File Name is not Supported'), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
const Token = require('../model/authenticationToken');
const MedicineOrder = require('../model/medicineOrder');

router.post('/', async (req, res) => {
  const { name } = req.body;
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

  const newMedicineOrder = new MedicineOrder({
    name,
    user: user.user_fk,
  });
  newMedicineOrder
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Medicine Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Medicine' + err,
        statusCode: 500,
      });
    });
});

router.post('/upload', upload.single('prescription'), async (req, res) => {
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

  const newMedicineOrder = new MedicineOrder({
    filename: req.file.path,
    user: user.user_fk,
  });
  newMedicineOrder
    .save()
    .then((doc) => {
      res.status(200).json({
        message: 'Medicine Added Successfully',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Adding Medicine' + err,
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

  MedicineOrder.find({})
    .exec()
    .then((doc) => {
      res.status(200).json({
        message: 'List of Medicine Order',
        response: doc,
        statusCode: 200,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Error in Getting Medicine Order' + err,
        statusCode: 500,
      });
    });
});

module.exports = router;
