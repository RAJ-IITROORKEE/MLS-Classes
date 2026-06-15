import { NextResponse } from "next/server"
import { assertAdminAccess, AuthError } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

const RECENT_LIMIT = 8

function truncateMessage(message: string | null | undefined, maxLength = 90) {
  if (!message) return "No message provided"
  return message.length > maxLength ? `${message.slice(0, maxLength).trim()}...` : message
}

export async function GET() {
  try {
    await assertAdminAccess()

    const [trialRequests, contactMessages, trialCount, contactCount] = await Promise.all([
      prisma.bookTrialRequest.findMany({
        where: { status: "PENDING" },
        select: {
          id: true,
          email: true,
          studentName: true,
          program: true,
          grade: true,
          message: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: RECENT_LIMIT,
      }),
      prisma.contactUs.findMany({
        where: { status: "PENDING" },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          message: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
        take: RECENT_LIMIT,
      }),
      prisma.bookTrialRequest.count({ where: { status: "PENDING" } }),
      prisma.contactUs.count({ where: { status: "PENDING" } }),
    ])

    const notifications = [
      ...trialRequests.map((request) => ({
        id: `trial-${request.id}`,
        type: "trial" as const,
        title: `Trial request for ${request.studentName}`,
        message: `${request.email} • ${request.program} • ${request.grade}`,
        email: request.email,
        createdAt: request.createdAt,
        link: "/admin/contacts",
      })),
      ...contactMessages.map((message) => ({
        id: `contact-${message.id}`,
        type: "contact" as const,
        title: `Contact message from ${message.name}`,
        message: message.subject || truncateMessage(message.message),
        email: message.email,
        createdAt: message.createdAt,
        link: "/admin/contact-us",
      })),
    ]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, RECENT_LIMIT)

    return NextResponse.json({
      notifications,
      counts: {
        trial: trialCount,
        contact: contactCount,
        total: trialCount + contactCount,
      },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }

    console.error("GET /api/admin/notifications error:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}
