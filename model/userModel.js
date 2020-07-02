const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  mobile: { type: Number, required: true },
  name: { type: String },
});

module.exports = mongoose.model('users', userSchema);
