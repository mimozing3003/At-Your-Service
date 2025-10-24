// Bookings routes: create and view bookings
// POST /api/bookings/book - Create new booking (auth required)
// GET /api/bookings/mine - Get user's bookings (auth required)

import express from 'express';
import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

// POST /api/bookings/book
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { serviceId, dateISO, notes } = req.body;

    // Validation
    if (!serviceId || !dateISO) {
      return res.status(400).json({ error: 'Missing required fields: serviceId, dateISO' });
    }

    // Verify service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      serviceId,
      date: new Date(dateISO),
      notes: notes || '',
      status: 'confirmed'
    });

    // Populate service details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('serviceId', 'name category phone location rating')
      .exec();

    res.status(200).json({
      success: true,
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET /api/bookings/mine
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('serviceId', 'name category phone location rating price')
      .sort({ createdAt: -1 })
      .exec();

    res.json({
      bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PATCH /api/bookings/:id/cancel - Cancel a booking
router.patch('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Verify ownership
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router;
