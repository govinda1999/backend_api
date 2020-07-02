const mongoose = require('mongoose');
const Item = require('./fooditem');
const User = require('./userModel');

const favoriteSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Item },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
});

module.exports = mongoose.model('favorites', favoriteSchema);
