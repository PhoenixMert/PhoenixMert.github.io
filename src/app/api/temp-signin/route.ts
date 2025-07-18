import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/resend'

// Temporary workaround - send email without database storage
// The verification will be handled by NextAuth's built-in token system
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔐 Temporary signin (no DB) for:", email)
    
    // Validate Bilkent email
    if (!email.endsWith("@ug.bilkent.edu.tr")) {
      return NextResponse.json({ 
        error: "Please use your Bilkent University email address (@ug.bilkent.edu.tr)" 
      }, { status: 400 })
    }
    
    // Generate a simple token (this is temporary - normally would be stored in DB)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    console.log("🎫 Generated temporary token (not stored):", token)
    
    // Create verification URL that goes directly to NextAuth
    const baseUrl = process.env.NEXTAUTH_URL || 'https://bilkent-marketplace.tugrulmert.me'
    
    // For now, let's create a simple verification page that explains the situation
    const verificationUrl = `${baseUrl}/auth/verify-request?email=${encodeURIComponent(email)}&status=sent`
    
    // Send email with verification info
    await sendVerificationEmail(email, verificationUrl)
    
    console.log("✅ Temporary verification email sent to:", email)
    
    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent! (Note: Full verification is temporarily disabled due to database connectivity)"
    })
    
  } catch (error) {
    console.error("❌ Temporary signin error:", error)
    return NextResponse.json({ 
      error: "Failed to send verification email. Please try again.",
      debug: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 })
  }
}
