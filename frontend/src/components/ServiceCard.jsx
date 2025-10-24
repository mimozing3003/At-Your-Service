import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/auth'

const ServiceCard = ({ service }) => {
  const { user } = useAuth()

  const getCategoryIcon = (category) => {
    const icons = {
      'Plumber': '🔧',
      'Electrician': '⚡',
      'Cleaning': '🧹',
      'AC Repair': '❄️',
      'Mechanic': '🔧',
      'Tutor': '📚',
      'Gym': '💪'
    }
    return icons[category] || '🔧'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Plumber': 'bg-blue-100 text-blue-600',
      'Electrician': 'bg-yellow-100 text-yellow-600',
      'Cleaning': 'bg-green-100 text-green-600',
      'AC Repair': 'bg-cyan-100 text-cyan-600',
      'Mechanic': 'bg-red-100 text-red-600',
      'Tutor': 'bg-purple-100 text-purple-600',
      'Gym': 'bg-orange-100 text-orange-600'
    }
    return colors[category] || 'bg-gray-100 text-gray-600'
  }

  const formatPrice = (price, priceUnit) => {
    const formatMap = {
      'fixed': `₹${price}`,
      'per-hour': `₹${price}/hr`,
      'per-day': `₹${price}/day`,
      'per-month': `₹${price}/month`
    }
    return formatMap[priceUnit] || `₹${price}`
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      )
    }

    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
              {getCategoryIcon(service.category)} {service.category}
            </span>
            {service.verifiedProvider && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Verified
              </span>
            )}
          </div>
          {service.aiScore && (
            <div className="text-right">
              <div className="text-sm font-medium text-blue-600">
                AI Score: {service.aiScore}%
              </div>
              {service.aiReason && (
                <div className="text-xs text-gray-500 max-w-32 text-right">
                  {service.aiReason}
                </div>
              )}
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {service.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center">
            {renderStars(service.rating)}
          </div>
          <span className="text-sm font-medium text-gray-900">
            {service.rating.toFixed(1)}
          </span>
          {service.reviews && service.reviews.length > 0 && (
            <span className="text-sm text-gray-500">
              ({service.reviews.length} reviews)
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center space-x-1 mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-600">
            {service.location?.city}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(service.price, service.price_unit)}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            📞 {service.phone}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/service/${service._id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </Link>
          
          {user && (
            <Link
              to={`/booking/${service._id}`}
              className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Book Now
            </Link>
          )}
        </div>

        {!user && (
          <p className="text-xs text-gray-500 text-center mt-2">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link> to book services
          </p>
        )}
      </div>
    </div>
  )
}

export default ServiceCard