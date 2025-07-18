"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

interface Props {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any | null
}

export default function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  )
}
