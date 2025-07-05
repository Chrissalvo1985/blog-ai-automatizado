import { db } from '@/lib/db'
import BlogCard from '@/components/BlogCard'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SparklesIcon, RocketLaunchIcon, ClockIcon } from '@heroicons/react/24/solid'

export default async function HomePage() {
  // Fetch published posts
  const posts = await db.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 12,
  })

  const featuredPosts = posts.filter(post => post.featured).slice(0, 2)
  const regularPosts = posts.filter(post => !post.featured).slice(0, 6)

  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <SparklesIcon className="h-16 w-16 text-blue-600" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Blog con
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Inteligencia Artificial
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Descubre contenido fresco y atractivo generado diariamente por inteligencia artificial. 
                Mantente actualizado con temas de tendencia, insights expertos y artículos que invitan a la reflexión.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
                  <span>Generación Automática de Contenido</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ClockIcon className="h-5 w-5 text-green-600" />
                  <span>Actualizado Diariamente</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Powered by IA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Artículos Destacados</h2>
                <p className="text-lg text-gray-600">
                  Historias seleccionadas que están en tendencia ahora
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Últimos Artículos</h2>
              <p className="text-lg text-gray-600">
                Contenido fresco entregado por nuestro asistente de escritura con IA
              </p>
            </div>
            
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <SparklesIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Próximamente
                </h3>
                <p className="text-gray-600 mb-6">
                  Contenido fresco generado por IA será publicado diariamente. ¡Vuelve pronto para ver los últimos artículos!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Nunca Te Pierdas una Actualización
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Nuestra IA crea contenido fresco todos los días. Mantente al día con los últimos insights y tendencias.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Nuevo contenido publicado diariamente</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
