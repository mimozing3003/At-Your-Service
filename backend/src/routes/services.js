// Services routes: search, get, create services
// GET /api/services - Search and list services
// GET /api/services/:id - Get single service
// POST /api/services - Create service (provider/admin)

import express from 'express';
import Service from '../models/Service.js';
import { callAIParser, callAICompare, callAISummary } from '../utils/aiClient.js';
import { searchOverpass } from '../utils/geo.js';
import { authMiddleware, optionalAuthMiddleware } from '../utils/auth.js';

const router = express.Router();

// GET /api/services
router.get('/', optionalAuthMiddleware, async (req, res) => {
  try {
    const { q, category, city, limit = 20 } = req.query;

    let services = [];
    let queryParsed = null;
    let reasoning = '';

    if (q) {
      // Natural language search
      console.log(`🔍 Searching with query: "${q}"`);

      // Step 1: Parse intent using AI
      try {
        queryParsed = await callAIParser(q);
        console.log('✅ Parsed query:', queryParsed);
      } catch (aiError) {
        console.warn('⚠️  AI parser failed, using fallback');
        queryParsed = { service_type: null, max_price: null, location: null };
      }

      // Step 2: Build database query
      const dbQuery = {};
      if (queryParsed.service_type) {
        dbQuery.category = new RegExp(queryParsed.service_type, 'i');
      }
      if (queryParsed.max_price) {
        dbQuery.price = { $lte: queryParsed.max_price };
      }
      if (queryParsed.location && queryParsed.location !== 'nearby') {
        dbQuery['location.city'] = new RegExp(queryParsed.location, 'i');
      }

      services = await Service.find(dbQuery).limit(parseInt(limit));

      // Step 3: Try to enrich with Overpass data (optional)
      if (process.env.USE_OVERPASS === 'true' && queryParsed.location) {
        try {
          const overpassResults = await searchOverpass(queryParsed);
          console.log(`📍 Overpass returned ${overpassResults.length} results`);
          // Note: Could merge overpass results here if needed
        } catch (geoError) {
          console.warn('⚠️  Overpass failed, using DB only');
        }
      }

      // Step 4: AI comparison and scoring
      if (services.length > 0) {
        try {
          const comparison = await callAICompare(services, queryParsed);
          services = comparison.services;
          reasoning = comparison.reasoning;
        } catch (aiError) {
          console.warn('⚠️  AI compare failed, returning unsorted');
          reasoning = 'AI comparison unavailable - showing database results';
        }
      } else {
        reasoning = 'No services found matching your criteria';
      }
    } else {
      // Simple category/city filter
      const filter = {};
      if (category) filter.category = category;
      if (city) filter['location.city'] = new RegExp(city, 'i');

      services = await Service.find(filter).sort({ rating: -1 }).limit(parseInt(limit));
      reasoning = 'Filtered by category and city, sorted by rating';
    }

    res.json({
      services,
      queryParsed,
      reasoning,
      count: services.length
    });
  } catch (error) {
    console.error('Services search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Generate review summary
    let reviewSummary = '';
    if (service.reviews && service.reviews.length > 0) {
      try {
        const summary = await callAISummary(service.reviews);
        reviewSummary = summary.summary;
      } catch (error) {
        reviewSummary = `${service.reviews.length} reviews available`;
      }
    }

    res.json({
      ...service.toObject(),
      reviewSummary
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// POST /api/services (protected - provider/admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is provider or admin
    if (req.user.role !== 'provider' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only providers can create services' });
    }

    const serviceData = {
      ...req.body,
      providerId: req.user.id
    };

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

export default router;
