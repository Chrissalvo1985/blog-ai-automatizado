import { db } from './db'

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
    {
      url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
      alt: 'Código y desarrollo web',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      alt: 'Dispositivos y tecnología',
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
    {
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
      alt: 'Reunión de negocios',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80',
      alt: 'Oficina moderna',
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
    {
      url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80',
      alt: 'Vida cotidiana',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1494790108755-2616c13d1e26?w=800&q=80',
      alt: 'Momento de reflexión',
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
    {
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      alt: 'Alimentación saludable',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1506629905607-c60caf9a8b7d?w=800&q=80',
      alt: 'Meditación y relajación',
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
    {
      url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
      alt: 'Paisaje montañoso',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
      alt: 'Aventura urbana',
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
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      alt: 'Creatividad e innovación',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      alt: 'Planificación y estrategia',
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
    
    // Obtener URLs de imágenes ya usadas en los últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const usedImages = await db.post.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        imageUrl: true
      }
    })
    
    const usedImageUrls = new Set(usedImages.map(post => post.imageUrl))
    console.log(`🔍 Unsplash: ${usedImageUrls.size} imágenes ya usadas en los últimos 30 días`)
    
    // Filtrar imágenes disponibles (no usadas)
    const availableImages = categoryImages.filter(img => !usedImageUrls.has(img.url))
    
    let selectedImage: UnsplashImage
    
    if (availableImages.length > 0) {
      // Seleccionar imagen aleatoria de las disponibles
      const randomIndex = Math.floor(Math.random() * availableImages.length)
      selectedImage = availableImages[randomIndex]
      console.log(`✅ Unsplash: Imagen única seleccionada de ${availableImages.length} disponibles`)
    } else {
      // Si todas las imágenes de la categoría están usadas, usar de otra categoría
      console.log(`⚠️ Unsplash: Todas las imágenes de la categoría están usadas, buscando en otras categorías`)
      
      // Buscar en todas las categorías
      const allAvailableImages: UnsplashImage[] = []
      for (const [, images] of Object.entries(topicImages)) {
        const categoryAvailable = images.filter(img => !usedImageUrls.has(img.url))
        allAvailableImages.push(...categoryAvailable)
      }
      
      if (allAvailableImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * allAvailableImages.length)
        selectedImage = allAvailableImages[randomIndex]
        console.log(`✅ Unsplash: Imagen única seleccionada de ${allAvailableImages.length} disponibles globalmente`)
      } else {
        // Si todas las imágenes están usadas, seleccionar la menos reciente
        console.log(`⚠️ Unsplash: Todas las imágenes están usadas, seleccionando la menos reciente`)
        
        const oldestImagePost = await db.post.findFirst({
          where: {
            imageUrl: {
              in: categoryImages.map(img => img.url)
            }
          },
          orderBy: {
            createdAt: 'asc'
          },
          select: {
            imageUrl: true
          }
        })
        
        if (oldestImagePost) {
          selectedImage = categoryImages.find(img => img.url === oldestImagePost.imageUrl) || categoryImages[0]
          console.log(`✅ Unsplash: Reutilizando imagen más antigua`)
        } else {
          selectedImage = categoryImages[0]
          console.log(`✅ Unsplash: Usando imagen por defecto`)
        }
      }
    }
    
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