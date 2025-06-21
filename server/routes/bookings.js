const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const protect = require('../middleware/auth');

const router = express.Router();

// Create a new booking
// router.post('/book', protect, async (req, res) => {
//   try {
    //console.log('Booking request by:', req.user, req.body);
//     const { carId, fromTime, toTime } = req.body;
//     const car = await Car.findById(carId);
//     const hours = Math.abs(new Date(toTime) - new Date(fromTime)) / 36e5;
//     const amount = hours * car.rentPerHour;

//     const booking = new Booking({
//       car: carId,
//       user: req.user.id,
//       fromTime,
//       toTime,
//       totalHours: hours,
//       totalAmount: amount
//     });

//     await booking.save();
//     res.status(201).json({ message: 'Booking successful', booking });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
//here is /book to prevent duplicate booking i implemented this on day 5

router.post('/book', protect, async (req, res) => {
  try {
    const { carId, fromTime, toTime } = req.body;

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      car: carId,
      $or: [
        { fromTime: { $lt: toTime }, toTime: { $gt: fromTime } }
      ]
    });

    if (overlapping) {
      return res.status(409).json({ message: 'Car is already booked for the selected time slot' });
    }

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
    console.error('Booking error:', err);
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

// Get bookings of logged-in user
router.get('/my', protect, async (req, res) => {
  try {
    const myBookings = await Booking.find({ user: req.user.id }).populate('car');
    res.json(myBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
