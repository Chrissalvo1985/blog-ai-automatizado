import { db } from '@/lib/db'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'
import { ArrowRightIcon, FireIcon, EyeIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default async function HomePage() {
  // Obtener solo los últimos 3 posts para preview
  const latestPosts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      imageUrl: true,
      imageAlt: true,
      category: true,
      tags: true,
      views: true,
      likes: true,
      createdAt: true,
      publishedAt: true,
    }
  })

  // Estadísticas básicas para la bienvenida
  const stats = await db.post.aggregate({
    where: { published: true },
    _count: { id: true },
    _sum: { views: true },
  })

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-white dark:bg-gray-900">
        {/* Hero/Welcome Section */}
        <section className="relative py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Bienvenida Personal */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✨</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                  ¡Hola, explorador! 👋
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  Bienvenido a mi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 font-semibold">universo digital</span>, 
                  donde comparto descubrimientos, reflexiones y aventuras en el mundo de la tecnología.
                </p>
              </div>
              
              {/* Stats divertidas */}
              <div className="flex justify-center items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats._count.id}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Aventuras</div>
                </div>
                <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    {stats._sum.views?.toLocaleString() || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Miradas</div>
                </div>
                <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ∞
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Ideas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Últimas Exploraciones */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center space-x-2 mb-4">
                <FireIcon className="h-6 w-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Últimas Exploraciones
                </h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Un vistazo a mis descubrimientos más recientes
              </p>
            </div>
            
            {/* Grid de 3 posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {latestPosts.map((post, index) => (
                <article key={post.id} className="group">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index === 0}
                    />
                    
                    {/* Badge de categoría */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-gray-900 backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                      <Link href={`/posts/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {post.summary.substring(0, 120)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span>{formatRelativeTime(post.publishedAt || post.createdAt)}</span>
                      
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
              ))}
            </div>

            {/* CTA para ver más */}
            <div className="text-center">
              <Link
                href="/exploraciones"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-700 to-indigo-700 rounded-full hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Explorar todo el universo
                <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sección de invitación personal */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 lg:p-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  ¿Te unes a la aventura?
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Este es mi espacio para compartir lo que descubro, aprendo y creo. 
                  Desde reflexiones sobre tecnología hasta experimentos creativos. 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> ¡Siempre hay algo nuevo por explorar!</span>
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                    🚀 Tecnología
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                    🎨 Creatividad
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                    💡 Innovación
                  </span>
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                    🌟 Inspiración
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
