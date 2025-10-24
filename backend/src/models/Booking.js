// Booking model for tracking service bookings
// Schema: userId, serviceId, date, status, notes, createdAt

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service ID is required'],
    index: true
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for user bookings queries
bookingSchema.index({ userId: 1, createdAt: -1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
