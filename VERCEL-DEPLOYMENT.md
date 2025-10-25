# 🚀 Vercel Deployment Guide - At Your Service

## ✅ You're Already Logged In!

Vercel CLI is installed and you're authenticated.

---

## 📋 Deployment Steps

### Option 1: Quick Deploy Frontend Only (Demo Mode)

**Use local backend URLs for testing:**

```powershell
cd frontend
vercel --prod
```

**When prompted:**
- Project name: `at-your-service` (or your choice)
- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Development command: `npm run dev`

**Set environment variables:**
```
VITE_BACKEND_URL=http://localhost:4000
VITE_AI_URL=http://localhost:8000
```

⚠️ **Note:** This will deploy frontend, but it will only work when you run backend locally.

---

### Option 2: Full Production Deployment (Recommended)

For a fully hosted application, you need to deploy all three services:

#### Step 1: Deploy Backend to Render

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repo: `mimozing3003/At-Your-Service`
5. Configure:
   - **Name:** `at-your-service-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

6. Add Environment Variables:
   ```
   MONGODB_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=your-super-secret-key-change-this
   AI_ENGINE_URL=<will-add-after-ai-deployment>
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. **Copy the URL** (e.g., `https://at-your-service-backend.onrender.com`)

#### Step 2: Deploy AI Engine to Render

1. Click "New +" → "Web Service"
2. Same repo: `mimozing3003/At-Your-Service`
3. Configure:
   - **Name:** `at-your-service-ai`
   - **Root Directory:** `ai-engine`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`
   - **Instance Type:** Free

4. Click "Create Web Service"
5. **Copy the URL** (e.g., `https://at-your-service-ai.onrender.com`)

#### Step 3: Update Backend Environment

Go back to your backend service on Render:
- Update `AI_ENGINE_URL` with the AI service URL

#### Step 4: Deploy Frontend to Vercel

```powershell
cd frontend
vercel --prod
```

**Set environment variables in Vercel dashboard:**
1. Go to your project settings on vercel.com
2. Navigate to "Environment Variables"
3. Add:
   ```
   VITE_BACKEND_URL=https://at-your-service-backend.onrender.com
   VITE_AI_URL=https://at-your-service-ai.onrender.com
   ```
4. Redeploy: `vercel --prod`

---

## 🗄️ MongoDB Atlas Setup (Free)

If you don't have MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster (Free M0 tier)
4. Database Access → Add Database User
5. Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0)
6. Connect → Drivers → Copy connection string
7. Replace `<password>` with your database user password
8. Use this as `MONGODB_URI` in Render

---

## ⚡ Quick Commands

### Deploy to Vercel
```powershell
cd frontend
vercel --prod
```

### Redeploy After Changes
```powershell
vercel --prod
```

### Check Deployment Status
```powershell
vercel ls
```

### View Logs
```powershell
vercel logs
```

---

## 🔧 Environment Variables Reference

### Frontend (Vercel)
```env
VITE_BACKEND_URL=https://your-backend.onrender.com
VITE_AI_URL=https://your-ai.onrender.com
```

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key
AI_ENGINE_URL=https://your-ai.onrender.com
NODE_ENV=production
PORT=4000
```

### AI Engine (Render)
```env
PORT=8000
HOST=0.0.0.0
```

---

## 🎯 Deployment Checklist

### Before Deploying:
- [ ] MongoDB Atlas cluster created
- [ ] Database connection string ready
- [ ] GitHub repo is up to date
- [ ] All environment variables documented

### Deploy Order:
1. [ ] Deploy Backend to Render
2. [ ] Deploy AI Engine to Render
3. [ ] Update Backend with AI Engine URL
4. [ ] Deploy Frontend to Vercel with production URLs
5. [ ] Test the live site

### After Deploying:
- [ ] Test registration
- [ ] Test search functionality
- [ ] Test booking flow
- [ ] Test dark mode
- [ ] Check all pages load correctly

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend
**Solution:** Check CORS settings in backend. Add your Vercel domain to allowed origins.

In `backend/src/index.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173']
}));
```

### Render Services Sleep After Inactivity
**Solution:** Free tier sleeps after 15 minutes. First request will be slow (~30s). Consider:
- Using paid tier ($7/month)
- Using cron jobs to keep alive
- Warning users about cold starts

### MongoDB Connection Errors
**Solution:** 
- Check Network Access allows 0.0.0.0/0
- Verify connection string has correct password
- Check Database User exists

---

## 💰 Cost Breakdown

### Free Tier (Current Setup):
- **Vercel:** Free (Hobby plan)
- **Render:** Free (2 services)
- **MongoDB Atlas:** Free (M0 cluster)
- **Total:** $0/month

### Production Tier (Recommended):
- **Vercel:** Free (Hobby plan works)
- **Render:** $7/month per service = $14/month
- **MongoDB Atlas:** $9/month (M10 cluster)
- **Total:** ~$23/month

---

## 🔗 Useful Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Your GitHub Repo:** https://github.com/mimozing3003/At-Your-Service

---

## 🎉 Success!

Once deployed, your app will be live at:
```
https://your-project.vercel.app
```

Share this URL with:
- Hackathon judges
- Friends & colleagues
- On your resume/portfolio
- Social media

---

## 📝 Next Steps After Deployment

1. **Add Custom Domain** (Optional)
   - Buy domain from Namecheap/GoDaddy
   - Add to Vercel project settings

2. **Set up Analytics**
   - Enable Vercel Analytics
   - Add Google Analytics

3. **Monitor Performance**
   - Check Vercel insights
   - Monitor Render logs

4. **Share Your Work**
   - LinkedIn post
   - Twitter announcement
   - Dev.to article

---

**Need help?** Check logs on Vercel/Render dashboards or create GitHub issue.

**Ready to deploy?** Run `vercel --prod` from the frontend directory!
