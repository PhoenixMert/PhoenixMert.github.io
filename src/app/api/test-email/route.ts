import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '../../../lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    console.log("🧪 Testing Resend with email:", email)

    await sendEmail({
      to: email,
      subject: '🧪 Test Email from Bilkent Marketplace',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">🎉 Email Service Test Successful!</h2>
          <p>This is a test email from your Bilkent Marketplace.</p>
          <p><strong>✅ Resend is working correctly!</strong></p>
          <p>You can now proceed with setting up your email authentication.</p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            Sent from Bilkent Marketplace<br>
            ${new Date().toLocaleString()}
          </p>
        </div>
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully via Resend!' 
    })
  } catch (error) {
    console.error('❌ Test email failed:', error)
    return NextResponse.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Also support GET for quick testing
export async function GET() {
  try {
    const testEmail = "test@ug.bilkent.edu.tr"
    
    console.log("🧪 GET request - Testing Resend with email:", testEmail)

    await sendEmail({
      to: testEmail,
      subject: '🧪 Test Email from Bilkent Marketplace (GET)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">🎉 Email Service Test Successful!</h2>
          <p>This is a test email from your Bilkent Marketplace (GET request).</p>
          <p><strong>✅ Resend is working correctly!</strong></p>
          <p>You can now proceed with setting up your email authentication.</p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            Sent from Bilkent Marketplace<br>
            ${new Date().toLocaleString()}
          </p>
        </div>
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully via Resend!' 
    })
  } catch (error) {
    console.error('❌ Test email failed:', error)
    return NextResponse.json({ 
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
