"""
Service Comparison Engine
Scores and ranks services using deterministic weighted algorithm
Formula: score = 0.45*rating + 0.25*price + 0.20*distance + 0.10*sentiment
NO external LLM required
"""

import math
from typing import List, Dict, Any, Optional

# Sentiment keywords for review analysis
POSITIVE_WORDS = [
    'excellent', 'great', 'amazing', 'awesome', 'fantastic', 'wonderful', 
    'professional', 'best', 'perfect', 'love', 'highly', 'recommend',
    'quick', 'efficient', 'clean', 'friendly', 'helpful', 'good'
]

NEGATIVE_WORDS = [
    'bad', 'terrible', 'awful', 'worst', 'poor', 'slow', 'expensive',
    'rude', 'unprofessional', 'disappointing', 'waste', 'never', 'avoid',
    'horrible', 'dirty', 'late', 'overpriced'
]

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in kilometers"""
    R = 6371  # Earth's radius in km
    
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    
    a = (math.sin(dlat / 2) ** 2 + 
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
         math.sin(dlon / 2) ** 2)
    
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def calculate_sentiment_score(reviews: List[Dict]) -> float:
    """Calculate sentiment score from reviews (0-1)"""
    if not reviews:
        return 0.5  # Neutral
    
    positive_count = 0
    negative_count = 0
    total_words = 0
    
    for review in reviews:
        comment = review.get('comment', '').lower()
        words = comment.split()
        total_words += len(words)
        
        for word in words:
            if word in POSITIVE_WORDS:
                positive_count += 1
            elif word in NEGATIVE_WORDS:
                negative_count += 1
    
    if total_words == 0:
        return 0.5
    
    # Sentiment score based on positive/negative ratio
    positive_ratio = positive_count / max(total_words, 1)
    negative_ratio = negative_count / max(total_words, 1)
    
    sentiment = 0.5 + (positive_ratio - negative_ratio) * 5
    return max(0.0, min(1.0, sentiment))

def compare_services(services: List[Dict[str, Any]], query: Dict[str, Any]) -> Dict:
    """
    Compare and score services using weighted algorithm.
    
    Args:
        services: List of service objects
        query: Parsed query with service_type, max_price, location
        
    Returns:
        Dict with scored services, best service, and reasoning
    """
    if not services:
        return {
            'services': [],
            'best': None,
            'reasoning': 'No services to compare'
        }
    
    # Extract max values for normalization
    max_price = max((s.get('price', 0) for s in services), default=1)
    max_rating = 5.0  # Rating is always 0-5
    
    # Get user location if available (from query or could be passed separately)
    user_coords = None  # Could be enhanced to get from browser geolocation
    
    scored_services = []
    
    for service in services:
        # Rating score (0-1)
        rating = service.get('rating', 0)
        rating_score = rating / max_rating if max_rating > 0 else 0
        
        # Price score (0-1, lower price = higher score)
        price = service.get('price', 0)
        price_score = 1 - (price / (max_price + 1)) if max_price > 0 else 0.5
        price_score = max(0.0, min(1.0, price_score))
        
        # Distance score (0-1, closer = higher score)
        distance_score = 0.5  # Default neutral score
        if user_coords and 'location' in service:
            coords = service['location'].get('coords', {})
            if 'lat' in coords and 'lng' in coords:
                try:
                    distance = calculate_haversine_distance(
                        user_coords['lat'],
                        user_coords['lng'],
                        coords['lat'],
                        coords['lng']
                    )
                    # Assume 50km as max distance
                    distance_score = 1 - (distance / 50)
                    distance_score = max(0.0, min(1.0, distance_score))
                except Exception:
                    pass
        
        # Sentiment score from reviews (0-1)
        reviews = service.get('reviews', [])
        sentiment_score = calculate_sentiment_score(reviews)
        
        # Weighted final score
        # Weights: rating=0.45, price=0.25, distance=0.20, sentiment=0.10
        final_score = (
            0.45 * rating_score +
            0.25 * price_score +
            0.20 * distance_score +
            0.10 * sentiment_score
        )
        
        # Create scored service object
        scored_service = service.copy()
        scored_service['score'] = round(final_score, 3)
        scored_service['score_breakdown'] = {
            'rating_score': round(rating_score, 3),
            'price_score': round(price_score, 3),
            'distance_score': round(distance_score, 3),
            'sentiment_score': round(sentiment_score, 3)
        }
        
        scored_services.append(scored_service)
    
    # Sort by score (highest first)
    scored_services.sort(key=lambda x: x['score'], reverse=True)
    
    # Get best service
    best = scored_services[0] if scored_services else None
    
    # Generate reasoning
    if best:
        reasoning = (
            f"Best match: {best.get('name', 'Unknown')} "
            f"(Score: {best['score']:.2f}/1.00) - "
            f"Rating: {best.get('rating', 0)}/5, "
            f"Price: ₹{best.get('price', 0)}, "
            f"{len(best.get('reviews', []))} reviews"
        )
    else:
        reasoning = "No suitable services found"
    
    return {
        'services': scored_services,
        'best': best,
        'reasoning': reasoning
    }


def test_comparison():
    """Test the comparison engine"""
    test_services = [
        {
            'name': 'Service A',
            'rating': 4.5,
            'price': 500,
            'reviews': [
                {'user': 'User1', 'comment': 'Great service!', 'rating': 5},
                {'user': 'User2', 'comment': 'Very professional', 'rating': 4}
            ]
        },
        {
            'name': 'Service B',
            'rating': 4.8,
            'price': 700,
            'reviews': [
                {'user': 'User3', 'comment': 'Excellent work!', 'rating': 5}
            ]
        },
        {
            'name': 'Service C',
            'rating': 4.0,
            'price': 400,
            'reviews': [
                {'user': 'User4', 'comment': 'Decent but slow', 'rating': 3}
            ]
        }
    ]
    
    query = {'service_type': 'Plumber', 'max_price': 600, 'location': 'Habra'}
    
    result = compare_services(test_services, query)
    
    print("Testing Comparison Engine:")
    print("=" * 60)
    print(f"\nReasoning: {result['reasoning']}\n")
    
    for i, service in enumerate(result['services'], 1):
        print(f"{i}. {service['name']}")
        print(f"   Score: {service['score']:.3f}")
        print(f"   Breakdown: Rating={service['score_breakdown']['rating_score']:.3f}, "
              f"Price={service['score_breakdown']['price_score']:.3f}, "
              f"Distance={service['score_breakdown']['distance_score']:.3f}, "
              f"Sentiment={service['score_breakdown']['sentiment_score']:.3f}")
        print()


if __name__ == "__main__":
    test_comparison()
