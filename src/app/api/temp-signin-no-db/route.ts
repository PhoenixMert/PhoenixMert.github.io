import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔐 Temporary signin (no database) for:", email)
    
    // Validate Bilkent email
    if (!email.endsWith("@ug.bilkent.edu.tr")) {
      return NextResponse.json({ 
        error: "Please use your Bilkent University email address (@ug.bilkent.edu.tr)" 
      }, { status: 400 })
    }
    
    // Generate a simple token without database storage (temporary solution)
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    
    console.log("🎫 Generated token (not stored in DB):", token)
    
    // Create verification URL - using a temporary approach
    const baseUrl = 'https://bilkent-marketplace.tugrulmert.me'
    const verificationUrl = `${baseUrl}/api/auth/signin/email?email=${encodeURIComponent(email)}&token=${token}`
    
    // Send email
    await sendVerificationEmail(email, verificationUrl)
    
    console.log("✅ Temporary verification email sent to:", email)
    
    return NextResponse.json({ 
      success: true, 
      message: "Verification email sent! Check your inbox.",
      note: "Using temporary authentication flow"
    })
    
  } catch (error) {
    console.error("❌ Temporary signin error:", error)
    return NextResponse.json({ 
      error: "Failed to send verification email: " + (error instanceof Error ? error.message : String(error))
    }, { status: 500 })
  }
}
