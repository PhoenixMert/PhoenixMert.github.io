import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    console.log("🔍 Email verification debug:")
    console.log("📧 Email:", email)
    console.log("🎫 Token:", token)

    if (!email || !token) {
      return NextResponse.json({ 
        error: "Missing email or token parameters",
        received: { email, token }
      }, { status: 400 })
    }

    // Check if verification token exists in database
    console.log("🔍 Checking verification token in database...")
    
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: token
      }
    })

    console.log("🎫 Verification token found:", !!verificationToken)
    
    if (verificationToken) {
      console.log("⏰ Token expires:", verificationToken.expires)
      console.log("⏰ Current time:", new Date())
      console.log("✅ Token valid:", verificationToken.expires > new Date())
    }

    // Also check all tokens for this email
    const allTokensForEmail = await prisma.verificationToken.findMany({
      where: {
        identifier: email
      },
      orderBy: {
        expires: 'desc'
      }
    })

    console.log("📋 All tokens for email:", allTokensForEmail.length)

    return NextResponse.json({ 
      success: true,
      debug: {
        email,
        token,
        tokenExists: !!verificationToken,
        tokenValid: verificationToken ? verificationToken.expires > new Date() : false,
        tokenExpires: verificationToken?.expires,
        currentTime: new Date(),
        allTokensCount: allTokensForEmail.length,
        allTokens: allTokensForEmail.map(t => ({
          token: t.token.substring(0, 10) + "...",
          expires: t.expires,
          valid: t.expires > new Date()
        }))
      }
    })

  } catch (error) {
    console.error("❌ Email verification debug error:", error)
    return NextResponse.json({ 
      error: "Failed to debug email verification",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
