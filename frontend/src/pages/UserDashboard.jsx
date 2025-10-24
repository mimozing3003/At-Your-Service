import React from 'react'
import { useAuth } from '../utils/auth'

const UserDashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Manage your bookings and account</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">My Bookings</h3>
            <p className="text-gray-600">View and manage your service bookings</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Bookings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Book New Service</h3>
            <p className="text-gray-600">Find and book new services</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Browse Services
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-gray-600">Update your profile and preferences</p>
            <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard