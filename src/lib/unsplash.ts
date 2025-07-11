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
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      alt: 'Inteligencia artificial y robots',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80',
      alt: 'Blockchain y criptomonedas',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1529465230221-a0d17d0fdb1d?w=800&q=80',
      alt: 'Realidad virtual y aumentada',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  innovacion: [
    {
      url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80',
      alt: 'Innovación y creatividad',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
      alt: 'Bombilla e ideas innovadoras',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      alt: 'Transformación digital',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      alt: 'Innovación tecnológica',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      alt: 'Futuro y innovación',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      alt: 'Espacio y tecnología futurista',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  creatividad: [
    {
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
      alt: 'Arte y creatividad digital',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&q=80',
      alt: 'Diseño y creatividad',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
      alt: 'Creatividad e innovación',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
      alt: 'Arte digital y tecnología',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      alt: 'Proceso creativo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      alt: 'Infografías y análisis creativos',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  educacion: [
    {
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      alt: 'Educación digital y tecnología',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
      alt: 'Aprendizaje y tecnología',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
      alt: 'Educación colaborativa',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      alt: 'Educación del futuro',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      alt: 'Aprendizaje continuo',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80',
      alt: 'Educación online y digital',
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
    {
      url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
      alt: 'Emprendimiento digital',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
    {
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      alt: 'Análisis y estrategia',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    },
  ],
  // Mantengo las categorías existentes para compatibilidad
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
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      alt: 'Tecnología del futuro',
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
    
    // Buscar categoría coincidente con prioridad para nuevos temas
    let categoryImages = topicImages.default
    let foundCategory = 'default'
    
    // Priorizar las nuevas categorías enfocadas en el tema
    const priorityCategories = ['tecnologia', 'innovacion', 'creatividad', 'educacion', 'negocios']
    
    for (const category of priorityCategories) {
      if (normalizedTopic.includes(category) || 
          normalizedTopic.includes(category.replace('ó', 'o')) || // tecnología -> tecnologia
          normalizedTopic.includes(category.replace('ó', 'o').replace('ñ', 'n'))) { // educación -> educacion
        categoryImages = topicImages[category]
        foundCategory = category
        console.log(`✅ Unsplash: Categoría prioritaria encontrada: ${category}`)
        break
      }
    }
    
    // Si no encontró categoría prioritaria, buscar en todas las categorías
    if (foundCategory === 'default') {
      for (const [category, images] of Object.entries(topicImages)) {
        if (category !== 'default' && 
            (normalizedTopic.includes(category) || 
             normalizedTopic.includes(category.replace(' ', '')) ||
             category.includes(normalizedTopic.split(' ')[0]))) {
          categoryImages = images
          foundCategory = category
          console.log(`✅ Unsplash: Categoría encontrada: ${category}`)
          break
        }
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
      console.log(`✅ Unsplash: Imagen única seleccionada de ${availableImages.length} disponibles en categoría: ${foundCategory}`)
    } else {
      // Si todas las imágenes de la categoría están usadas, usar de las categorías prioritarias
      console.log(`⚠️ Unsplash: Todas las imágenes de ${foundCategory} están usadas, buscando en categorías prioritarias`)
      
      // Buscar en categorías prioritarias
      const allPriorityImages: UnsplashImage[] = []
      for (const category of priorityCategories) {
        const categoryAvailable = topicImages[category]?.filter(img => !usedImageUrls.has(img.url)) || []
        allPriorityImages.push(...categoryAvailable)
      }
      
      if (allPriorityImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * allPriorityImages.length)
        selectedImage = allPriorityImages[randomIndex]
        console.log(`✅ Unsplash: Imagen única seleccionada de ${allPriorityImages.length} disponibles en categorías prioritarias`)
      } else {
        // Si todas las imágenes prioritarias están usadas, usar cualquier imagen disponible
        console.log(`⚠️ Unsplash: Todas las imágenes prioritarias están usadas, buscando en todas las categorías`)
        
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
          // Si todas las imágenes están usadas, seleccionar la menos reciente de la categoría
          console.log(`⚠️ Unsplash: Todas las imágenes están usadas, seleccionando la menos reciente de ${foundCategory}`)
          
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
            console.log(`✅ Unsplash: Reutilizando imagen más antigua de ${foundCategory}`)
          } else {
            selectedImage = categoryImages[0]
            console.log(`✅ Unsplash: Usando primera imagen de ${foundCategory}`)
          }
        }
      }
    }
    
    console.log('✅ Unsplash: Imagen seleccionada correctamente:', selectedImage.url)
    return selectedImage
    
  } catch (error) {
    console.error('❌ Unsplash: Error seleccionando imagen:', error)
    
    // Respaldo garantizado a primera imagen por defecto
    const backupImage = topicImages.default[0]
    console.log('🔄 Unsplash: Usando imagen de respaldo:', backupImage.url)
    return backupImage
  }
}

export async function getFeaturedImages(count: number = 6): Promise<UnsplashImage[]> {
  const topics = ['tecnologia', 'innovacion', 'creatividad', 'educacion', 'negocios', 'default']
  
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