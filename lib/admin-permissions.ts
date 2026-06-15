export const USER_ROLES = {
  ADMIN: "ADMIN",
  CONTENT: "CONTENT",
  STUDENT: "STUDENT",
} as const

export type UserRoleName = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const CONTENT_ALLOWED_ADMIN_PREFIXES = [
  "/admin/dashboard",
  "/admin/blogs",
  "/admin/mocks",
  "/admin/mock-bundles",
  "/admin/mock-stats",
] as const

export const CONTENT_ALLOWED_API_PREFIXES = [
  "/api/admin/blogs",
  "/api/admin/mocks",
  "/api/admin/mock-bundles",
  "/api/admin/mock-stats",
] as const

const ADMIN_ROOT_PATHS = new Set(["/admin", "/admin/"])

function hasAllowedPrefix(path: string, allowedPrefixes: readonly string[]) {
  return allowedPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export function isFullAdminRole(role: string | null | undefined) {
  return role === USER_ROLES.ADMIN
}

export function isAdminPanelRole(role: string | null | undefined) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.CONTENT
}

export function canAccessAdminPath(role: string | null | undefined, path: string) {
  if (role === USER_ROLES.ADMIN) return true
  if (role !== USER_ROLES.CONTENT) return false
  if (ADMIN_ROOT_PATHS.has(path)) return true
  return hasAllowedPrefix(path, CONTENT_ALLOWED_ADMIN_PREFIXES)
}

export function canAccessAdminApi(role: string | null | undefined, path: string) {
  if (role === USER_ROLES.ADMIN) return true
  if (role !== USER_ROLES.CONTENT) return false
  return hasAllowedPrefix(path, CONTENT_ALLOWED_API_PREFIXES)
}

export function getRoleLabel(role: string | null | undefined) {
  if (role === USER_ROLES.ADMIN) return "Admin"
  if (role === USER_ROLES.CONTENT) return "Content"
  return "Student"
}
