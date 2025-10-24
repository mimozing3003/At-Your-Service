import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import loadingScreenConfig from './config/loadingScreen.config'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Booking from './pages/Booking'
import UserDashboard from './pages/UserDashboard'
import ProviderDashboard from './pages/ProviderDashboard'
import { AuthProvider, useAuth } from './utils/auth'

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth = true, redirectTo = "/login" }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  }
  
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} replace />
  }
  
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        
        {/* Auth Routes (redirect if logged in) */}
        <Route path="/login" element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/register" element={
          <ProtectedRoute requireAuth={false}>
            <Register />
          </ProtectedRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/booking/:serviceId" element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/provider" element={
          <ProtectedRoute>
            <ProviderDashboard />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasShownLoading, setHasShownLoading] = useState(false)

  useEffect(() => {
    // If loading screen is disabled, skip it
    if (!loadingScreenConfig.enabled) {
      setIsLoading(false)
      setHasShownLoading(true)
      return
    }

    // Check if loading screen has been shown before (only if showOnlyOnce is true)
    if (loadingScreenConfig.showOnlyOnce) {
      const loadingShown = sessionStorage.getItem('loadingShown')
      if (loadingShown) {
        setIsLoading(false)
        setHasShownLoading(true)
      }
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setHasShownLoading(true)
    
    // Only set session storage if showOnlyOnce is enabled
    if (loadingScreenConfig.showOnlyOnce) {
      sessionStorage.setItem('loadingShown', 'true')
    }
  }

  return (
    <>
      {isLoading && !hasShownLoading && (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      )}
      
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
