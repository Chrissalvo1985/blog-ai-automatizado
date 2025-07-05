export interface UnsplashImage {
  url: string
  alt: string
  photographer: string
  photographerUrl: string
}

// Imágenes predefinidas de alta calidad para diferentes temas
const topicImages: Record<string, UnsplashImage[]> = {
  tecnologia: [
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      alt: 'Tecnología moderna y programación',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      alt: 'Programación y desarrollo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      alt: 'IA y aprendizaje automático',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  negocios: [
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      alt: 'Negocios y emprendimiento',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      alt: 'Colaboración en equipo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      alt: 'Estrategia empresarial',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  'estilo de vida': [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      alt: 'Estilo de vida saludable',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
      alt: 'Equilibrio vida-trabajo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      alt: 'Desarrollo personal',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  salud: [
    {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
      alt: 'Salud y bienestar',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      alt: 'Salud mental',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      alt: 'Fitness y ejercicio',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  viajes: [
    {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
      alt: 'Viajes y aventura',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
      alt: 'Destinos hermosos',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      alt: 'Paraíso tropical',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  default: [
    {
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
      alt: 'Espacio de trabajo moderno',
      photographer: 'Glenn Carstens-Peters',
      photographerUrl: 'https://unsplash.com/@glenncarstenspeters',
    },
    {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      alt: 'Espacio de trabajo creativo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      alt: 'Colaboración en equipo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
}

export async function getImageForTopic(topic: string): Promise<UnsplashImage> {
  console.log('🖼️ Unsplash: Seleccionando imagen para tema:', topic)
  
  try {
    // Normalizar tema a minúsculas para coincidencia
    const normalizedTopic = topic.toLowerCase()
    
    // Buscar categoría coincidente
    let categoryImages = topicImages.default
    
    for (const [category, images] of Object.entries(topicImages)) {
      if (normalizedTopic.includes(category) || topic.toLowerCase().includes(category)) {
        categoryImages = images
        console.log(`✅ Unsplash: Categoría encontrada: ${category}`)
        break
      }
    }
    
    // Seleccionar imagen aleatoria de la categoría
    const randomIndex = Math.floor(Math.random() * categoryImages.length)
    const selectedImage = categoryImages[randomIndex]
    
    console.log('✅ Unsplash: Imagen seleccionada correctamente')
    return selectedImage
    
  } catch (error) {
    console.error('❌ Unsplash: Error seleccionando imagen:', error)
    
    // Respaldo a primera imagen por defecto
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