#!/bin/bash

# =============================================================================
# AI AGENT FOR LOCAL SERVICES - COMPREHENSIVE TEST SUITE
# =============================================================================
# 
# This script tests all API endpoints with curl commands
# Run this after starting backend (port 4000) and AI engine (port 8000)
#
# Usage: bash tests.sh
# Or on Windows: sh tests.sh (with Git Bash) or use tests.ps1
#
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0
TOTAL=0

# Backend and AI Engine URLs
BACKEND_URL="http://localhost:4000"
AI_URL="http://localhost:8000"

# Test output function
test_start() {
    TOTAL=$((TOTAL + 1))
    echo ""
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}TEST $TOTAL: $1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
}

test_pass() {
    PASSED=$((PASSED + 1))
    echo -e "${GREEN}✓ PASSED${NC}"
}

test_fail() {
    FAILED=$((FAILED + 1))
    echo -e "${RED}✗ FAILED: $1${NC}"
}

# Check if services are running
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     AI AGENT FOR LOCAL SERVICES - TEST SUITE          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Checking if services are running..."

# Check backend
if ! curl -s "$BACKEND_URL/health" > /dev/null 2>&1; then
    echo -e "${RED}✗ Backend not running at $BACKEND_URL${NC}"
    echo "Please start backend: cd backend && npm run dev"
    exit 1
fi
echo -e "${GREEN}✓ Backend running${NC}"

# Check AI engine
if ! curl -s "$AI_URL/health" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠ AI Engine not running at $AI_URL${NC}"
    echo "AI Engine tests will be skipped"
    AI_AVAILABLE=false
else
    echo -e "${GREEN}✓ AI Engine running${NC}"
    AI_AVAILABLE=true
fi

echo ""
echo "Starting tests..."
sleep 1

# =============================================================================
# TEST 1: Backend Health Check
# =============================================================================
test_start "Backend Health Check"

RESPONSE=$(curl -s "$BACKEND_URL/health")
if echo "$RESPONSE" | grep -q "ok"; then
    test_pass
else
    test_fail "Health check failed"
    echo "Response: $RESPONSE"
fi

# =============================================================================
# TEST 2: AI Engine Health Check
# =============================================================================
if [ "$AI_AVAILABLE" = true ]; then
    test_start "AI Engine Health Check"
    
    RESPONSE=$(curl -s "$AI_URL/health")
    if echo "$RESPONSE" | grep -q "ok"; then
        test_pass
    else
        test_fail "AI health check failed"
        echo "Response: $RESPONSE"
    fi
fi

# =============================================================================
# TEST 3: User Registration
# =============================================================================
test_start "User Registration"

RANDOM_EMAIL="testuser$(date +%s)@test.com"
REGISTER_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Test User\", \"email\": \"$RANDOM_EMAIL\", \"password\": \"test123\"}")

if echo "$REGISTER_RESPONSE" | grep -q "token"; then
    test_pass
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "Token obtained: ${TOKEN:0:20}..."
else
    test_fail "Registration failed"
    echo "Response: $REGISTER_RESPONSE"
    exit 1
fi

# =============================================================================
# TEST 4: User Login
# =============================================================================
test_start "User Login"

LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$RANDOM_EMAIL\", \"password\": \"test123\"}")

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    test_pass
else
    test_fail "Login failed"
    echo "Response: $LOGIN_RESPONSE"
fi

# =============================================================================
# TEST 5: Registration with Duplicate Email (Should Fail)
# =============================================================================
test_start "Duplicate Email Registration (Should Fail)"

DUPLICATE_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Test User\", \"email\": \"$RANDOM_EMAIL\", \"password\": \"test123\"}")

if echo "$DUPLICATE_RESPONSE" | grep -q "already exists"; then
    test_pass
else
    test_fail "Should have rejected duplicate email"
    echo "Response: $DUPLICATE_RESPONSE"
fi

