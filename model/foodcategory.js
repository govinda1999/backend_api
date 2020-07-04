const mongoose = require('mongoose');

const foodCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('foodcategory', foodCategorySchema);
