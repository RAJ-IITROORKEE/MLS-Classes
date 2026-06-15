"use client"

import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function AdminAccessToast() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (searchParams.get("admin_error") !== "unauthorized") return

    toast.error("Unauthorized access: Contact admin for admin access")
    router.replace(pathname)
  }, [pathname, router, searchParams])

  return null
}
