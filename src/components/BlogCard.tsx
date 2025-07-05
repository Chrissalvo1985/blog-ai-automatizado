import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime, readingTime } from '@/lib/utils'
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    summary: string
    imageUrl: string
    imageAlt: string
    category: string
    tags: string
    views: number
    likes: number
    createdAt: Date
    publishedAt: Date | null
  }
  featured?: boolean
  variant?: 'default' | 'compact' | 'hero'
}

export default function BlogCard({ post, featured = false, variant = 'default' }: BlogCardProps) {
  const tags = post.tags ? JSON.parse(post.tags) as string[] : []
  const publishDate = post.publishedAt || post.createdAt
  const estimatedReadTime = readingTime(post.summary)

  if (variant === 'hero') {
    return (
      <article className="group relative">
        <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {post.category}
                </span>
                <span className="text-sm opacity-90">
                  {formatRelativeTime(publishDate)}
                </span>
              </div>
              
              <h2 className="text-3xl font-bold leading-tight group-hover:text-blue-300 transition-colors">
                <Link href={`/posts/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-lg opacity-90 leading-relaxed">
                {post.summary.substring(0, 150)}...
              </p>
              
              <div className="flex items-center space-x-4 text-sm opacity-75">
                <span>{post.views.toLocaleString()} vistas</span>
                <span>•</span>
                <span>{estimatedReadTime} min lectura</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group flex space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              {post.category}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(publishDate)}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 line-clamp-2">
            <Link href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{post.views.toLocaleString()} vistas</span>
            <span>{post.likes.toLocaleString()} likes</span>
          </div>
        </div>
      </article>
    )
  }

  // Default variant - Editorial style
  return (
    <article className="group">
      <div className="relative h-56 rounded-xl overflow-hidden mb-4">
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              Destacado
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {post.summary.substring(0, 120)}...
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <span>{formatRelativeTime(publishDate)}</span>
            <span>•</span>
            <span>{estimatedReadTime} min</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <EyeIcon className="h-3 w-3" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-3 w-3" />
              <span>{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
} 