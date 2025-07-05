import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Get basic stats
    const [totalPosts, publishedPosts, recentLogs] = await Promise.all([
      db.post.count(),
      db.post.count({ where: { published: true } }),
      db.generationLog.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          topic: true,
          status: true,
          createdAt: true,
        },
      }),
    ])

    // Check if there's any ongoing generation
    const ongoingGeneration = await db.generationLog.findFirst({
      where: { status: 'generating' },
      orderBy: { createdAt: 'desc' },
    })

    // Check when was the last post generated
    const lastPost = await db.post.findFirst({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        publishedAt: true,
      },
    })

    return NextResponse.json({
      stats: {
        totalPosts,
        publishedPosts,
        hasOngoingGeneration: !!ongoingGeneration,
        lastPost: lastPost ? {
          title: lastPost.title,
          publishedAt: lastPost.publishedAt,
        } : null,
      },
      recentLogs,
    })
  } catch (error) {
    console.error('Error fetching status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
} 