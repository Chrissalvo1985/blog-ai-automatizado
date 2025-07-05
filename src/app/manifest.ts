import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AutoBlog - AI-Powered Blog',
    short_name: 'AutoBlog',
    description: 'AI-Powered Automated Blog with fresh content daily',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['news', 'productivity', 'education'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
} 