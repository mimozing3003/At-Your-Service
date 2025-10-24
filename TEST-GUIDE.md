# 🧪 Testing Guide - Video Loading Screen & Service Showcase

## Before You Start

Make sure you have Node.js installed and all dependencies are ready.

---

## Step 1: Install Dependencies (if needed)

```bash
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\frontend
npm install
```

---

## Step 2: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 3: Test the Loading Screen

### First Visit:
1. Open your browser (Chrome recommended)
2. Go to `http://localhost:5173`
3. **You should see:**
   - Full-screen video playing
   - "ServiceAI" text in top-left corner
   - "Skip →" button in bottom-right corner
   - Video plays automatically

### Expected Behavior:
- Video plays for a few seconds
- Smooth fade-out transition
- Main website appears after video ends

### Skip Button Test:
1. Refresh the page (Ctrl+R or Cmd+R)
2. Clear session storage first:
   - Press F12 (open DevTools)
   - Go to "Application" tab
   - Click "Session Storage" → `http://localhost:5173`
   - Right-click "loadingShown" → Delete
   - Close DevTools
3. Refresh page again
4. Click "Skip →" button while video is playing
5. Should immediately fade to main website

### Subsequent Visits Test:
1. After loading screen has shown once
2. Refresh the page normally (Ctrl+R)
3. Loading screen should NOT appear
4. Goes directly to main website

---

## Step 4: Test the Service Showcase

### Navigation:
1. After loading screen completes (or if you skip it)
2. Scroll down the home page
3. Look for "Our Services" section

### What You Should See:
- Heading: "Our Services"
- Subheading: "Professional home services at your doorstep"
- 4 large service cards in a 2x2 grid:
  1. **Health & Wellness** (pink/purple gradient)
  2. **Spa & Massage** (amber/orange gradient)
  3. **Appliance Repair** (gray gradient)
  4. **AC Service & Repair** (blue/cyan gradient)

### Hover Test:
1. Move mouse over each service card
2. Should see:
   - Shadow gets larger
   - Smooth animation
   - Card feels interactive

### Click Test:
1. Click on any service card
2. Should navigate to services page
3. Should filter by that service category

---

## Step 5: Test on Different Screen Sizes

### Desktop View (1920px):
1. Normal browser window
2. Should see 2 cards per row

### Tablet View (768px):
1. Open DevTools (F12)
2. Click device toolbar icon (top-left)
3. Select "iPad" or "Tablet"
4. Should see 2 cards per row (smaller)

### Mobile View (375px):
1. In DevTools device toolbar
2. Select "iPhone" or "Mobile"
3. Should see 1 card per row (stacked)
4. Loading screen should still work

---

## Step 6: Test Video Failure Scenario

### Simulate Video Error:
1. Stop the dev server
2. Rename the video file:
   ```bash
   cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\frontend\public
   move loading-video.mp4 loading-video-backup.mp4
   ```
3. Start dev server again: `npm run dev`
4. Clear session storage (see Step 3)
5. Refresh browser

### Expected Fallback:
- Should see animated loading spinner
- Gradient background (blue to purple)
- "ServiceAI" text
- "Loading your experience..." message
- Automatically proceeds after 2 seconds

### Restore Video:
```bash
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\frontend\public
move loading-video-backup.mp4 loading-video.mp4
```

---

## Step 7: Test Configuration Changes

### Disable Loading Screen:
1. Open `frontend/src/config/loadingScreen.config.js`
2. Change: `enabled: false`
3. Save file
4. Refresh browser
5. Should go directly to website (no loading screen)

### Show Every Time:
1. Change: `enabled: true`
2. Change: `showOnlyOnce: false`
3. Save file
4. Refresh browser multiple times
5. Loading screen should appear every time

### Remove Skip Button:
1. Change: `allowSkip: false`
2. Save file
3. Clear session storage
4. Refresh browser
5. Skip button should not appear
6. Must watch full video

