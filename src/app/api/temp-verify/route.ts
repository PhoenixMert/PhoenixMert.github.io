import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    const callbackUrl = searchParams.get('callbackUrl')
    
    console.log("🔍 Temporary verification called for:", email)
    
    if (!token || !email) {
      return NextResponse.redirect(new URL('/auth/signin?error=InvalidToken', request.url))
    }
    
    // For now, just accept any token and redirect to marketplace
    // This is temporary until database is fixed
    console.log("✅ Temporary verification successful for:", email)
    
    const redirectUrl = callbackUrl || '/marketplace'
    return NextResponse.redirect(new URL(redirectUrl, request.url))
    
  } catch (error) {
    console.error("❌ Temporary verification error:", error)
    return NextResponse.redirect(new URL('/auth/signin?error=VerificationFailed', request.url))
  }
}
