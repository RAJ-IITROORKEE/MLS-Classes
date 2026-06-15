import assert from "node:assert/strict"
import { ADMIN_ACCESS_KEYS, USER_ROLES } from "@/lib/admin-permissions"
import { getManagedUserAuthFields, isPrivilegedManagedRole } from "@/lib/admin-user-management"

assert.deepEqual(getManagedUserAuthFields(USER_ROLES.CONTENT, [ADMIN_ACCESS_KEYS.BLOGS, "BAD_KEY"]), {
  emailVerified: true,
  adminAccess: [ADMIN_ACCESS_KEYS.BLOGS],
})

assert.deepEqual(getManagedUserAuthFields(USER_ROLES.ADMIN, [ADMIN_ACCESS_KEYS.BLOGS]), {
  emailVerified: true,
  adminAccess: [],
})

assert.deepEqual(getManagedUserAuthFields(USER_ROLES.STUDENT, [ADMIN_ACCESS_KEYS.BLOGS]), {
  emailVerified: true,
  adminAccess: [],
})

assert.equal(isPrivilegedManagedRole(USER_ROLES.ADMIN), true)
assert.equal(isPrivilegedManagedRole(USER_ROLES.CONTENT), true)
assert.equal(isPrivilegedManagedRole(USER_ROLES.STUDENT), false)
