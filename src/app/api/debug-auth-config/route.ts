import { authOptions } from "@/lib/auth"
import { NextResponse } from 'next/server'

export async function GET() {
  console.log("🔍 Auth config debug:")
  console.log("Providers:", authOptions.providers?.length)
  console.log("Adapter:", !!authOptions.adapter)
  console.log("Pages:", authOptions.pages)
  
  const emailProvider = authOptions.providers?.[0]
  if (emailProvider) {
    console.log("Email provider type:", emailProvider.type)
    console.log("Email provider id:", emailProvider.id)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log("Has sendVerificationRequest:", !!(emailProvider as any).sendVerificationRequest)
  }
  
  return NextResponse.json({
    providersCount: authOptions.providers?.length || 0,
    hasAdapter: !!authOptions.adapter,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emailProviderHasSendVerificationRequest: !!(authOptions.providers?.[0] as any)?.sendVerificationRequest,
    pages: authOptions.pages
  })
}
