import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextRequest } from "next/server"

export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401
  ) {
    super(message)
    this.name = "AuthError"
  }
}

/**
 * Assert that the current request is made by an admin user.
 * Throws AuthError if not authenticated or not an admin.
 */
export async function assertAdminAccess(request?: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new AuthError("Unauthorized — please sign in", 401)
  }

  // Look up the DB user to get the role
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!dbUser || dbUser.role !== "ADMIN") {
    throw new AuthError("Forbidden — admin access required", 403)
  }

  return session
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