# =============================================================================
# TEST 6: Get All Services (No Query)
# =============================================================================
test_start "Get All Services"

SERVICES_RESPONSE=$(curl -s "$BACKEND_URL/api/services")

if echo "$SERVICES_RESPONSE" | grep -q "services" && echo "$SERVICES_RESPONSE" | grep -q "category"; then
    test_pass
    SERVICE_COUNT=$(echo "$SERVICES_RESPONSE" | grep -o '"_id"' | wc -l)
    echo "Found $SERVICE_COUNT services"
else
    test_fail "Failed to get services"
    echo "Response: ${SERVICES_RESPONSE:0:200}..."
fi

# Save first service ID for later tests
SERVICE_ID=$(echo "$SERVICES_RESPONSE" | grep -o '"_id":"[^"]*' | head -1 | cut -d'"' -f4)
echo "Sample service ID: $SERVICE_ID"

# =============================================================================
# TEST 7: Natural Language Search with AI
# =============================================================================
test_start "Natural Language Service Search"

SEARCH_RESPONSE=$(curl -s "$BACKEND_URL/api/services?q=plumber+in+Habra+under+500")

if echo "$SEARCH_RESPONSE" | grep -q "services"; then
    test_pass
    
    # Check if AI parsing results are included
    if echo "$SEARCH_RESPONSE" | grep -q "queryParsed"; then
        echo "AI parsing detected in response"
    fi
    
    # Check if services have scores
    if echo "$SEARCH_RESPONSE" | grep -q "score"; then
        echo "AI scoring detected in services"
    fi
else
    test_fail "Search failed"
    echo "Response: ${SEARCH_RESPONSE:0:200}..."
fi

# =============================================================================
# TEST 8: Category Filter Search
# =============================================================================
test_start "Category Filter Search"

CATEGORY_RESPONSE=$(curl -s "$BACKEND_URL/api/services?category=Plumber")

if echo "$CATEGORY_RESPONSE" | grep -q "services"; then
    test_pass
    PLUMBER_COUNT=$(echo "$CATEGORY_RESPONSE" | grep -o '"category":"Plumber"' | wc -l)
    echo "Found $PLUMBER_COUNT plumber services"
else
    test_fail "Category search failed"
    echo "Response: ${CATEGORY_RESPONSE:0:200}..."
fi

# =============================================================================
# TEST 9: City Filter Search
# =============================================================================
test_start "City Filter Search"

CITY_RESPONSE=$(curl -s "$BACKEND_URL/api/services?city=Habra")

if echo "$CITY_RESPONSE" | grep -q "services"; then
    test_pass
    HABRA_COUNT=$(echo "$CITY_RESPONSE" | grep -o '"city":"Habra"' | wc -l)
    echo "Found $HABRA_COUNT services in Habra"
else
    test_fail "City search failed"
    echo "Response: ${CITY_RESPONSE:0:200}..."
fi

# =============================================================================
# TEST 10: Get Service by ID
# =============================================================================
test_start "Get Service by ID"

if [ -n "$SERVICE_ID" ]; then
    SERVICE_DETAIL=$(curl -s "$BACKEND_URL/api/services/$SERVICE_ID")
    
    if echo "$SERVICE_DETAIL" | grep -q "name" && echo "$SERVICE_DETAIL" | grep -q "category"; then
        test_pass
        SERVICE_NAME=$(echo "$SERVICE_DETAIL" | grep -o '"name":"[^"]*' | cut -d'"' -f4)
        echo "Service name: $SERVICE_NAME"
    else
        test_fail "Failed to get service details"
        echo "Response: ${SERVICE_DETAIL:0:200}..."
    fi
else
    test_fail "No service ID available"
fi

# =============================================================================
# TEST 11: Create Booking (Authenticated)
# =============================================================================
test_start "Create Booking (Authenticated)"

