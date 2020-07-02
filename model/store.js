const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  rate: { type: Number, required: true, default: 0.0 },
  category: { type: String, required: true },
});

module.exports = mongoose.model('stores', storeSchema);