### Hide Watermark:
1. Change: `showBrandWatermark: false`
2. Save file
3. Clear session storage
4. Refresh browser
5. "ServiceAI" text should not appear

---

## Step 8: Test in Different Browsers

### Chrome:
✅ Should work perfectly

### Firefox:
1. Open Firefox
2. Go to `http://localhost:5173`
3. Test all features

### Edge:
1. Open Edge
2. Go to `http://localhost:5173`
3. Test all features

### Safari (Mac only):
1. Open Safari
2. Go to `http://localhost:5173`
3. Test all features

---

## Step 9: Check Console for Errors

1. Press F12 to open DevTools
2. Go to "Console" tab
3. Look for any red error messages
4. Should see no errors
5. May see some info logs (normal)

---

## Step 10: Test Performance

### Check Video Load Time:
1. Open DevTools (F12)
2. Go to "Network" tab
3. Clear (trash icon)
4. Refresh page
5. Find "loading-video.mp4"
6. Check file size and load time
7. Should load in < 2 seconds

### Check Page Load After Video:
1. After video completes
2. Check Network tab
3. Main site should load normally
4. No unusual delays

---

## ✅ Success Checklist

Test completed when you can confirm:

- [ ] Loading screen appears on first visit
- [ ] Video plays automatically (muted)
- [ ] Skip button works correctly
- [ ] Video ends and fades smoothly
- [ ] Loading screen doesn't show on subsequent visits
- [ ] Service showcase section displays correctly
- [ ] 4 service cards are visible with gradients
- [ ] Hover effects work on service cards
- [ ] Clicking cards navigates correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Video fallback works when video fails
- [ ] Configuration changes take effect
- [ ] No console errors
- [ ] Works in different browsers
- [ ] Performance is good (< 2s video load)

---

## 🐛 Common Issues & Fixes

### Issue: Loading screen not showing
**Fix:** 
- Check `enabled: true` in config
- Clear session storage
- Hard refresh (Ctrl+Shift+R)

### Issue: Video not playing
**Fix:**
- Check video file exists in `frontend/public/`
- Verify it's named `loading-video.mp4`
- Try opening `http://localhost:5173/loading-video.mp4` directly

### Issue: Service cards not showing
**Fix:**
- Scroll down the home page
- Check Home.jsx was modified correctly
- Check for console errors

### Issue: Skip button not working
**Fix:**
- Check `allowSkip: true` in config
- Look for JavaScript errors in console

### Issue: Changes not appearing
**Fix:**
- Stop dev server (Ctrl+C)
- Start again: `npm run dev`
- Hard refresh browser (Ctrl+Shift+R)

---

## 📝 Test Results Template

Copy this template and fill in your results:

```
## Test Results - [Date]

### Loading Screen Tests:
- First visit: ✅/❌
- Skip button: ✅/❌
- Auto-complete: ✅/❌
- Subsequent visits: ✅/❌
- Video fallback: ✅/❌

### Service Showcase Tests:
- Cards display: ✅/❌
- Hover effects: ✅/❌
- Click navigation: ✅/❌
- Responsive design: ✅/❌

### Browser Tests:
- Chrome: ✅/❌
- Firefox: ✅/❌
- Edge: ✅/❌
- Safari: ✅/❌

### Configuration Tests:
- Enable/disable: ✅/❌
- Show once/every time: ✅/❌
- Skip button toggle: ✅/❌
- Watermark toggle: ✅/❌

### Performance:
- Video load time: _____ seconds
- Page load after video: _____ seconds
- Console errors: Yes/No

### Notes:
[Add any additional observations or issues]
```

---

## 🎉 Done!

If all tests pass, your loading screen and service showcase are working perfectly! 

You can now:
1. Customize the configuration to your preferences
2. Add real service images (optional)
3. Update branding text
4. Deploy to production

---

**Need Help?** 
- Check `LOADING-SCREEN-SETUP.md` for quick fixes
- Check `CHANGES-SUMMARY.md` for overview
- Check `frontend/LOADING-SCREEN-README.md` for detailed docs
