import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { assertAdminAccess, AuthError } from "@/lib/admin-auth"

// GET /api/admin/mock-stats — user stats for all mocks
export async function GET() {
  try {
    await assertAdminAccess()

    const attempts = await prisma.mockAttempt.findMany({
      where: { submittedAt: { not: null } },
      orderBy: { submittedAt: "desc" },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
        mockTest: {
          select: { id: true, title: true, difficulty: true },
        },
      },
    })

    // Aggregate per-user stats
    const userStatsMap = new Map<
      string,
      {
        user: { id: string; name: string | null; email: string; image: string | null }
        totalAttempts: number
        avgPercentage: number
        percentageSum: number
        mocks: Set<string>
      }
    >()

    for (const attempt of attempts) {
      const uid = attempt.userId
      if (!userStatsMap.has(uid)) {
        userStatsMap.set(uid, {
          user: attempt.user,
          totalAttempts: 0,
          avgPercentage: 0,
          percentageSum: 0,
          mocks: new Set(),
        })
      }
      const stat = userStatsMap.get(uid)!
      stat.totalAttempts++
      stat.percentageSum += attempt.percentage
      stat.mocks.add(attempt.mockTestId)
    }

    const userStats = Array.from(userStatsMap.values()).map((s) => ({
      user: s.user,
      totalAttempts: s.totalAttempts,
      avgPercentage: s.totalAttempts > 0 ? Math.round(s.percentageSum / s.totalAttempts) : 0,
      mocksAttempted: s.mocks.size,
    }))

    // Per-mock aggregate stats
    const mockStatsMap = new Map<
      string,
      {
        mock: { id: string; title: string; difficulty: string }
        totalAttempts: number
        percentageSum: number
        uniqueUsers: Set<string>
      }
    >()

    for (const attempt of attempts) {
      const mid = attempt.mockTestId
      if (!mockStatsMap.has(mid)) {
        mockStatsMap.set(mid, {
          mock: attempt.mockTest,
          totalAttempts: 0,
          percentageSum: 0,
          uniqueUsers: new Set(),
        })
      }
      const stat = mockStatsMap.get(mid)!
      stat.totalAttempts++
      stat.percentageSum += attempt.percentage
      stat.uniqueUsers.add(attempt.userId)
    }

    const mockStats = Array.from(mockStatsMap.values()).map((s) => ({
      mock: s.mock,
      totalAttempts: s.totalAttempts,
      avgPercentage: s.totalAttempts > 0 ? Math.round(s.percentageSum / s.totalAttempts) : 0,
      uniqueUsers: s.uniqueUsers.size,
    }))

    return NextResponse.json({
      attempts: attempts.map((a) => ({
        id: a.id,
        user: a.user,
        mock: a.mockTest,
        score: a.score,
        percentage: a.percentage,
        correctCount: a.correctCount,
        incorrectCount: a.incorrectCount,
        totalQuestions: a.totalQuestions,
        submittedAt: a.submittedAt,
        startedAt: a.startedAt,
      })),
      userStats,
      mockStats,
    })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
