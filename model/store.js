const mongoose = require('mongoose');
const ItemCategory = require('./Itemcategory');
const Category = require('./category');

const StoreSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  rate: { type: Number, required: true, default: 0.0 },
  address: { type: String, required: true },
  foodMenu: [{ type: mongoose.Schema.Types.ObjectId, ref: ItemCategory }],
  type: { type: mongoose.Schema.Types.ObjectId, ref: Category, required: true },
});

module.exports = mongoose.model('stores', StoreSchema);
