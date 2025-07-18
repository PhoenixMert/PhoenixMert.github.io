import { Resend } from 'resend'

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: options.from || process.env.EMAIL_FROM || 'marketplace@bilkent-marketplace.tugrulmert.me',
      to: [options.to],
      subject: options.subject,
      html: options.html,
    })

    if (error) {
      console.error("❌ Resend: Failed to send email:", error)
      throw error
    }

    console.log("✅ Resend: Email sent successfully to", options.to, "- ID:", data?.id)
    return { success: true, id: data?.id }
  } catch (error) {
    console.error("❌ Resend: Failed to send email:", error)
    throw error
  }
}

export async function sendVerificationEmail(email: string, url: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sign in to Bilkent Marketplace</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🛒 Bilkent Marketplace</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your campus marketplace awaits!</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">Welcome to the community! 🎉</h2>
        
        <p>Hi there!</p>
        
        <p>You're just one click away from joining the Bilkent University student marketplace where you can:</p>
        
        <ul style="margin: 20px 0; padding-left: 20px;">
          <li>📚 Buy and sell textbooks</li>
          <li>💻 Find electronics and supplies</li>
          <li>🤝 Connect with fellow students</li>
          <li>💰 Save money on second-hand items</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${url}" style="background: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
            ✅ Sign In to Marketplace
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          This link will expire in 24 hours for security reasons.<br>
          If you didn't request this, please ignore this email.
        </p>
        
        <p style="font-size: 14px; color: #666; margin-top: 20px;">
          Best regards,<br>
          The Bilkent Marketplace Team
        </p>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Sign in to Bilkent Marketplace',
    html,
  })
}
