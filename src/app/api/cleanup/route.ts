import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Only allow this from admin or with proper auth
    const { action } = await request.json()
    
    if (action === 'cleanup_stale_logs') {
      // Find logs that are stuck in "generating" state for more than 1 hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      
      const staleGeneratingLogs = await db.generationLog.findMany({
        where: {
          status: 'generating',
          createdAt: {
            lt: oneHourAgo,
          },
        },
      })

      // Update them to failed status
      if (staleGeneratingLogs.length > 0) {
        await db.generationLog.updateMany({
          where: {
            id: {
              in: staleGeneratingLogs.map(log => log.id),
            },
          },
          data: {
            status: 'failed',
            error: 'Timeout - Process was interrupted',
          },
        })
      }

      return NextResponse.json({
        success: true,
        message: `Cleaned up ${staleGeneratingLogs.length} stale generation logs`,
        cleanedLogs: staleGeneratingLogs.length,
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error in cleanup:', error)
    return NextResponse.json(
      { 
        error: 'Failed to cleanup',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 