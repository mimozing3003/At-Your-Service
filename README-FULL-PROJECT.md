# At Your Service - Complete Project Generation Guide

## 🎯 Project Overview
AI Agent for Local Services - A MERN stack application that searches, compares, and books local service providers using AI-powered comparison and offline-first architecture.

## 📁 Complete File Tree

```
ai-agent-local-services/
├── backend/
│   ├── package.json ✅
│   ├── .env.example ✅
│   ├── src/
│   │   ├── index.js ✅
│   │   ├── routes/
│   │   │   ├── auth.js (see below)
│   │   │   ├── services.js (see below)
│   │   │   ├── bookings.js (see below)
│   │   │   └── providers.js (see below)
│   │   ├── models/
│   │   │   ├── User.js ✅
│   │   │   ├── Service.js ✅
│   │   │   └── Booking.js ✅
│   │   ├── utils/
│   │   │   ├── aiClient.js (see below)
│   │   │   ├── geo.js (see below)
│   │   │   └── offlineSync.js (see below)
│   │   └── seed/
│   │       └── services.seed.json (see below)
│   └── seed.js (see below)
├── ai-engine/
│   ├── requirements.txt (see below)
│   ├── .env.example (see below)
│   ├── app.py (see below)
│   ├── ai_modules/
│   │   ├── __init__.py (see below)
│   │   ├── parse_intent.py (see below)
│   │   ├── compare_engine.py (see below)
│   │   └── summary.py (see below)
│   └── README.md (see below)
├── frontend/
│   ├── package.json (see below)
│   ├── .env.example (see below)
│   ├── index.html (see below)
│   ├── vite.config.js (see below)
│   ├── tailwind.config.js (see below)
│   ├── postcss.config.js (see below)
│   ├── src/
│   │   ├── main.jsx (see below)
│   │   ├── index.css (see below)
│   │   ├── App.jsx (see below)
│   │   ├── pages/
│   │   │   ├── Login.jsx (see below)
│   │   │   ├── Dashboard.jsx (see below)
│   │   │   ├── SearchResults.jsx (see below)
│   │   │   ├── ServicePage.jsx (see below)
│   │   │   ├── Bookings.jsx (see below)
│   │   │   └── ProviderOnboard.jsx (see below)
│   │   ├── components/
│   │   │   ├── Navbar.jsx (see below)
│   │   │   ├── ServiceCard.jsx (see below)
│   │   │   ├── CompareModal.jsx (see below)
│   │   │   └── Map.jsx (see below)
│   │   └── utils/
│   │       ├── api.js (see below)
│   │       ├── auth.js (see below)
│   │       └── i18n.js (see below)
├── README-run.md (see below)
├── DEMO.txt (see below)
├── tests.sh (see below)
└── LICENSE (see below)
```

## Files Already Created ✅
- backend/package.json
- backend/.env.example
- backend/src/index.js
- backend/src/models/User.js
- backend/src/models/Service.js
- backend/src/models/Booking.js

---

## 📄 REMAINING BACKEND FILES

### backend/src/routes/auth.js
```javascript
// Authentication routes: register and login
// POST /api/auth/register - Register new user
// POST /api/auth/login - Login existing user

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields: name, email, password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
```

### backend/src/routes/services.js
```javascript
// Services routes: search, get, create services
// GET /api/services - Search and list services
// GET /api/services/:id - Get single service
// POST /api/services - Create service (provider/admin)

import express from 'express';
import Service from '../models/Service.js';
import { callAIParser, callAICompare, callAISummary } from '../utils/aiClient.js';
import { searchOverpass, fallbackLocalFilter } from '../utils/geo.js';
import { authMiddleware } from '../utils/auth.js';

const router = express.Router();

// Middleware to verify JWT (optional - only for protected routes)
const optionalAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
  } catch (error) {
    // Ignore auth errors for optional auth
  }
  next();
};

// GET /api/services
router.get('/', async (req, res) => {
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
      if (queryParsed.location) {
        dbQuery['location.city'] = new RegExp(queryParsed.location, 'i');
      }

      services = await Service.find(dbQuery).limit(parseInt(limit));

      // Step 3: Try to enrich with Overpass data (optional)
      if (process.env.USE_OVERPASS === 'true' && queryParsed.location) {
        try {
          const overpassResults = await searchOverpass(queryParsed);
          // Merge overpass results if any
          console.log(`📍 Overpass returned ${overpassResults.length} results`);
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
```

Due to the massive scope (50+ files, 5000+ lines), I need to provide this as a downloadable package. Let me create a comprehensive generation script:

