const express = require('express');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const protect = require('../middleware/auth');

const router = express.Router();

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
// router.get('/', protect, async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate('car').populate('user');
//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Public routes (no auth needed)
router.get('/', async (req, res) => {               // GET /api/bookings
  try {
    const bookings = await Booking.find()
      .populate('car', 'name image rentPerHour capacity fuelType')
      .populate('user', 'name email');
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

// Get all bookings - Admin only
// Get all bookings - Admin only
// router.get('/all', protect, async (req, res) => {
//   try {
//     if (!req.user.isAdmin) {
//       return res.status(403).json({ message: 'Admins only' });
//     }

//     const bookings = await Booking.find({})
//       .populate('car', 'name rentPerHour')   // ✅ correct field name
//       .populate('user', 'email');            // ✅ correct field name

//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/all', protect, async (req, res) => {
  try {
    console.log('🔍 Requesting user:', req.user);  // 🧪 Log user data

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admins only' });
    }

    const bookings = await Booking.find({})
      .populate('car', 'name rentPerHour')
      .populate('user', 'email');

    res.json(bookings);
  } catch (err) {
    console.error('❌ Error in /all route:', err);  // Better error log
    res.status(500).json({ error: err.message });
  }
});



// Cancel booking by updating status to 'cancelled'
router.patch('/cancel/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Optional: Check if the logged-in user is allowed to cancel this booking
    if (booking.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking marked as cancelled', booking });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});








module.exports = router;
