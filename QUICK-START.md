# 🚀 Quick Start Guide - At Your Service

## One-Click Deployment

### Option 1: Automated Start (Recommended)
```powershell
.\start-all.ps1
```
This automatically starts:
- ✅ Backend (http://localhost:4000)
- ✅ AI Engine (http://localhost:8000)
- ✅ Frontend (http://localhost:5173)

### Option 2: Manual Start (3 terminals)

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - AI Engine:**
```powershell
cd ai-engine
.venv\Scripts\Activate.ps1
python app.py
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm run dev
```

---

## 🎯 3-Minute Demo

### 1. Open Application
Visit: http://localhost:5173

### 2. Register/Login
- Click "Register" → Create account
- Or use test: `test@example.com` / `test123`

### 3. AI-Powered Search
Try these queries:
```
find plumber near me under 500 in Habra
electrician in Kolkata affordable
AC repair service under 1000
```

### 4. View AI Reasoning
- See **AI Understanding** badge showing parsed query
- View **Score Breakdown** for each service
- Read **Why this?** explanations

### 5. Book Service
- Click service → "Book Now"
- Select date → Confirm booking
- View in "My Bookings"

---

## 🔥 Key Features to Demo

### ✅ AI Intent Parsing
Query: "find plumber near me under 500 in Habra"
→ AI extracts: service, price, location

### ✅ Smart Scoring
Each service scored on:
- Rating (45%)
- Price (25%)
- Distance (20%)
- Sentiment (10%)

### ✅ Explainable AI
Every recommendation shows reasoning:
"Selected because of high rating (4.8★), affordable price (₹400), and close distance (1.2 km)"

### ✅ Offline Mode
If APIs fail → Falls back to local seed data (30 services)

### ✅ Real-time Features
- Natural language search
- Review summarization
- Interactive maps
- Booking management

---

## 🐛 Troubleshooting

### Backend won't start
```powershell
# Check MongoDB
mongod
# Or update .env to use MongoDB Atlas
```

### AI Engine errors
```powershell
cd ai-engine
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Frontend issues
```powershell
cd frontend
npm install
npm run dev
```

---

## 📊 Available Services

**Database includes 30+ services:**
- 🔧 Plumbers (5)
- ⚡ Electricians (4)
- 🧹 Cleaning (4)
- ❄️ AC Repair (4)
- 🚗 Mechanics (4)
- 📚 Tutors (5)
- 💪 Gyms (4)

**Locations:** Habra, Kolkata, Howrah

---

## 🎓 Demo Talking Points

1. **AI-Powered** - Not just keyword search, understands intent
2. **Explainable** - Shows why each recommendation
3. **Offline-First** - Works without internet
4. **Production-Ready** - Error handling, auth, booking system
5. **Free APIs** - No paid services required
6. **Real-World** - Solves actual user problem

---

## 📞 Quick Commands

**Test Backend:**
```powershell
curl http://localhost:4000/health
```

**Test AI Engine:**
```powershell
curl http://localhost:8000/health
```

**Search Services:**
```powershell
curl "http://localhost:4000/api/services?q=plumber+in+Habra"
```

---

## ⚡ Performance Tips

- First load: ~3 seconds (loading screen)
- Search: < 1 second
- AI parsing: ~200ms
- Booking: Instant

---

**Ready to impress judges? Run `.\start-all.ps1` now!** 🚀
