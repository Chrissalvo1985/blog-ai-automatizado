import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateBlogPost } from '@/lib/openai'
import { getImageForTopic } from '@/lib/unsplash'
import { createSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting blog post generation...')
    
    // Parse request body
    let body
    try {
      body = await request.json()
      console.log('📝 Request body:', body)
    } catch (error) {
      console.error('❌ Error parsing request body:', error)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { topic, context, customContent, autoPublish = false } = body

    if (!topic && !customContent) {
      console.error('❌ No topic or customContent provided')
      return NextResponse.json(
        { error: 'Se requiere un tema o contenido propio' },
        { status: 400 }
      )
    }

    // Si no hay topic pero hay customContent, usamos customContent como topic base
    const effectiveTopic = topic || customContent

    console.log('🎯 Topic:', effectiveTopic)
    console.log('📤 Auto publish:', autoPublish)
    console.log('📝 Context:', context)
    console.log('📝 CustomContent:', customContent)

    // Check environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not configured')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    if (!process.env.UNSPLASH_ACCESS_KEY) {
      console.warn('⚠️ UNSPLASH_ACCESS_KEY not configured, will use placeholder image')
    }

    // Create generation log
    console.log('📊 Creating generation log...')
    const generationLog = await db.generationLog.create({
      data: {
        topic: effectiveTopic,
        status: 'generating',
      },
    })
    console.log('✅ Generation log created:', generationLog.id)

    try {
      // Generate content using OpenAI
      console.log('🤖 Generating content with OpenAI...')
      const generatedContent = await generateBlogPost(effectiveTopic, context, customContent)
      console.log('✅ Content generated:', {
        title: generatedContent.title,
        category: generatedContent.category,
        tagsCount: generatedContent.tags.length
      })
      
      // Get image from Unsplash
      console.log('🖼️ Getting image from Unsplash...')
      const image = await getImageForTopic(effectiveTopic)
      console.log('✅ Image obtained:', image.url)
      
      // Create slug from title
      const slug = createSlug(generatedContent.title)
      console.log('🔗 Generated slug:', slug)
      
      // Check if slug already exists and make it unique
      let uniqueSlug = slug
      let counter = 1
      while (await db.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      console.log('🔗 Final unique slug:', uniqueSlug)

      // Create the blog post
      console.log('💾 Creating blog post in database...')
      const post = await db.post.create({
        data: {
          title: generatedContent.title,
          slug: uniqueSlug,
          summary: generatedContent.summary,
          content: generatedContent.content,
          imageUrl: image.url,
          imageAlt: image.alt,
          tags: JSON.stringify(generatedContent.tags),
          category: generatedContent.category,
          published: autoPublish,
          publishedAt: autoPublish ? new Date() : null,
        },
      })
      console.log('✅ Blog post created:', post.id)

      // Update generation log
      await db.generationLog.update({
        where: { id: generationLog.id },
        data: {
          status: 'completed',
          postId: post.id,
        },
      })
      console.log('✅ Generation log updated to completed')

      return NextResponse.json({
        success: true,
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          published: post.published,
        },
      })

    } catch (error) {
      console.error('❌ Error during generation process:', error)
      
      // Update generation log with error
      await db.generationLog.update({
        where: { id: generationLog.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })

      throw error
    }

  } catch (error) {
    console.error('❌ Fatal error in blog post generation:', error)
    
    let errorMessage = 'Failed to generate blog post'
    let statusCode = 500
    
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('API key')) {
        errorMessage = 'Invalid OpenAI API key'
        statusCode = 401
      } else if (error.message.includes('quota') || error.message.includes('billing')) {
        errorMessage = 'OpenAI API quota exceeded or billing issue'
        statusCode = 402
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'OpenAI API rate limit exceeded'
        statusCode = 429
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    )
  }
} 