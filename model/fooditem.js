const mongoose = require('mongoose');
const FoodCategory = require('./foodcategory');

const foodItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rate: { type: Number, required: true, default: 0 },
  time: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: FoodCategory,
  },
});

module.exports = mongoose.model('foods', foodItemSchema);
