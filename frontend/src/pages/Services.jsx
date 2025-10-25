import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesAPI, aiAPI } from '../utils/api'
import ServiceCard from '../components/ServiceCard'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [queryParsed, setQueryParsed] = useState(null)
  const [reasoning, setReasoning] = useState('')
  const [error, setError] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const categories = ['Plumber', 'Electrician', 'Cleaning', 'AC Repair', 'Mechanic', 'Tutor', 'Gym']
  const cities = ['Habra', 'Kolkata', 'Howrah']

  // Parse URL params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const query = params.get('q')
    const category = params.get('category')
    const city = params.get('city')

    if (query) {
      setSearchQuery(query)
    }
    if (category) {
      setSelectedCategory(category)
    }
    if (city) {
      setSelectedCity(city)
    }

    // Perform initial search
    performSearch(query, category, city)
  }, [location.search])

  const performSearch = async (query = searchQuery, category = selectedCategory, city = selectedCity) => {
    setLoading(true)
    setError('')

    try {
      let params = {}
      if (query) params.q = query
      if (category) params.category = category
      if (city) params.city = city

      const response = await servicesAPI.getAll(params)
      
      setServices(response.data.services || [])
      setQueryParsed(response.data.queryParsed)
      setReasoning(response.data.reasoning || '')
      
    } catch (error) {
      console.error('Search error:', error)
      setError('Failed to search services. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    // Update URL params
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedCity) params.set('city', selectedCity)
    
    navigate(`/services?${params.toString()}`)
    performSearch()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedCity('')
    navigate('/services')
    performSearch('', '', '')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Services</h1>
          <p className="text-gray-600">
            Discover and book trusted local service providers with AI-powered recommendations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Main Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Services
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'plumber near me under 500' or 'AC repair in Kolkata'"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory || selectedCity) && (
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </form>

          {/* AI Parsing Results */}
          {queryParsed && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">🤖 AI Understanding:</h4>
              <div className="text-sm text-blue-800">
                {queryParsed.service_type && (
                  <span className="inline-block bg-blue-100 px-2 py-1 rounded mr-2 mb-1">
                    Service: {queryParsed.service_type}
                  </span>
                )}
                {queryParsed.max_price && (
                  <span className="inline-block bg-green-100 px-2 py-1 rounded mr-2 mb-1">
                    Max Price: ₹{queryParsed.max_price}
                  </span>
                )}
                {queryParsed.location && (
                  <span className="inline-block bg-purple-100 px-2 py-1 rounded mr-2 mb-1">
                    Location: {queryParsed.location}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {loading ? 'Searching...' : `${services.length} Services Found`}
          </h2>
          
          {reasoning && (
            <div className="text-sm text-gray-600 max-w-md text-right">
              <span className="font-medium">AI Reasoning:</span> {reasoning}
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or browse our categories
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Show All Services
            </button>
          </div>
        )}

        {/* Popular Categories (when no search) */}
        {!searchQuery && !selectedCategory && !loading && (
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category)
                    navigate(`/services?category=${category}`)
                    performSearch('', category, '')
                  }}
                  className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">
                    {category === 'Plumber' && '🔧'}
                    {category === 'Electrician' && '⚡'}
                    {category === 'Cleaning' && '🧹'}
                    {category === 'AC Repair' && '❄️'}
                    {category === 'Mechanic' && '🔧'}
                    {category === 'Tutor' && '📚'}
                    {category === 'Gym' && '💪'}
                  </div>
                  <span className="font-medium text-gray-900">{category}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
