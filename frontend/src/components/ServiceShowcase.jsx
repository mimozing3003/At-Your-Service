import React from 'react'
import { Link } from 'react-router-dom'

const ServiceShowcase = () => {
  const showcaseServices = [
    {
      id: 'health',
      title: 'Health & Wellness',
      description: 'Expert consultation and care',
      category: 'health',
      gradient: 'from-pink-100 to-purple-100',
      icon: '👩‍⚕️',
      // When you add images, uncomment and use:
      // image: '/src/assets/images/health-consultation.jpg'
    },
    {
      id: 'spa',
      title: 'Spa & Massage',
      description: 'Relax and rejuvenate',
      category: 'spa',
      gradient: 'from-amber-100 to-orange-100',
      icon: '💆‍♂️',
      // image: '/src/assets/images/spa-massage.jpg'
    },
    {
      id: 'appliance',
      title: 'Appliance Repair',
      description: 'Quick fixes for all appliances',
      category: 'appliance',
      gradient: 'from-gray-100 to-gray-200',
      icon: '🔧',
      // image: '/src/assets/images/appliance-repair.jpg'
    },
    {
      id: 'ac',
      title: 'AC Service & Repair',
      description: 'Installation, repair & maintenance',
      category: 'ac-repair',
      gradient: 'from-blue-100 to-cyan-100',
      icon: '❄️',
      // image: '/src/assets/images/ac-service.jpg'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 text-lg">
          Professional home services at your doorstep
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showcaseServices.map((service) => (
          <Link
            key={service.id}
            to={`/services?category=${service.category}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="aspect-[4/3] relative">
              {service.image ? (
                // When image is available
                <>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/90">{service.description}</p>
                  </div>
                </>
              ) : (
                // Placeholder with gradient and emoji
                <div className={`w-full h-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ServiceShowcase
