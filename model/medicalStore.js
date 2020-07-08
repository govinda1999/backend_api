const mongoose = require('mongoose');

const MedicalStoreSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model('medicals', MedicalStoreSchema);
