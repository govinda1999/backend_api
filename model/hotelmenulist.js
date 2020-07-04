const mongoose = require('mongoose');
const Item = require('./fooditem');
const Hotel = require('./hotel');

const hotelSchema = mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, required: true, ref: Item },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: Hotel, required: true },
});

module.exports = mongoose.model('hotelmenulists', hotelSchema);