if [ -n "$TOKEN" ] && [ -n "$SERVICE_ID" ]; then
    TOMORROW=$(date -d "+1 day" +%Y-%m-%d 2>/dev/null || date -v+1d +%Y-%m-%d 2>/dev/null || echo "2025-12-01")
    
    BOOKING_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/bookings/book" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $TOKEN" \
        -d "{\"serviceId\": \"$SERVICE_ID\", \"date\": \"${TOMORROW}T10:00:00Z\", \"notes\": \"Test booking\"}")
    
    if echo "$BOOKING_RESPONSE" | grep -q "booking" || echo "$BOOKING_RESPONSE" | grep -q "success"; then
        test_pass
        BOOKING_ID=$(echo "$BOOKING_RESPONSE" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
        echo "Booking created: $BOOKING_ID"
    else
        test_fail "Booking creation failed"
        echo "Response: $BOOKING_RESPONSE"
    fi
else
    test_fail "No token or service ID available"
fi

# =============================================================================
# TEST 12: Get User Bookings (Authenticated)
# =============================================================================
test_start "Get User Bookings (Authenticated)"

if [ -n "$TOKEN" ]; then
    BOOKINGS_RESPONSE=$(curl -s "$BACKEND_URL/api/bookings/mine" \
        -H "Authorization: Bearer $TOKEN")
    
    if echo "$BOOKINGS_RESPONSE" | grep -q "bookings"; then
        test_pass
        BOOKING_COUNT=$(echo "$BOOKINGS_RESPONSE" | grep -o '"_id"' | wc -l)
        echo "User has $BOOKING_COUNT booking(s)"
    else
        test_fail "Failed to get bookings"
        echo "Response: $BOOKINGS_RESPONSE"
    fi
else
    test_fail "No token available"
fi

# =============================================================================
# TEST 13: Booking Without Auth (Should Fail)
# =============================================================================
test_start "Booking Without Auth (Should Fail)"

UNAUTH_BOOKING=$(curl -s -X POST "$BACKEND_URL/api/bookings/book" \
    -H "Content-Type: application/json" \
    -d "{\"serviceId\": \"$SERVICE_ID\", \"date\": \"2025-12-01T10:00:00Z\", \"notes\": \"Test\"}")

if echo "$UNAUTH_BOOKING" | grep -q "token" || echo "$UNAUTH_BOOKING" | grep -q "auth"; then
    test_pass
else
    test_fail "Should have required authentication"
    echo "Response: $UNAUTH_BOOKING"
fi

# =============================================================================
# AI ENGINE TESTS (if available)
# =============================================================================

if [ "$AI_AVAILABLE" = true ]; then

    # =========================================================================
    # TEST 14: AI Intent Parsing
    # =========================================================================
    test_start "AI Intent Parsing"
    
    PARSE_RESPONSE=$(curl -s -X POST "$AI_URL/ai/parse" \
        -H "Content-Type: application/json" \
        -d '{"text": "find plumber in Habra under 500 rupees"}')
    
    if echo "$PARSE_RESPONSE" | grep -q "service_type"; then
        test_pass
        echo "Parsed service type: $(echo "$PARSE_RESPONSE" | grep -o '"service_type":"[^"]*' | cut -d'"' -f4)"
        echo "Max price: $(echo "$PARSE_RESPONSE" | grep -o '"max_price":[0-9]*' | cut -d':' -f2)"
        echo "Location: $(echo "$PARSE_RESPONSE" | grep -o '"location":"[^"]*' | cut -d'"' -f4)"
    else
        test_fail "Intent parsing failed"
        echo "Response: $PARSE_RESPONSE"
    fi

    # =========================================================================
    # TEST 15: AI Service Comparison
    # =========================================================================
    test_start "AI Service Comparison"
    
    COMPARE_PAYLOAD='{
        "services": [
            {
                "name": "Test Plumber A",
                "rating": 4.5,
                "price": 400,
                "location": {"coords": {"lat": 22.8256, "lng": 88.6336}},
                "reviews": [{"comment": "excellent service", "rating": 5}]
            },
            {
                "name": "Test Plumber B",
                "rating": 4.0,
                "price": 600,
                "location": {"coords": {"lat": 22.8256, "lng": 88.6336}},
                "reviews": [{"comment": "average work", "rating": 4}]
            }
        ],
        "query": {"service_type": "Plumber", "max_price": 500}
    }'
    
    COMPARE_RESPONSE=$(curl -s -X POST "$AI_URL/ai/compare" \
        -H "Content-Type: application/json" \
        -d "$COMPARE_PAYLOAD")
    
    if echo "$COMPARE_RESPONSE" | grep -q "best" && echo "$COMPARE_RESPONSE" | grep -q "score"; then
        test_pass
        echo "Best service: $(echo "$COMPARE_RESPONSE" | grep -o '"best":"[^"]*' | cut -d'"' -f4)"
        echo "Scoring completed successfully"
    else
        test_fail "Service comparison failed"
        echo "Response: ${COMPARE_RESPONSE:0:200}..."
    fi

    # =========================================================================
    # TEST 16: AI Review Summarization
    # =========================================================================
    test_start "AI Review Summarization"
    
    SUMMARY_PAYLOAD='{
        "reviews": [
            {"comment": "Excellent service, very professional", "rating": 5},
            {"comment": "Great work, highly recommend", "rating": 5},
            {"comment": "Good service but expensive", "rating": 4},
            {"comment": "Satisfied with the work done", "rating": 4}
        ]
    }'
    
    SUMMARY_RESPONSE=$(curl -s -X POST "$AI_URL/ai/summary" \
        -H "Content-Type: application/json" \
        -d "$SUMMARY_PAYLOAD")
    
    if echo "$SUMMARY_RESPONSE" | grep -q "summary"; then
        test_pass
        echo "Summary: $(echo "$SUMMARY_RESPONSE" | grep -o '"summary":"[^"]*' | cut -d'"' -f4)"
    else
        test_fail "Review summarization failed"
        echo "Response: $SUMMARY_RESPONSE"
    fi

    # =========================================================================
    # TEST 17: AI Parse Edge Case - Price Only
    # =========================================================================
    test_start "AI Parse - Price Only Query"
    
    PRICE_PARSE=$(curl -s -X POST "$AI_URL/ai/parse" \
        -H "Content-Type: application/json" \
        -d '{"text": "services under 300 rupees"}')
    
    if echo "$PRICE_PARSE" | grep -q "max_price"; then
        test_pass
        echo "Detected price: $(echo "$PRICE_PARSE" | grep -o '"max_price":[0-9]*' | cut -d':' -f2)"
    else
        test_fail "Price-only parsing failed"
        echo "Response: $PRICE_PARSE"
    fi

    # =========================================================================
    # TEST 18: AI Parse Edge Case - Location Only
    # =========================================================================
    test_start "AI Parse - Location Only Query"
    
    LOCATION_PARSE=$(curl -s -X POST "$AI_URL/ai/parse" \
        -H "Content-Type: application/json" \
        -d '{"text": "services in Kolkata"}')
    
    if echo "$LOCATION_PARSE" | grep -q "location"; then
        test_pass
        echo "Detected location: $(echo "$LOCATION_PARSE" | grep -o '"location":"[^"]*' | cut -d'"' -f4)"
    else
        test_fail "Location-only parsing failed"
        echo "Response: $LOCATION_PARSE"
    fi

fi

# =============================================================================
# TEST SUMMARY
# =============================================================================

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                    TEST SUMMARY                           ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Total Tests:  ${BLUE}$TOTAL${NC}"
echo -e "Passed:       ${GREEN}$PASSED${NC}"
echo -e "Failed:       ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║            ALL TESTS PASSED! ✓                         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║            SOME TESTS FAILED ✗                         ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════════╝${NC}"
    exit 1
fi
