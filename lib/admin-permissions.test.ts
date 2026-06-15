import assert from "node:assert/strict"
import {
  ADMIN_ACCESS_KEYS,
  canAccessAdminApi,
  canAccessAdminPath,
  getAccessLabels,
  getRoleLabel,
  isAdminPanelRole,
  isFullAdminRole,
  USER_ROLES,
} from "./admin-permissions"

assert.equal(isFullAdminRole(USER_ROLES.ADMIN), true)
assert.equal(isFullAdminRole(USER_ROLES.CONTENT), false)
assert.equal(isAdminPanelRole(USER_ROLES.ADMIN), true)
assert.equal(isAdminPanelRole(USER_ROLES.CONTENT), true)
assert.equal(isAdminPanelRole(USER_ROLES.STUDENT), false)

assert.equal(canAccessAdminPath(USER_ROLES.ADMIN, "/admin/users"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/dashboard"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/blogs/create"), false)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/blogs/create", [ADMIN_ACCESS_KEYS.BLOGS]),
  true
)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mocks/abc123"), false)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mocks/abc123", [ADMIN_ACCESS_KEYS.MOCKS]),
  true
)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mock-bundles", [ADMIN_ACCESS_KEYS.MOCKS]),
  true
)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mock-stats", [ADMIN_ACCESS_KEYS.MOCKS]),
  true
)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/contacts", [ADMIN_ACCESS_KEYS.TRIAL_REQUESTS]),
  true
)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/testimonials", [ADMIN_ACCESS_KEYS.TESTIMONIALS]),
  true
)
assert.equal(
  canAccessAdminPath(USER_ROLES.CONTENT, "/admin/student-corner", [ADMIN_ACCESS_KEYS.STUDENT_CORNER]),
  true
)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/faq", [ADMIN_ACCESS_KEYS.FAQ]), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/users"), false)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/settings"), false)
assert.equal(canAccessAdminPath(USER_ROLES.STUDENT, "/admin/dashboard"), false)

assert.equal(canAccessAdminApi(USER_ROLES.ADMIN, "/api/admin/users"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/blogs/abc123"), false)
assert.equal(
  canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/blogs/abc123", [ADMIN_ACCESS_KEYS.BLOGS]),
  true
)
assert.equal(
  canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/mocks/abc123", [ADMIN_ACCESS_KEYS.MOCKS]),
  true
)
assert.equal(
  canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/contacts", [ADMIN_ACCESS_KEYS.TRIAL_REQUESTS]),
  true
)
assert.equal(
  canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/testimonials", [ADMIN_ACCESS_KEYS.TESTIMONIALS]),
  true
)
assert.equal(
  canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/student-corner", [ADMIN_ACCESS_KEYS.STUDENT_CORNER]),
  true
)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/faq", [ADMIN_ACCESS_KEYS.FAQ]), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/users"), false)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/notifications"), false)
assert.equal(canAccessAdminApi(USER_ROLES.STUDENT, "/api/admin/blogs"), false)

assert.deepEqual(getAccessLabels(USER_ROLES.ADMIN, []), ["All Access"])
assert.deepEqual(getAccessLabels(USER_ROLES.STUDENT, [ADMIN_ACCESS_KEYS.BLOGS]), [])
assert.deepEqual(getAccessLabels(USER_ROLES.CONTENT, []), ["Dashboard"])
assert.deepEqual(getAccessLabels(USER_ROLES.CONTENT, [ADMIN_ACCESS_KEYS.BLOGS]), ["Dashboard", "Blogs"])
assert.equal(getRoleLabel(USER_ROLES.CONTENT), "Content")
