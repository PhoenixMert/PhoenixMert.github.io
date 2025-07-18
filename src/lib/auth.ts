import { AdapterUser } from "next-auth/adapters"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email"
import { sendVerificationEmail } from "./resend"
import { prisma } from "./prisma"

console.log("🔧 Auth config loaded - Resend integration active")

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
      server: process.env.EMAIL_SERVER || "smtp://fake:fake@localhost:587",
      from: process.env.EMAIL_FROM,
      // Use Resend API instead of SMTP
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        console.log("🚨 RESEND VERIFICATION REQUEST CALLED!");
        console.log("📧 Email:", email);
        console.log("🔗 URL:", url);
        console.log("🔧 Provider:", provider);
        
        // Validate email domain before sending
        if (!email.endsWith("@ug.bilkent.edu.tr")) {
          console.log("❌ Email verification blocked - not Bilkent domain:", email);
          throw new Error("Only Bilkent University email addresses are allowed");
        }
        
        try {
          console.log("🚀 Resend: Attempting to send email to:", email);
          
          await sendVerificationEmail(email, url);
          
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
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
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
    async session({ session, user }: SessionParams) {
      console.log("📋 Session callback triggered for:", user.id);
      if (session.user) {
        session.user.id = user.id
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return session as any
    },
  },
  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async signIn(message: any) {
      console.log("🎉 SignIn event:", message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async createUser(message: any) {
      console.log("👤 CreateUser event:", message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session(message: any) {
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
    error(code: any, metadata: any) {
      console.error("🚨 NextAuth Error:", code, metadata)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(code: any) {
      console.warn("⚠️ NextAuth Warning:", code)
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(code: any, metadata: any) {
      console.log("🔍 NextAuth Debug:", code, metadata)
    }
  }
}
