import { auth } from "@/lib/auth"
import {
  canAccessAdminApi,
  canAccessAdminPath,
  isAdminPanelRole,
  isFullAdminRole,
} from "@/lib/admin-permissions"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401
  ) {
    super(message)
    this.name = "AuthError"
  }
}

export const ADMIN_UNAUTHORIZED_MESSAGE = "Unauthorized access: Contact admin for admin access"

async function getSessionWithDbUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    return { session: null, user: null }
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true, role: true, adminAccess: true },
  })

  return { session, user }
}

/**
 * Assert that the current request is made by an admin user.
 * Throws AuthError if not authenticated or not an admin.
 */
export async function assertAdminAccess() {
  const { session, user } = await getSessionWithDbUser()

  if (!session?.user || !user) {
    throw new AuthError("Unauthorized — please sign in", 401)
  }

  if (!isFullAdminRole(user.role)) {
    throw new AuthError("Forbidden — admin access required", 403)
  }

  return session
}

export async function assertAdminApiAccess(path: string) {
  const { session, user } = await getSessionWithDbUser()

  if (!session?.user || !user) {
    throw new AuthError("Unauthorized — please sign in", 401)
  }

  if (!canAccessAdminApi(user.role, path, user.adminAccess)) {
    throw new AuthError("Forbidden — admin access required", 403)
  }

  return session
}

export async function requireAdminPanelAccess() {
  const { session, user } = await getSessionWithDbUser()

  if (!session?.user) {
    redirect("/admin/login")
  }

  if (!user || !isAdminPanelRole(user.role)) {
    redirect("/?admin_error=unauthorized")
  }

  return { session, user }
}

export async function requireAdminPathAccess(path: string) {
  const result = await requireAdminPanelAccess()

  if (!canAccessAdminPath(result.user.role, path, result.user.adminAccess)) {
    redirect("/admin/dashboard?admin_error=forbidden")
  }

  return result
}

/**
 * Get the current authenticated user session.
 * Returns null if not authenticated.
 */
export async function getAuthSession() {
  return auth.api.getSession({
    headers: await headers(),
  })
}

/**
 * Get the current authenticated user from the DB.
 * Returns null if not authenticated.
 */
export async function getAuthUser() {
  const session = await getAuthSession()
  if (!session?.user) return null

  return prisma.user.findUnique({
    where: { id: session.user.id },
  })
}
