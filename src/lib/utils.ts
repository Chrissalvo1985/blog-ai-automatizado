import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import slugify from 'slugify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g,
  })
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'hace un momento'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `hace ${hours} hora${hours > 1 ? 's' : ''}`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `hace ${days} día${days > 1 ? 's' : ''}`
  } else {
    return formatDate(date)
  }
}

export function readingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

export function extractFirstParagraph(content: string): string {
  const paragraphs = content.split('\n\n')
  const firstParagraph = paragraphs.find(p => p.trim() && !p.startsWith('#'))
  return firstParagraph?.trim() || ''
}

export function generateRandomTopics(): string[] {
  const topics = [
    'El Futuro de la Inteligencia Artificial',
    'Consejos para una Vida Sostenible',
    'Productividad en el Trabajo Remoto',
    'Tendencias de Marketing Digital',
    'Hábitos de Vida Saludable',
    'Consejos de Fotografía de Viajes',
    'El Viaje del Emprendimiento',
    'Conciencia sobre Salud Mental',
    'Innovación Tecnológica',
    'Gestión de Finanzas Personales',
    'Técnicas de Escritura Creativa',
    'Fitness y Bienestar',
    'Soluciones al Cambio Climático',
    'Estrategia de Redes Sociales',
    'Desarrollo Profesional',
    'Ciberseguridad en la Era Digital',
    'Tendencias de Alimentación Saludable',
    'Educación Online y Aprendizaje',
    'Tecnologías Emergentes 2024',
    'Mindfulness y Meditación',
  ]
  
  return topics.sort(() => Math.random() - 0.5)
} 