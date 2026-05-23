import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"
import { checkMockAccess } from "@/lib/mock-access"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const mock = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        _count: { select: { attempts: true } },
      },
    })

    if (!mock) {
      return NextResponse.json({ error: "Mock not found" }, { status: 404 })
    }

    // Questions are stripped from listing — only included when user has access
    const session = await getAuthSession()

    let accessInfo = null
    let questions = undefined

    if (session?.user) {
      accessInfo = await checkMockAccess(session.user.id, id)
      // Only return full questions if user has access or is admin
      if (accessInfo.hasAccess) {
        questions = mock.questions
      }
    }

    return NextResponse.json({
      mock: {
        id: mock.id,
        title: mock.title,
        description: mock.description,
        price: mock.price,
        actualPrice: mock.actualPrice,
        duration: mock.duration,
        tags: mock.tags,
        difficulty: mock.difficulty,
        status: mock.status,
        questionCount: Array.isArray(mock.questions) ? mock.questions.length : 0,
        attemptCount: mock._count.attempts,
        createdAt: mock.createdAt,
        questions,
      },
      access: accessInfo,
    })
  } catch {
    return NextResponse.json({ error: "Failed to fetch mock" }, { status: 500 })
  }
}
