# At Your Service - Complete Setup Guide

**AI Agent for Local Services** - Search, compare, and book local service providers using AI-powered comparison.

## 🎯 Project Status

### ✅ COMPLETED (Ready to Use)
- **Backend** (Node.js + Express + MongoDB)
  - ✅ All models (User, Service, Booking)
  - ✅ All routes (auth, services, bookings, providers)
  - ✅ AI client with fallback logic
  - ✅ Geo utilities (Nominatim/Overpass)
  - ✅ 30 realistic service entries in seed data
  - ✅ Database seed script

- **AI Engine** (Python + FastAPI)
  - ✅ Intent parsing (regex + keywords)
  - ✅ Service comparison (deterministic scoring)
  - ✅ Review summarization (heuristic analysis)
  - ✅ NO paid APIs required!

### 📝 TO CREATE (Frontend)
Frontend files need to be created. See "Frontend Setup" section below for complete code.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- MongoDB (local or Atlas)

### 1. Backend Setup

```powershell
cd backend

# Copy environment file
copy .env.example .env

# Edit .env and set your MongoDB URI (or use default local)
# MONGODB_URI=mongodb://localhost:27017/at-your-service

# Install dependencies
npm install

# Seed database with 30 services
node seed.js

# Start backend server
npm run dev
```

Backend will run on **http://localhost:4000**

###2. AI Engine Setup

```powershell
cd ai-engine

# Create virtual environment
python -m venv .venv

# Activate virtual environment
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Start AI engine
python app.py
```

AI engine will run on **http://localhost:8000**
API docs available at **http://localhost:8000/docs**

### 3. Frontend Setup

The frontend needs to be created. Here are the essential files:

#### Create `frontend/package.json`:
```json
{
  "name": "at-your-service-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "axios": "^1.6.2",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

#### Create `frontend/.env.example`:
```
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

#### Create `frontend/vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
```

#### Create `frontend/tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### Create `frontend/postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### Create `frontend/index.html`:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>At Your Service - Local Services AI</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### Install frontend and run:
```powershell
cd frontend

# Copy env file
copy .env.example .env.local

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend will run on **http://localhost:5173**

---

## 📊 Project Structure

```
ai-agent-local-services/
├── backend/                    # Node.js + Express backend
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── models/            # Mongoose schemas
│   │   ├── utils/             # Helper functions
│   │   └── seed/              # Seed data (30 services)
│   └── seed.js                # Database seeding script
│
├── ai-engine/                  # Python + FastAPI AI service
│   ├── ai_modules/
│   │   ├── parse_intent.py    # NL query parser
│   │   ├── compare_engine.py  # Service scoring
│   │   └── summary.py         # Review summarization
│   └── app.py                 # FastAPI main app
│
└── frontend/                   # React + Vite + Tailwind
    ├── src/
    │   ├── pages/             # Page components
    │   ├── components/        # Reusable components
    │   └── utils/             # API client, auth
    └── index.html
```

---

## 🧪 Testing the API

### Test Backend Health
```powershell
curl http://localhost:4000/health
```

### Test AI Engine
```powershell
curl -X POST http://localhost:8000/ai/parse `
  -H "Content-Type: application/json" `
  -d '{\"text\": \"find plumber near me under 500 in Habra\"}'
```

### Register a User
```powershell
curl -X POST http://localhost:4000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"name\": \"Test User\", \"email\": \"test@example.com\", \"password\": \"test123\"}'
```

### Search Services
```powershell
curl "http://localhost:4000/api/services?q=plumber+in+Habra+under+500"
```

### Get Service by ID (replace with actual ID from search)
```powershell
curl http://localhost:4000/api/services/[SERVICE_ID]
```

---

## 🎯 3-Minute Demo Script

1. **Register/Login** (30s)
   - Open http://localhost:5173
   - Create account or login
   - You'll be redirected to dashboard

2. **Search Services** (60s)
   - Try: "find plumber near me under 500 in Habra"
   - See AI-parsed query and scored results
   - Notice the "Why this?" reasoning for top result

3. **View Service Details** (30s)
   - Click on top result (AquaFix Plumbing)
   - See reviews, rating, location on map
   - Read AI-generated review summary

4. **Book Service** (30s)
   - Click "Book Now"
   - Select date and add notes
   - Booking is created and stored

5. **View Bookings** (30s)
   - Go to "My Bookings"
   - See your booking with service details
   - Can cancel if needed

---

## 🔑 Key Features Implemented

### ✅ Authentication & Authorization
- JWT-based auth
- User registration and login
- Protected routes for bookings

