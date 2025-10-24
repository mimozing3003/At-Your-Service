# 🚀 Complete Setup Guide - Get Everything Working

This guide will help you get the entire project running locally with zero errors.

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- [ ] **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- [ ] **MongoDB** (Community Edition or Atlas) - See [MONGODB-SETUP.md](MONGODB-SETUP.md)
- [ ] **Git** - [Download](https://git-scm.com/)
- [ ] **Code Editor** (VS Code recommended)

### Verify Installations

```powershell
# Check Node.js
node --version  # Should show v18+ or v20+

# Check Python
python --version  # Should show 3.9+

# Check MongoDB
mongosh --version  # Or check MongoDB Compass

# Check Git
git --version
```

---

## 📦 Step 1: Install All Dependencies

### Backend Dependencies
```powershell
cd backend
npm install
```

**Expected packages:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- axios

### Frontend Dependencies
```powershell
cd frontend
npm install
```

**Expected packages:**
- react, react-dom, react-router-dom
- vite
- tailwindcss
- axios
- leaflet, react-leaflet

### AI Engine Dependencies
```powershell
cd ai-engine
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Expected packages:**
- fastapi
- uvicorn
- pydantic
- python-dotenv

---

## ⚙️ Step 2: Configure Environment Variables

### Backend Configuration

Create `backend/.env`:
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ai-local-services

# JWT Secret (change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=4000

# AI Engine URL
AI_ENGINE_URL=http://localhost:8000

# Node Environment
NODE_ENV=development
```

### Frontend Configuration

Create `frontend/.env.local`:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

### AI Engine Configuration

Create `ai-engine/.env`:
```env
PORT=8000
USE_OPENAI=false
USE_HF=false
```

---

## 🗄️ Step 3: Setup Database

### Option A: Local MongoDB

```powershell
# Start MongoDB service
net start MongoDB

# Verify it's running
Get-Service MongoDB
```

### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `backend/.env` with Atlas URI

### Seed the Database

```powershell
cd backend
node seed.js
```

**Expected output:**
```
✓ Connected to MongoDB
✓ Cleared existing data
✓ 30 services seeded successfully!
✓ Database ready
```

---

## 🚀 Step 4: Start All Services

Open **3 separate terminal windows**:

### Terminal 1: Backend
```powershell
cd backend
npm run dev
```

**Expected output:**
```
Server running on port 4000
✓ Connected to MongoDB successfully
```

**Verify:** http://localhost:4000/health should return `{"status":"ok"}`

### Terminal 2: AI Engine
```powershell
cd ai-engine
.venv\Scripts\Activate.ps1
python app.py
```

**Expected output:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Verify:** http://localhost:8000/health should return `{"status":"ok"}`

### Terminal 3: Frontend
```powershell
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v5.0.8  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Verify:** http://localhost:5173 should show loading screen then home page

---

## 🧪 Step 5: Run Tests

### PowerShell Tests
```powershell
.\tests.ps1
```

### Bash Tests (Git Bash)
```bash
bash tests.sh
```

**Expected output:**
```
Total Tests:  18
Passed:       18
Failed:       0

╔════════════════════════════════════════════════╗
║          ALL TESTS PASSED! ✓                   ║
╚════════════════════════════════════════════════╝
```

---

## 🎯 Step 6: Verify Everything Works

### 1. Test Backend API
```powershell
# Health check
curl http://localhost:4000/health

# Get services
curl http://localhost:4000/api/services

# Should return JSON with 30 services
```

### 2. Test AI Engine
```powershell
# Visit interactive docs
Start-Process "http://localhost:8000/docs"

# Test parsing endpoint
curl -X POST http://localhost:8000/ai/parse `
  -H "Content-Type: application/json" `
  -d '{"text": "find plumber in Habra under 500"}'
```

### 3. Test Frontend

Open browser to http://localhost:5173

**Checklist:**
- [ ] Loading screen video plays
- [ ] Home page loads with search bar
- [ ] Service showcase cards visible
- [ ] Click "Register" → form appears
- [ ] Register test user → redirects to dashboard
- [ ] Search: "plumber near Habra" → results appear
- [ ] Click service → details page with map
- [ ] Click "Book Now" → booking form
- [ ] Submit booking → success message

---

## 🐛 Common Issues & Fixes

### Issue 1: MongoDB Connection Failed

**Error:** `MongooseError: connect ECONNREFUSED`

**Fix:**
```powershell
# Check if MongoDB is running
Get-Service MongoDB

# If not running, start it
net start MongoDB

# If service doesn't exist, reinstall MongoDB or use Atlas
```

### Issue 2: Port Already in Use

**Error:** `EADDRINUSE: address already in use :::4000`

**Fix:**
```powershell
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F

# Or use different port in backend/.env
PORT=4001
```

### Issue 3: Python Virtual Environment Issues

**Error:** `cannot be loaded because running scripts is disabled`

**Fix:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate venv again
.venv\Scripts\Activate.ps1
```

### Issue 4: Frontend Module Not Found

**Error:** `Cannot find module 'react'`

**Fix:**
```powershell
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Loading Screen Doesn't Show

**Fix:**
```powershell
# Clear browser cache and session storage
# In browser: F12 → Application → Clear Storage → Clear
# Then hard refresh: Ctrl+Shift+R
```

### Issue 6: CORS Error in Browser

**Error:** `Access-Control-Allow-Origin error`

**Fix:**
Ensure backend `src/index.js` has:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue 7: AI Engine Not Found

**Error:** `Failed to fetch AI Engine`

**Fix:**
Backend will fallback to local processing. Check:
```powershell
# Is AI engine running?
curl http://localhost:8000/health

# Check backend .env
AI_ENGINE_URL=http://localhost:8000
```

---

## 🔧 Performance Optimization

### 1. Backend Optimization

```javascript
// backend/src/index.js
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000,
});
```

### 2. Frontend Build Optimization

```powershell
cd frontend
npm run build

# Preview production build
npm run preview
```

### 3. AI Engine Caching

The AI engine already caches parsed queries for faster responses.

---

## 📱 Responsive Design Check

Test on different screen sizes:

1. **Desktop**: 1920x1080 (default)
2. **Tablet**: Open DevTools (F12) → Device Toolbar → iPad
3. **Mobile**: Device Toolbar → iPhone 12 Pro

All pages should adapt correctly.

---

## 🚀 Production Deployment

### Backend → Render

1. Push to GitHub
2. Create Render Web Service
3. Connect GitHub repo
4. Build Command: `cd backend && npm install`
5. Start Command: `cd backend && npm start`
6. Environment Variables: Add all from `.env`

### AI Engine → Render

1. Create Render Web Service
2. Build Command: `cd ai-engine && pip install -r requirements.txt`
3. Start Command: `cd ai-engine && python app.py`
4. Environment Variables: Add all from `.env`

### Frontend → Vercel

```powershell
cd frontend
npm install -g vercel
vercel
```

Follow prompts, set environment variables in Vercel dashboard.

### Database → MongoDB Atlas

Already covered in MONGODB-SETUP.md

---

## ✅ Final Verification Checklist

Before considering setup complete:

- [ ] Backend starts without errors
- [ ] AI Engine starts without errors
- [ ] Frontend starts without errors
- [ ] MongoDB connection successful
- [ ] 30 services seeded
- [ ] All 18 tests pass
- [ ] Can register user
- [ ] Can search services
- [ ] Can view service details
- [ ] Can create booking
- [ ] Loading screen works
- [ ] Service showcase displays
- [ ] Map shows on service page
- [ ] Offline mode works (stop AI engine, search still works)
- [ ] Responsive on mobile/tablet

---

## 🎉 Success!

If all checkboxes are marked, your project is:
✅ Fully functional
✅ Error-free
✅ Responsive
✅ Scalable
✅ Production-ready

**Next Steps:**
1. Practice the demo using [DEMO.txt](DEMO.txt)
2. Read [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for shortcuts
3. Push to GitHub (see commands below)
4. Deploy to production (optional)

---

## 🌐 Push to GitHub

```powershell
# Add all files
git add .

# Commit
git commit -m "Complete AI Agent for Local Services - Hackathon Ready"

# Add remote (if not already added)
git remote add origin https://github.com/mimozing3003/At-Your-Service.git

# Push to GitHub
git push -u origin main
```

---

## 📞 Support

If you encounter issues not covered here:

1. Check error logs in terminal
2. Read [README-run.md](README-run.md)
3. Check [MONGODB-SETUP.md](MONGODB-SETUP.md)
4. Review [TEST-GUIDE.md](TEST-GUIDE.md)
5. Check GitHub Issues

---

**You're all set! Good luck with your demo! 🚀**
