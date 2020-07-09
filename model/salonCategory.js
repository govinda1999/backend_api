const mongoose = require('mongoose');

const salonCategorySchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('saloncategories', salonCategorySchema);
