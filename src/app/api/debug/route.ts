import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const debug = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      apis: {
        openai: {
          configured: !!process.env.OPENAI_API_KEY,
          keyPrefix: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 10) + '...' : 'not set',
          isPlaceholder: process.env.OPENAI_API_KEY ? 
            (process.env.OPENAI_API_KEY.includes('tu-cl') || process.env.OPENAI_API_KEY.includes('aqui')) : 
            false
        },
        unsplash: {
          configured: !!process.env.UNSPLASH_ACCESS_KEY,
          keyPrefix: process.env.UNSPLASH_ACCESS_KEY ? process.env.UNSPLASH_ACCESS_KEY.substring(0, 10) + '...' : 'not set'
        }
      },
      database: {
        url: process.env.DATABASE_URL ? 'configured' : 'not configured'
      }
    }

    return NextResponse.json(debug)
  } catch (error) {
    return NextResponse.json(
      { error: 'Debug endpoint failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 