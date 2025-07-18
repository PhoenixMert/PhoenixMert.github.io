import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Try to connect to the database
    await prisma.$connect()
    
    // Try to query the User table
    const userCount = await prisma.user.count()
    
    return NextResponse.json({
      success: true,
      databaseConnected: true,
      userCount: userCount,
      message: "Database connection successful"
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      databaseConnected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
      message: "Database connection failed"
    }, { status: 500 })
  }
}
