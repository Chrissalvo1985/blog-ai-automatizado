export interface UnsplashImage {
  id: string
  url: string
  alt: string
  photographer: string
  photographerUrl: string
  downloadUrl: string
}

// Predefined high-quality images for different topics
const topicImages: Record<string, UnsplashImage[]> = {
  technology: [
    {
      id: 'tech-1',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      alt: 'Modern technology and coding',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    },
    {
      id: 'tech-2',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      alt: 'Programming and development',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    },
    {
      id: 'tech-3',
      url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      alt: 'AI and machine learning',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
    },
  ],
  business: [
    {
      id: 'business-1',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      alt: 'Business and entrepreneurship',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    },
    {
      id: 'business-2',
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      alt: 'Team collaboration',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    },
    {
      id: 'business-3',
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      alt: 'Business strategy',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    },
  ],
  lifestyle: [
    {
      id: 'lifestyle-1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      alt: 'Healthy lifestyle',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      id: 'lifestyle-2',
      url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
      alt: 'Work-life balance',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
    },
    {
      id: 'lifestyle-3',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      alt: 'Personal development',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    },
  ],
  health: [
    {
      id: 'health-1',
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      alt: 'Health and wellness',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    },
    {
      id: 'health-2',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      alt: 'Mental health',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    },
    {
      id: 'health-3',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      alt: 'Fitness and exercise',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    },
  ],
  travel: [
    {
      id: 'travel-1',
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      alt: 'Travel and adventure',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    },
    {
      id: 'travel-2',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      alt: 'Beautiful destinations',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    },
    {
      id: 'travel-3',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      alt: 'Tropical paradise',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    },
  ],
  default: [
    {
      id: 'default-1',
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
      alt: 'Modern workspace',
      photographer: 'Glenn Carstens-Peters',
      photographerUrl: 'https://unsplash.com/@glenncarstenspeters',
      downloadUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
    },
    {
      id: 'default-2',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      alt: 'Creative workspace',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    },
    {
      id: 'default-3',
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      alt: 'Team collaboration',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
      downloadUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    },
  ],
}

export async function getImageForTopic(topic: string): Promise<UnsplashImage> {
  try {
    // Normalize topic to lowercase for matching
    const normalizedTopic = topic.toLowerCase()
    
    // Find matching category
    let categoryImages = topicImages.default
    
    for (const [category, images] of Object.entries(topicImages)) {
      if (normalizedTopic.includes(category) || topic.toLowerCase().includes(category)) {
        categoryImages = images
        break
      }
    }
    
    // Select random image from category
    const randomIndex = Math.floor(Math.random() * categoryImages.length)
    return categoryImages[randomIndex]
    
  } catch (error) {
    console.error('Error selecting image:', error)
    
    // Fallback to first default image
    return topicImages.default[0]
  }
}

export async function getFeaturedImages(count: number = 6): Promise<UnsplashImage[]> {
  const topics = ['technology', 'business', 'lifestyle', 'health', 'travel', 'default']
  
  try {
    const images: UnsplashImage[] = []
    
    for (let i = 0; i < count && i < topics.length; i++) {
      const image = await getImageForTopic(topics[i])
      images.push(image)
    }
    
    return images
  } catch (error) {
    console.error('Error fetching featured images:', error)
    return []
  }
} 