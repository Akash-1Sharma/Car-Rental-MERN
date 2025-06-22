const express = require('express');
const Car = require('../models/Car');
const protect = require('../middleware/auth');

const router = express.Router();

// ✅ GET car by ID (used in CarDetails.js)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create car (admin only)
router.post('/add', protect, async (req, res) => {
  try {
    if (!req.user.isAdmin)
      return res.status(403).json({ message: 'Access denied: Admins only' });

    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: 'Car added successfully', car: newCar });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars (public)
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

