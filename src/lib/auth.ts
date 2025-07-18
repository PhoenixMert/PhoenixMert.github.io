import { AdapterUser } from "next-auth/adapters"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import sgMail from '@sendgrid/mail'
import { prisma } from "./prisma"

// Set SendGrid API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  console.log("🔧 SendGrid API key configured successfully")
} else {
  console.warn("⚠️ SENDGRID_API_KEY not found in environment variables")
}

console.log("🔧 Auth config loaded - SendGrid integration active")

// Type definitions for callbacks
interface SignInParams {
  user: AdapterUser | User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile?: any;
  email?: { verificationRequest?: boolean };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentials?: Record<string, any>;
}

interface SessionParams {
  session: {
    user?: {
      id?: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    expires?: string;
  };
  user: AdapterUser;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token?: any;
}

interface User {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: "fake-host",
        port: 587,
        auth: {
          user: "fake-user",
          pass: "fake-pass"
        }
      },
      from: "Bilkent Marketplace <noreply@yourdomain.com>",
      // Use SendGrid API instead of SMTP
      sendVerificationRequest: async ({ identifier: email, url }) => {
        console.log("🚨 SENDGRID VERIFICATION REQUEST CALLED!");
        console.log("📧 Email:", email);
        console.log("🔗 URL:", url);
        
        try {
          console.log("🚀 SendGrid: Attempting to send email to:", email);
          
          const msg = {
            to: email,
            from: process.env.EMAIL_FROM || 'noreply@yourdomain.com', // Use environment variable
            subject: 'Sign in to Bilkent Marketplace',
            html: `
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
            `,
          }

          const result = await sgMail.send(msg)
          
          console.log("✅ SendGrid: Email sent successfully!");
          console.log("📧 SendGrid Status:", result[0].statusCode);
          console.log("📩 Sent to:", email);
          
        } catch (error) {
          console.error("❌ SendGrid failed to send email:", error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: SignInParams) {
      // Only allow Bilkent University email addresses
      if (user.email && !user.email.endsWith("@ug.bilkent.edu.tr")) {
        return false
      }
      return true
    },
    async session({ session, user }: SessionParams) {
      if (session.user) {
        session.user.id = user.id
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return session as any
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "database" as const,
  },
}
