# 🏆 At Your Service - AI-Powered Local Services Platform

> **AI Agent for discovering, comparing, and booking local service providers with explainable recommendations**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-43853d.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9+-blue.svg)](https://python.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://frontend-9u93btqu7-saumojit-roys-projects.vercel.app)

## 🚀 Live Demo

**🌐 [View Live on Vercel](https://frontend-9u93btqu7-saumojit-roys-projects.vercel.app)**

*Note: Frontend is deployed. For full functionality, backend & AI engine need to be hosted (see [Deployment Guide](VERCEL-DEPLOYMENT.md)).*

---

## 🌟 What is At Your Service?

An intelligent, AI-powered platform that revolutionizes how users find and book local service providers. Unlike traditional directories, our AI Agent **truly understands** user intent and delivers personalized, trust-driven recommendations with full transparency.

### ✨ Key Highlights

- 🤖 **AI-Powered Search**: Natural language understanding
- 💡 **Explainable AI**: See why each service is recommended
- 🌙 **Dark Mode**: Beautiful UI with theme toggle
- 📊 **Smart Scoring**: Multi-factor algorithm (rating, price, distance, sentiment)
- 🌐 **Offline-First**: Works without internet
- 💰 **100% Free**: No paid APIs

---

## 🚀 Quick Start

### One-Command Deployment (Windows)
```powershell
.\start.ps1
```

### Manual Start
```bash
# 1. Backend
cd backend
npm install && node seed.js && npm start

# 2. AI Engine (new terminal)
cd ai-engine
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt && python app.py

# 3. Frontend (new terminal)
cd frontend
npm install && npm run dev
```

### Access
- **Frontend**: http://localhost:5173 ⭐
- **Backend**: http://localhost:4000
- **AI Engine**: http://localhost:8000

---

## 📊 What's Inside

### Database
- **38 Services** across **8 West Bengal cities**
- **9 Categories**: Plumber, Electrician, Tutor, Gym, Beauty, Yoga, AC Repair, Mechanic, Cleaning
- **Multiple Pricing**: Hourly (₹600/hr), Session (₹400/session), Fixed, Monthly

### Cities
Kolkata • Habra • Howrah • Siliguri • Durgapur • Asansol • Bardhaman • Midnapore

---

## 🎯 Try These Searches

```
teacher in Kolkata ₹600/hr
beauty salon in Asansol under 500
yoga instructor in Siliguri
plumber in Habra under 500
```

---

## 🏗️ Tech Stack

**Frontend:** React 18 • Vite • Tailwind CSS • Framer Motion • Leaflet  
**Backend:** Node.js • Express • MongoDB • JWT  
**AI Engine:** Python • FastAPI • NumPy • Custom Algorithms  
**APIs:** OpenStreetMap • Nominatim • Overpass (all free!)

---

## 🎨 Features

### AI Intelligence
✅ Natural language processing  
✅ Intent parsing (service, price, location)  
✅ Smart multi-factor scoring  
✅ Explainable recommendations  
✅ Review summarization  
✅ Offline capability  

### User Experience
✅ **Dark mode toggle** 🌙  
✅ Smooth animations  
✅ Responsive design  
✅ Interactive maps  
✅ Real-time search  

### System
✅ Microservices architecture  
✅ JWT authentication  
✅ REST API  
✅ Production-ready code  
✅ Complete error handling  

---

## 📚 Documentation

- [QUICK-START.md](QUICK-START.md) - Quick reference
- [PREVIEW.md](PREVIEW.md) - Feature showcase
- [DEPLOYMENT-COMPLETE.md](DEPLOYMENT-COMPLETE.md) - Full guide

---

## 🎓 Demo Script (3 Minutes)

**Minute 1**: Search "teacher in Kolkata ₹600/hr" → Show AI parsing  
**Minute 2**: Toggle dark mode → View service details → See AI reasoning  
**Minute 3**: Book service → Highlight: 38 services, 8 cities, offline-capable  

---

## 🏆 Why This Wins

1. **Real AI** - Not just keyword search, actual intelligent reasoning
2. **Explainable** - Shows WHY services are recommended
3. **Modern UX** - Dark mode, animations, responsive
4. **Production-Ready** - Error handling, auth, validation
5. **Free Stack** - No paid APIs or subscriptions
6. **Regional Focus** - West Bengal cities (local relevance)

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB

### Environment Variables
```env
# Backend
MONGODB_URI=mongodb://localhost:27017/at-your-service
JWT_SECRET=your-secret-key

# Frontend
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

## 👤 Author

**Saumojit Roy** - [@mimozing3003](https://github.com/mimozing3003)

---

## ⭐ Star This Repo!

If you find this project useful, please give it a star! ⭐

---

**Built with ❤️ for the AI Agent Hackathon** 🚀
