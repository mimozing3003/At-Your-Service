# 🚀 QUICK REFERENCE - Demo Day Cheat Sheet

## ⚡ Start Everything (Copy-Paste Ready)

### Terminal 1 - Backend
```powershell
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\backend
npm run dev
```

### Terminal 2 - AI Engine
```powershell
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\ai-engine
.venv\Scripts\Activate.ps1
python app.py
```

### Terminal 3 - Frontend
```powershell
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\frontend
npm run dev
```

---

## 🧪 Run Tests
```powershell
cd C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services
.\tests.ps1
```

---

## 📋 Demo Script URLs

**Frontend**: http://localhost:5173
**Backend**: http://localhost:4000
**AI Engine**: http://localhost:8000
**AI Docs**: http://localhost:8000/docs

---

## 🎯 Demo Flow (Print This!)

### **0:00-1:00 - Minute 1: AI Search**
- [ ] Show loading video
- [ ] Register: demo@test.com / demo123
- [ ] Search: "plumber near Habra under 500"
- [ ] Show AI parsing (service type, price, location)
- [ ] Show ranked results

### **1:00-2:00 - Minute 2: Explainable AI**
- [ ] Hover service card → show score breakdown
- [ ] Explain formula: 45% rating, 25% price, 20% distance, 10% sentiment
- [ ] Click "Why this?" → show reasoning
- [ ] Compare 2-3 services side-by-side
- [ ] View service details with map

