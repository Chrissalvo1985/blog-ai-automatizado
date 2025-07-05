import { notFound } from 'next/navigation'
import Image from 'next/image'
import { db } from '@/lib/db'
import { formatDate, readingTime } from '@/lib/utils'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ClockIcon, EyeIcon, HeartIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

// Función para formatear el contenido de manera dinámica
function formatContent(content: string): string {
  let formattedContent = content

  // Convertir títulos con # en headers HTML con colores sutiles
  formattedContent = formattedContent.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-blue-800 dark:text-blue-300 mt-6 mb-3">$1</h3>')
  formattedContent = formattedContent.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-blue-900 dark:text-blue-200 mt-8 mb-4">$1</h2>')
  formattedContent = formattedContent.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-10 mb-6">$1</h1>')

  // Convertir texto en negrita **texto** con fondo sutil
  formattedContent = formattedContent.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100 bg-blue-50 dark:bg-blue-900/20 px-1 rounded">$1</strong>')

  // Convertir texto en cursiva *texto*
  formattedContent = formattedContent.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-blue-700 dark:text-blue-300">$1</em>')

  // Convertir listas numeradas con números en color
  formattedContent = formattedContent.replace(/^(\d+)\.\s(.+)$/gm, '<li class="mb-2 text-gray-900 dark:text-gray-100"><span class="font-medium text-blue-600 dark:text-blue-400">$1.</span> $2</li>')

  // Convertir listas con guiones con viñetas de color
  formattedContent = formattedContent.replace(/^-\s(.+)$/gm, '<li class="mb-2 text-gray-900 dark:text-gray-100"><span class="text-blue-600 dark:text-blue-400 font-bold">•</span> $1</li>')

  // Envolver listas en contenedores
  formattedContent = formattedContent.replace(/(<li[^>]*>.*?<\/li>)(?:\s*<li[^>]*>.*?<\/li>)*/g, (match) => {
    return `<ul class="my-4 pl-4">${match}</ul>`
  })

  // Convertir párrafos
  const lines = formattedContent.split('\n')
  const processedLines = lines.map(line => {
    const trimmedLine = line.trim()
    
    // Si ya es HTML, no lo toques
    if (trimmedLine.startsWith('<') || trimmedLine === '') {
      return line
    }
    
    // Si es un párrafo normal, envolverlo
    if (trimmedLine.length > 0) {
      return `<p class="mb-4 text-gray-900 dark:text-gray-100 leading-relaxed">${trimmedLine}</p>`
    }
    
    return line
  })

  formattedContent = processedLines.join('\n')

  return formattedContent
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await db.post.findUnique({
    where: { slug },
  })

  if (!post) {
    return {
      title: 'Artículo No Encontrado',
    }
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.imageUrl],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [post.imageUrl],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await db.post.findUnique({
    where: { slug },
  })

  if (!post || !post.published) {
    notFound()
  }

  // Increment view count
  await db.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  const tags = post.tags ? JSON.parse(post.tags) as string[] : []
  const publishDate = post.publishedAt || post.createdAt
  const estimatedReadTime = readingTime(post.content)

  // Get related posts
  const relatedPosts = await db.post.findMany({
    where: {
      published: true,
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  // Formatear el contenido
  const formattedContent = formatContent(post.content)

  return (
    <>
      <Header />
      
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <header className="mb-8">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 dark:text-gray-300 mb-6">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span>{formatDate(publishDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span>{estimatedReadTime} min lectura</span>
              </div>
              <div className="flex items-center space-x-2">
                <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span>{post.views.toLocaleString()} vistas</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span>{post.likes.toLocaleString()} likes</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
              {post.summary}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="article-content text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: formattedContent
              }} 
            />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                Artículos Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.imageUrl}
                        alt={relatedPost.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                        <a href={`/posts/${relatedPost.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {relatedPost.title}
                        </a>
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                        {relatedPost.summary}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
} 