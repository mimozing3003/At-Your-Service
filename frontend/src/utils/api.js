import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
const AI_BASE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000'

// Main API client
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// AI API client
export const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API methods
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile')
}

export const servicesAPI = {
  getAll: (params) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  search: (query) => api.get(`/services?q=${encodeURIComponent(query)}`),
  getByCategory: (category) => api.get(`/services?category=${category}`)
}

export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings/book', bookingData),
  getUserBookings: () => api.get('/bookings/mine'),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`)
}

export const aiAPI = {
  parseQuery: (text) => aiApi.post('/ai/parse', { text }),
  compareServices: (services) => aiApi.post('/ai/compare', { services }),
  summarizeReviews: (reviews) => aiApi.post('/ai/summary', { reviews })
}

export default api