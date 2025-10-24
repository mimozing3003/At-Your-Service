# AI Engine - At Your Service

Deterministic AI microservice for natural language processing, service comparison, and review summarization.

## Features

- **Intent Parsing**: Extracts service type, price, and location from natural language queries
- **Service Comparison**: Scores services using weighted algorithm (rating, price, distance, sentiment)
- **Review Summarization**: Generates concise summaries using heuristic analysis

## NO Paid APIs Required

This AI engine uses **100% deterministic algorithms** - no OpenAI, no paid LLMs needed!

## Setup

```bash
# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (Unix/Mac)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run
python app.py
```

## API Endpoints

- `POST /ai/parse` - Parse natural language query
- `POST /ai/compare` - Compare and score services
- `POST /ai/summary` - Summarize reviews
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation

## Test Individual Modules

```bash
# Test parser
python ai_modules/parse_intent.py

# Test comparison engine
python ai_modules/compare_engine.py

# Test summarization
python ai_modules/summary.py
```

## Example Requests

### Parse Intent
```bash
curl -X POST http://localhost:8000/ai/parse \
  -H "Content-Type: application/json" \
  -d '{"text": "find plumber near me under 500 in Habra"}'
```

### Compare Services
```bash
curl -X POST http://localhost:8000/ai/compare \
  -H "Content-Type: application/json" \
  -d '{"services": [...], "query": {...}}'
```

## Optional: Add OpenAI

To use OpenAI for enhanced results (optional):

1. Set `USE_OPENAI=true` in `.env`
2. Add `OPENAI_API_KEY=your-key` in `.env`
3. Install: `pip install openai`

**Note**: The system works perfectly without OpenAI!
