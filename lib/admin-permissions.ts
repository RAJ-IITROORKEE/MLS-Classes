export const USER_ROLES = {
  ADMIN: "ADMIN",
  CONTENT: "CONTENT",
  STUDENT: "STUDENT",
} as const

export type UserRoleName = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const ADMIN_ACCESS_KEYS = {
  BLOGS: "BLOGS",
  MOCKS: "MOCKS",
  TRIAL_REQUESTS: "TRIAL_REQUESTS",
  TESTIMONIALS: "TESTIMONIALS",
  STUDENT_CORNER: "STUDENT_CORNER",
  FAQ: "FAQ",
} as const

export type AdminAccessKey = (typeof ADMIN_ACCESS_KEYS)[keyof typeof ADMIN_ACCESS_KEYS]

export const ADMIN_ACCESS_SECTIONS = [
  {
    key: ADMIN_ACCESS_KEYS.BLOGS,
    label: "Blogs",
    adminPrefixes: ["/admin/blogs"],
    apiPrefixes: ["/api/admin/blogs"],
  },
  {
    key: ADMIN_ACCESS_KEYS.MOCKS,
    label: "Mocks",
    adminPrefixes: ["/admin/mocks", "/admin/mock-bundles", "/admin/mock-stats"],
    apiPrefixes: ["/api/admin/mocks", "/api/admin/mock-bundles", "/api/admin/mock-stats"],
  },
  {
    key: ADMIN_ACCESS_KEYS.TRIAL_REQUESTS,
    label: "Trial Requests",
    adminPrefixes: ["/admin/contacts"],
    apiPrefixes: ["/api/admin/contacts"],
  },
  {
    key: ADMIN_ACCESS_KEYS.TESTIMONIALS,
    label: "Testimonials",
    adminPrefixes: ["/admin/testimonials"],
    apiPrefixes: ["/api/admin/testimonials"],
  },
  {
    key: ADMIN_ACCESS_KEYS.STUDENT_CORNER,
    label: "Student Corner",
    adminPrefixes: ["/admin/student-corner"],
    apiPrefixes: ["/api/admin/student-corner"],
  },
  {
    key: ADMIN_ACCESS_KEYS.FAQ,
    label: "FAQ",
    adminPrefixes: ["/admin/faq"],
    apiPrefixes: ["/api/admin/faq"],
  },
] as const

const ADMIN_ROOT_PATHS = new Set(["/admin", "/admin/"])
const CONTENT_DEFAULT_ADMIN_PREFIXES = ["/admin/dashboard"] as const
const CONTENT_DEFAULT_ACCESS_LABELS = ["Dashboard"] as const

function hasAllowedPrefix(path: string, allowedPrefixes: readonly string[]) {
  return allowedPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export function isFullAdminRole(role: string | null | undefined) {
  return role === USER_ROLES.ADMIN
}

export function isAdminPanelRole(role: string | null | undefined) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.CONTENT
}

export function normalizeAdminAccess(access: readonly string[] | null | undefined) {
  const allowedKeys = new Set<string>(ADMIN_ACCESS_SECTIONS.map((section) => section.key))
  return Array.from(new Set(access ?? [])).filter((key): key is AdminAccessKey => allowedKeys.has(key))
}

function getSelectedSections(access: readonly string[] | null | undefined) {
  const selected = new Set(normalizeAdminAccess(access))
  return ADMIN_ACCESS_SECTIONS.filter((section) => selected.has(section.key))
}

export function canAccessAdminPath(
  role: string | null | undefined,
  path: string,
  access?: readonly string[] | null
) {
  if (role === USER_ROLES.ADMIN) return true
  if (role !== USER_ROLES.CONTENT) return false
  if (ADMIN_ROOT_PATHS.has(path)) return true
  if (hasAllowedPrefix(path, CONTENT_DEFAULT_ADMIN_PREFIXES)) return true
  return getSelectedSections(access).some((section) => hasAllowedPrefix(path, section.adminPrefixes))
}

export function canAccessAdminApi(
  role: string | null | undefined,
  path: string,
  access?: readonly string[] | null
) {
  if (role === USER_ROLES.ADMIN) return true
  if (role !== USER_ROLES.CONTENT) return false
  return getSelectedSections(access).some((section) => hasAllowedPrefix(path, section.apiPrefixes))
}

export function getAccessLabels(role: string | null | undefined, access: readonly string[] | null | undefined) {
  if (role === USER_ROLES.ADMIN) return ["All Access"]
  if (role !== USER_ROLES.CONTENT) return []
  return [
    ...CONTENT_DEFAULT_ACCESS_LABELS,
    ...getSelectedSections(access).map((section) => section.label),
  ]
}

export function getRoleLabel(role: string | null | undefined) {
  if (role === USER_ROLES.ADMIN) return "Admin"
  if (role === USER_ROLES.CONTENT) return "Content"
  return "Student"
}
