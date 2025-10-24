import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { servicesAPI } from '../utils/api'
import { useAuth } from '../utils/auth'

const ServiceDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reviewSummary, setReviewSummary] = useState('')

  useEffect(() => {
    fetchServiceDetail()
  }, [id])

  const fetchServiceDetail = async () => {
    try {
      const response = await servicesAPI.getById(id)
      setService(response.data)
      setReviewSummary(response.data.reviewSummary || '')
    } catch (error) {
      console.error('Error fetching service:', error)
      setError('Failed to load service details')
    } finally {
      setLoading(false)
    }
  }

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
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>)
    }

    return stars
  }

  const handleBookNow = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate(`/booking/${service._id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-4">{error || 'The service you are looking for does not exist.'}</p>
          <Link to="/services" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Browse Services
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li><Link to="/services" className="text-blue-600 hover:text-blue-800">Services</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">{service.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                      {getCategoryIcon(service.category)} {service.category}
                    </span>
                    {service.verifiedProvider && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        ✓ Verified Provider
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(service.rating)}
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {service.rating.toFixed(1)}
                      </span>
                      {service.reviews && service.reviews.length > 0 && (
                        <span className="text-sm text-gray-500">({service.reviews.length} reviews)</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(service.price, service.price_unit)}
                  </div>
                  <div className="text-sm text-gray-500">Starting price</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Service</h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-gray-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">{service.location?.city}</div>
                  <div className="text-gray-600">{service.location?.address}</div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {service.reviews && service.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Reviews ({service.reviews.length})
                </h2>
                
                {/* AI Review Summary */}
                {reviewSummary && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">🤖 AI Review Summary</h3>
                    <p className="text-blue-800 text-sm">{reviewSummary}</p>
                  </div>
                )}

                {/* Individual Reviews */}
                <div className="space-y-4">
                  {service.reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{review.user}</span>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500 ml-1">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>

                {service.reviews.length > 3 && (
                  <div className="text-center mt-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View all {service.reviews.length} reviews
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Book This Service</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(service.price, service.price_unit)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      {renderStars(service.rating)}
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {service.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">📞 {service.phone}</span>
                  </div>
                </div>

                <button
                  onClick={handleBookNow}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium mt-6"
                >
                  {user ? 'Book Now' : 'Login to Book'}
                </button>

                <div className="flex space-x-2 mt-3">
                  <Link
                    to={`tel:${service.phone}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Call Now
                  </Link>
                  <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    Message
                  </button>
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Provider</h3>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                    {service.name.charAt(0)}
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{service.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{service.category} Service</p>
                  {service.verifiedProvider && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified Provider
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
