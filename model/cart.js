const mongoose = require('mongoose');
const Item = require('./item');
const User = require('./userModel');

const cartSchema = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Item },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: User },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('carts', cartSchema);
