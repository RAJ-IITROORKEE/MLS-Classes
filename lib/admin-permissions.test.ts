import assert from "node:assert/strict"
import {
  canAccessAdminApi,
  canAccessAdminPath,
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
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/blogs/create"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mocks/abc123"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mock-bundles"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/mock-stats"), true)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/users"), false)
assert.equal(canAccessAdminPath(USER_ROLES.CONTENT, "/admin/settings"), false)
assert.equal(canAccessAdminPath(USER_ROLES.STUDENT, "/admin/dashboard"), false)

assert.equal(canAccessAdminApi(USER_ROLES.ADMIN, "/api/admin/users"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/blogs/abc123"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/mocks/abc123"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/mock-bundles"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/mock-stats"), true)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/users"), false)
assert.equal(canAccessAdminApi(USER_ROLES.CONTENT, "/api/admin/notifications"), false)
assert.equal(canAccessAdminApi(USER_ROLES.STUDENT, "/api/admin/blogs"), false)

assert.equal(getRoleLabel(USER_ROLES.CONTENT), "Content")
