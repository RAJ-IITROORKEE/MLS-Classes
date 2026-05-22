"use client"

import { useSession } from "@/lib/auth-client"

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  return !session ? <>{children}</> : null
}
