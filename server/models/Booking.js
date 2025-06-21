const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fromTime: {
    type: Date,
    required: true
  },
  toTime: {
    type: Date,
    required: true
  },
  totalHours: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
status: {
  type: String,
  default: 'confirmed',
  enum: ['confirmed', 'cancelled']
}


}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
