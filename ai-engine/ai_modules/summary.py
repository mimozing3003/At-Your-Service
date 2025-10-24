"""
Review Summarization Module
Generates concise summaries of service reviews using heuristic analysis
NO external LLM required
"""

from typing import List, Dict
from collections import Counter

def summarize_reviews(reviews: List[Dict]) -> str:
    """
    Generate a 1-2 sentence summary of reviews.
    
    Args:
        reviews: List of review dicts with keys: user, comment, rating
        
    Returns:
        String summary
    """
    if not reviews:
        return "No reviews available"
    
    # Calculate statistics
    num_reviews = len(reviews)
    ratings = [r.get('rating', 0) for r in reviews]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0
    
    # Count positive and negative reviews
    positive = sum(1 for r in ratings if r >= 4)
    negative = sum(1 for r in ratings if r <= 2)
    neutral = num_reviews - positive - negative
    
    # Extract key phrases from comments
    all_words = []
    for review in reviews:
        comment = review.get('comment', '').lower()
        words = comment.split()
        all_words.extend(words)
    
    # Find most common descriptive words (excluding common words)
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
                  'of', 'with', 'by', 'from', 'is', 'was', 'are', 'were', 'been', 'be',
                  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
                  'should', 'may', 'might', 'must', 'can', 'very', 'really', 'quite'}
    
    descriptive_words = [w for w in all_words if w not in stop_words and len(w) > 3]
    word_freq = Counter(descriptive_words)
    top_words = [word for word, count in word_freq.most_common(3)]
    
    # Build summary
    summary_parts = []
    
    # Part 1: Overall rating and count
    summary_parts.append(f"{num_reviews} reviews with {avg_rating:.1f}/5 average rating")
    
    # Part 2: Sentiment distribution
    if positive > negative:
        sentiment = f"Mostly positive ({positive} positive"
        if negative > 0:
            sentiment += f", {negative} negative)"
        else:
            sentiment += ")"
        summary_parts.append(sentiment)
    elif negative > positive:
        sentiment = f"Mixed reviews ({negative} negative, {positive} positive)"
        summary_parts.append(sentiment)
    else:
        summary_parts.append(f"Balanced feedback ({positive} positive, {negative} negative)")
    
    # Part 3: Key themes (if we found common words)
    if top_words:
        themes = ", ".join(top_words[:2])
        summary_parts.append(f"Common mentions: {themes}")
    
    # Combine into 1-2 sentences
    if len(summary_parts) <= 2:
        return ". ".join(summary_parts) + "."
    else:
        return f"{summary_parts[0]}. {summary_parts[1]}. {summary_parts[2]}."


def extract_top_positive_and_negative(reviews: List[Dict]) -> Dict[str, str]:
    """
    Extract one top positive and one top negative review snippet.
    
    Returns:
        Dict with 'positive' and 'negative' keys
    """
    if not reviews:
        return {'positive': None, 'negative': None}
    
    # Find highest and lowest rated reviews
    sorted_reviews = sorted(reviews, key=lambda x: x.get('rating', 0), reverse=True)
    
    top_positive = None
    top_negative = None
    
    for review in sorted_reviews:
        if review.get('rating', 0) >= 4 and not top_positive:
            top_positive = review.get('comment', '')[:100] + "..."
        if review.get('rating', 0) <= 2 and not top_negative:
            top_negative = review.get('comment', '')[:100] + "..."
    
    return {
        'positive': top_positive,
        'negative': top_negative
    }


def test_summarization():
    """Test the summarization module"""
    test_reviews = [
        {'user': 'John', 'comment': 'Excellent service! Very professional and quick.', 'rating': 5},
        {'user': 'Mary', 'comment': 'Great work, highly recommend. Fixed my problem fast.', 'rating': 5},
        {'user': 'Bob', 'comment': 'Good service but a bit expensive.', 'rating': 4},
        {'user': 'Alice', 'comment': 'Professional team. Would use again.', 'rating': 4},
        {'user': 'Tom', 'comment': 'Slow response time and overpriced.', 'rating': 2},
    ]
    
    summary = summarize_reviews(test_reviews)
    snippets = extract_top_positive_and_negative(test_reviews)
    
    print("Testing Review Summarization:")
    print("=" * 60)
    print(f"\nSummary: {summary}\n")
    print(f"Top Positive: {snippets['positive']}")
    print(f"Top Negative: {snippets['negative']}")


if __name__ == "__main__":
    test_summarization()
