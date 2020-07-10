const mongoose = require('mongoose');
const SalonItem = require('./salonMenu');
const User = require('./userModel');

const salonCartSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SalonItem,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
});

module.exports = mongoose.model('saloncarts', salonCartSchema);
