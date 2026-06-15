import { randomUUID } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { assertAdminAccess, AuthError } from "@/lib/admin-auth"
import {
  ADMIN_ACCESS_SECTIONS,
  getAccessLabels,
  normalizeAdminAccess,
  USER_ROLES,
} from "@/lib/admin-permissions"

const userManagementSchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email is required"),
  role: z.enum([USER_ROLES.STUDENT, USER_ROLES.CONTENT, USER_ROLES.ADMIN]),
  adminAccess: z.array(z.string()).default([]),
})

function toUserRow(user: {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  adminAccess: string[]
  createdAt: Date
}) {
  const adminAccess = normalizeAdminAccess(user.adminAccess)

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
    adminAccess,
    accessLabels: getAccessLabels(user.role, adminAccess),
    createdAt: user.createdAt.toISOString(),
  }
}

function getRoleAccess(role: string, adminAccess: string[]) {
  return role === USER_ROLES.CONTENT ? normalizeAdminAccess(adminAccess) : []
}

async function assertAdminCanLoseAdminRole(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } })
  if (user?.role !== USER_ROLES.ADMIN) return

  const otherAdmins = await prisma.user.count({
    where: { role: USER_ROLES.ADMIN, id: { not: userId } },
  })
  if (otherAdmins < 1) {
    throw new Error("At least one admin user must remain")
  }
}

function authErrorResponse(error: AuthError) {
  return NextResponse.json({ error: error.message }, { status: error.statusCode })
}

export async function GET() {
  try {
    await assertAdminAccess()

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        adminAccess: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      users: users.map(toUserRow),
      accessSections: ADMIN_ACCESS_SECTIONS.map((section) => ({
        key: section.key,
        label: section.label,
      })),
    })
  } catch (error) {
    if (error instanceof AuthError) return authErrorResponse(error)
    console.error("[/api/admin/user-management GET]", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await assertAdminAccess()

    const parsed = userManagementSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid user data" },
        { status: 400 }
      )
    }

    const data = parsed.data
    const email = data.email.toLowerCase()
    const existingUser = await prisma.user.findUnique({ where: { email }, select: { id: true } })
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name: data.name,
        email,
        emailVerified: false,
        role: data.role,
        adminAccess: getRoleAccess(data.role, data.adminAccess),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        adminAccess: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ user: toUserRow(user) }, { status: 201 })
  } catch (error) {
    if (error instanceof AuthError) return authErrorResponse(error)
    console.error("[/api/admin/user-management POST]", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await assertAdminAccess()
    const body = await req.json()
    const userId = z.string().min(1).safeParse(body.userId)
    const parsed = userManagementSchema.safeParse(body)

    if (!userId.success) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid user data" },
        { status: 400 }
      )
    }

    if (userId.data === session.user.id && parsed.data.role !== USER_ROLES.ADMIN) {
      return NextResponse.json({ error: "You cannot remove your own admin access" }, { status: 400 })
    }

    if (parsed.data.role !== USER_ROLES.ADMIN) {
      await assertAdminCanLoseAdminRole(userId.data)
    }

    const email = parsed.data.email.toLowerCase()
    const existingUser = await prisma.user.findUnique({ where: { email }, select: { id: true } })
    if (existingUser && existingUser.id !== userId.data) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    const user = await prisma.user.update({
      where: { id: userId.data },
      data: {
        name: parsed.data.name,
        email,
        role: parsed.data.role,
        adminAccess: getRoleAccess(parsed.data.role, parsed.data.adminAccess),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        adminAccess: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ user: toUserRow(user) })
  } catch (error) {
    if (error instanceof AuthError) return authErrorResponse(error)
    if (error instanceof Error && error.message === "At least one admin user must remain") {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error("[/api/admin/user-management PATCH]", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await assertAdminAccess()
    const { userId } = await req.json()

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }
    if (userId === session.user.id) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 })
    }

    await assertAdminCanLoseAdminRole(userId)
    await prisma.user.delete({ where: { id: userId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof AuthError) return authErrorResponse(error)
    if (error instanceof Error && error.message === "At least one admin user must remain") {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error("[/api/admin/user-management DELETE]", error)
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
