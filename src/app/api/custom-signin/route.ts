import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { sendVerificationEmail } from '@/lib/resend'

// Custom authentication endpoint for Bilkent University email verification
const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔐 Custom signin for:", email)
    
    // Validate Bilkent email
    if (!email.endsWith("@ug.bilkent.edu.tr")) {
      return NextResponse.json({ 
        error: "Please use your Bilkent University email address (@ug.bilkent.edu.tr)" 
      }, { status: 400 })
    }
    
    // Clean up old verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
        expires: {
          lt: new Date()
        }
      }
    })
    
    // Create new verification token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const expires = new Date()
    expires.setHours(expires.getHours() + 24) // 24 hours from now
    
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expires
      }
    })
    
    console.log("✅ Verification token created for:", email)
    
    // Create verification URL
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/callback/email?callbackUrl=${encodeURIComponent(process.env.NEXTAUTH_URL + '/marketplace')}&token=${token}&email=${encodeURIComponent(email)}`
    
    // Send email
    await sendVerificationEmail(email, verificationUrl)
    
    console.log("✅ Custom verification email sent to:", email)
    
    await prisma.$disconnect()
    
    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent! Check your inbox."
    })
    
  } catch (error) {
    console.error("❌ Custom signin error:", error)
    await prisma.$disconnect()
    return NextResponse.json({ 
      error: "Failed to send verification email. Please try again." 
    }, { status: 500 })
  }
}
