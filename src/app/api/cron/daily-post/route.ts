import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateBlogPost } from '@/lib/openai'
import { getImageForTopic } from '@/lib/unsplash'
import { createSlug, generateRandomTopics } from '@/lib/utils'

// This endpoint will be called by Vercel Cron Jobs
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron (optional but recommended)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if we already generated a post today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const existingPost = await db.post.findFirst({
      where: {
        createdAt: {
          gte: today,
        },
      },
    })

    if (existingPost) {
      return NextResponse.json({
        success: true,
        message: 'Post already generated today',
        post: { id: existingPost.id, title: existingPost.title },
      })
    }

    // Generate random topic
    const topics = generateRandomTopics()
    const randomTopic = topics[Math.floor(Math.random() * topics.length)]

    // Create generation log
    const generationLog = await db.generationLog.create({
      data: {
        topic: randomTopic,
        status: 'generating',
      },
    })

    try {
      // Generate content using OpenAI
      const generatedContent = await generateBlogPost(randomTopic)
      
      // Get image
      const image = await getImageForTopic(randomTopic)
      
      // Create slug from title
      const slug = createSlug(generatedContent.title)
      
      // Check if slug already exists and make it unique
      let uniqueSlug = slug
      let counter = 1
      while (await db.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }

      // Create the blog post (published automatically)
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
          published: true,
          publishedAt: new Date(),
          featured: Math.random() < 0.3, // 30% chance of being featured
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
        message: 'Daily post generated successfully',
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
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
    console.error('Error in daily post generation:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate daily post',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 