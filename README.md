# At Your Service 🔧

**AI Agent for Local Services** - Search, compare, and book local service providers using AI-powered comparison.

> **Status:** Backend & AI Engine Complete ✅ | Frontend Templates Provided 📝

---

## 🚀 Quick Start

```powershell
# 1. Start Backend
cd backend
copy .env.example .env
npm install
node seed.js
npm run dev

# 2. Start AI Engine (new terminal)
cd ai-engine
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# 3. Test it!
curl http://localhost:4000/health
curl http://localhost:8000/health
```

**Backend:** http://localhost:4000  
**AI Engine:** http://localhost:8000  
**AI Docs:** http://localhost:8000/docs

---

## 📚 Documentation

### Getting Started
- **[README-run.md](README-run.md)** - Complete setup guide with all commands
- **[MONGODB-SETUP.md](MONGODB-SETUP.md)** - Database setup (3 options: Local, Atlas, Docker)
- **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** - Demo day cheat sheet

### Project Info
- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - What's been created and project stats
- **[COMPLETION-SUMMARY.md](COMPLETION-SUMMARY.md)** - Latest additions and features

### Demo & Testing
- **[DEMO.txt](DEMO.txt)** - 3-minute judge-ready demo script ⭐
- **[tests.sh](tests.sh)** - Comprehensive test suite (Bash) ⭐
- **[tests.ps1](tests.ps1)** - Comprehensive test suite (PowerShell) ⭐
- **[TEST-GUIDE.md](TEST-GUIDE.md)** - Complete testing instructions

### Specialized Docs
- **[ai-engine/README.md](ai-engine/README.md)** - AI engine documentation
- **[LOADING-SCREEN-SETUP.md](LOADING-SCREEN-SETUP.md)** - Loading screen guide
- **[frontend/LOADING-SCREEN-README.md](frontend/LOADING-SCREEN-README.md)** - Detailed loading docs

---

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 🔍 **Natural Language Search** - "find plumber near me under 500 in Habra"
- 🤖 **AI-Powered Comparison** - Weighted scoring (rating, price, distance, sentiment)
- 📊 **Explainable AI** - Shows why each service is recommended
- 📝 **Review Summarization** - Automatic review analysis
- 📅 **Booking System** - Create and manage bookings
- 🌐 **Offline-First** - Works without internet (with local fallback)
- 💰 **100% Free** - No paid APIs required!

---

## 🏗️ Tech Stack

- **Backend:** Node.js + Express + MongoDB
- **AI Engine:** Python + FastAPI
- **Frontend:** React + Vite + Tailwind (templates provided)
- **Maps:** OpenStreetMap + Leaflet
- **Geo:** Nominatim + Overpass API

---

## 📊 What's Included

### ✅ Backend (Complete)
- JWT authentication
- Service search with AI integration
- Booking management
- Provider management
- **30 pre-seeded services** across 7 categories
- Geographic search
- Offline fallback logic

### ✅ AI Engine (Complete)
- Intent parsing (regex + keywords)
- Service comparison (weighted scoring)
- Review summarization (heuristic analysis)
- **100% deterministic** - no external LLMs
- FastAPI with interactive docs

### 📝 Frontend (Templates Provided)
See `README-run.md` for complete frontend setup with code templates

---

## 🧪 Test the APIs

### Backend
```powershell
# Search services
curl "http://localhost:4000/api/services?q=plumber+in+Habra+under+500"

# Register user
curl -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\": \"Test\", \"email\": \"test@test.com\", \"password\": \"test123\"}'
```

### AI Engine
```powershell
# Parse natural language
curl -X POST http://localhost:8000/ai/parse `
  -H "Content-Type: application/json" `
  -d '{\"text\": \"find plumber near me under 500 in Habra\"}'
```

Or visit **http://localhost:8000/docs** for interactive API testing!

---

## 📦 Database

**30 realistic service providers** pre-seeded:
- Plumbers (6)
- Electricians (5)
- Gyms (4)
- Tutors (5)
- AC Repair (4)
- Mechanics (3)
- Cleaning Services (3)

**Locations:** Habra, Kolkata, Howrah  
**Reviews:** 80+ customer reviews with realistic comments

---

## 🔑 Key Highlights

✅ **No Paid APIs** - Completely free to run  
✅ **Offline-Capable** - Works without internet  
✅ **Explainable AI** - Shows scoring breakdown  
✅ **Production-Ready** - Complete error handling  
✅ **Well-Documented** - Comprehensive guides  
✅ **Realistic Data** - Hand-crafted service entries  

---

## 📂 Project Structure

```
ai-agent-local-services/
├── backend/          # Node.js + Express (✅ Complete)
├── ai-engine/        # Python + FastAPI (✅ Complete)
├── frontend/         # React + Vite (📝 Templates)
└── docs/             # Complete documentation
```

---

## 🚧 Next Steps

1. **Test Backend & AI Engine** (5 mins)
   - Follow Quick Start above
   - Test APIs with curl commands

2. **Create Frontend** (2-4 hours)
   - Follow templates in `README-run.md`
   - Connect to backend APIs

3. **Demo** (3 mins)
   - Register user
   - Search services
   - View details
   - Create booking

---

## 🤝 Support

- **Setup Issues?** Check [README-run.md](README-run.md) Troubleshooting section
- **API Questions?** Visit http://localhost:8000/docs
- **Project Info?** Read [PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)

---

## 📄 License

MIT License - Free for personal and commercial use

---

## 🎓 Learning Outcomes

This project teaches:
- MERN stack development
- Python FastAPI
- JWT authentication
- Natural language processing (without LLMs)
- Deterministic AI algorithms
- Offline-first architecture
- Geographic APIs integration

---

**Built for the AI Agent Hackathon** 🏆

Ready to get started? Run the Quick Start commands above!
