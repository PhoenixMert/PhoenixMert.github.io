// Test API route to directly test email sending
import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn("⚠️ SENDGRID_API_KEY not found in environment variables")
}

export async function GET() {
  console.log("🧪 Direct email test triggered")
  console.log("📧 SendGrid API key present:", !!process.env.SENDGRID_API_KEY)
  
  try {
    const testEmail = "test@ug.bilkent.edu.tr"  // Use a Bilkent email for testing
    const testUrl = process.env.NEXTAUTH_URL || "http://localhost:3001"
    
    console.log("🚀 Attempting to send test email to:", testEmail)
    
    const msg = {
      to: testEmail,
      from: process.env.EMAIL_FROM || 'noreply@yourdomain.com', // Use environment variable
      subject: '🧪 Direct Email Test - Bilkent Marketplace',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Email Test</title>
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #667eea;">Direct Email Test</h1>
          <p>This is a direct test of the SendGrid email sending functionality.</p>
          <p>Test URL: <a href="${testUrl}" style="color: #667eea;">${testUrl}</a></p>
          <p>If you can see this, the SendGrid email sending is working! 🎉</p>
        </body>
        </html>
      `,
    }
    
    const result = await sgMail.send(msg)
    
    console.log("✅ Email sent successfully!")
    console.log("📧 SendGrid Status:", result[0].statusCode)
    
    return NextResponse.json({ 
      success: true, 
      statusCode: result[0].statusCode,
      message: "Email sent successfully via SendGrid!"
    })
  } catch (error) {
    console.error("❌ Failed to send email:", error)
    return NextResponse.json({ 
      error: "Failed to send email", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}

export async function POST() {
  return GET() // Allow both GET and POST for testing
}
