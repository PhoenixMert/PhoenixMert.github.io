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
      server: {
        host: "fake-host",
        port: 587,
        auth: {
          user: "fake-user",
          pass: "fake-pass"
        }
      },
      from: "Bilkent Marketplace <noreply@yourdomain.com>",
      // Use Resend API instead of SMTP
      sendVerificationRequest: async ({ identifier: email, url }) => {
        console.log("🚨 RESEND VERIFICATION REQUEST CALLED!");
        console.log("📧 Email:", email);
        console.log("🔗 URL:", url);
        
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
