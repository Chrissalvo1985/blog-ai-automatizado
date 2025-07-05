import Link from 'next/link'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Navegación: [
      { name: 'Universo', href: '/' },
              { name: 'Exploraciones', href: '/exploraciones' },
      { name: 'Sobre mí', href: '/about' },
    ],
          Descubrimientos: [
        { name: 'Tecnología', href: '/exploraciones?categoria=Tecnología' },
        { name: 'Creatividad', href: '/exploraciones?categoria=Creatividad' },
        { name: 'Innovación', href: '/exploraciones?categoria=Innovación' },
        { name: 'Inspiración', href: '/exploraciones?categoria=Inspiración' },
      ],
    Conexiones: [
      { name: 'Centro de Control', href: '/admin' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/christopher-salvo-18499793/' },
    ],
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="relative">
                <RocketLaunchIcon className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
              </div>
              <span className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                Nexus
              </span>
            </Link>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Mi universo digital donde comparto descubrimientos, reflexiones y aventuras 
              en el fascinante mundo de la tecnología y la innovación. 🚀
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
                      className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors text-sm"
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
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © {currentYear} Nexus. Hecho con ❤️ y mucha curiosidad.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-400 dark:text-gray-500 text-sm">
                  Siempre explorando
                </span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                ✨ Powered by curiosidad
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 