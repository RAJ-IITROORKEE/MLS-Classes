"use client"

import * as React from "react"

export type AdminNotification = {
  id: string
  type: "trial" | "contact"
  title: string
  message: string
  email?: string
  createdAt: string
  link: string
}

type AdminNotificationCounts = {
  trial: number
  contact: number
  total: number
}

type AdminNotificationsContextValue = AdminNotificationCounts & {
  notifications: AdminNotification[]
  isLoading: boolean
  refresh: () => Promise<void>
}

const POLL_INTERVAL_MS = 30_000
const EMPTY_COUNTS: AdminNotificationCounts = { trial: 0, contact: 0, total: 0 }

const AdminNotificationsContext = React.createContext<AdminNotificationsContextValue | null>(null)

export function AdminNotificationsProvider({
  children,
  enabled = true,
}: {
  children: React.ReactNode
  enabled?: boolean
}) {
  const [notifications, setNotifications] = React.useState<AdminNotification[]>([])
  const [counts, setCounts] = React.useState<AdminNotificationCounts>(EMPTY_COUNTS)
  const [isLoading, setIsLoading] = React.useState(enabled)

  const refresh = React.useCallback(async () => {
    if (!enabled) {
      setNotifications([])
      setCounts(EMPTY_COUNTS)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/admin/notifications", { cache: "no-store" })

      if (!response.ok) {
        console.warn(`Notifications API returned ${response.status}`)
        return
      }

      const data = (await response.json()) as {
        notifications?: AdminNotification[]
        counts?: Partial<AdminNotificationCounts>
      }

      setNotifications(data.notifications ?? [])
      setCounts({
        trial: data.counts?.trial ?? 0,
        contact: data.counts?.contact ?? 0,
        total: data.counts?.total ?? 0,
      })
    } catch (error) {
      console.error("Failed to fetch admin notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }, [enabled])

  React.useEffect(() => {
    if (!enabled) return

    queueMicrotask(() => {
      void refresh()
    })

    const intervalId = window.setInterval(() => {
      void refresh()
    }, POLL_INTERVAL_MS)

    const handleFocus = () => {
      void refresh()
    }

    window.addEventListener("focus", handleFocus)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener("focus", handleFocus)
    }
  }, [enabled, refresh])

  const value = React.useMemo<AdminNotificationsContextValue>(
    () => ({
      notifications,
      isLoading,
      refresh,
      ...counts,
    }),
    [counts, isLoading, notifications, refresh]
  )

  return (
    <AdminNotificationsContext.Provider value={value}>
      {children}
    </AdminNotificationsContext.Provider>
  )
}

export function useAdminNotifications() {
  const context = React.useContext(AdminNotificationsContext)

  if (!context) {
    return {
      notifications: [],
      isLoading: false,
      refresh: async () => {},
      ...EMPTY_COUNTS,
    }
  }

  return context
}
