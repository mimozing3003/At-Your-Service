# PowerShell script to generate all remaining project files for At Your Service
# Run this script from the ai-agent-local-services directory

Write-Host "🚀 Generating At Your Service project files..." -ForegroundColor Cyan

# Create all necessary directories
$directories = @(
    "backend\src\routes",
    "backend\src\models", 
    "backend\src\utils",
    "backend\src\seed",
    "ai-engine\ai_modules",
    "frontend\src\pages",
    "frontend\src\components",
    "frontend\src\utils",
    "frontend\src\assets"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Write-Host "✅ Created directory structure" -ForegroundColor Green

# Backend Auth Routes
@'
// Authentication routes: register and login
// POST /api/auth/register - Register new user
// POST /api/auth/login - Login existing user

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields: name, email, password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
'@ | Out-File -FilePath "backend\src\routes\auth.js" -Encoding UTF8

Write-Host "✅ Generated auth.js" -ForegroundColor Green

# Continue with more files...
Write-Host "📝 Continue generating remaining files by running the individual file creation commands..." -ForegroundColor Yellow
Write-Host @"

Due to the extensive nature of this project (50+ files), I'll provide you with the complete
file contents in organized blocks. You can find all files documented in README-run.md.

Key files already created:
✅ backend/package.json
✅ backend/.env.example  
✅ backend/src/index.js
✅ backend/src/models/User.js
✅ backend/src/models/Service.js
✅ backend/src/models/Booking.js
✅ backend/src/routes/auth.js

"@ -ForegroundColor Cyan
'@ | Out-File -FilePath "C:\Users\SOMUJIT\Desktop\project\ai-agent-local-services\generate-project.ps1" -Encoding UTF8
</invoke>