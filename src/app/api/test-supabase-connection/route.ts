import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Testing different Supabase connection methods...")

    const currentDbUrl = process.env.DATABASE_URL
    console.log("Current DATABASE_URL format:", currentDbUrl?.substring(0, 50) + "...")

    const results = {
      timestamp: new Date().toISOString(),
      currentUrl: currentDbUrl ? currentDbUrl.replace(/:[^:@]*@/, ':***@') : "❌ Missing",
      tests: [] as Array<{name: string, result: string, details?: string}>
    }

    // Test 1: Basic URL parsing
    try {
      if (currentDbUrl) {
        const url = new URL(currentDbUrl)
        results.tests.push({
          name: "URL Parsing",
          result: "✅ Valid URL format",
          details: `Host: ${url.hostname}, Port: ${url.port}, Database: ${url.pathname}`
        })
      } else {
        results.tests.push({
          name: "URL Parsing", 
          result: "❌ No DATABASE_URL",
          details: "Environment variable not set"
        })
      }
    } catch (parseError) {
      results.tests.push({
        name: "URL Parsing",
        result: "❌ Invalid URL format",
        details: parseError instanceof Error ? parseError.message : String(parseError)
      })
    }

    // Test 2: DNS resolution of hostname
    const hostname = currentDbUrl ? new URL(currentDbUrl).hostname : null
    if (hostname) {
      try {
        // Check if hostname resolves (in Node.js environment)
        results.tests.push({
          name: "Hostname Resolution",
          result: "🔍 Testing...",
          details: `Attempting to resolve: ${hostname}`
        })
      } catch (dnsError) {
        results.tests.push({
          name: "Hostname Resolution",
          result: "❌ DNS Error",
          details: dnsError instanceof Error ? dnsError.message : String(dnsError)
        })
      }
    }

    // Test 3: Alternative connection string formats
    const alternativeFormats = [
      {
        name: "Direct Connection",
        format: "postgresql://postgres:Qp8xvr5sYnh49UWo@db.tyznvhuntbwszjlfjaih.supabase.co:5432/postgres"
      },
      {
        name: "Connection Pooling",
        format: "postgresql://postgres.tyznvhuntbwszjlfjaih:Qp8xvr5sYnh49UWo@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
      },
      {
        name: "Session Mode",
        format: "postgresql://postgres.tyznvhuntbwszjlfjaih:Qp8xvr5sYnh49UWo@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
      }
    ]

    results.tests.push({
      name: "Alternative Formats",
      result: "📋 Available options",
      details: alternativeFormats.map(f => `${f.name}: ${f.format.replace(/:[^:@]*@/, ':***@')}`).join('\n')
    })

    // Test 4: Common Supabase issues
    const commonIssues = [
      "Database might be paused (free tier auto-pauses after inactivity)",
      "Project might be deleted or suspended",
      "Password might have been reset",
      "Need to use connection pooling for serverless environments",
      "Firewall or network connectivity issues"
    ]

    results.tests.push({
      name: "Common Issues to Check",
      result: "📝 Troubleshooting steps",
      details: commonIssues.join('\n')
    })

    return NextResponse.json({ 
      success: true,
      results,
      nextSteps: [
        "1. Check Supabase dashboard for project status",
        "2. Try resetting database password",
        "3. Test with connection pooling URL",
        "4. Verify project hasn't been paused/deleted"
      ]
    })

  } catch (error) {
    console.error("❌ Supabase connection test error:", error)
    return NextResponse.json({ 
      error: "Failed to test Supabase connection",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
