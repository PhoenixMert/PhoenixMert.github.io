import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔍 Simple email test for:", email)
    
    // Validate Bilkent email
    if (!email.endsWith("@ug.bilkent.edu.tr")) {
      return NextResponse.json({ 
        error: "Please use your Bilkent University email address (@ug.bilkent.edu.tr)" 
      }, { status: 400 })
    }
    
    // Just try sending email without database operations
    const testUrl = "https://bilkent-marketplace.tugrulmert.me/test-verification"
    
    console.log("🚀 Attempting to send test email...")
    await sendVerificationEmail(email, testUrl)
    console.log("✅ Test email sent successfully!")
    
    return NextResponse.json({ 
      success: true, 
      message: "Test email sent successfully!"
    })
    
  } catch (error) {
    console.error("❌ Simple email test error:", error)
    return NextResponse.json({ 
      error: "Email test failed: " + (error instanceof Error ? error.message : String(error))
    }, { status: 500 })
  }
}
