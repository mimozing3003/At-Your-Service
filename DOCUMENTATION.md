# 📚 At Your Service - Complete Documentation

**AI-Powered Local Services Platform - Everything You Need in One Place**

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Project Overview](#-project-overview)
3. [Features](#-features)
4. [Tech Stack](#-tech-stack)
5. [Installation](#-installation)
6. [Usage Guide](#-usage-guide)
7. [Deployment](#-deployment)
8. [Testing](#-testing)
9. [API Reference](#-api-reference)
10. [Troubleshooting](#-troubleshooting)
11. [Contributing](#-contributing)

---

## 🚀 Quick Start

### One-Command Deployment (Windows)
```powershell
.\start.ps1
```

### Manual Start (3 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
node seed.js
npm start
```

**Terminal 2 - AI Engine:**
```bash
cd ai-engine
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows
# source .venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python app.py
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Access Points
- **Frontend:** http://localhost:5173 ⭐
- **Backend API:** http://localhost:4000
- **AI Engine:** http://localhost:8000
- **AI Docs:** http://localhost:8000/docs

### Live Demo
🌐 **[View on Vercel](https://frontend-ltfexr51s-saumojit-roys-projects.vercel.app)**

---

## 🌟 Project Overview

**At Your Service** is an intelligent, AI-powered platform that revolutionizes how users find and book local service providers. Unlike traditional directories, our AI Agent truly understands user intent and delivers personalized, trust-driven recommendations with full transparency.

### The Problem We Solve
- ⏰ Users waste hours searching for reliable local services
- 🔍 Traditional apps require manual navigation and filtering
- 🤔 No transparency in why services are recommended
- 💸 Hard to find services within budget

### Our Solution
An AI Agent that:
- 🤖 Understands natural language queries
- 📊 Scores services using multi-factor algorithm
- 💡 Explains WHY each service is recommended
- 🌙 Provides beautiful UI with dark mode
- 🌐 Works offline with local fallback data
- 💰 Uses 100% free APIs

---

## ✨ Features

### AI-Powered Intelligence
✅ **Natural Language Processing**
- Parse queries like "find plumber near me under ₹500 in Habra"
- Extract service type, price, location, date automatically

✅ **Intent Recognition**
- Regex + keyword matching
- Confidence scoring for each field

✅ **Smart Scoring Algorithm**
Weighted formula: `score = 0.45*rating + 0.25*price + 0.20*distance + 0.10*sentiment`
- 45% Rating Score
- 25% Price Score
- 20% Distance Score
- 10% Sentiment Score

✅ **Explainable Recommendations**
- Shows reasoning for each result
- "Selected because of high rating (4.8★), affordable price (₹400), close distance (1.2km)"

✅ **Review Summarization**
- AI-generated summaries from all reviews
- Identifies positive/negative themes

✅ **Offline Capability**
- Works without internet using local data
- 30+ pre-seeded services

### User Experience
✅ **Dark Mode Toggle** 🌙
- Smooth transitions
- Saved preference
- All pages supported

✅ **Responsive Design**
- Mobile (< 640px) - Stacked layout
- Tablet (640-1024px) - Optimized spacing
- Desktop (> 1024px) - Full features

✅ **Interactive Maps**
- Leaflet.js integration
- Service locations displayed
- Distance calculations

✅ **Real-time Search**
- Instant results
- Filter by category/city
- AI-powered ranking

✅ **Smooth Animations**
- Framer Motion
- Loading screens
- Page transitions

### System Features
✅ **Microservices Architecture**
- Backend: Node.js + Express
- AI Engine: Python + FastAPI
- Frontend: React + Vite

✅ **JWT Authentication**
- Secure user management
- Protected routes
- Session persistence

✅ **Production-Ready**
- Error handling
- Input validation
- Logging system

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Leaflet** - Interactive maps
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### AI Engine
- **Python 3.9+** - Language
- **FastAPI** - API framework
- **NumPy** - Computations
- **Custom Algorithms** - Intent parsing, scoring

### APIs & Services
- **OpenStreetMap** - Maps (free)
- **Nominatim** - Geocoding (free)
- **Overpass API** - POI search (free)

---

## 📥 Installation

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/mimozing3003/At-Your-Service.git
cd At-Your-Service
```

### Step 2: Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
node seed.js  # Seeds database with 38 services
npm start
```

### Step 3: AI Engine Setup
```bash
cd ai-engine
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
python app.py
```

### Step 4: Frontend Setup
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

---

## 📖 Usage Guide

### For Users

#### 1. Search for Services
**Try natural language:**
```
teacher in Kolkata ₹600/hr
beauty salon in Asansol under 500
yoga instructor in Siliguri
plumber in Habra under 500
```

#### 2. View AI Reasoning
- See parsed query (service, price, location)
- View score breakdown for each result
- Read "Why this?" explanations

#### 3. Book a Service
1. Click service card
2. View details, reviews, map
3. Click "Book Now"
4. Select date, add notes
5. Confirm booking

#### 4. Toggle Dark Mode
- Click sun/moon icon in navbar
- Theme persists across sessions

### For Developers

#### API Endpoints

**Backend (http://localhost:4000/api)**
```bash
# Auth
POST /auth/register - Register new user
POST /auth/login - Login user

# Services
GET /services?q=query - Search services
GET /services/:id - Get service details

# Bookings
POST /bookings/book - Create booking (auth required)
GET /bookings/mine - Get user bookings (auth required)
PATCH /bookings/:id/cancel - Cancel booking
```

**AI Engine (http://localhost:8000)**
```bash
# AI Operations
POST /ai/parse - Parse natural language query
POST /ai/compare - Compare services with scoring
POST /ai/summary - Summarize reviews
```

#### Environment Variables

**Backend (.env)**
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/at-your-service
JWT_SECRET=your-secret-key
AI_ENGINE_URL=http://localhost:8000
NODE_ENV=development
```

**AI Engine (.env)**
```env
PORT=8000
HOST=0.0.0.0
```

**Frontend (.env.local)**
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

---

## 🚀 Deployment

### Option 1: Local Demo (Current)
Already set up! Just run `.\start.ps1`

### Option 2: Full Production Deployment

#### Step 1: Deploy Backend to Render
1. Go to https://render.com
2. New Web Service → Connect GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables (MongoDB URI, JWT_SECRET, etc.)

#### Step 2: Deploy AI Engine to Render
1. New Web Service
2. Settings:
   - **Root Directory:** `ai-engine`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`

#### Step 3: MongoDB Atlas (Free)
1. Create cluster at https://cloud.mongodb.com
2. Add database user
3. Allow access from anywhere (0.0.0.0/0)
4. Get connection string
5. Use in Render environment variables

#### Step 4: Deploy Frontend to Vercel
```bash
cd frontend
vercel --prod
```
Set environment variables with Render URLs.

### Current Deployment
- **Frontend:** https://frontend-ltfexr51s-saumojit-roys-projects.vercel.app
- **Backend & AI:** Run locally (or deploy to Render)

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication ✅**
- [ ] Register new account
- [ ] Login with credentials
- [ ] Logout
- [ ] Protected routes work

**Search & AI ✅**
- [ ] Natural language search
- [ ] View AI parsing results
- [ ] See scored results
- [ ] Read AI reasoning

**Service Details ✅**
- [ ] Click service card
- [ ] View full details
- [ ] Read reviews
- [ ] See location on map

**Booking ✅**
- [ ] Click "Book Now"
- [ ] Select date
- [ ] Add notes
- [ ] Confirm booking
- [ ] View in "My Bookings"

**Dark Mode ✅**
- [ ] Toggle dark mode
- [ ] Check all pages
- [ ] Verify persistence

**Mobile Responsive ✅**
- [ ] Test on smartphone
- [ ] Test on tablet
- [ ] Video loads correctly
- [ ] All buttons accessible

### Test Commands
```bash
# Backend tests
cd backend
npm test

# AI Engine tests
cd ai-engine
python -m pytest

# Frontend tests
cd frontend
npm test
```

---

## 📡 API Reference

### Backend API

#### Authentication

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure123"
}
```

#### Services

**Search Services**
```bash
GET /api/services?q=plumber+in+Habra+under+500
GET /api/services?category=Plumber&city=Kolkata
```

**Get Service by ID**
```bash
GET /api/services/:id
```

#### Bookings

**Create Booking**
```bash
POST /api/bookings/book
Authorization: Bearer <token>
Content-Type: application/json

{
  "serviceId": "...",
  "date": "2025-10-30",
  "notes": "Morning preferred"
}
```

### AI Engine API

**Parse Query**
```bash
POST /ai/parse
Content-Type: application/json

{
  "text": "find plumber near me under 500 in Habra"
}

Response:
{
  "service_type": "Plumber",
  "max_price": 500,
  "location": "Habra",
  "confidence": 0.92
}
```

**Compare Services**
```bash
POST /ai/compare
Content-Type: application/json

{
  "services": [...],
  "user_preferences": {...}
}
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Solution:
1. Ensure MongoDB is running: mongod
2. Check MONGODB_URI in .env
3. Or use MongoDB Atlas (free)
```

**Port Already in Use**
```
Solution:
1. Change PORT in .env
2. Or kill process: npx kill-port 4000
```

### AI Engine Issues

**Module Not Found**
```
Solution:
1. Activate venv: .venv\Scripts\Activate.ps1
2. Install: pip install -r requirements.txt
```

**Port 8000 in Use**
```
Solution:
Change PORT in .env to 8001
Update VITE_AI_URL in frontend
```

### Frontend Issues

**npm install fails**
```
Solution:
1. Delete node_modules and package-lock.json
2. npm cache clean --force
3. npm install
```

**API Connection Failed**
```
Solution:
1. Check backend/AI engine are running
2. Verify VITE_BACKEND_URL in .env.local
3. Check CORS settings in backend
```

### Mobile Issues

**Video Not Fitting**
```
✅ FIXED: Now uses object-contain
Refresh browser cache on mobile
```

**Text Too Small**
```
✅ FIXED: Responsive text sizing
Pinch to zoom if needed
```

---

## 📊 Database

### Collections

**Users**
- name, email, password (hashed), role, createdAt

**Services**
- category, name, description, rating, price, price_unit
- location (city, address, coords)
- phone, providerId, verifiedProvider, reviews

**Bookings**
- userId, serviceId, date, notes, status, createdAt

### Seed Data (38 Services)

**By Category:**
- Plumber: 6
- Tutor: 7
- Electrician: 5
- Gym: 4
- Cleaning: 4
- AC Repair: 4
- Mechanic: 4
- Beauty: 2
- Yoga: 2

**By Location:**
- Kolkata: 16
- Habra: 8
- Howrah: 6
- Siliguri: 2
- Durgapur: 2
- Asansol: 2
- Bardhaman: 1
- Midnapore: 1

---

## 🎯 Demo Script (3 Minutes)

### Minute 1: AI Search
1. Open http://localhost:5173
2. Search: "teacher in Kolkata ₹600/hr"
3. Show AI parsing results
4. Show scored & ranked results

### Minute 2: Features
1. Toggle dark mode
2. Click top service
3. Show "Why this?" reasoning
4. Show review summary
5. Show location on map

### Minute 3: Booking
1. Click "Book Now"
2. Fill booking form
3. Confirm
4. Mention: "38 services, 8 cities, offline-capable, free APIs"

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 👤 Author

**Saumojit Roy**
- GitHub: [@mimozing3003](https://github.com/mimozing3003)
- Project: [At Your Service](https://github.com/mimozing3003/At-Your-Service)

---

## 🔗 Quick Links

- **Live Demo:** https://frontend-ltfexr51s-saumojit-roys-projects.vercel.app
- **GitHub:** https://github.com/mimozing3003/At-Your-Service
- **Local:** http://localhost:5173

---

## ⭐ Star This Project!

If you find this useful, please give it a star on GitHub! ⭐

---

**Built with ❤️ for the AI Agent Hackathon** 🚀

*Last Updated: October 25, 2025*
