import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '20', 10)
    const skip = (page - 1) * pageSize

    const [posts, total] = await Promise.all([
      db.post.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          imageUrl: true,
          imageAlt: true,
          category: true,
          tags: true,
          published: true,
          views: true,
          likes: true,
          createdAt: true,
          publishedAt: true,
        },
        skip,
        take: pageSize,
      }),
      db.post.count(),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 