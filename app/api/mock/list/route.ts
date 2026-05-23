import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [mocks, bundles] = await Promise.all([
      prisma.mockTest.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          actualPrice: true,
          duration: true,
          tags: true,
          difficulty: true,
          status: true,
          questions: true,
          createdAt: true,
          _count: { select: { attempts: true } },
        },
      }),
      prisma.mockBundle.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
      }),
    ])

    const mocksWithCount = mocks.map((m) => ({
      ...m,
      questionCount: Array.isArray(m.questions) ? m.questions.length : 0,
      questions: undefined,
      attemptCount: m._count.attempts,
      _count: undefined,
    }))

    return NextResponse.json({ mocks: mocksWithCount, bundles })
  } catch {
    return NextResponse.json({ error: "Failed to fetch mocks" }, { status: 500 })
  }
}
