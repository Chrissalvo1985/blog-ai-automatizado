# 🚀 Despliegue Automático en Vercel

## Configuración Rápida (5 minutos)

### 1. Preparación de Base de Datos
1. Ve a [neon.tech](https://neon.tech/) y crea una cuenta gratis
2. Crea un nuevo proyecto
3. Copia la cadena de conexión (DATABASE_URL)
4. Asegúrate de que la URL incluya `?sslmode=require` al final

### 2. Despliegue en Vercel
1. Haz fork de este repositorio
2. Ve a [vercel.com](https://vercel.com/) e importa tu fork
3. Agrega estas variables de entorno:

```
DATABASE_URL=postgresql://tu-usuario:tu-password@tu-host.neon.tech/tu-db?sslmode=require
OPENAI_API_KEY=sk-tu-clave-openai
SITE_URL=https://tu-dominio.vercel.app
CRON_SECRET=cualquier-string-secreto-aleatorio
```

### 3. Configuración Post-Despliegue
Después del primer despliegue, ejecuta en tu terminal local:

```bash
# Clona tu fork
git clone https://github.com/tu-usuario/tu-fork.git
cd tu-fork

# Instala dependencias
npm install

# Configura la base de datos
npm run deploy-db
```

### 4. Verificación
- Tu blog estará disponible en `https://tu-dominio.vercel.app`
- El panel admin en `https://tu-dominio.vercel.app/admin`
- Se generará un post automáticamente cada día a las 9 AM UTC

## Características Incluidas

### ✅ Generación Automática de Contenido
- Un post nuevo cada día
- Contenido optimizado para SEO
- Imágenes automáticas de Unsplash
- Temática: Tecnología y desarrollo

### ✅ Optimización SEO
- Meta tags dinámicos
- Sitemap automático
- Robots.txt configurado
- URLs amigables

### ✅ PWA (Progressive Web App)
- Instalable en móviles
- Funciona offline
- Notificaciones push (configurables)

### ✅ Monetización Lista
- Estructura optimizada para AdSense
- Espacios preparados para banners
- Analytics integrable

## Personalización

### Cambiar Temática del Blog
Edita `src/lib/topics.ts` para cambiar los temas de contenido:

```typescript
export const BLOG_TOPICS = [
  'Tu tema 1',
  'Tu tema 2',
  // ...
]
```

### Modificar Frecuencia de Posts
Edita `vercel.json` para cambiar el horario:

```json
{
  "crons": [{
    "path": "/api/cron/daily-post",
    "schedule": "0 9 * * *"  // Cambia el horario aquí
  }]
}
```

## Costos
- **Vercel**: Gratis (hasta 100GB bandwidth/mes)
- **Neon Database**: Gratis (hasta 3GB storage)
- **OpenAI API**: ~$0.01-0.05 por post generado

## Soporte
El blog está listo para generar ingresos pasivos mediante:
- Tráfico orgánico (SEO optimizado)
- Publicidad (AdSense)
- Afiliados (enlaces en contenido)
- Productos digitales (fácil integración) 