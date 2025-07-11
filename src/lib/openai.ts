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

export async function generateBlogPost(topic: string, context?: string, customContent?: string): Promise<GeneratedContent> {
  console.log('🤖 OpenAI: Starting content generation for topic:', topic)
  if (context) console.log('📝 Context:', context)
  if (customContent) console.log('📝 CustomContent:', customContent)

  let prompt = `Crea un artículo profesional y educativo sobre "${topic}".`
  if (context) {
    prompt += `\n\nTipo de contenido: ${context}. Adapta el formato, estilo y estructura para crear una ${context} auténtica y original.`
  }
  if (customContent) {
    prompt += `\n\nIntegra este contenido del autor de manera natural y profesional:\n"""${customContent}"""\nExpande y desarrolla estas ideas con análisis y contexto adicional.`
  }
  
  prompt += `\n\nENFOQUE TEMÁTICO OBLIGATORIO:
  El contenido DEBE conectar con al menos 2-3 de estas áreas:
  - 🚀 Tecnología emergente (IA, blockchain, IoT, realidad aumentada, etc.)
  - 💡 Innovación disruptiva y transformación digital
  - 🎨 Creatividad y diseño en la era digital
  - 🎓 Educación del futuro y aprendizaje continuo
  - 🏢 Negocios digitales y emprendimiento tech

  VARIEDAD ESTRUCTURAL OBLIGATORIA:
  NO uses la estructura típica de introducción-desarrollo-conclusión. En su lugar, elige UNA de estas estructuras:
  
  1. **Formato Lista Analítica**: Enumera y analiza múltiples aspectos del tema
  2. **Formato Pregunta-Respuesta**: Plantea preguntas clave y respóndelas
  3. **Formato Comparativo**: Compara diferentes enfoques o tecnologías
  4. **Formato Futuro-Presente**: Describe tendencias y su impacto actual
  5. **Formato Problema-Solución**: Identifica desafíos y presenta soluciones
  6. **Formato Paso a Paso**: Guía práctica con metodología clara
  7. **Formato Tendencias**: Analiza múltiples tendencias convergentes
  8. **Formato Mitos vs. Realidad**: Desmonta conceptos erróneos
  9. **Formato Análisis Profundo**: Disecciona un tema desde múltiples ángulos
  10. **Formato Impacto**: Examina las implicaciones a corto y largo plazo

  REGLAS ESTRICTAS DE CONTENIDO:
  - NO inventes experiencias personales, conversaciones o anécdotas
  - NO incluyas enlaces a imágenes, videos o recursos específicos
  - NO hagas afirmaciones como "he visto", "he conversado", "en mi experiencia"
  - NO uses primera persona para experiencias inventadas
  - SÍ usa datos verificables, estadísticas y tendencias reales del mercado
  - SÍ menciona empresas, productos y casos de estudio conocidos
  - SÍ incluye análisis objetivo y basado en evidencia

  REQUISITOS DE CALIDAD:
  - Español nativo, tono profesional pero accesible
  - Incluye datos específicos y estadísticas cuando sea posible
  - Usa metáforas y analogías para explicar conceptos complejos
  - Incluye al menos 3 subtemas específicos relacionados
  - Integra tendencias actuales (2024) con fuentes implícitas
  - Perspectiva global con relevancia para el mercado hispano
  - Longitud: 1000-1500 palabras
  - Formato markdown con estructura clara (encabezados, listas, énfasis)

  ORIGINALIDAD Y PRECISIÓN:
  - Evita clichés y lugares comunes
  - Incluye perspectivas analíticas y datos concretos
  - Conecta conceptos de manera lógica y fundamentada
  - Usa terminología técnica apropiada pero explicada
  - Incluye predicciones basadas en tendencias actuales
  - Proporciona valor educativo real y actionable

  ESTRUCTURA FINAL:
  - Título llamativo y específico
  - Introducción que enganche sin ser sensacionalista
  - Desarrollo según la estructura elegida
  - Conclusión con reflexiones y próximos pasos
  - Llamada a la acción específica y relevante

  \nEstructura tu respuesta como JSON con estos campos:
  - title: Título específico y atractivo (máximo 60 caracteres)
  - summary: Meta descripción informativa (máximo 160 caracteres)
  - content: Contenido completo en markdown siguiendo UNA estructura
  - tags: 4-6 etiquetas específicas y actuales
  - category: Elige entre: Tecnología, Innovación, Creatividad, Educación, Negocios`

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
          content: 'Eres un analista experto en tecnología e innovación que crea contenido educativo y profesional. Tu especialidad es analizar tendencias, explicar conceptos complejos y proporcionar insights valiosos basados en datos y evidencia. NUNCA inventes experiencias personales. Siempre te basas en información verificable y análisis objetivo. Respondes ÚNICAMENTE con JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 3000,
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
  const prompt = `Genera ${count} ideas de temas innovadores para artículos de blog que sean tendencia en 2024.
  
  ENFOQUE OBLIGATORIO - Todos los temas deben estar relacionados con:
  🚀 Tecnología emergente (IA, blockchain, IoT, realidad aumentada, etc.)
  💡 Innovación disruptiva y transformación digital  
  🎨 Creatividad y diseño en la era digital
  🎓 Educación del futuro y aprendizaje continuo
  🏢 Negocios digitales y emprendimiento tech
  
  CRITERIOS ESPECÍFICOS:
  - Actuales y relevantes para 2024
  - Angulo único o perspectiva contraintuitiva
  - Potencial viral para audiencia tech-savvy
  - Incluye tendencias emergentes
  - Enfoque en el mercado hispanohablante
  - Combina múltiples disciplinas
  - Potencial para generar debate constructivo
  
  EJEMPLOS del tipo de temas que necesito:
  - "Cómo la IA está reinventando el arte tradicional latinoamericano"
  - "El futuro del trabajo remoto: ciudades digitales vs. nomadismo tech"
  - "Blockchain más allá de las crypto: revolucionando la educación"
  - "Por qué los freelancers están construyendo el futuro económico"
  - "La creatividad algorítmica: cuando las máquinas aprenden a innovar"
  
  Devuelve ÚNICAMENTE un array JSON de strings con temas específicos y accionables.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Eres un estratega de contenido especializado en tecnología e innovación. Generas ideas específicas y trending que conectan múltiples disciplinas. Siempre respondes con JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.95,
      max_tokens: 800,
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