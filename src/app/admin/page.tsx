'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { 
  SparklesIcon, 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

interface Post {
  id: string
  title: string
  slug: string
  category: string
  published: boolean
  views: number
  likes: number
  createdAt: string
  publishedAt: string | null
}

interface GenerationLog {
  id: string
  topic: string
  status: string
  error: string | null
  createdAt: string
  post?: {
    id: string
    title: string
    slug: string
  }
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [logs, setLogs] = useState<GenerationLog[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customTopic, setCustomTopic] = useState('')
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null)
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [postsRes, logsRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/logs')
      ])
      
      if (postsRes.ok) {
        const postsData = await postsRes.json()
        setPosts(postsData.posts || [])
      }
      
      if (logsRes.ok) {
        const logsData = await logsRes.json()
        setLogs(logsData.logs || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/api/debug')
      if (response.ok) {
        const data = await response.json()
        setDebugInfo(data)
      }
    } catch (error) {
      console.error('Error fetching debug info:', error)
    }
  }

  const generatePost = async (topic?: string) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic || undefined,
          autoPublish: true,
        }),
      })

      if (response.ok) {
        await fetchData()
        setCustomTopic('')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error generating post:', error)
      alert('Failed to generate post')
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePublish = async (postId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          published: !currentStatus,
          publishedAt: !currentStatus ? new Date().toISOString() : null,
        }),
      })

      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este artículo?')) return

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchData()
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }



  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona el contenido de tu blog generado por IA</p>
          </div>

          {/* Debug Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Información de Debug</h2>
              <button
                onClick={() => {
                  setShowDebug(!showDebug)
                  if (!showDebug && !debugInfo) {
                    fetchDebugInfo()
                  }
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                {showDebug ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            
            {showDebug && (
              <div className="space-y-4">
                {debugInfo ? (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-gray-500">Cargando información de debug...</div>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={fetchDebugInfo}
                    className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/test')
                        const data = await response.json()
                        alert(`Test API: ${data.message}`)
                      } catch {
                        alert('Error en test API')
                      }
                    }}
                    className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-md"
                  >
                    Test API
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Generation Controls */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Generar Nuevo Contenido</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema Personalizado (opcional)
                </label>
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Ingresa un tema o déjalo en blanco para uno aleatorio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => generatePost(customTopic || undefined)}
                  disabled={isGenerating}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <SparklesIcon className="h-4 w-4 mr-2" />
                  )}
                  {isGenerating ? 'Generando...' : 'Generar Artículo'}
                </button>
                
                <button
                  onClick={() => generatePost()}
                  disabled={isGenerating}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tema Aleatorio
                </button>
              </div>
            </div>
          </div>

          {/* Posts Management */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Artículos ({posts.length})</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vistas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {post.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.published ? 'Publicado' : 'Borrador'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {post.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`/posts/${post.slug}`, '_blank')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => togglePublish(post.id, post.published)}
                            className={`${
                              post.published 
                                ? 'text-yellow-600 hover:text-yellow-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {post.published ? <PencilIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generation Logs */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Registros de Generación</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tema
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artículo Generado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Creado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.slice(0, 10).map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.topic}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : log.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : log.status === 'generating'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {log.status === 'completed' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                          {log.status === 'failed' && <XCircleIcon className="h-3 w-3 mr-1" />}
                          {log.status === 'generating' && <ClockIcon className="h-3 w-3 mr-1" />}
                          {log.status === 'completed' ? 'Completado' : 
                           log.status === 'failed' ? 'Falló' :
                           log.status === 'generating' ? 'Generando' : log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.post ? (
                          <a 
                            href={`/posts/${log.post.slug}`}
                            target="_blank"
                            className="text-blue-600 hover:text-blue-900 truncate max-w-xs block"
                          >
                            {log.post.title}
                          </a>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
} 