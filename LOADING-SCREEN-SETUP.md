# 🎬 Loading Screen - Quick Setup Guide

## ✅ What's Been Done

Your video loading screen is now fully integrated into your website! Here's what was added:

### Files Created:
1. ✅ **Video copied** to `frontend/public/loading-video.mp4`
2. ✅ **LoadingScreen component** created at `frontend/src/components/LoadingScreen.jsx`
3. ✅ **Configuration file** created at `frontend/src/config/loadingScreen.config.js`
4. ✅ **App.jsx updated** to show loading screen on first visit

## 🚀 How to Test

### Start the Development Server:
```bash
cd frontend
npm install  # If you haven't already
npm run dev
```

### Open in Browser:
Open `http://localhost:5173` and you should see:
1. Your video playing full-screen
2. "ServiceAI" watermark in top-left
3. "Skip →" button in bottom-right
4. Smooth fade to main website after video ends

### Test Again:
To see the loading screen again:
1. Open browser DevTools (F12)
2. Go to Application/Storage → Session Storage
3. Delete the `loadingShown` entry
4. Refresh the page

## ⚙️ Quick Configuration

Edit `frontend/src/config/loadingScreen.config.js`:

### Show on Every Visit (not just first):
```javascript
showOnlyOnce: false,
```

### Disable Skip Button:
```javascript
allowSkip: false,
```

### Hide ServiceAI Branding:
```javascript
showBrandWatermark: false,
```

### Completely Disable Loading Screen:
```javascript
enabled: false,
```

## 🎯 Key Features

| Feature | Default | Description |
|---------|---------|-------------|
| **Auto-play** | ✅ On | Video starts automatically |
| **Skip button** | ✅ On | Users can skip anytime |
| **Show once** | ✅ On | Only shows on first visit per session |
| **Fallback** | ✅ On | Animated loader if video fails |
| **Max duration** | 10s | Auto-close after 10 seconds |
| **Min duration** | 2s | Shows at least 2 seconds |

## 📱 Works On

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Android)
- ✅ Tablets
- ✅ All screen sizes

## 🎨 Customization

### Use Different Video:
1. Place new video in `frontend/public/`
2. Update config:
```javascript
videoPath: '/your-video.mp4',
```

### Change Brand Text:
Edit `frontend/src/components/LoadingScreen.jsx`:
```javascript
<h1 className="text-2xl font-bold">Your Brand</h1>
<p className="text-sm text-white/70">Your Tagline</p>
```

## 🔧 Troubleshooting

### Video Not Playing?
- Check `frontend/public/loading-video.mp4` exists
- Ensure video is MP4 format
- Try opening video directly: `http://localhost:5173/loading-video.mp4`

### Loading Screen Not Showing?
- Clear session storage and refresh
- Check config has `enabled: true`
- Check browser console for errors

### Video Too Slow?
- Compress video file (aim for < 2MB)
- Use 720p instead of 1080p

## 📋 Next Steps

1. **Test it**: Start dev server and visit the site
2. **Customize**: Edit config file to match your preferences
3. **Brand it**: Update text/colors to match your brand
4. **Deploy**: Works automatically in production build

## 🎉 You're Done!

Your website now has a professional loading screen just like major platforms. Users will see your impressive video when they first visit!

---

**Need help?** Check `frontend/LOADING-SCREEN-README.md` for detailed documentation.
