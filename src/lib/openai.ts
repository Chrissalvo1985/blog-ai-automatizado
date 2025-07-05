import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface GeneratedContent {
  title: string
  summary: string
  content: string
  tags: string[]
  category: string
}

export async function generateBlogPost(topic: string): Promise<GeneratedContent> {
  console.log('🤖 OpenAI: Starting content generation for topic:', topic)
  
  const prompt = `Escribe un artículo de blog completo y profesional sobre "${topic}". 
  
  Requisitos:
  - Escribe en español con un tono profesional y atractivo
  - Incluye insights accionables y consejos prácticos
  - Usa formato markdown con encabezados, listas y énfasis
  - Apunta a 800-1200 palabras
  - Hazlo amigable para SEO con integración natural de palabras clave
  - Incluye una introducción atractiva y una conclusión sólida
  - Enfócate en contenido relevante para audiencia hispanohablante
  
  Estructura tu respuesta como un objeto JSON con los siguientes campos:
  - title: Un título atractivo y optimizado para SEO (máximo 60 caracteres)
  - summary: Un resumen breve/meta descripción (máximo 160 caracteres)
  - content: El contenido completo del artículo en formato markdown
  - tags: Un array de 3-5 etiquetas relevantes en español
  - category: Una sola categoría que mejor se ajuste al contenido
  
  Categorías disponibles: Tecnología, Estilo de Vida, Negocios, Salud, Viajes, Comida, Ciencia, Entretenimiento, Educación, Finanzas`

  try {
    console.log('🤖 OpenAI: Making API call...')
    
    // Verify API key exists
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }

    if (process.env.OPENAI_API_KEY.includes('tu-cl') || process.env.OPENAI_API_KEY.includes('aqui')) {
      throw new Error('OPENAI_API_KEY appears to be a placeholder. Please set a real API key.')
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un escritor profesional de blogs que crea contenido atractivo y optimizado para SEO en español. Siempre responde con JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    })

    console.log('🤖 OpenAI: API call successful')

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI returned empty content')
    }

    console.log('🤖 OpenAI: Content received, length:', content.length)

    // Clean the content to extract JSON
    let cleanContent = content.trim()
    
    // Remove markdown code blocks if present
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    console.log('🤖 OpenAI: Parsing JSON response...')
    let parsed: GeneratedContent
    
    try {
      parsed = JSON.parse(cleanContent) as GeneratedContent
    } catch (parseError) {
      console.error('❌ OpenAI: JSON parsing failed. Raw content:', cleanContent.substring(0, 500))
      throw new Error(`Failed to parse OpenAI response as JSON: ${parseError instanceof Error ? parseError.message : 'Unknown parsing error'}`)
    }
    
    // Validate required fields
    const requiredFields = ['title', 'summary', 'content', 'tags', 'category']
    const missingFields = requiredFields.filter(field => !parsed[field as keyof GeneratedContent])
    
    if (missingFields.length > 0) {
      console.error('❌ OpenAI: Missing required fields:', missingFields)
      throw new Error(`Generated content missing required fields: ${missingFields.join(', ')}`)
    }

    console.log('✅ OpenAI: Content validation successful')
    return parsed
    
  } catch (error) {
    console.error('❌ OpenAI: Error generating blog post:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error('OpenAI API authentication failed. Please check your API key.')
      } else if (error.message.includes('429')) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.')
      } else if (error.message.includes('quota')) {
        throw new Error('OpenAI API quota exceeded. Please check your billing.')
      } else if (error.message.includes('insufficient_quota')) {
        throw new Error('OpenAI API insufficient quota. Please add credits to your account.')
      }
    }
    
    throw new Error(`Failed to generate blog post content: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateTopicIdeas(count: number = 5): Promise<string[]> {
  const prompt = `Genera ${count} ideas de temas para artículos de blog que sean tendencia y atractivos, que funcionen bien para SEO y engagement en redes sociales. 
  
  Los temas deben ser:
  - Actuales y relevantes para audiencia hispanohablante
  - Buscables y con buen potencial de palabras clave
  - Atractivos para una audiencia general
  - Accionables y prácticos
  - En español
  
  Devuelve solo un array JSON de strings con los temas, sin texto adicional.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un estratega de contenido que genera temas virales para blogs en español. Siempre responde con JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No topics generated')
    }

    return JSON.parse(content) as string[]
  } catch (error) {
    console.error('Error generating topic ideas:', error)
    throw new Error('Failed to generate topic ideas')
  }
} 