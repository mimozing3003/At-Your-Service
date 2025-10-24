// Providers routes: provider-specific operations
// GET /api/providers/services - Get provider's services
// PUT /api/providers/services/:id - Update provider's service

import express from 'express';
import Service from '../models/Service.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

// GET /api/providers/services - Get all services for logged-in provider
router.get('/services', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'provider' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Provider access required' });
    }

    const services = await Service.find({ providerId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      services,
      count: services.length
    });
  } catch (error) {
    console.error('Get provider services error:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// PUT /api/providers/services/:id - Update provider's service
router.put('/services/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'provider' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Provider access required' });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Verify ownership
    if (service.providerId && service.providerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'description', 'price', 'price_unit', 'location', 'phone'];
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        service[key] = req.body[key];
      }
    });

    await service.save();

    res.json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/providers/services/:id - Delete provider's service
router.delete('/services/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'provider' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Provider access required' });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Verify ownership
    if (service.providerId && service.providerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Service deleted'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
