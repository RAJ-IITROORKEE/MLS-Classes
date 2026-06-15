import { normalizeAdminAccess, USER_ROLES } from "@/lib/admin-permissions"

export function getManagedUserAuthFields(role: string, adminAccess: readonly string[] | null | undefined) {
  return {
    emailVerified: true,
    adminAccess: role === USER_ROLES.CONTENT ? normalizeAdminAccess(adminAccess) : [],
  }
}

export function isPrivilegedManagedRole(role: string | null | undefined) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.CONTENT
}
