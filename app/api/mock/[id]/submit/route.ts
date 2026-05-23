import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"
import type { MockQuestion } from "@/types/mock"

type AnswerMap = Record<string, string>

function scoreAnswers(
  questions: MockQuestion[],
  answers: AnswerMap
): {
  correctCount: number
  incorrectCount: number
  unansweredCount: number
  score: number
} {
  let correctCount = 0
  let incorrectCount = 0
  let unansweredCount = 0

  for (const q of questions) {
    const userAnswer = answers[q.id]

    if (!userAnswer || userAnswer.trim() === "") {
      unansweredCount++
      continue
    }

    const correctAnswer = q.answer?.trim() ?? ""

    if (q.type === "MCQ") {
      if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        correctCount++
      } else {
        incorrectCount++
      }
    } else if (q.type === "MSQ") {
      // Sort both semicolon-separated answer sets and compare
      const userSet = userAnswer
        .split(";")
        .map((s) => s.trim().toLowerCase())
        .sort()
        .join(";")
      const correctSet = correctAnswer
        .split(";")
        .map((s) => s.trim().toLowerCase())
        .sort()
        .join(";")
      if (userSet === correctSet) {
        correctCount++
      } else {
        incorrectCount++
      }
    } else if (q.type === "NAT") {
      // Numerical answer — compare with tolerance
      const userNum = parseFloat(userAnswer)
      const correctNum = parseFloat(correctAnswer)
      if (!isNaN(userNum) && !isNaN(correctNum) && Math.abs(userNum - correctNum) < 0.001) {
        correctCount++
      } else {
        incorrectCount++
      }
    } else if (q.type === "DESCRIPTIVE") {
      // Any non-empty answer counts (manual review needed)
      if (userAnswer.trim().length > 0) {
        correctCount++
      } else {
        unansweredCount--
        incorrectCount++
      }
    }
  }

  return { correctCount, incorrectCount, unansweredCount, score: correctCount }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: mockTestId } = await params
    const session = await getAuthSession()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { attemptId, answers, timeSpent, totalQuestions } = await req.json()

    if (!attemptId || !answers) {
      return NextResponse.json({ error: "attemptId and answers are required" }, { status: 400 })
    }

    // Verify the attempt belongs to this user and mock
    const attempt = await prisma.mockAttempt.findFirst({
      where: {
        id: attemptId,
        userId: session.user.id,
        mockTestId,
      },
    })

    if (!attempt) {
      return NextResponse.json(
        { error: "Attempt not found" },
        { status: 404 }
      )
    }

    if (attempt.submittedAt !== null) {
      return NextResponse.json(
        { error: "Attempt already submitted" },
        { status: 409 }
      )
    }

    // Fetch the mock with questions
    const mock = await prisma.mockTest.findUnique({
      where: { id: mockTestId },
      select: { questions: true },
    })

    if (!mock) {
      return NextResponse.json({ error: "Mock not found" }, { status: 404 })
    }

    const questions = mock.questions as unknown as MockQuestion[]
    const totalQuestionsCount =
      typeof totalQuestions === "number" && totalQuestions > 0
        ? totalQuestions
        : questions.length

    const { correctCount, incorrectCount, unansweredCount, score } = scoreAnswers(
      questions,
      answers as AnswerMap
    )

    const percentage =
      totalQuestionsCount > 0 ? (correctCount / totalQuestionsCount) * 100 : 0
    const now = new Date()
    const timeTakenSecs =
      typeof timeSpent === "number" && timeSpent >= 0
        ? Math.floor(timeSpent)
        : Math.floor((now.getTime() - attempt.startedAt.getTime()) / 1000)

    // Update the attempt with results
    const updatedAttempt = await prisma.mockAttempt.update({
      where: { id: attemptId },
      data: {
        answers,
        score,
        correctCount,
        incorrectCount,
        unansweredCount,
        totalQuestions: totalQuestionsCount,
        percentage,
        submittedAt: now,
      },
    })

    return NextResponse.json({
      attempt: updatedAttempt,
      timeTakenSecs,
    })
  } catch {
    return NextResponse.json({ error: "Failed to submit attempt" }, { status: 500 })
  }
}
