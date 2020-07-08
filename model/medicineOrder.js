const mongoose = require('mongoose');
const User = require('./userModel');

const MedicineSchema = mongoose.Schema({
  name: { type: String },
  filename: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  date: { type: String, default: new Date().toISOString() },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model('mediines', MedicineSchema);
