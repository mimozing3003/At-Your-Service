// Geographic utilities: Nominatim geocoding and Overpass POI search
// With fallback to local database when APIs fail or rate-limited

import axios from 'axios';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const USER_AGENT = 'AtYourService/1.0';
const TIMEOUT = 8000;

// Geocode a location name to coordinates
export async function geocodeLocation(locationName) {
  try {
    const response = await axios.get(`${NOMINATIM_URL}/search`, {
      params: {
        q: locationName,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: TIMEOUT
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        displayName: result.display_name
      };
    }

    throw new Error('Location not found');
  } catch (error) {
    console.warn('⚠️  Nominatim geocoding failed:', error.message);
    return null;
  }
}

// Search for POIs using Overpass API
export async function searchOverpass(query) {
  try {
    const { service_type, location } = query;

    if (!service_type || !location) {
      return [];
    }

    // Map service types to OSM tags
    const osmTags = getOSMTags(service_type);
    
    if (!osmTags) {
      return [];
    }

    // First geocode the location
    const coords = await geocodeLocation(location);
    if (!coords) {
      return [];
    }

    // Build Overpass query (search in 5km radius)
    const overpassQuery = `
      [out:json][timeout:5];
      (
        node["${osmTags.key}"="${osmTags.value}"](around:5000,${coords.lat},${coords.lng});
        way["${osmTags.key}"="${osmTags.value}"](around:5000,${coords.lat},${coords.lng});
      );
      out center 10;
    `;

    const response = await axios.post(
      OVERPASS_URL,
      overpassQuery,
      {
        headers: { 'Content-Type': 'text/plain' },
        timeout: TIMEOUT
      }
    );

    const elements = response.data.elements || [];
    
    // Transform Overpass results to our service format
    return elements.map(elem => ({
      name: elem.tags?.name || 'Unnamed Service',
      category: service_type,
      location: {
        coords: {
          lat: elem.lat || elem.center?.lat,
          lng: elem.lon || elem.center?.lon
        }
      },
      address: elem.tags?.['addr:street'] || '',
      phone: elem.tags?.phone || '',
      source: 'overpass'
    }));

  } catch (error) {
    console.warn('⚠️  Overpass search failed:', error.message);
    return [];
  }
}

// Map service categories to OSM tags
function getOSMTags(serviceType) {
  const mapping = {
    'Plumber': { key: 'craft', value: 'plumber' },
    'Electrician': { key: 'craft', value: 'electrician' },
    'Gym': { key: 'leisure', value: 'fitness_centre' },
    'Tutor': { key: 'amenity', value: 'tutoring_centre' },
    'AC Repair': { key: 'shop', value: 'hvac' },
    'Mechanic': { key: 'shop', value: 'car_repair' },
    'Cleaning': { key: 'shop', value: 'cleaning' }
  };

  return mapping[serviceType] || null;
}

// Calculate haversine distance between two coordinates (in km)
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Fallback: Filter services from DB based on rough city match and radius
export function fallbackLocalFilter(services, location, maxDistanceKm = 50) {
  if (!location) {
    return services;
  }

  // Simple city name matching
  return services.filter(service => {
    const cityMatch = service.location?.city?.toLowerCase().includes(location.toLowerCase());
    return cityMatch;
  });
}
