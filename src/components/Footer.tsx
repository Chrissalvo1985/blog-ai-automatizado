import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Empresa: [
      { name: 'Acerca de', href: '/about' },
      { name: 'Contacto', href: '/contact' },
      { name: 'Política de Privacidad', href: '/privacy' },
      { name: 'Términos de Servicio', href: '/terms' },
    ],
    Categorías: [
      { name: 'Tecnología', href: '/categories/technology' },
      { name: 'Estilo de Vida', href: '/categories/lifestyle' },
      { name: 'Negocios', href: '/categories/business' },
      { name: 'Salud', href: '/categories/health' },
    ],
    Recursos: [
      { name: 'Blog', href: '/' },
      { name: 'RSS Feed', href: '/feed.xml' },
      { name: 'Mapa del Sitio', href: '/sitemap.xml' },
      { name: 'Admin', href: '/admin' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="relative">
                <SparklesIcon className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                Blog IA
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blog automatizado con inteligencia artificial que entrega contenido fresco y atractivo diariamente. 
              Descubre temas de tendencia e insights expertos.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Blog IA. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">
                Powered by IA
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 