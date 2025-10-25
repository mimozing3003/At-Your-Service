import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesAPI, aiAPI } from '../utils/api'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const navigate = useNavigate()

  const serviceCategories = [
    {
      id: 'plumber',
      name: 'Plumber',
      icon: '🔧',
      description: 'Pipe repair, leak fixing, installation',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'electrician',
      name: 'Electrician',
      icon: '⚡',
      description: 'Wiring, repair, installation',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'cleaning',
      name: 'Cleaning',
      icon: '🧹',
      description: 'Home cleaning, deep cleaning',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'ac-repair',
      name: 'AC Repair',
      icon: '❄️',
      description: 'AC service, repair, installation',
      color: 'bg-cyan-100 text-cyan-600'
    },
    {
      id: 'mechanic',
      name: 'Mechanic',
      icon: '🔧',
      description: 'Car service, bike repair',
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'tutor',
      name: 'Tutor',
      icon: '📚',
      description: 'Home tuition, online classes',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'gym',
      name: 'Gym',
      icon: '💪',
      description: 'Fitness training, workout',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      // Use AI to parse the query first, then search
      const aiResponse = await aiAPI.parseQuery(searchQuery)
      console.log('AI parsed query:', aiResponse.data)
      
      // Navigate to services page with search query
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`)
    } catch (error) {
      console.error('Search error:', error)
      // Fallback to direct search
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Home services at your doorstep
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-blue-100 px-2">
              Book trusted professionals for home services with AI-powered recommendations
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-2">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex flex-col sm:flex-row rounded-lg shadow-lg bg-white overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search: 'plumber near me under 500'..."
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 text-gray-900 text-base sm:text-lg focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-blue-600 hover:bg-blue-700 px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold disabled:opacity-50 transition-colors w-full sm:w-auto"
                  >
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white mx-auto"></div>
                    ) : (
                      'Search'
                    )}
                  </button>
                </div>
              </form>

              {/* AI Badge */}
              <div className="mt-4 flex items-center justify-center text-blue-100">
                <span className="bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                  🤖 AI-Powered Smart Search
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Showcase with Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Professional home services at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Consultation Service */}
          <Link to="/services?category=health" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">👩‍⚕️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Health & Wellness</h3>
                <p className="text-gray-600">Expert consultation and care</p>
              </div>
            </div>
          </Link>

          {/* Spa & Massage */}
          <Link to="/services?category=spa" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">💆‍♂️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Spa & Massage</h3>
                <p className="text-gray-600">Relax and rejuvenate</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appliance Repair */}
          <Link to="/services?category=appliance" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Appliance Repair</h3>
                <p className="text-gray-600">Quick fixes for all appliances</p>
              </div>
            </div>
          </Link>

          {/* AC Service */}
          <Link to="/services?category=ac-repair" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">❄️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">AC Service & Repair</h3>
                <p className="text-gray-600">Installation, repair & maintenance</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Service Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Services
          </h2>
          <p className="text-gray-600 text-lg">
            Choose from our wide range of professional services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category) => (
            <Link
              key={category.id}
              to={`/services?category=${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group-hover:-translate-y-1">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ServiceAI?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Matching
              </h3>
              <p className="text-gray-600">
                Our AI understands your needs and matches you with the perfect service provider
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Professionals
              </h3>
              <p className="text-gray-600">
                All service providers are background verified and highly rated
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Compare prices and get the best deals with transparent pricing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to book your service?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of satisfied customers who trust us
          </p>
          <Link
            to="/services"
            className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home