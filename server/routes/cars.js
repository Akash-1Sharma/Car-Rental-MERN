const express = require('express');
const mongoose = require('mongoose');
const Car = require('../models/Car');
const protect = require('../middleware/auth');

const router = express.Router();

// ✅ Create car (admin only)
router.post('/add', protect, async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(403).json({ message: 'Access denied: Admins only' });

    const { name, image, rentPerHour, capacity, fuelType } = req.body;

    const newCar = new Car({ name, image, rentPerHour, capacity, fuelType });
    await newCar.save();

    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (err) {
    console.error('Add Car Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete car by ID (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid car ID' });
    }

    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Car not found' });

    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get car by ID (used in CarDetails.js)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid car ID' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
