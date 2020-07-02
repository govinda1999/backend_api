const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('categories', categorySchema);
