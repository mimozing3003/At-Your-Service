# MongoDB Setup Instructions

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Sign up at MongoDB Atlas:**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create free account
   - Click "Create a New Cluster"

2. **Create Free Cluster:**
   - Choose AWS/Google Cloud/Azure (any region)
   - Select M0 Sandbox (FREE)
   - Cluster name: "Cluster0" (default)
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `atlasuser`
   - Password: Generate secure password (save it!)
   - Database User Privileges: "Read and write to any database"

4. **Whitelist IP Address:**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For development only!

5. **Get Connection String:**
   - Go to "Clusters" 
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://atlasuser:<password>@cluster0.xxxxx.mongodb.net/at-your-service?retryWrites=true&w=majority
   ```

6. **Update backend/.env:**
   Replace this line:
   ```
   MONGODB_URI=mongodb://localhost:27017/at-your-service
   ```
   With your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://atlasuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/at-your-service?retryWrites=true&w=majority
   ```

## Option 2: Local MongoDB Community Edition

1. **Download MongoDB:**
   - Go to: https://www.mongodb.com/try/download/community
   - Choose Windows x64
   - Download MSI installer

2. **Install MongoDB:**
   - Run the downloaded .msi file
   - Choose "Complete" installation
   - Check "Install MongoDB as a Service"
   - Check "Run service as Network Service user"
   - Install MongoDB Compass (optional GUI)

3. **Verify Installation:**
   ```powershell
   mongo --version
   ```

4. **Start MongoDB (if not auto-started):**
   ```powershell
   net start MongoDB
   ```

5. **Keep default settings in backend/.env:**
   ```
   MONGODB_URI=mongodb://localhost:27017/at-your-service
   ```

## After Setting Up MongoDB:

1. **Seed the Database:**
   ```powershell
   cd backend
   node seed.js
   ```

2. **Start Backend:**
   ```powershell
   cd backend
   npm run dev
   ```

3. **Access your app:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:4000
   - AI Engine: http://localhost:8000

## Troubleshooting:

**Connection Error:**
- Check if MongoDB service is running
- Verify connection string format
- Check username/password for Atlas
- Ensure IP whitelist includes your address

**Atlas Issues:**
- Make sure cluster is not paused
- Verify database user has correct permissions
- Check network access settings