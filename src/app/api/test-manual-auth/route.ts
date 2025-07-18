import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'
import { sendVerificationEmail } from '@/lib/resend'
import { getServerSession } from 'next-auth/next'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔍 Server-side signin test for:", email)
    
    // Try to trigger the sign-in flow server-side
    // This should work differently than client-side API calls
    
    const session = await getServerSession(authOptions)
    console.log("Current session:", session)
    
    // The issue might be that we need to trigger this differently
    // Let's create a direct database verification token and see if that works
    
    const prisma = new PrismaClient()
    
    // Create a verification token manually to test
    const token = Math.random().toString(36).substring(2, 15)
    const expires = new Date()
    expires.setHours(expires.getHours() + 24) // 24 hours from now
    
    try {
      await prisma.verificationToken.create({
        data: {
          identifier: email,
          token: token,
          expires: expires
        }
      })
      
      console.log("✅ Manual verification token created:", token)
      
      // Now try to send the email manually
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
      const verificationUrl = `${baseUrl}/api/auth/callback/email?callbackUrl=${encodeURIComponent(baseUrl)}&token=${token}&email=${encodeURIComponent(email)}`
      
      await sendVerificationEmail(email, verificationUrl)
      
      console.log("✅ Manual email sent successfully")
      
      await prisma.$disconnect()
      
      return NextResponse.json({ 
        success: true, 
        message: "Manual verification email sent",
        token: token,
        verificationUrl: verificationUrl
      })
      
    } catch (dbError) {
      console.error("❌ Database error:", dbError)
      await prisma.$disconnect()
      throw dbError
    }
    
  } catch (error) {
    console.error("❌ Server-side signin error:", error)
    return NextResponse.json({ error: 'Failed to test server-side signin' }, { status: 500 })
  }
}
