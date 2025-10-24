// AI Engine HTTP client with retry and fallback logic
// Connects to Python AI microservice for parse, compare, and summary

import axios from 'axios';

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';
const TIMEOUT = 5000; // 5 seconds

// Cache for parsed queries (simple in-memory cache)
const parseCache = new Map();

// POST /ai/parse - Parse natural language query
export async function callAIParser(text) {
  // Check cache first
  const cacheKey = text.toLowerCase().trim();
  if (parseCache.has(cacheKey)) {
    console.log('✅ Using cached parse result');
    return parseCache.get(cacheKey);
  }

  try {
    const response = await axios.post(
      `${AI_ENGINE_URL}/ai/parse`,
      { text },
      { timeout: TIMEOUT }
    );

    // Cache the result
    parseCache.set(cacheKey, response.data);
    if (parseCache.size > 100) {
      // Clear cache if too large
      const firstKey = parseCache.keys().next().value;
      parseCache.delete(firstKey);
    }

    return response.data;
  } catch (error) {
    console.warn('⚠️  AI parser failed:', error.message);
    
    // Fallback: Simple regex-based parsing
    return fallbackParse(text);
  }
}

// POST /ai/compare - Compare and score services
export async function callAICompare(services, query) {
  try {
    const response = await axios.post(
      `${AI_ENGINE_URL}/ai/compare`,
      { services, query },
      { timeout: TIMEOUT }
    );

    return response.data;
  } catch (error) {
    console.warn('⚠️  AI compare failed:', error.message);
    
    // Fallback: Simple rating-based sorting
    return fallbackCompare(services);
  }
}

// POST /ai/summary - Summarize reviews
export async function callAISummary(reviews) {
  try {
    const response = await axios.post(
      `${AI_ENGINE_URL}/ai/summary`,
      { reviews },
      { timeout: TIMEOUT }
    );

    return response.data;
  } catch (error) {
    console.warn('⚠️  AI summary failed:', error.message);
    
    // Fallback: Simple count
    return fallbackSummary(reviews);
  }
}

// Fallback parse implementation (deterministic regex-based)
function fallbackParse(text) {
  const result = {
    service_type: null,
    max_price: null,
    location: null,
    confidence: 0.5
  };

  const textLower = text.toLowerCase();

  // Extract service type
  const serviceKeywords = {
    'plumber': ['plumber', 'plumbing', 'pipe', 'leak', 'water'],
    'electrician': ['electrician', 'electric', 'wiring', 'power', 'circuit'],
    'gym': ['gym', 'fitness', 'workout', 'exercise'],
    'tutor': ['tutor', 'teacher', 'teaching', 'lesson', 'study'],
    'ac repair': ['ac', 'air condition', 'cooling', 'hvac'],
    'mechanic': ['mechanic', 'car', 'vehicle', 'auto', 'repair'],
    'cleaning': ['clean', 'cleaning', 'maid', 'housekeeping']
  };

  for (const [category, keywords] of Object.entries(serviceKeywords)) {
    if (keywords.some(kw => textLower.includes(kw))) {
      result.service_type = category.charAt(0).toUpperCase() + category.slice(1);
      break;
    }
  }

  // Extract price
  const pricePatterns = [
    /under ₹?(\d+)/i,
    /below ₹?(\d+)/i,
    /upto ₹?(\d+)/i,
    /up to ₹?(\d+)/i,
    /less than ₹?(\d+)/i,
    /<= ?₹?(\d+)/i,
    /₹?(\d+) or less/i
  ];

  for (const pattern of pricePatterns) {
    const match = text.match(pattern);
    if (match) {
      result.max_price = parseInt(match[1]);
      break;
    }
  }

  // Extract location
  const locationPatterns = [
    /in ([a-zA-Z]+)/i,
    /at ([a-zA-Z]+)/i,
    /near ([a-zA-Z]+)/i
  ];

  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match && match[1] !== 'me') {
      result.location = match[1];
      break;
    }
  }

  if (textLower.includes('near me')) {
    result.location = 'nearby';
  }

  return result;
}

// Fallback compare implementation (simple scoring)
function fallbackCompare(services) {
  const scored = services.map(service => {
    const score = (service.rating || 0) / 5; // Normalize to 0-1
    return {
      ...service.toObject ? service.toObject() : service,
      score
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    services: scored,
    best: scored[0] || null,
    reasoning: 'Sorted by rating (AI engine unavailable - local fallback)'
  };
}

// Fallback summary implementation
function fallbackSummary(reviews) {
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const positiveCount = reviews.filter(r => r.rating >= 4).length;
  const negativeCount = reviews.filter(r => r.rating <= 2).length;

  return {
    summary: `${reviews.length} reviews with ${avgRating.toFixed(1)}/5 average. ${positiveCount} positive, ${negativeCount} negative.`
  };
}
