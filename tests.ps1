# =============================================================================
# AI AGENT FOR LOCAL SERVICES - COMPREHENSIVE TEST SUITE (PowerShell)
# =============================================================================
# 
# This script tests all API endpoints using Invoke-RestMethod
# Run this after starting backend (port 4000) and AI engine (port 8000)
#
# Usage: .\tests.ps1
#
# =============================================================================

$ErrorActionPreference = "Continue"

# Test counters
$PASSED = 0
$FAILED = 0
$TOTAL = 0

# Backend and AI Engine URLs
$BACKEND_URL = "http://localhost:4000"
$AI_URL = "http://localhost:8000"

# Test output functions
function Test-Start {
    param($TestName)
    $script:TOTAL++
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Blue
    Write-Host "TEST $($script:TOTAL): $TestName" -ForegroundColor Yellow
    Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Blue
}

function Test-Pass {
    $script:PASSED++
    Write-Host "✓ PASSED" -ForegroundColor Green
}

function Test-Fail {
    param($Message)
    $script:FAILED++
    Write-Host "✗ FAILED: $Message" -ForegroundColor Red
}

# Header
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║     AI AGENT FOR LOCAL SERVICES - TEST SUITE          ║" -ForegroundColor Blue
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""
Write-Host "Checking if services are running..." -ForegroundColor Cyan

# Check backend
try {
    $null = Invoke-RestMethod -Uri "$BACKEND_URL/health" -Method Get -TimeoutSec 5
    Write-Host "✓ Backend running" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend not running at $BACKEND_URL" -ForegroundColor Red
    Write-Host "Please start backend: cd backend; npm run dev"
    exit 1
}

# Check AI engine
$AI_AVAILABLE = $true
try {
    $null = Invoke-RestMethod -Uri "$AI_URL/health" -Method Get -TimeoutSec 5
    Write-Host "✓ AI Engine running" -ForegroundColor Green
} catch {
    Write-Host "⚠ AI Engine not running at $AI_URL" -ForegroundColor Yellow
    Write-Host "AI Engine tests will be skipped"
    $AI_AVAILABLE = $false
}

Write-Host ""
Write-Host "Starting tests..." -ForegroundColor Cyan
Start-Sleep -Seconds 1

