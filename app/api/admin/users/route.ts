import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { assertAdminAccess } from "@/lib/admin-auth"

export async function GET() {
  try {
    await assertAdminAccess()

    // Fetch all users with their attempts
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            mockAttempts: true,
          },
        },
        mockAttempts: {
          select: {
            id: true,
            submittedAt: true,
            percentage: true,
            score: true,
            totalQuestions: true,
            mockTestId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Compute monthly stats
    const monthlyStats: Record<
      string,
      { users: number; attempts: number }
    > = {}

    const now = new Date()
    // Initialize last 12 months
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      monthlyStats[key] = { users: 0, attempts: 0 }
    }

    let totalAttempts = 0

    const userRows = users.map((u) => {
      const submittedAttempts = u.mockAttempts.filter((a) => a.submittedAt !== null)
      const attemptsCount = submittedAttempts.length
      totalAttempts += attemptsCount

      // Count registrations by month
      const regMonth = `${u.createdAt.getFullYear()}-${String(u.createdAt.getMonth() + 1).padStart(2, "0")}`
      if (monthlyStats[regMonth]) {
        monthlyStats[regMonth].users++
      }

      // Count attempts by month
      for (const a of submittedAttempts) {
        if (a.submittedAt) {
          const d = new Date(a.submittedAt)
          const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
          if (monthlyStats[month]) {
            monthlyStats[month].attempts++
          }
        }
      }

      const avgPercentage =
        attemptsCount > 0
          ? Math.round(
              submittedAttempts.reduce((sum, a) => sum + (a.percentage ?? 0), 0) /
                attemptsCount
            )
          : 0

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        role: u.role,
        createdAt: u.createdAt.toISOString(),
        totalAttempts: attemptsCount,
        avgPercentage,
      }
    })

    // Convert monthly stats to sorted array
    const monthlyBreakdown = Object.entries(monthlyStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month,
        users: data.users,
        attempts: data.attempts,
      }))

    return NextResponse.json({
      totalUsers: users.length,
      totalAttempts,
      monthlyBreakdown,
      users: userRows,
    })
  } catch (err) {
    if (err instanceof Error && err.name === "AuthError") {
      return NextResponse.json(
        { error: err.message },
        { status: (err as Error & { statusCode?: number }).statusCode ?? 401 }
      )
    }
    console.error("[/api/admin/users]", err)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
