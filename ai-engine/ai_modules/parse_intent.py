"""
Natural Language Intent Parser
Extracts service type, price, and location from natural language queries
Uses deterministic regex and keyword matching - NO external LLM required
"""

import re
from typing import Dict, Optional

# Service category keywords mapping
SERVICE_KEYWORDS = {
    'Plumber': ['plumber', 'plumbing', 'pipe', 'leak', 'water', 'drain', 'faucet', 'tap'],
    'Electrician': ['electrician', 'electric', 'wiring', 'power', 'circuit', 'voltage', 'socket'],
    'Gym': ['gym', 'fitness', 'workout', 'exercise', 'training', 'bodybuilding'],
    'Tutor': ['tutor', 'teacher', 'teaching', 'lesson', 'study', 'coaching', 'education'],
    'AC Repair': ['ac', 'air condition', 'cooling', 'hvac', 'airconditioner'],
    'Mechanic': ['mechanic', 'car', 'vehicle', 'auto', 'repair', 'garage', 'automobile'],
    'Cleaning': ['clean', 'cleaning', 'maid', 'housekeeping', 'sanitize', 'tidy']
}

# Price extraction patterns
PRICE_PATTERNS = [
    (r'under ₹?(\d+)', 'under'),
    (r'below ₹?(\d+)', 'below'),
    (r'upto ₹?(\d+)', 'upto'),
    (r'up to ₹?(\d+)', 'upto'),
    (r'less than ₹?(\d+)', 'less'),
    (r'<= ?₹?(\d+)', 'lte'),
    (r'₹?(\d+) or less', 'or_less'),
    (r'max ₹?(\d+)', 'max'),
    (r'maximum ₹?(\d+)', 'max'),
]

# Location extraction patterns
LOCATION_PATTERNS = [
    r'in ([a-zA-Z\s]+?)(?:\s|$|,|\.|under|below|for)',
    r'at ([a-zA-Z\s]+?)(?:\s|$|,|\.|under|below|for)',
    r'near ([a-zA-Z\s]+?)(?:\s|$|,|\.|under|below|for)',
]

def parse_natural_language(text: str) -> Dict:
    """
    Parse natural language query into structured intent.
    
    Args:
        text: Natural language query string
        
    Returns:
        Dict with keys: service_type, max_price, location, confidence
    """
    result = {
        'service_type': None,
        'max_price': None,
        'location': None,
        'confidence': 0.0
    }
    
    text_lower = text.lower().strip()
    confidence_score = 0.0
    
    # Extract service type
    for category, keywords in SERVICE_KEYWORDS.items():
        for keyword in keywords:
            if keyword in text_lower:
                result['service_type'] = category
                confidence_score += 0.4
                break
        if result['service_type']:
            break
    
    # Extract max price
    for pattern, pattern_type in PRICE_PATTERNS:
        match = re.search(pattern, text_lower)
        if match:
            try:
                result['max_price'] = int(match.group(1))
                confidence_score += 0.3
                break
            except (ValueError, IndexError):
                pass
    
    # Extract location
    if 'near me' in text_lower or 'nearby' in text_lower:
        result['location'] = 'nearby'
        confidence_score += 0.2
    else:
        for pattern in LOCATION_PATTERNS:
            match = re.search(pattern, text_lower, re.IGNORECASE)
            if match:
                location = match.group(1).strip()
                # Filter out common words that aren't locations
                stop_words = ['the', 'a', 'an', 'my', 'your', 'under', 'below']
                if location and location not in stop_words:
                    result['location'] = location.title()
                    confidence_score += 0.3
                    break
    
    # Set confidence score
    result['confidence'] = min(confidence_score, 1.0)
    
    return result


def test_parser():
    """Test the parser with sample queries"""
    test_queries = [
        "find plumber near me under 500 in Habra",
        "electrician in Kolkata below 400",
        "gym membership near me",
        "best tutor for math in Howrah under 600",
        "ac repair service in Habra",
        "car mechanic in Kolkata",
        "house cleaning service near me below 700"
    ]
    
    print("Testing Intent Parser:")
    print("=" * 60)
    
    for query in test_queries:
        result = parse_natural_language(query)
        print(f"\nQuery: {query}")
        print(f"  Service: {result['service_type']}")
        print(f"  Max Price: ₹{result['max_price']}" if result['max_price'] else "  Max Price: None")
        print(f"  Location: {result['location']}")
        print(f"  Confidence: {result['confidence']:.2f}")


if __name__ == "__main__":
    test_parser()
