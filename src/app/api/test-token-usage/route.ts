import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { identifier, token } = await request.json();
    
    console.log("🔍 Testing token usage for:", identifier);
    console.log("🔑 Token:", token);
    
    // This mimics exactly what NextAuth PrismaAdapter does
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier,
          token
        }
      }
    });
    
    console.log("📋 Found token:", verificationToken ? "YES" : "NO");
    
    if (verificationToken) {
      console.log("⏰ Token expires:", verificationToken.expires.toISOString());
      console.log("🕐 Current time:", new Date().toISOString());
      console.log("✅ Token valid:", verificationToken.expires > new Date());
      
      // Delete the token (NextAuth does this)
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier,
            token
          }
        }
      });
      
      console.log("🗑️ Token deleted");
      
      return NextResponse.json({
        success: true,
        found: true,
        expired: verificationToken.expires <= new Date(),
        tokenData: {
          identifier: verificationToken.identifier,
          expires: verificationToken.expires.toISOString(),
          isValid: verificationToken.expires > new Date()
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        found: false,
        message: "Token not found in database"
      });
    }
    
  } catch (error) {
    console.error("❌ Test token usage error:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
