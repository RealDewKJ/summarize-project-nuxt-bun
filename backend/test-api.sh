#!/bin/bash

# Backend API Testing Script
# Usage: ./test-api.sh [base_url]

BASE_URL=${1:-"http://localhost:3001"}

echo "🔍 Testing Backend API at $BASE_URL"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4
    
    echo -e "\n${BLUE}Testing: $description${NC}"
    echo "Command: $method $endpoint"
    
    if [ -n "$data" ]; then
        response=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$BASE_URL$endpoint")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint")
    fi
    
    # Check if response is valid JSON
    if echo "$response" | jq . >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Success${NC}"
        echo "$response" | jq .
    else
        echo -e "${RED}❌ Error${NC}"
        echo "$response"
    fi
}

# 1. Health Check
test_endpoint "GET" "/health" "Health Check"

# 2. Get Meeting Data
test_endpoint "GET" "/api/meeting" "Get Meeting Data"

# 3. Test CORS Preflight
echo -e "\n${BLUE}Testing: CORS Preflight${NC}"
echo "Command: OPTIONS /api/meeting"
cors_response=$(curl -s -X OPTIONS \
    -H "Origin: http://localhost:3000" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type" \
    "$BASE_URL/api/meeting" -I)

if echo "$cors_response" | grep -q "Access-Control-Allow-Origin"; then
    echo -e "${GREEN}✅ CORS Headers Present${NC}"
else
    echo -e "${RED}❌ CORS Headers Missing${NC}"
fi
echo "$cors_response"

# 4. Test POST with minimal data
minimal_data='{
    "meetingInfo": {
        "title": "Test Meeting",
        "date": "2025-01-27"
    },
    "projectStats": {
        "total": 1,
        "inProgress": 1,
        "completed": 0,
        "issues": 0
    },
    "projects": {
        "inProgress": ["Test Project"],
        "completed": [],
        "issues": []
    },
    "projectDetails": [],
    "issuesDetails": [],
    "codeReview": [],
    "codeReviewer": "Test Reviewer"
}'

test_endpoint "POST" "/api/meeting" "Save Minimal Meeting Data" "$minimal_data"

# 5. Test 404 Error
echo -e "\n${BLUE}Testing: 404 Error${NC}"
echo "Command: GET /api/nonexistent"
error_response=$(curl -s -w "HTTP_STATUS:%{http_code}" "$BASE_URL/api/nonexistent")
http_status=$(echo "$error_response" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
response_body=$(echo "$error_response" | sed 's/HTTP_STATUS:[0-9]*$//')

if [ "$http_status" = "404" ]; then
    echo -e "${GREEN}✅ 404 Error Correctly Returned${NC}"
else
    echo -e "${RED}❌ Expected 404, got $http_status${NC}"
fi
echo "$response_body" | jq . 2>/dev/null || echo "$response_body"

# 6. Test Invalid JSON
echo -e "\n${BLUE}Testing: Invalid JSON${NC}"
echo "Command: POST /api/meeting with invalid JSON"
invalid_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d '{"invalid": json}' \
    "$BASE_URL/api/meeting")

if echo "$invalid_response" | jq . >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Response is valid JSON (unexpected)${NC}"
    echo "$invalid_response" | jq .
else
    echo -e "${GREEN}✅ Invalid JSON handled correctly${NC}"
    echo "$invalid_response"
fi

echo -e "\n${GREEN}🎉 API Testing Complete!${NC}"
echo "================================"
echo "Base URL: $BASE_URL"
echo "Timestamp: $(date)"
