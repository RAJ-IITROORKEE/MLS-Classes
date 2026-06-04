import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { DashboardClient } from "@/components/dashboard/DashboardClient"

export const metadata = {
  title: "Student Dashboard",
  description: "Manage your profile, view mock test performance, and track progress.",
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/sign-in")
  }

  const [user, mockAttempts, totalMocks, recentTestimonials] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    }),
    prisma.mockAttempt.findMany({
      where: { userId: session.user.id, submittedAt: { not: null } },
      include: {
        mockTest: {
          select: {
            id: true,
            title: true,
            questions: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    }),
    prisma.mockTest.count({
      where: { status: "PUBLISHED" },
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
  ])

  // Calculate average percentage and correct counts
  let totalCorrect = 0
  let totalQuestions = 0
  let totalScore = 0

  mockAttempts.forEach((attempt) => {
    totalCorrect += attempt.correctCount
    totalQuestions += attempt.totalQuestions
    totalScore += attempt.score
  })

  const averagePercentage =
    mockAttempts.length > 0
      ? (totalScore / mockAttempts.length) * 100 / (totalQuestions / mockAttempts.length)
      : 0

  const lastAttemptDate =
    mockAttempts.length > 0 ? mockAttempts[0].submittedAt : null

  const attemptedMocks = new Set(mockAttempts.map((a) => a.mockTestId)).size

  // Get recent 5 attempts for the dashboard
  const recentAttempts = mockAttempts.slice(0, 5).map((attempt) => ({
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
    timeTaken: attempt.submittedAt && attempt.startedAt
      ? Math.floor((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
      : null,
  }))

  // Safely serialize user
  const safeUser = {
    id: user?.id ?? session.user.id,
    name: user?.name ?? session.user.name ?? null,
    email: user?.email ?? session.user.email ?? "",
    image: user?.image ?? session.user.image ?? null,
    role: user?.role ?? session.user.role ?? "STUDENT",
    createdAt: user?.createdAt.toISOString() ?? new Date().toISOString(),
  }

  return (
    <DashboardClient
      user={safeUser}
      stats={{
        averagePercentage: Math.round(averagePercentage) || 0,
        attemptedMocks,
        totalMocks,
        lastAttemptDate: lastAttemptDate?.toISOString() ?? null,
        totalCorrect,
        totalQuestions,
      }}
      recentAttempts={recentAttempts}
      testimonials={recentTestimonials.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        rating: t.rating,
        text: t.text,
        imageUrl: t.imageUrl,
      }))}
    />
  )
}
