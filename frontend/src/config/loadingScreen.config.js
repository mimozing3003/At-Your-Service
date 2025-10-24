/**
 * Loading Screen Configuration
 * 
 * Customize the behavior of the loading screen here
 */

export const loadingScreenConfig = {
  // Enable or disable the loading screen
  enabled: true,
  
  // Show loading screen only on first visit (true) or every time (false)
  showOnlyOnce: true,
  
  // Maximum duration in milliseconds (fallback if video doesn't end)
  maxDuration: 10000, // 10 seconds
  
  // Minimum duration in milliseconds (even if video ends early)
  minDuration: 2000, // 2 seconds
  
  // Enable skip button
  allowSkip: true,
  
  // Show brand watermark on video
  showBrandWatermark: true,
  
  // Video path (relative to public folder)
  videoPath: '/loading-video.mp4',
  
  // Fallback gradient colors (if video fails to load)
  fallbackGradient: {
    from: 'from-blue-600',
    to: 'to-purple-700'
  }
}

export default loadingScreenConfig
