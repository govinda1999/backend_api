const mongoose = require('mongoose');
const Category = require('./category');

const ItemCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: Category },
});

module.exports = mongoose.model('itemcategory', ItemCategorySchema);
