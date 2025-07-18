import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import { sendVerificationEmail } from "./resend"
import { prisma } from "./prisma"

console.log("🔧 Auth config loaded - Resend integration active")

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      // Use Resend API instead of SMTP
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        console.log("🚨 RESEND VERIFICATION REQUEST CALLED!");
        console.log("📧 Email:", email);
        console.log("🔗 Original URL:", url);
        console.log("🔧 Provider:", provider);
        
        // Fix the URL if NextAuth is generating the wrong format
        let correctedUrl = url;
        if (url.includes('/api/auth/signin/email')) {
          // Convert signin URL to callback URL
          correctedUrl = url.replace('/api/auth/signin/email', '/api/auth/callback/email');
          console.log("🔧 URL corrected from signin to callback:", correctedUrl);
        }
        
        // Validate email domain before sending
        if (!email.endsWith("@ug.bilkent.edu.tr")) {
          console.log("❌ Email verification blocked - not Bilkent domain:", email);
          throw new Error("Only Bilkent University email addresses are allowed");
        }
        
        try {
          console.log("🚀 Resend: Attempting to send email to:", email);
          console.log("🔗 Using URL:", correctedUrl);
          
          await sendVerificationEmail(email, correctedUrl);
          
          console.log("✅ Resend: Email sent successfully!");
          console.log("📩 Sent to:", email);
          
        } catch (error) {
          console.error("❌ Resend failed to send email:", error)
          throw error
        }
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn({ user, account, profile }: any) {
      try {
        console.log("🔐 SignIn callback triggered");
        console.log("👤 User:", JSON.stringify(user, null, 2));
        console.log("📧 Account:", JSON.stringify(account, null, 2));
        console.log("🔍 Profile:", JSON.stringify(profile, null, 2));
        
        // For email provider, always allow sign-in and let NextAuth handle the verification
        if (account?.provider === "email") {
          console.log("📧 Email provider detected - allowing NextAuth to handle verification");
          return true;
        }
        
        // For other providers, check email domain
        if (user.email && !user.email.endsWith("@ug.bilkent.edu.tr")) {
          console.log("❌ Email rejected - not Bilkent domain:", user.email);
          return false;
        }
        
        console.log("✅ Sign-in accepted:", user.email);
        return true;
      } catch (error) {
        console.error("❌ SignIn callback error:", error);
        console.error("❌ Error stack:", error instanceof Error ? error.stack : 'No stack trace');
        return false;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: any) {
      console.log("📋 Session callback triggered for:", user.id);
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  events: {
    async signIn(message: { user: { email?: string | null } }) {
      console.log("🎉 SignIn event:", message);
    },
    async createUser(message: { user: { email?: string | null } }) {
      console.log("👤 CreateUser event:", message);
    },
    async session(message: { session: { user?: { email?: string | null } } }) {
      console.log("📋 Session event:", message);
    },
  },
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "database" as const,
  },
  debug: true, // Enable debug mode to see detailed logs
  logger: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(code: string, metadata?: any) {
      console.error("🚨 NextAuth Error:", code, metadata)
    },
    warn(code: string) {
      console.warn("⚠️ NextAuth Warning:", code)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(code: string, metadata?: any) {
      console.log("🔍 NextAuth Debug:", code, metadata)
    }
  }
}
