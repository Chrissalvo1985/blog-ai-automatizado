import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

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
          <Image
            src="/foto.jpeg"
            alt="Foto de Christopher Salvo"
            width={120}
            height={120}
            className="rounded-full border-4 border-indigo-200 dark:border-indigo-700 shadow-lg mb-2 hover:scale-105 transition-transform duration-300"
            priority
          />
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