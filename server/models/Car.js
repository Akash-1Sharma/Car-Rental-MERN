const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rentPerHour: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
