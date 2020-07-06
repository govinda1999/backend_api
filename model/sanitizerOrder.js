const mongoose = require('mongoose');
const Sanitizer = require('./sanitizer');
const User = require('./userModel');

const sanitizerOrderSchema = mongoose.Schema({
  area: { type: String, required: true },
  sanitizer_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Sanitizer,
    required: true,
  },
  date: { type: String, default: new Date().toISOString() },
  done: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
});

module.exports = mongoose.model('sanitizerOrders', sanitizerOrderSchema);
