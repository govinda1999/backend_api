const mongoose = require('mongoose');
const User = require('./userModel');
const tokenSchema = mongoose.Schema({
  token: { type: String, required: true },
  user_fk: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

module.exports = mongoose.model('tokens', tokenSchema);
