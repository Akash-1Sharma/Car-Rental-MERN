const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const protect = require('../middleware/auth');

const router = express.Router();

// Create a new booking
router.post('/book', protect, async (req, res) => {
  try {
    //console.log('Booking request by:', req.user, req.body);
    const { carId, fromTime, toTime } = req.body;
    const car = await Car.findById(carId);
    const hours = Math.abs(new Date(toTime) - new Date(fromTime)) / 36e5;
    const amount = hours * car.rentPerHour;

    const booking = new Booking({
      car: carId,
      user: req.user.id,
      fromTime,
      toTime,
      totalHours: hours,
      totalAmount: amount
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get all bookings (admin-only, optional filter later)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car').populate('user');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
