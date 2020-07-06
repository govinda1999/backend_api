const mongoose = require('mongoose');

const sanitizerSchema = mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('sanitizers', sanitizerSchema);
