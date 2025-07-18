import { authOptions } from "@/lib/auth"
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log("🔍 Auth config debug:")
  console.log("Providers:", authOptions.providers?.length)
  console.log("Adapter:", !!authOptions.adapter)
  console.log("Pages:", authOptions.pages)
  
  const emailProvider = authOptions.providers?.[0]
  if (emailProvider) {
    console.log("Email provider type:", emailProvider.type)
    console.log("Email provider id:", emailProvider.id)
    console.log("Has sendVerificationRequest:", !!(emailProvider as any).sendVerificationRequest)
  }
  
  return NextResponse.json({
    providersCount: authOptions.providers?.length || 0,
    hasAdapter: !!authOptions.adapter,
    emailProviderHasSendVerificationRequest: !!(authOptions.providers?.[0] as any)?.sendVerificationRequest,
    pages: authOptions.pages
  })
}
