import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    console.log("🔍 Debug signin endpoint called for:", email)
    
    // Get CSRF token first
    const csrfResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/csrf`)
    const csrfData = await csrfResponse.json()
    console.log("🔐 CSRF token:", csrfData.csrfToken)
    
    // Now make the actual sign-in request
    const signInResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: email,
        callbackUrl: `${process.env.NEXTAUTH_URL}/auth/verify-request`,
        csrfToken: csrfData.csrfToken,
        json: 'true'
      })
    })
    
    console.log("📡 NextAuth response status:", signInResponse.status)
    const responseData = await signInResponse.json()
    console.log("📡 NextAuth response data:", responseData)
    
    return NextResponse.json({ 
      success: true, 
      email,
      csrfToken: csrfData.csrfToken,
      nextAuthResponse: responseData,
      status: signInResponse.status
    })
    
  } catch (error) {
    console.error("❌ Debug signin error:", error)
    return NextResponse.json({ error: 'Failed to debug signin' }, { status: 500 })
  }
}
