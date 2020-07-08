const mongoose = require('mongoose');
const Item = require('./item');
const Store = require('./store');

const menuListSchema = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Item },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: Store, required: true },
});

module.exports = mongoose.model('menulists', menuListSchema);
