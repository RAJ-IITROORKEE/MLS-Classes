"use client"

import { useSession } from "@/lib/auth-client"

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  return session ? <>{children}</> : null
}