# =============================================================================
# TEST 1: Backend Health Check
# =============================================================================
Test-Start "Backend Health Check"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/health" -Method Get
    if ($response.status -eq "ok") {
        Test-Pass
    } else {
        Test-Fail "Unexpected response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 2: AI Engine Health Check
# =============================================================================
if ($AI_AVAILABLE) {
    Test-Start "AI Engine Health Check"
    try {
        $response = Invoke-RestMethod -Uri "$AI_URL/health" -Method Get
        if ($response.status -eq "ok") {
            Test-Pass
        } else {
            Test-Fail "Unexpected response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
}

# =============================================================================
# TEST 3: User Registration
# =============================================================================
Test-Start "User Registration"
$RANDOM_EMAIL = "testuser$(Get-Date -Format 'yyyyMMddHHmmss')@test.com"
$registerBody = @{
    name = "Test User"
    email = $RANDOM_EMAIL
    password = "test123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $registerBody
    
    if ($response.token) {
        Test-Pass
        $TOKEN = $response.token
        Write-Host "Token obtained: $($TOKEN.Substring(0, 20))..."
    } else {
        Test-Fail "No token in response"
        exit 1
    }
} catch {
    Test-Fail $_.Exception.Message
    Write-Host "Response: $($_.ErrorDetails.Message)"
    exit 1
}

# =============================================================================
# TEST 4: User Login
# =============================================================================
Test-Start "User Login"
$loginBody = @{
    email = $RANDOM_EMAIL
    password = "test123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/auth/login" `
        -Method Post `
        -ContentType "application/json" `
        -Body $loginBody
    
    if ($response.token) {
        Test-Pass
    } else {
        Test-Fail "No token in response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 5: Duplicate Email Registration (Should Fail)
# =============================================================================
Test-Start "Duplicate Email Registration (Should Fail)"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $registerBody `
        -ErrorAction Stop
    Test-Fail "Should have rejected duplicate"
} catch {
    if ($_.ErrorDetails.Message -match "already exists") {
        Test-Pass
    } else {
        Test-Fail "Wrong error message"
    }
}

# =============================================================================
# TEST 6: Get All Services
# =============================================================================
Test-Start "Get All Services"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/services" -Method Get
    if ($response.services) {
        Test-Pass
        $serviceCount = $response.services.Count
        Write-Host "Found $serviceCount services"
        $SERVICE_ID = $response.services[0]._id
        Write-Host "Sample service ID: $SERVICE_ID"
    } else {
        Test-Fail "No services in response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 7: Natural Language Search
# =============================================================================
Test-Start "Natural Language Service Search"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/services?q=plumber+in+Habra+under+500" -Method Get
    if ($response.services) {
        Test-Pass
        if ($response.queryParsed) {
            Write-Host "AI parsing detected"
        }
        if ($response.services[0].score) {
            Write-Host "AI scoring detected"
        }
    } else {
        Test-Fail "No services in response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 8: Category Filter
# =============================================================================
Test-Start "Category Filter Search"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/services?category=Plumber" -Method Get
    if ($response.services) {
        Test-Pass
        $plumberCount = ($response.services | Where-Object { $_.category -eq "Plumber" }).Count
        Write-Host "Found $plumberCount plumber services"
    } else {
        Test-Fail "No services in response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 9: City Filter
# =============================================================================
Test-Start "City Filter Search"
try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/services?city=Habra" -Method Get
    if ($response.services) {
        Test-Pass
        $habraCount = ($response.services | Where-Object { $_.location.city -eq "Habra" }).Count
        Write-Host "Found $habraCount services in Habra"
    } else {
        Test-Fail "No services in response"
    }
} catch {
    Test-Fail $_.Exception.Message
}

# =============================================================================
# TEST 10: Get Service by ID
# =============================================================================
Test-Start "Get Service by ID"
if ($SERVICE_ID) {
    try {
        $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/services/$SERVICE_ID" -Method Get
        if ($response.name -and $response.category) {
            Test-Pass
            Write-Host "Service name: $($response.name)"
        } else {
            Test-Fail "Invalid service data"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
} else {
    Test-Fail "No service ID available"
}

# =============================================================================
# TEST 11: Create Booking (Authenticated)
# =============================================================================
Test-Start "Create Booking (Authenticated)"
if ($TOKEN -and $SERVICE_ID) {
    $tomorrow = (Get-Date).AddDays(1).ToString("yyyy-MM-ddTHH:mm:ssZ")
    $bookingBody = @{
        serviceId = $SERVICE_ID
        date = $tomorrow
        notes = "Test booking"
    } | ConvertTo-Json
    
    try {
        $headers = @{
            "Authorization" = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/bookings/book" `
            -Method Post `
            -ContentType "application/json" `
            -Headers $headers `
            -Body $bookingBody
        
        if ($response.booking -or $response.success) {
            Test-Pass
            Write-Host "Booking created: $($response.booking._id)"
        } else {
            Test-Fail "No booking in response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
} else {
    Test-Fail "No token or service ID available"
}

# =============================================================================
# TEST 12: Get User Bookings
# =============================================================================
Test-Start "Get User Bookings (Authenticated)"
if ($TOKEN) {
    try {
        $headers = @{
            "Authorization" = "Bearer $TOKEN"
        }
        $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/bookings/mine" `
            -Method Get `
            -Headers $headers
        
        if ($response.bookings) {
            Test-Pass
            Write-Host "User has $($response.bookings.Count) booking(s)"
        } else {
            Test-Fail "No bookings in response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
} else {
    Test-Fail "No token available"
}

# =============================================================================
# TEST 13: Booking Without Auth (Should Fail)
# =============================================================================
Test-Start "Booking Without Auth (Should Fail)"
$unauthBody = @{
    serviceId = $SERVICE_ID
    date = "2025-12-01T10:00:00Z"
    notes = "Test"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$BACKEND_URL/api/bookings/book" `
        -Method Post `
        -ContentType "application/json" `
        -Body $unauthBody `
        -ErrorAction Stop
    Test-Fail "Should have required authentication"
} catch {
    if ($_.ErrorDetails.Message -match "token|auth") {
        Test-Pass
    } else {
        Test-Fail "Wrong error message"
    }
}

# =============================================================================
# AI ENGINE TESTS
# =============================================================================
if ($AI_AVAILABLE) {
    # TEST 14: AI Intent Parsing
    Test-Start "AI Intent Parsing"
    $parseBody = @{
        text = "find plumber in Habra under 500 rupees"
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$AI_URL/ai/parse" `
            -Method Post `
            -ContentType "application/json" `
            -Body $parseBody
        
        if ($response.service_type) {
            Test-Pass
            Write-Host "Service type: $($response.service_type)"
            Write-Host "Max price: $($response.max_price)"
            Write-Host "Location: $($response.location)"
        } else {
            Test-Fail "No service_type in response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
    
    # TEST 15: AI Service Comparison
    Test-Start "AI Service Comparison"
    $compareBody = @{
        services = @(
            @{
                name = "Test Plumber A"
                rating = 4.5
                price = 400
                location = @{
                    coords = @{ lat = 22.8256; lng = 88.6336 }
                }
                reviews = @(@{ comment = "excellent service"; rating = 5 })
            },
            @{
                name = "Test Plumber B"
                rating = 4.0
                price = 600
                location = @{
                    coords = @{ lat = 22.8256; lng = 88.6336 }
                }
                reviews = @(@{ comment = "average work"; rating = 4 })
            }
        )
        query = @{
            service_type = "Plumber"
            max_price = 500
        }
    } | ConvertTo-Json -Depth 10
    
    try {
        $response = Invoke-RestMethod -Uri "$AI_URL/ai/compare" `
            -Method Post `
            -ContentType "application/json" `
            -Body $compareBody
        
        if ($response.best -and $response.services[0].score) {
            Test-Pass
            Write-Host "Best service: $($response.best)"
        } else {
            Test-Fail "Invalid comparison response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
    
    # TEST 16: AI Review Summarization
    Test-Start "AI Review Summarization"
    $summaryBody = @{
        reviews = @(
            @{ comment = "Excellent service, very professional"; rating = 5 },
            @{ comment = "Great work, highly recommend"; rating = 5 },
            @{ comment = "Good service but expensive"; rating = 4 },
            @{ comment = "Satisfied with the work done"; rating = 4 }
        )
    } | ConvertTo-Json -Depth 5
    
    try {
        $response = Invoke-RestMethod -Uri "$AI_URL/ai/summary" `
            -Method Post `
            -ContentType "application/json" `
            -Body $summaryBody
        
        if ($response.summary) {
            Test-Pass
            Write-Host "Summary: $($response.summary)"
        } else {
            Test-Fail "No summary in response"
        }
    } catch {
        Test-Fail $_.Exception.Message
    }
}

# =============================================================================
# TEST SUMMARY
# =============================================================================
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host "                    TEST SUMMARY                           " -ForegroundColor Blue
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Blue
Write-Host ""
Write-Host "Total Tests:  $TOTAL" -ForegroundColor Blue
Write-Host "Passed:       $PASSED" -ForegroundColor Green
Write-Host "Failed:       $FAILED" -ForegroundColor Red
Write-Host ""

if ($FAILED -eq 0) {
    Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║            ALL TESTS PASSED! ✓                         ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
    exit 0
} else {
    Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║            SOME TESTS FAILED ✗                         ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Red
    exit 1
}
