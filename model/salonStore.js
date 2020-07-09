const mongoose = require('mongoose');
const SalonCategory = require('./salonCategory');

const salonStoreSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  rate: { type: Number, required: true, default: 0.0 },
  address: { type: String, required: true },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SalonCategory,
    required: true,
  },
});

module.exports = mongoose.model('salonstores', salonStoreSchema);