### ✅ AI-Powered Search
- Natural language query parsing
- Extracts: service type, price limit, location
- Works offline with deterministic fallback

### ✅ Service Comparison
- Weighted scoring algorithm:
  - 45% rating
  - 25% price
  - 20% distance
  - 10% review sentiment
- Explainable AI - shows score breakdown

### ✅ Review Summarization
- Heuristic analysis of reviews
- Identifies positive/negative themes
- No external LLM needed

### ✅ Booking Management
- Create bookings with date/notes
- View all your bookings
- Cancel bookings

### ✅ Offline-First Architecture
- Graceful degradation when APIs fail
- Local seed data fallback (30 services)
- Works without internet (except for Nominatim/Overpass)

### ✅ Free APIs Only
- OpenStreetMap for maps
- Nominatim for geocoding (free, rate-limited)
- Overpass for POI search (free, rate-limited)
- MongoDB (local or free Atlas tier)

---

## 📦 Database Seed Data

The database includes **30 realistic service providers** across:
- **Plumber** (6 services)
- **Electrician** (5 services)
- **Gym** (4 services)
- **Tutor** (5 services)
- **AC Repair** (4 services)
- **Mechanic** (3 services)
- **Cleaning** (3 services)

Locations: **Habra, Kolkata, Howrah**

---

## 🔧 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
Error: MongoNetworkError: failed to connect
```
**Solution:** 
- Ensure MongoDB is running: `mongod` or use MongoDB Atlas
- Check MONGODB_URI in `.env`

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::4000
```
**Solution:**
- Change PORT in `.env` or kill process using port 4000

### AI Engine Issues

**Module Not Found:**
```
ModuleNotFoundError: No module named 'fastapi'
```
**Solution:**
- Activate virtual environment: `.venv\Scripts\Activate.ps1`
- Install dependencies: `pip install -r requirements.txt`

**Port 8000 in Use:**
**Solution:**
- Change PORT in `.env` to 8001
- Update VITE_AI_URL in frontend `.env`

### Frontend Issues

**npm install fails:**
**Solution:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Vite build errors:**
**Solution:**
- Check Node.js version (need 18+)
- Clear cache: `npm cache clean --force`

---

## 🚢 Deployment (Optional)

### Backend → Render
1. Create new Web Service on Render
2. Connect GitHub repo
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Add environment variables

### AI Engine → Render
1. Create new Web Service
2. Build command: `cd ai-engine && pip install -r requirements.txt`
3. Start command: `cd ai-engine && python app.py`

### Frontend → Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `cd frontend && vercel`
3. Set environment variables in Vercel dashboard

### Database → MongoDB Atlas
1. Create free cluster at mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGODB_URI in backend `.env`

---

## 📝 Environment Variables Summary

### Backend (.env)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/at-your-service
JWT_SECRET=your-super-secret-jwt-key-change-this
AI_ENGINE_URL=http://localhost:8000
USE_NOMINATIM=true
USE_OVERPASS=true
```

### AI Engine (.env)
```
PORT=8000
HOST=0.0.0.0
```

### Frontend (.env.local)
```
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

---

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Services
- `GET /api/services?q=query` - Search services (NL or filters)
- `GET /api/services/:id` - Get service details
- `POST /api/services` - Create service (provider only)

### Bookings
- `POST /api/bookings/book` - Create booking (auth required)
- `GET /api/bookings/mine` - Get user's bookings (auth required)
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Providers
- `GET /api/providers/services` - Get provider's services
- `PUT /api/providers/services/:id` - Update service
- `DELETE /api/providers/services/:id` - Delete service

### AI Engine
- `POST /ai/parse` - Parse NL query
- `POST /ai/compare` - Compare services
- `POST /ai/summary` - Summarize reviews

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet Maps](https://leafletjs.com/)

---

## 📄 License

MIT License - Free to use for learning and projects

---

## 🤝 Support

For issues or questions:
1. Check Troubleshooting section above
2. Review AI engine README in `ai-engine/README.md`
3. Test individual AI modules:
   ```bash
   python ai_modules/parse_intent.py
   python ai_modules/compare_engine.py
   python ai_modules/summary.py
   ```

---

## ✨ Features Highlight

**🔍 Smart Search** - Natural language understanding  
**🤖 AI Comparison** - Weighted scoring algorithm  
**📊 Explainable** - Shows why each service is recommended  
**🌐 Offline-First** - Works without internet  
**💰 Free APIs** - No paid services required  
**🔐 Secure** - JWT authentication  
**📱 Responsive** - Works on all devices  
**🚀 Fast** - Optimized performance  

---

**Built with ❤️ for the AI Agent Hackathon**
