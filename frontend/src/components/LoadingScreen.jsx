import React, { useState, useEffect, useRef } from 'react'
import loadingScreenConfig from '../config/loadingScreen.config'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [videoEnded, setVideoEnded] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef(null)
  const fallbackTimerRef = useRef(null)

  useEffect(() => {
    // Auto-complete after max duration as fallback
    fallbackTimerRef.current = setTimeout(() => {
      handleComplete()
    }, loadingScreenConfig.maxDuration)

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [])

  const handleVideoEnd = () => {
    setVideoEnded(true)
    handleComplete()
  }

  const handleVideoError = () => {
    console.error('Video failed to load')
    setVideoError(true)
    // Still show loading for a moment then complete
    setTimeout(() => {
      handleComplete()
    }, 2000)
  }

  const handleComplete = () => {
    // Ensure minimum duration has passed
    const currentTime = Date.now()
    const elapsedTime = currentTime - (window.loadingStartTime || currentTime)
    const remainingTime = Math.max(0, loadingScreenConfig.minDuration - elapsedTime)
    
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        onLoadingComplete()
      }, 500) // Wait for fade out animation
    }, remainingTime)
  }

  const handleSkip = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    handleComplete()
  }

  // Set loading start time
  useEffect(() => {
    window.loadingStartTime = Date.now()
  }, [])

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className="w-full h-full object-cover"
          >
            <source src={loadingScreenConfig.videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback when video fails to load
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${loadingScreenConfig.fallbackGradient.from} ${loadingScreenConfig.fallbackGradient.to} px-4`}>
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-white mx-auto mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">At Your Service</h2>
              <p className="text-base sm:text-xl text-blue-100">Loading your experience...</p>
            </div>
          </div>
        )}

        {/* Skip Button - Responsive */}
        {loadingScreenConfig.allowSkip && (
          <button
            onClick={handleSkip}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Skip loading screen"
          >
            <span className="flex items-center gap-2">
              Skip
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        )}

        {/* Brand Watermark - Responsive */}
        {loadingScreenConfig.showBrandWatermark && (
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-white">
            <h1 className="text-xl sm:text-2xl font-bold">At Your Service</h1>
            <p className="text-xs sm:text-sm text-white/70">Home Services Platform</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoadingScreen
