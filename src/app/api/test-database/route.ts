import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log("🔍 Testing database connection...")
    
    // Test basic connection
    await prisma.$connect()
    console.log("✅ Database connected successfully")
    
    // Test a simple query
    const userCount = await prisma.user.count()
    console.log("✅ User count query successful:", userCount)
    
    // Test verification token table
    const tokenCount = await prisma.verificationToken.count()
    console.log("✅ Token count query successful:", tokenCount)
    
    return NextResponse.json({
      success: true,
      databaseConnected: true,
      userCount,
      tokenCount,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
    })
    
  } catch (error) {
    console.error("❌ Database test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set"
    }, { status: 500 })
  }
}
