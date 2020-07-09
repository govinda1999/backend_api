const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/flutter';
const port = 5000;

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const categoryRoute = require('./routes/category');
const storeRoute = require('./routes/store');
const favoriteRoute = require('./routes/favorite');
const cartRoute = require('./routes/cart');
const itemRoute = require('./routes/item');
const itemCategoryRoute = require('./routes/Itemcategory');
const menuListRoute = require('./routes/menulist');
const orderRoute = require('./routes/order');
const profileRoute = require('./routes/profile');
const sanitizerCategoryRoute = require('./routes/sanitizercategory');
const sanitizerOrderRoute = require('./routes/sanitizerorder');
const medicalStoreRoute = require('./routes/medicalStore');
const medicineOrderRoute = require('./routes/medicineOrder');
const salonCategoryRoute = require('./routes/salonCategory');

mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Contected to database');
    }
  }
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'));

app.use('/auth/login', loginRoute);
app.use('/auth/register', registerRoute);
app.use('/category', categoryRoute);
app.use('/store', storeRoute);
app.use('/favorite', favoriteRoute);
app.use('/cart', cartRoute);
app.use('/item', itemRoute);
app.use('/itemcategory', itemCategoryRoute);
app.use('/menuitem', menuListRoute);
app.use('/order', orderRoute);
app.use('/profile', profileRoute);
app.use('/sanitizer', sanitizerCategoryRoute);
app.use('/sanitizerorder', sanitizerOrderRoute);
app.use('/medical', medicalStoreRoute);
app.use('/medicine', medicineOrderRoute);
app.use('/saloncategory', salonCategoryRoute);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

app.listen(port, () => console.log(`Listen at port ${port}`));
