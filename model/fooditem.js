const mongoose = require('mongoose');

const foodItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rate: { type: Number, required: true, default: 0 },
  time: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model('foods', foodItemSchema);
