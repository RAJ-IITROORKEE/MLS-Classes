import type { Metadata } from "next"
import { UserManagementClient } from "@/components/admin/user-management-client"
import { requireAdminPathAccess } from "@/lib/admin-auth"

export const metadata: Metadata = { title: "User Management | MLS Classes Admin" }

export default async function UserManagementPage() {
  await requireAdminPathAccess("/admin/user-management")

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">System</p>
        <h1 className="mt-2 text-2xl font-black tracking-tight">User Management</h1>
        <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
          Add users, assign roles, and control section-level admin access for content team members.
        </p>
      </div>
      <UserManagementClient />
    </div>
  )
}
