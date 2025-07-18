import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  
  console.log("🔍 Debug Callback Endpoint Called")
  console.log("📋 Full URL:", request.url)
  console.log("🔗 Search Params:", Object.fromEntries(searchParams.entries()))
  
  // Get all the parameters that NextAuth might be sending
  const params = {
    token: searchParams.get('token'),
    email: searchParams.get('email'),
    callbackUrl: searchParams.get('callbackUrl'),
    error: searchParams.get('error'),
    code: searchParams.get('code'),
    state: searchParams.get('state'),
  }
  
  return NextResponse.json({
    success: true,
    url: request.url,
    searchParams: Object.fromEntries(searchParams.entries()),
    params,
    timestamp: new Date().toISOString()
  })
}
