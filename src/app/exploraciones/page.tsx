import { db } from '@/lib/db'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { formatRelativeTime } from '@/lib/utils'
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  EyeIcon, 
  HeartIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

interface SearchParams {
  buscar?: string
  categoria?: string
  orden?: string
  page?: string
}

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function ExploracionesPage({ searchParams }: PageProps) {
  const { buscar, categoria, orden, page } = await searchParams

  // Paginación
  const pageSize = 6
  const currentPage = Math.max(1, parseInt(page || '1', 10))
  const skip = (currentPage - 1) * pageSize

  // Construir filtros de búsqueda
  const whereCondition: {
    published: boolean
    OR?: Array<{
      title?: { contains: string; mode: 'insensitive' }
      summary?: { contains: string; mode: 'insensitive' }
      category?: { contains: string; mode: 'insensitive' }
    }>
    category?: string
  } = {
    published: true,
  }

  if (buscar) {
    whereCondition.OR = [
      { title: { contains: buscar, mode: 'insensitive' } },
      { summary: { contains: buscar, mode: 'insensitive' } },
      { category: { contains: buscar, mode: 'insensitive' } },
    ]
  }

  if (categoria && categoria !== 'todas') {
    whereCondition.category = categoria
  }

  // Determinar orden
  let orderBy: { publishedAt?: 'desc'; views?: 'desc'; likes?: 'desc' } = { publishedAt: 'desc' }
  if (orden === 'populares') {
    orderBy = { views: 'desc' }
  } else if (orden === 'likes') {
    orderBy = { likes: 'desc' }
  }

  // Obtener posts y categorías
  const [posts, totalPosts, categorias] = await Promise.all([
    db.post.findMany({
      where: whereCondition,
      orderBy,
      skip,
      take: pageSize,
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
    }),
    db.post.count({ where: whereCondition }),
    db.post.groupBy({
      by: ['category'],
      where: { published: true },
      _count: { category: true },
      orderBy: { _count: { category: 'desc' } },
    })
  ])
  const totalPages = Math.ceil(totalPosts / pageSize)

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                    <RocketLaunchIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                    <SparklesIcon className="h-2 w-2 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Exploraciones 🚀
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Descubre todas mis aventuras digitales. Filtra, busca y explora 
                  el contenido que más te interese en este universo de ideas.
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {totalPosts}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {buscar || categoria !== 'todas' ? 'Encontradas' : 'Aventuras'}
                  </div>
                </div>
                <div className="w-1 h-8 bg-gray-300 dark:bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                    {categorias.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mundos</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros y Búsqueda */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="GET" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Buscador */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="buscar"
                    defaultValue={buscar}
                    placeholder="Buscar aventuras, ideas, conceptos..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-4">
                  {/* Filtro de Categoría */}
                  <div className="relative">
                    <select
                      name="categoria"
                      defaultValue={categoria || 'todas'}
                      className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="todas">🌍 Todos los mundos</option>
                      {categorias.map((cat) => (
                        <option key={cat.category} value={cat.category}>
                          {cat.category} ({cat._count.category})
                        </option>
                      ))}
                    </select>
                    <FunnelIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Filtro de Orden */}
                  <div className="relative">
                    <select
                      name="orden"
                      defaultValue={orden || 'recientes'}
                      className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="recientes">🕒 Más recientes</option>
                      <option value="populares">🔥 Más populares</option>
                      <option value="likes">❤️ Más queridas</option>
                    </select>
                  </div>

                  {/* Botón de aplicar filtros */}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <span>Buscar</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Filtros activos */}
            {(buscar || categoria !== 'todas' || orden !== 'recientes') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {buscar && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                    🔍 &quot;{buscar}&quot;
                    <Link
                      href={`/exploraciones?${new URLSearchParams({ 
                        ...(categoria && categoria !== 'todas' && { categoria }), 
                        ...(orden && orden !== 'recientes' && { orden }) 
                      }).toString()}`}
                      className="ml-2 hover:text-blue-600"
                    >
                      ×
                    </Link>
                  </span>
                )}
                {categoria && categoria !== 'todas' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">
                    🌍 {categoria}
                    <Link
                      href={`/exploraciones?${new URLSearchParams({ 
                        ...(buscar && { buscar }), 
                        ...(orden && orden !== 'recientes' && { orden }) 
                      }).toString()}`}
                      className="ml-2 hover:text-indigo-700"
                    >
                      ×
                    </Link>
                  </span>
                )}
                {orden && orden !== 'recientes' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                    {orden === 'populares' ? '🔥 Populares' : '❤️ Queridas'}
                    <Link
                      href={`/exploraciones?${new URLSearchParams({ 
                        ...(buscar && { buscar }),
                        ...(categoria && categoria !== 'todas' && { categoria })
                      }).toString()}`}
                      className="ml-2 hover:text-green-600"
                    >
                      ×
                    </Link>
                  </span>
                )}
                <Link
                  href="/exploraciones"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  🧹 Limpiar filtros
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Grid de Posts */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="group">
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
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
            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Link
                    key={i}
                    href={`/exploraciones?${new URLSearchParams({
                      ...(buscar ? { buscar } : {}),
                      ...(categoria ? { categoria } : {}),
                      ...(orden ? { orden } : {}),
                      page: (i + 1).toString(),
                    }).toString()}`}
                    className={`px-4 py-2 rounded-lg font-medium border transition-colors ${currentPage === i + 1
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-blue-600 border-blue-300 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700'}`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 