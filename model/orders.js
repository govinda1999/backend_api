const mongoose = require('mongoose');
const User = require('./userModel');
const Item = require('./fooditem');

const ordersSchema = mongoose.Schema({
  date: { type: Date, default: new Date() },
  orderId: { type: String, required: true },
  status: { type: String },
  payment: { type: Number, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: Item, required: true }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  payment_mode: { type: String, required: true },
  payment_done: { type: Boolean, required: true },
});

module.exports = mongoose.model('orders', ordersSchema);
