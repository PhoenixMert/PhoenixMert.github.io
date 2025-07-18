import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log("🔍 Debug tokens endpoint called");
    
    // Get all verification tokens
    const tokens = await prisma.verificationToken.findMany({
      orderBy: {
        expires: 'desc'
      },
      take: 10
    });
    
    console.log("📋 Found tokens:", tokens.length);
    
    const now = new Date();
    const tokenInfo = tokens.map(token => ({
      identifier: token.identifier,
      token: token.token, // Show full token for debugging
      expires: token.expires.toISOString(),
      isExpired: token.expires < now,
      createdAgo: Math.floor((now.getTime() - token.expires.getTime() + (24 * 60 * 60 * 1000)) / (1000 * 60)) + ' minutes ago'
    }));
    
    return NextResponse.json({
      success: true,
      count: tokens.length,
      tokens: tokenInfo,
      currentTime: now.toISOString()
    });
    
  } catch (error) {
    console.error("❌ Debug tokens error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
