# Loading Screen Feature

## Overview
A professional video-based loading screen that displays when users first visit your website, similar to what you see on modern web applications.

## Features
✅ **Video Loading Screen** - Plays your custom video on first visit
✅ **Skip Button** - Users can skip the video at any time
✅ **Auto-complete** - Automatically proceeds after video ends
✅ **Fallback Support** - Shows animated loader if video fails
✅ **Session Persistence** - Shows only once per session (configurable)
✅ **Fully Configurable** - Easy customization via config file
✅ **Brand Watermark** - Optional branding overlay
✅ **Responsive Design** - Works on all screen sizes

## Files Added/Modified

### New Files:
1. `frontend/public/loading-video.mp4` - Your loading video
2. `frontend/src/components/LoadingScreen.jsx` - Main component
3. `frontend/src/config/loadingScreen.config.js` - Configuration

### Modified Files:
1. `frontend/src/App.jsx` - Integrated loading screen

## Configuration

Edit `frontend/src/config/loadingScreen.config.js` to customize:

```javascript
export const loadingScreenConfig = {
  enabled: true,              // Enable/disable loading screen
  showOnlyOnce: true,         // Show only on first visit per session
  maxDuration: 10000,         // Max duration (10 seconds)
  minDuration: 2000,          // Min duration (2 seconds)
  allowSkip: true,            // Show skip button
  showBrandWatermark: true,   // Show ServiceAI branding
  videoPath: '/loading-video.mp4',  // Video file path
  fallbackGradient: {
    from: 'from-blue-600',
    to: 'to-purple-700'
  }
}
```

## Usage

### To Enable/Disable:
Set `enabled: false` in config file to disable the loading screen entirely.

### To Show Every Time:
Set `showOnlyOnce: false` to show loading screen on every page load.

### To Remove Skip Button:
Set `allowSkip: false` to force users to watch the entire video.

### To Change Video:
1. Replace `frontend/public/loading-video.mp4` with your video
2. Or update `videoPath` in config to point to new location

### To Remove Branding:
Set `showBrandWatermark: false` to hide the ServiceAI watermark.

## How It Works

1. **First Visit**: When user opens the website, loading screen appears
2. **Video Plays**: Your video plays automatically (muted)
3. **Skip Option**: User can click "Skip" button anytime
4. **Auto-complete**: After video ends, smoothly fades to main site
5. **Session Storage**: Stores flag so it doesn't show again in same session
6. **Fallback**: If video fails to load, shows animated loader

## Video Requirements

- **Format**: MP4 (H.264 codec recommended)
- **Duration**: 3-10 seconds recommended
- **File Size**: Keep under 5MB for fast loading
- **Resolution**: 1920x1080 or 1280x720
- **Orientation**: Landscape preferred
- **Audio**: Will be muted automatically

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers

## Testing

### Test in Development:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` - loading screen should appear.

### Test Skip Functionality:
Clear session storage in browser DevTools to see loading screen again:
```javascript
sessionStorage.clear()
```

### Test Different Behaviors:
1. **First visit**: Clear session storage and refresh
2. **Subsequent visits**: Just refresh (should skip loading screen)
3. **Video error**: Rename video file to test fallback loader

## Customization Examples

### Example 1: Show on Every Page Load
```javascript
{
  enabled: true,
  showOnlyOnce: false,  // Changed
}
```

### Example 2: Longer Minimum Display
```javascript
{
  minDuration: 5000,  // Show at least 5 seconds
}
```

### Example 3: No Skip, No Watermark
```javascript
{
  allowSkip: false,
  showBrandWatermark: false,
}
```

### Example 4: Different Video
```javascript
{
  videoPath: '/intro-video.mp4',  // Use different video
}
```

## Troubleshooting

### Video Not Playing:
1. Check video file exists in `frontend/public/`
2. Verify video format is MP4
3. Check browser console for errors
4. Try different video file

### Loading Screen Not Showing:
1. Check `enabled: true` in config
2. Clear session storage and refresh
3. Check if already shown (showOnlyOnce setting)

### Video Loads Slowly:
1. Compress video file (target < 2MB)
2. Use lower resolution (720p instead of 1080p)
3. Increase `maxDuration` to give more time

### Skip Button Not Working:
1. Check `allowSkip: true` in config
2. Verify no JavaScript errors in console

## Advanced: Multiple Videos

To rotate between different videos, modify LoadingScreen.jsx:

```javascript
const videos = [
  '/loading-video-1.mp4',
  '/loading-video-2.mp4',
  '/loading-video-3.mp4'
]

const randomVideo = videos[Math.floor(Math.random() * videos.length)]
```

## Performance Tips

1. **Optimize video**: Use online tools to compress
2. **Preload**: Video is in public folder for instant access
3. **Lazy load**: Main app loads while video plays
4. **Cache**: Video will be cached by browser after first load

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are in correct locations
3. Test with config `enabled: false` to isolate issues
4. Check video file is valid MP4 format

---

**Note**: The loading screen only shows in production builds and development server. It may not appear if you open the HTML file directly.
