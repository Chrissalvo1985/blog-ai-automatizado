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

  let prompt = `Crea un artículo único e innovador sobre "${topic}".`
  if (context) {
    prompt += `\n\nTipo de contenido: ${context}. Adapta completamente el formato, estilo y estructura para crear una ${context} auténtica y original.`
  }
  if (customContent) {
    prompt += `\n\nIntegra este contenido del autor de manera creativa y natural:\n"""${customContent}"""\nNo lo copies tal cual, transfórmalo y expándelo creativamente.`
  }
  
  prompt += `\n\nENFOQUE TEMÁTICO OBLIGATORIO:
  El contenido DEBE conectar con al menos 2-3 de estas áreas:
  - 🚀 Tecnología emergente (IA, blockchain, IoT, realidad aumentada, etc.)
  - 💡 Innovación disruptiva y transformación digital
  - 🎨 Creatividad y diseño en la era digital
  - 🎓 Educación del futuro y aprendizaje continuo
  - 🏢 Negocios digitales y emprendimiento tech

  VARIEDAD ESTRUCTURAL OBLIGATORIA:
  NO uses la estructura típica de introducción-desarrollo-conclusión. En su lugar, elige UNA de estas estructuras creativas:
  
  1. **Formato Historia Personal**: Narra como una experiencia personal o caso de estudio
  2. **Formato Pregunta-Respuesta**: Estructura como una conversación o entrevista
  3. **Formato Lista Innovadora**: Crea una lista numerada con análisis profundo
  4. **Formato Comparativo**: Antes vs. Después, o comparación de enfoques
  5. **Formato Futuro-Presente**: Comienza describiendo el futuro y regresa al presente
  6. **Formato Problema-Solución**: Plantea desafíos y múltiples soluciones
  7. **Formato Tendencias**: Analiza múltiples tendencias convergentes
  8. **Formato Mitos vs. Realidad**: Desmonta mitos y presenta la verdad
  9. **Formato Guía Práctica**: Pasos accionables con ejemplos reales
  10. **Formato Reflexión Filosófica**: Perspectiva profunda sobre implicaciones

  REQUISITOS DE CALIDAD:
  - Español nativo, tono conversacional pero profesional
  - Incluye datos específicos, estadísticas o ejemplos reales cuando sea posible
  - Usa metáforas y analogías creativas
  - Incluye al menos 3 subtemas específicos relacionados
  - Integra tendencias actuales (2024)
  - Perspectiva latinoamericana cuando sea relevante
  - Incluye elementos visuales descriptivos (para mejorar engagement)
  - Llamadas a la acción específicas y creativas
  - Longitud: 1000-1500 palabras
  - Formato markdown con elementos visuales (emojis, listas, citas)

  ORIGINALIDAD GARANTIZADA:
  - Evita frases clichés y lugares comunes
  - Incluye perspectivas contraintuitivas o ángulos únicos
  - Conecta conceptos aparentemente no relacionados
  - Usa referencias culturales contemporáneas
  - Incluye predicciones específicas o hipótesis audaces

  \nEstructura tu respuesta como JSON con estos campos:
  - title: Título magnético y específico (máximo 60 caracteres)
  - summary: Meta descripción que genere curiosidad (máximo 160 caracteres)
  - content: Contenido completo en markdown siguiendo UNA estructura creativa
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
          content: 'Eres un escritor experto en tecnología e innovación que crea contenido viral y educativo. Tu especialidad es combinar conceptos técnicos con narrativas humanas. Generas contenido variado, nunca repetitivo, siempre enfocado en el futuro digital. Respondes ÚNICAMENTE con JSON válido.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
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