import type { Metadata } from "next"
import AdminUsersClient from "@/components/admin/users-table"

export const metadata: Metadata = { title: "Users | MLS Classes Admin" }

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of all registered users and their mock activity.
        </p>
      </div>
      <AdminUsersClient />
    </div>
  )
}
