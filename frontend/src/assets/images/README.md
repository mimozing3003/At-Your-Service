# Service Images

## How to Add Your Service Images

1. **Save your service images in this folder** with the following names:
   - `health-consultation.jpg` - For health & wellness services
   - `spa-massage.jpg` - For spa & massage services
   - `appliance-repair.jpg` - For appliance repair services
   - `ac-service.jpg` - For AC service & repair

2. **Update the Home.jsx file** to use actual images instead of placeholders:

Replace the placeholder divs with image tags. For example:

```jsx
<img 
  src="/src/assets/images/health-consultation.jpg" 
  alt="Health Consultation" 
  className="w-full h-full object-cover"
/>
```

3. **Image Requirements:**
   - Recommended size: 800x600px (4:3 aspect ratio)
   - Format: JPG, PNG, or WebP
   - File size: < 500KB for optimal performance

4. **Alternative: Using the images from your collage:**
   - Extract individual images from your collage
   - Save them with appropriate names
   - Place them in this folder

## Current Setup

The home page currently uses gradient backgrounds with emojis as placeholders. Once you add your images, update the code in `Home.jsx` to display them properly.
