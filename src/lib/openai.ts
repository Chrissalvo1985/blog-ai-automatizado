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
  const prompt = `Write a comprehensive blog post about "${topic}". 
  
  Requirements:
  - Write in a professional, engaging tone
  - Include actionable insights and practical tips
  - Use proper markdown formatting with headers, lists, and emphasis
  - Aim for 800-1200 words
  - Make it SEO-friendly with natural keyword integration
  - Include a compelling introduction and conclusion
  
  Please structure your response as a JSON object with the following fields:
  - title: A compelling, SEO-friendly title (max 60 characters)
  - summary: A brief summary/meta description (max 160 characters)
  - content: The full blog post content in markdown format
  - tags: An array of 3-5 relevant tags
  - category: A single category that best fits the content
  
  Categories to choose from: Technology, Lifestyle, Business, Health, Travel, Food, Science, Entertainment, Education, Finance`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blog writer who creates engaging, SEO-optimized content. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content generated')
    }

    // Clean the content to extract JSON
    let cleanContent = content.trim()
    
    // Remove markdown code blocks if present
    if (cleanContent.startsWith('```json')) {
      cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '')
    } else if (cleanContent.startsWith('```')) {
      cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '')
    }

    const parsed = JSON.parse(cleanContent) as GeneratedContent
    
    // Validate required fields
    if (!parsed.title || !parsed.summary || !parsed.content || !parsed.tags || !parsed.category) {
      throw new Error('Generated content missing required fields')
    }

    return parsed
  } catch (error) {
    console.error('Error generating blog post:', error)
    throw new Error('Failed to generate blog post content')
  }
}

export async function generateTopicIdeas(count: number = 5): Promise<string[]> {
  const prompt = `Generate ${count} trending and engaging blog post topic ideas that would perform well for SEO and social media engagement. 
  
  Topics should be:
  - Current and relevant
  - Searchable and have good keyword potential
  - Engaging for a general audience
  - Actionable and practical
  
  Return only a JSON array of topic strings, no additional text.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a content strategist who generates viral-worthy blog topics. Always respond with valid JSON.',
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