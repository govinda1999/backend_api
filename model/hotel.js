const mongoose = require('mongoose');
const FoodCategory = require('./foodcategory');

const hotelSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  rate: { type: Number, required: true, default: 0.0 },
  address: { type: String, required: true },
  foodMenu: { type: [mongoose.Schema.Types.ObjectId], ref: FoodCategory },
});

module.exports = mongoose.model('hotels', hotelSchema);
