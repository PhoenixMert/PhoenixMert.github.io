import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 Testing individual components...")
    
    const { email } = await request.json()
    const results: any = {}
    
    // Test 1: Basic functionality
    results.emailReceived = !!email
    results.emailValid = email?.endsWith("@ug.bilkent.edu.tr")
    
    // Test 2: Environment variables
    results.envVars = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      EMAIL_FROM: !!process.env.EMAIL_FROM,
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL
    }
    
    // Test 3: Try Resend import
    try {
      const { sendVerificationEmail } = await import('@/lib/resend')
      results.resendImport = "success"
      
      // Test 4: Try sending email (if email is valid)
      if (email?.endsWith("@ug.bilkent.edu.tr")) {
        const testUrl = "https://bilkent-marketplace.tugrulmert.me/test"
        await sendVerificationEmail(email, testUrl)
        results.emailSent = "success"
      }
      
    } catch (resendError) {
      results.resendError = String(resendError)
    }
    
    // Test 5: Try database connection
    try {
      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()
      await prisma.$connect()
      results.databaseConnection = "success"
      await prisma.$disconnect()
    } catch (dbError) {
      results.databaseError = String(dbError)
    }
    
    return NextResponse.json({
      success: true,
      results
    })
    
  } catch (error) {
    return NextResponse.json({
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
