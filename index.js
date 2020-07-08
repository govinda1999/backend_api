const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/flutter';
const port = 5000;
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const categoryRoute = require('./routes/category');
const hotelRoute = require('./routes/hotel');
const favoriteRoute = require('./routes/favorite');
const cartRoute = require('./routes/cart');
const itemRoute = require('./routes/item');
const itemCategoryRoute = require('./routes/Itemcategory');
const hotelMenuListRoute = require('./routes/hotelmenulist');
const orderRoute = require('./routes/order');
const profileRoute = require('./routes/profile');

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

app.use('/auth/login', loginRoute);
app.use('/auth/register', registerRoute);
app.use('/category', categoryRoute);
app.use('/hotel', hotelRoute);
app.use('/favorite', favoriteRoute);
app.use('/cart', cartRoute);
app.use('/item', itemRoute);
app.use('/itemcategory', itemCategoryRoute);
app.use('/hotelmenuitem', hotelMenuListRoute);
app.use('/order', orderRoute);
app.user('/profile', profileRoute);

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
