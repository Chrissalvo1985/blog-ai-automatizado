import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime, readingTime } from '@/lib/utils'
import { ClockIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline'

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
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const tags = JSON.parse(post.tags) as string[]
  const publishDate = post.publishedAt || post.createdAt
  const estimatedReadTime = readingTime(post.summary)

  return (
    <article className={`group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
        <Image
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          priority={featured}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              Destacado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          <Link href={`/posts/${post.slug}`} className="stretched-link">
            {post.title}
          </Link>
        </h2>

        {/* Summary */}
        <p className={`text-gray-600 mb-4 leading-relaxed ${featured ? 'text-lg' : 'text-base'}`}>
          {post.summary}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{formatRelativeTime(publishDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>{estimatedReadTime} min lectura</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <EyeIcon className="h-4 w-4" />
              <span>{post.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-4 w-4" />
              <span>{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
} 