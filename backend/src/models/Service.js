// Service model for local service providers
// Schema: category, name, description, rating, price, location, phone, reviews, etc.

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Plumber', 'Electrician', 'Gym', 'Tutor', 'AC Repair', 'Mechanic', 'Cleaning'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  price_unit: {
    type: String,
    enum: ['fixed', 'per-hour', 'per-day', 'per-month'],
    default: 'fixed'
  },
  location: {
    city: {
      type: String,
      required: true,
      index: true
    },
    address: {
      type: String,
      required: true
    },
    coords: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
  },
  phone: {
    type: String,
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  verifiedProvider: {
    type: Boolean,
    default: false
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for faster queries
serviceSchema.index({ category: 1, 'location.city': 1 });
serviceSchema.index({ rating: -1 });
serviceSchema.index({ price: 1 });
serviceSchema.index({ 'location.coords.lat': 1, 'location.coords.lng': 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
