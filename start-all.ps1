# At Your Service - Complete Local Deployment Script
# This script starts all services (Backend, AI Engine, Frontend)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  At Your Service - Local Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "[1/4] Checking MongoDB..." -ForegroundColor Yellow
try {
    $mongoStatus = Test-NetConnection -ComputerName localhost -Port 27017 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($mongoStatus.TcpTestSucceeded) {
        Write-Host "✓ MongoDB is running" -ForegroundColor Green
    } else {
        Write-Host "⚠ MongoDB is not running on port 27017" -ForegroundColor Yellow
        Write-Host "  Please start MongoDB or use MongoDB Atlas" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ Could not check MongoDB status" -ForegroundColor Yellow
}

Write-Host ""

# Start Backend
Write-Host "[2/4] Starting Backend Server..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host 'Starting Backend on http://localhost:4000' -ForegroundColor Cyan; npm run dev" -PassThru
Write-Host "✓ Backend started (PID: $($backend.Id))" -ForegroundColor Green
Start-Sleep -Seconds 3

Write-Host ""

# Start AI Engine
Write-Host "[3/4] Starting AI Engine..." -ForegroundColor Yellow
$aiEngine = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\ai-engine'; .venv\Scripts\Activate.ps1; Write-Host 'Starting AI Engine on http://localhost:8000' -ForegroundColor Cyan; python app.py" -PassThru
Write-Host "✓ AI Engine started (PID: $($aiEngine.Id))" -ForegroundColor Green
Start-Sleep -Seconds 3

Write-Host ""

# Start Frontend
Write-Host "[4/4] Starting Frontend..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; Write-Host 'Starting Frontend on http://localhost:5173' -ForegroundColor Cyan; npm run dev" -PassThru
Write-Host "✓ Frontend started (PID: $($frontend.Id))" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  All Services Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Services running at:" -ForegroundColor White
Write-Host "  • Frontend:  http://localhost:5173" -ForegroundColor Cyan
Write-Host "  • Backend:   http://localhost:4000" -ForegroundColor Cyan
Write-Host "  • AI Engine: http://localhost:8000" -ForegroundColor Cyan
Write-Host "  • AI Docs:   http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop this script (services will keep running)" -ForegroundColor Yellow
Write-Host "To stop all services, close the terminal windows" -ForegroundColor Yellow
Write-Host ""

# Keep script running
Wait-Process -Id $backend.Id, $aiEngine.Id, $frontend.Id -ErrorAction SilentlyContinue
