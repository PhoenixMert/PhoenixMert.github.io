import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
    resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 3) || 'none',
    emailFrom: process.env.EMAIL_FROM || 'not set',
    nextAuthUrl: process.env.NEXTAUTH_URL || 'not set',
    nodeEnv: process.env.NODE_ENV,
  })
}
