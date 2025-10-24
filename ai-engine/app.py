"""
AI Engine for At Your Service
FastAPI-based microservice for intent parsing, service comparison, and review summarization
Uses deterministic algorithms - NO paid APIs required
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv

from ai_modules.parse_intent import parse_natural_language
from ai_modules.compare_engine import compare_services
from ai_modules.summary import summarize_reviews

load_dotenv()

app = FastAPI(
    title="At Your Service - AI Engine",
    description="Deterministic AI engine for service search and comparison",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response models
class ParseRequest(BaseModel):
    text: str

class ParseResponse(BaseModel):
    service_type: Optional[str]
    max_price: Optional[int]
    location: Optional[str]
    confidence: float

class CompareRequest(BaseModel):
    services: List[Dict[str, Any]]
    query: Dict[str, Any]

class CompareResponse(BaseModel):
    services: List[Dict[str, Any]]
    best: Optional[Dict[str, Any]]
    reasoning: str

class Review(BaseModel):
    user: str
    comment: str
    rating: int

class SummaryRequest(BaseModel):
    reviews: List[Review]

class SummaryResponse(BaseModel):
    summary: str

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "OK",
        "service": "AI Engine",
        "version": "1.0.0",
        "mode": "deterministic"
    }

# POST /ai/parse - Parse natural language query
@app.post("/ai/parse", response_model=ParseResponse)
async def parse_intent(request: ParseRequest):
    """
    Parse natural language service search query into structured format.
    Example: "find plumber near me under 500 in Habra" 
    → {service_type: "Plumber", max_price: 500, location: "Habra"}
    """
    try:
        result = parse_natural_language(request.text)
        return ParseResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {str(e)}")

# POST /ai/compare - Compare and score services
@app.post("/ai/compare", response_model=CompareResponse)
async def compare_services_endpoint(request: CompareRequest):
    """
    Compare services and return them scored and sorted.
    Uses deterministic scoring algorithm based on rating, price, distance, and sentiment.
    """
    try:
        result = compare_services(request.services, request.query)
        return CompareResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

# POST /ai/summary - Summarize reviews
@app.post("/ai/summary", response_model=SummaryResponse)
async def summarize_reviews_endpoint(request: SummaryRequest):
    """
    Generate a concise summary of reviews using heuristic analysis.
    """
    try:
        reviews_dict = [r.dict() for r in request.reviews]
        result = summarize_reviews(reviews_dict)
        return SummaryResponse(summary=result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print(f"🤖 Starting AI Engine on {host}:{port}")
    print(f"📘 API docs: http://{host}:{port}/docs")
    print(f"🔧 Mode: Deterministic (no external LLM required)")
    
    uvicorn.run(app, host=host, port=port)
