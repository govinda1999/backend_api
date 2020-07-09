const mongoose = require('mongoose');
const SalonStore = require('./salonStore');

const salonMenuSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SalonStore,
    required: true,
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('salonmenus', salonMenuSchema);
