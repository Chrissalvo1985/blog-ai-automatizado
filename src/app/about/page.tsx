import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { UserCircleIcon, CpuChipIcon } from '@heroicons/react/24/solid'

export const metadata = {
  title: 'Sobre mí',
  description: 'Conoce quién soy, qué hago y por qué lo hago.'
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <section className="max-w-2xl w-full bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center gap-6 border border-indigo-100 dark:border-indigo-900 relative overflow-hidden animate-fade-in">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 dark:from-blue-900 dark:to-indigo-800 rounded-full blur-2xl opacity-40 pointer-events-none" />
          <div className="relative mb-2 flex items-center justify-center">
            <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
              <circle cx="56" cy="56" r="52" fill="#e0e7ff" className="dark:fill-indigo-700" />
              <ellipse cx="56" cy="60" rx="32" ry="36" fill="#fff" className="dark:fill-gray-900" />
              <ellipse cx="56" cy="54" rx="20" ry="22" fill="#c7d2fe" className="dark:fill-indigo-800" />
              <rect x="38" y="80" width="36" height="8" rx="4" fill="#6366f1" className="dark:fill-indigo-400" />
              <ellipse cx="44" cy="54" rx="4" ry="4" fill="#1e293b" className="dark:fill-white" />
              <ellipse cx="68" cy="54" rx="4" ry="4" fill="#1e293b" className="dark:fill-white" />
              <rect x="48" y="44" width="16" height="6" rx="3" fill="#6366f1" className="dark:fill-indigo-400" opacity="0.2" />
              <rect x="52" y="70" width="8" height="8" rx="2" fill="#0ea5e9" className="dark:fill-blue-400 animate-pulse" />
              <rect x="54" y="72" width="4" height="4" rx="1" fill="#fff" className="dark:fill-gray-900" />
              <rect x="60" y="72" width="2" height="4" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="50" y="72" width="2" height="4" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="56" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="54" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="58" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="52" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="60" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="48" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="62" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
              <rect x="46" y="78" width="2" height="2" rx="1" fill="#6366f1" className="dark:fill-indigo-400" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 dark:text-indigo-200 text-center">Hola, soy Chris.</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl">
            Soy un apasionado de la innovación, la tecnología y el aprendizaje continuo. Me dedico a liderar proyectos de transformación digital, desarrollo de software y automatización con IA, siempre buscando crear soluciones que realmente aporten valor a las personas y organizaciones.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {['Transformación Digital', 'UX/UI', 'React', 'IA', 'Liderazgo', 'Optimización', 'Automatización', 'Gestión de Proyectos'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 text-xs font-semibold shadow-sm hover:scale-105 transition-transform cursor-default">
                {tag}
              </span>
            ))}
          </div>
          <blockquote className="italic text-indigo-600 dark:text-indigo-300 text-center mt-4 border-l-4 border-indigo-400 pl-4">
            "Creo en el poder de la humildad, la curiosidad y la colaboración para transformar el mundo, un proyecto a la vez."
          </blockquote>
          <div className="mt-6 space-y-3 text-base text-gray-600 dark:text-gray-400 text-center">
            <p>
              ¿Por qué hago lo que hago? Porque disfruto ver cómo la tecnología puede mejorar vidas, simplificar procesos y abrir nuevas oportunidades. Me motiva aprender de otros, compartir conocimiento y construir equipos donde todos crecen.
            </p>
            <p>
              Si quieres saber más, colaborar o simplemente conversar sobre innovación, ¡escríbeme! Siempre hay algo nuevo por descubrir.
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center gap-2">
            {/* Contacto eliminado por privacidad */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 