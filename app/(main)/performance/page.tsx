import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { PerformanceDashboardClient } from "@/components/dashboard/PerformanceDashboardClient"

export const metadata = {
  title: "Performance Analytics",
  description: "View detailed analytics of your mock test performance.",
}

export default async function PerformancePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/mocks/sign-in")
  }

  const [allAttempts, totalMocks] = await Promise.all([
    prisma.mockAttempt.findMany({
      where: { userId: session.user.id, submittedAt: { not: null } },
      include: {
        mockTest: {
          select: {
            id: true,
            title: true,
            difficulty: true,
          },
        },
      },
      orderBy: { submittedAt: "asc" },
    }),
    prisma.mockTest.count({
      where: { status: "PUBLISHED" },
    }),
  ])

  // Calculate overall stats
  let totalCorrect = 0
  let totalIncorrect = 0
  let totalUnanswered = 0
  let totalTimeTaken = 0
  let totalScore = 0
  let totalQuestionsSum = 0

  const mockStatsMap = new Map<
    string,
    {
      mockId: string
      mockTitle: string
      difficulty: string
      attempts: number
      bestScore: number
      bestPercentage: number
      totalTime: number
      lastAttemptDate: string | null
    }
  >()

  allAttempts.forEach((attempt) => {
    totalCorrect += attempt.correctCount
    totalIncorrect += attempt.incorrectCount
    totalUnanswered += attempt.unansweredCount
    totalScore += attempt.score
    totalQuestionsSum += attempt.totalQuestions

    const timeTaken =
      attempt.submittedAt && attempt.startedAt
        ? Math.floor((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
        : 0
    totalTimeTaken += timeTaken

    // Per-mock stats
    const existing = mockStatsMap.get(attempt.mockTestId)
    if (existing) {
      existing.attempts += 1
      existing.bestScore = Math.max(existing.bestScore, attempt.score)
      existing.bestPercentage = Math.max(existing.bestPercentage, attempt.percentage)
      existing.totalTime += timeTaken
      existing.lastAttemptDate = attempt.submittedAt?.toISOString() ?? null
    } else {
      mockStatsMap.set(attempt.mockTestId, {
        mockId: attempt.mockTestId,
        mockTitle: attempt.mockTest.title,
        difficulty: attempt.mockTest.difficulty,
        attempts: 1,
        bestScore: attempt.score,
        bestPercentage: attempt.percentage,
        totalTime: timeTaken,
        lastAttemptDate: attempt.submittedAt?.toISOString() ?? null,
      })
    }
  })

  const totalAttempts = allAttempts.length
  const avgPercentage =
    totalAttempts > 0 && totalQuestionsSum > 0
      ? Math.round((totalScore / totalAttempts) * 100 / (totalQuestionsSum / totalAttempts))
      : 0

  const estimatedRank = Math.max(1, Math.floor(1000 - avgPercentage * 10))

  // Format attempts for client
  const formattedAttempts = allAttempts.map((attempt) => ({
    id: attempt.id,
    mockTestId: attempt.mockTestId,
    mockTitle: attempt.mockTest.title,
    score: attempt.score,
    totalQuestions: attempt.totalQuestions,
    percentage: attempt.percentage,
    correctCount: attempt.correctCount,
    incorrectCount: attempt.incorrectCount,
    unansweredCount: attempt.unansweredCount,
    submittedAt: attempt.submittedAt?.toISOString() ?? null,
    timeTaken:
      attempt.submittedAt && attempt.startedAt
        ? Math.floor((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
        : null,
  }))

  // Per-mock breakdown
  const perMockBreakdown = Array.from(mockStatsMap.values()).map((stats) => ({
    ...stats,
    avgTime: stats.attempts > 0 ? Math.floor(stats.totalTime / stats.attempts) : 0,
  }))

  // Answer distribution for pie chart
  const answerDistribution = [
    { name: "Correct", value: totalCorrect, color: "#10b981" },
    { name: "Incorrect", value: totalIncorrect, color: "#ef4444" },
    { name: "Unanswered", value: totalUnanswered, color: "#3b82f6" },
  ]

  return (
    <PerformanceDashboardClient
      user={{
        id: session.user.id,
        name: session.user.name ?? session.user.email,
        email: session.user.email,
      }}
      overall={{
        totalAttempts,
        avgPercentage,
        totalCorrect,
        totalIncorrect,
        totalUnanswered,
        totalTimeTaken,
        estimatedRank,
        attemptedMocks: mockStatsMap.size,
        totalMocks,
      }}
      answerDistribution={answerDistribution}
      attempts={formattedAttempts}
      perMockBreakdown={perMockBreakdown}
    />
  )
}
