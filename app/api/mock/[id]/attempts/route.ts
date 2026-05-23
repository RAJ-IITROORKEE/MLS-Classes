import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: mockTestId } = await params
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const attempts = await prisma.mockAttempt.findMany({
      where: {
        userId: session.user.id,
        mockTestId,
        submittedAt: { not: null },
      },
      orderBy: { submittedAt: "desc" },
      select: {
        id: true,
        score: true,
        correctCount: true,
        incorrectCount: true,
        unansweredCount: true,
        totalQuestions: true,
        percentage: true,
        startedAt: true,
        submittedAt: true,
      },
    })

    return NextResponse.json({ attempts })
  } catch {
    return NextResponse.json({ error: "Failed to fetch attempts" }, { status: 500 })
  }
}
