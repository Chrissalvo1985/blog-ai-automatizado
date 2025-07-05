import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateBlogPost } from '@/lib/openai'
import { getImageForTopic } from '@/lib/unsplash'
import { createSlug, generateRandomTopics } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { topic, autoPublish = false } = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      )
    }

    // Create generation log
    const generationLog = await db.generationLog.create({
      data: {
        topic,
        status: 'generating',
      },
    })

    try {
      // Generate content using OpenAI
      const generatedContent = await generateBlogPost(topic)
      
      // Get image from Unsplash
      const image = await getImageForTopic(topic)
      
      // Create slug from title
      const slug = createSlug(generatedContent.title)
      
      // Check if slug already exists and make it unique
      let uniqueSlug = slug
      let counter = 1
      while (await db.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }

      // Create the blog post
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

      // Update generation log
      await db.generationLog.update({
        where: { id: generationLog.id },
        data: {
          status: 'completed',
          postId: post.id,
        },
      })

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
    console.error('Error generating blog post:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate blog post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Auto-generate a post with a random topic
    const topics = generateRandomTopics()
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]
    
    const response = await fetch(`${process.env.SITE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: randomTopic,
        autoPublish: true,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to generate post')
    }

    const result = await response.json()
    
    return NextResponse.json({
      success: true,
      message: 'Auto-generated post created successfully',
      post: result.post,
    })

  } catch (error) {
    console.error('Error in auto-generation:', error)
    return NextResponse.json(
      { 
        error: 'Failed to auto-generate post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 