### **2:00-3:00 - Minute 3: Booking & Offline**
- [ ] Create booking (tomorrow's date)
- [ ] View bookings dashboard
- [ ] Stop AI engine (Ctrl+C in Terminal 2)
- [ ] Search again → shows "Offline Mode" banner
- [ ] Try booking → shows "Queued for sync"
- [ ] Restart AI engine
- [ ] Show AI docs: http://localhost:8000/docs

---

## 💬 Key Talking Points

### Opening (5 seconds)
> "This is an AI agent that helps find and book local services using natural language - and it works completely offline!"

### During Search (10 seconds)
> "Watch our deterministic AI parse this natural language query - no GPT, no paid APIs, just regex and smart algorithms."

### During Scoring (10 seconds)
> "Our scoring is 100% transparent: 45% rating, 25% price, 20% distance, 10% sentiment. Every score is explainable."

### During Offline Demo (10 seconds)
> "When the AI engine fails, we fall back to 30 pre-seeded services. The app never breaks - it gracefully degrades."

### Closing (10 seconds)
> "In 3 minutes you've seen natural language AI, explainable scoring, service comparison, booking, and offline capability - all without paid APIs. Built with MERN + Python FastAPI."

---

## 🆘 Emergency Fixes

### If Backend Won't Start
```powershell
# Check if MongoDB is running
Get-Service MongoDB
net start MongoDB

# Check if port 4000 is in use
netstat -ano | findstr :4000

# Restart backend
cd backend
npm run dev
```

### If AI Engine Won't Start
```powershell
# Activate venv
cd ai-engine
.venv\Scripts\Activate.ps1

# Check dependencies
pip list | findstr fastapi

# Restart
python app.py
```

### If Frontend Won't Load
```powershell
# Clear cache
Ctrl+Shift+R in browser

# Clear session storage
F12 → Application → Session Storage → Clear

# Restart
cd frontend
npm run dev
```

### If Loading Screen Doesn't Show
```powershell
# Clear session storage
F12 → Application → Session Storage → Delete "loadingShown"

# Hard refresh
Ctrl+Shift+R
```

### If Tests Fail
```powershell
# Ensure services are running
curl http://localhost:4000/health
curl http://localhost:8000/health

# Run with verbose
.\tests.ps1 -Verbose
```

---

## 🎤 Q&A Responses

**Q: Does this use GPT?**
> "No! 100% free. Rule-based AI with regex parsing and weighted scoring. Optional LLM hooks are commented out behind env flags."

**Q: How does offline work?**
> "30 services pre-seeded in JSON. If APIs fail, we fall back to local data immediately. Bookings queue for sync when online."

**Q: Why explainable AI?**
> "Every score shows exact weights: 45% rating, 25% price, 20% distance, 10% sentiment. Users see the breakdown on demand."

**Q: Production deployment?**
> "Backend → Render, Frontend → Vercel, AI → HuggingFace Space, DB → MongoDB Atlas free tier. All documented."

**Q: Can I add services?**
> "Yes! Provider onboarding form. JWT-protected POST endpoint validates and stores in MongoDB."

**Q: Mobile support?**
> "Yes! Responsive Tailwind design. Loading screen and all pages adapt to mobile."

---

## 🔢 Key Numbers to Remember

- **30** pre-seeded services
- **18** comprehensive tests (13 backend + 5 AI)
- **7** service categories
- **3** cities (Habra, Kolkata, Howrah)
- **80+** customer reviews
- **0** paid APIs required
- **100%** offline capable
- **45-25-20-10** scoring weights

---

## 📊 Test Results (Should All Pass)

```
Total Tests:  18
Passed:       18  ✅
Failed:       0   ✅

ALL TESTS PASSED! ✓
```

---

## 🎨 Color Codes (for presentation)

- **Blue** (#3B82F6): Primary actions, AI elements
- **Green** (#10B981): Success, verified badges
- **Purple** (#8B5CF6): Premium features, CTAs
- **Yellow** (#F59E0B): Warnings, AI insights
- **Red** (#EF4444): Errors, critical info

---

## 📱 Demo Device Setup

### Browser Tabs (Arrange Left to Right)
1. **Frontend** (main demo)
2. **AI Engine Docs** (backup)
3. **This Cheat Sheet**

### Terminal Windows (Arrange Bottom)
1. **Backend** (left)
2. **AI Engine** (center)
3. **Frontend** (right)

### Screen Layout
```
┌─────────────────────────────────────┐
│  Browser: Tabs 1, 2, 3              │
│  ┌──────────┬──────────┬──────────┐ │
│  │ Frontend │ AI Docs  │ Cheat    │ │
│  └──────────┴──────────┴──────────┘ │
└─────────────────────────────────────┘
┌─────────┬────────────┬────────────┐
│ Backend │ AI Engine  │ Frontend   │
│ 4000    │ 8000       │ 5173       │
└─────────┴────────────┴────────────┘
```

---

## ⏱️ Timing Checkpoints

- **0:30** - User registered
- **1:00** - Search results shown
- **1:30** - Comparison demonstrated
- **2:00** - Booking created
- **2:30** - Offline mode shown
- **3:00** - Demo complete

---

## 🎯 Success Criteria

✅ Loading screen plays
✅ User can register/login
✅ Search returns results
✅ AI parsing visible
✅ Score breakdown shown
✅ Comparison works
✅ Booking succeeds
✅ Offline mode demonstrated
✅ No crashes or errors
✅ Under 3 minutes

---

## 💾 Backup Plan

If live demo fails:
1. Show test results (.\tests.ps1)
2. Walk through code structure
3. Show AI Engine docs (interactive)
4. Show seeded data (services.seed.json)
5. Explain architecture diagram

---

## 🏆 Winning Factors

1. **Zero Paid APIs** - Completely free
2. **Offline-First** - Works without internet
3. **Explainable AI** - Transparent scoring
4. **18 Tests** - Quality assured
5. **Professional UX** - Loading screen + animations
6. **Production-Ready** - Auth + validation + error handling
7. **Full Documentation** - 8 guides + demo script
8. **Real Innovation** - Deterministic AI, not just API wrapper

---

## 📞 Last-Minute Checklist

5 minutes before demo:
- [ ] All services running
- [ ] Tests passing
- [ ] Session storage cleared
- [ ] Video loads correctly
- [ ] This cheat sheet open
- [ ] Water nearby
- [ ] Deep breath 😊

---

**Remember**: You built something impressive. Show it with confidence! 🚀

**Good luck!** 🎉
