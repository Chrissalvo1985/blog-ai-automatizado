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
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
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
    'The Future of Artificial Intelligence',
    'Sustainable Living Tips',
    'Remote Work Productivity',
    'Digital Marketing Trends',
    'Healthy Lifestyle Habits',
    'Travel Photography Tips',
    'Entrepreneurship Journey',
    'Mental Health Awareness',
    'Technology Innovation',
    'Personal Finance Management',
    'Creative Writing Techniques',
    'Fitness and Wellness',
    'Climate Change Solutions',
    'Social Media Strategy',
    'Career Development',
  ]
  
  return topics.sort(() => Math.random() - 0.5)
} 