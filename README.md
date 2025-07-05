# 🚀 Blog AI Automatizado

Blog automatizado con inteligencia artificial que genera contenido diariamente sobre tecnología y desarrollo.

## ✨ Características

- **Generación automática de contenido** con OpenAI GPT-4
- **PWA (Progressive Web App)** - Instalable en móviles
- **SEO optimizado** - Sitemap, meta tags, URLs amigables
- **Imágenes automáticas** desde Unsplash
- **Responsive design** con Tailwind CSS
- **Base de datos PostgreSQL** con Neon
- **Despliegue automático** en Vercel

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: PostgreSQL (Neon)
- **ORM**: Prisma
- **IA**: OpenAI GPT-4
- **Imágenes**: Unsplash API
- **Hosting**: Vercel

## 🚀 Despliegue Rápido

### 1. Configuración de Base de Datos (Ya completada)
✅ **Base de datos configurada en Neon**
- Proyecto: `proud-darkness-36263835`
- Tablas creadas: `posts`, `generation_logs`, `site_settings`
- Configuración inicial completada

### 2. Variables de Entorno Necesarias

Crea estas variables en Vercel:

```bash
# Base de datos (ya configurada)
DATABASE_URL=postgresql://neondb_owner:npg_VR05qfALNGCK@ep-fragrant-dream-acuele7g-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require

# OpenAI API Key (requerida)
OPENAI_API_KEY=sk-tu-clave-openai-aqui

# Unsplash API Key (opcional pero recomendada)
UNSPLASH_ACCESS_KEY=tu-clave-unsplash-aqui

# URL del sitio (cambiar por tu dominio)
SITE_URL=https://tu-dominio.vercel.app

# Secreto para cron jobs
CRON_SECRET=tu-secreto-aleatorio-aqui
```

### 3. Despliegue en Vercel

1. **Conecta tu repositorio** a Vercel
2. **Configura las variables de entorno** en el dashboard de Vercel
3. **Despliega** - Vercel detectará automáticamente Next.js

### 4. Obtener API Keys

**OpenAI (Requerida)**:
1. Ve a [platform.openai.com](https://platform.openai.com/api-keys)
2. Crea una nueva API key
3. Agrega créditos a tu cuenta

**Unsplash (Opcional)**:
1. Ve a [unsplash.com/developers](https://unsplash.com/developers)
2. Crea una nueva aplicación
3. Copia tu Access Key

## 📱 Funcionalidades

### Generación Automática
- **Cron job diario** a las 9 AM UTC
- **Contenido único** sobre tecnología
- **Imágenes relevantes** automáticas
- **SEO optimizado** por defecto

### Panel de Administración
- Accede a `/admin` para gestionar contenido
- Generar posts manualmente
- Ver logs de generación
- Configurar ajustes

### PWA
- **Instalable** en dispositivos móviles
- **Funciona offline** con Service Worker
- **Notificaciones push** (configurables)

## 🔧 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env.local
# Edita .env.local con tus API keys

# Ejecutar en desarrollo
npm run dev

# Ver base de datos
npm run db:studio
```

## 📊 Monetización

El blog está optimizado para:
- **Tráfico orgánico** (SEO)
- **Google AdSense** (espacios preparados)
- **Marketing de afiliados**
- **Productos digitales**

## 🎯 Próximos Pasos

1. **Personaliza la temática** editando los topics en `src/lib/utils.ts`
2. **Configura Google Analytics** para tracking
3. **Añade AdSense** para monetización
4. **Customiza el diseño** según tu marca

## 📈 Costos Estimados

- **Vercel**: Gratis (hasta 100GB/mes)
- **Neon**: Gratis (hasta 3GB storage)
- **OpenAI**: ~$0.01-0.05 por post
- **Unsplash**: Gratis (5,000 requests/hora)

**Total mensual**: ~$1-3 USD para 30 posts/mes

## 🆘 Soporte

Si tienes problemas:
1. Verifica que todas las variables de entorno estén configuradas
2. Revisa los logs en Vercel Dashboard
3. Asegúrate de tener créditos en OpenAI

¡Tu blog está listo para generar contenido automáticamente! 🎉
