import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log("🔍 DEBUG: Checking authentication configuration...")

    const debugInfo: {
      timestamp: string;
      environment: string | undefined;
      databaseStatus: string;
      requiredAdapterMethods: string[];
      missingAdapterMethods: string[];
      envVars: Record<string, string>;
    } = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      databaseStatus: "unknown",
      requiredAdapterMethods: [],
      missingAdapterMethods: [],
      envVars: {
        DATABASE_URL: process.env.DATABASE_URL ? "✅ Present" : "❌ Missing",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ Present" : "❌ Missing",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || "❌ Not set",
        RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Present" : "❌ Missing",
      }
    }

    // Test database connection
    try {
      await prisma.$connect()
      await prisma.$queryRaw`SELECT 1`
      debugInfo.databaseStatus = "✅ Connected"
      await prisma.$disconnect()
    } catch (dbError) {
      debugInfo.databaseStatus = `❌ Failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`
    }

    // Check required adapter methods for email auth
    const requiredMethods = [
      'createVerificationToken',
      'useVerificationToken', 
      'getUserByEmail',
      'createUser',
      'getUser',
      'getUserByAccount',
      'linkAccount',
      'createSession',
      'getSessionAndUser',
      'updateSession',
      'deleteSession'
    ]

    debugInfo.requiredAdapterMethods = requiredMethods

    // Check which methods are available in PrismaAdapter
    const adapter = authOptions.adapter
    if (adapter) {
      const missingMethods = requiredMethods.filter(method => !(method in adapter))
      debugInfo.missingAdapterMethods = missingMethods
    }

    // Additional NextAuth configuration info
    const nextAuthInfo = {
      providers: authOptions.providers?.map(p => ({ type: p.type, id: p.id })),
      sessionStrategy: authOptions.session?.strategy,
      pages: authOptions.pages,
      hasCallbacks: {
        signIn: !!authOptions.callbacks?.signIn,
        session: !!authOptions.callbacks?.session
      }
    }

    return NextResponse.json({ 
      success: true,
      debugInfo,
      nextAuthInfo,
      recommendations: [
        debugInfo.databaseStatus.includes("❌") ? "🔧 Fix database connection first" : null,
        debugInfo.envVars.NEXTAUTH_SECRET.includes("❌") ? "🔧 Set NEXTAUTH_SECRET environment variable" : null,
        debugInfo.missingAdapterMethods.length > 0 ? "🔧 Database adapter missing required methods" : null,
      ].filter(Boolean)
    })

  } catch (error) {
    console.error("❌ Debug auth config error:", error)
    return NextResponse.json({ 
      error: "Failed to debug auth configuration",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
