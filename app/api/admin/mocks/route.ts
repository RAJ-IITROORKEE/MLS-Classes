import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { assertAdminAccess, AuthError } from "@/lib/admin-auth"

// GET /api/admin/mocks — list all mocks with stats
export async function GET() {
  try {
    await assertAdminAccess()

    const mocks = await prisma.mockTest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { attempts: true, access: true },
        },
      },
    })

    const result = mocks.map((m) => ({
      id: m.id,
      title: m.title,
      description: m.description,
      price: m.price,
      actualPrice: m.actualPrice,
      duration: m.duration,
      tags: m.tags,
      difficulty: m.difficulty,
      status: m.status,
      questionCount: Array.isArray(m.questions) ? (m.questions as unknown[]).length : 0,
      attemptCount: m._count.attempts,
      accessCount: m._count.access,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
    }))

    return NextResponse.json({ mocks: result })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to fetch mocks" }, { status: 500 })
  }
}

// POST /api/admin/mocks — create a new mock
export async function POST(req: NextRequest) {
  try {
    await assertAdminAccess()

    const body = await req.json()
    const { title, description, price, actualPrice, duration, tags, difficulty, status } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const mock = await prisma.mockTest.create({
      data: {
        title,
        description: description ?? null,
        price: price ?? 0,
        actualPrice: actualPrice ?? null,
        duration: duration ?? null,
        tags: tags ?? [],
        difficulty: difficulty ?? "EASY",
        status: status ?? "DRAFT",
        questions: [],
      },
    })

    return NextResponse.json({ mock }, { status: 201 })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to create mock" }, { status: 500 })
  }
}

// PUT /api/admin/mocks — update a mock
export async function PUT(req: NextRequest) {
  try {
    await assertAdminAccess()

    const body = await req.json()
    const { id, title, description, price, actualPrice, duration, tags, difficulty, status, questions } = body

    if (!id) {
      return NextResponse.json({ error: "Mock id is required" }, { status: 400 })
    }

    const mock = await prisma.mockTest.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(actualPrice !== undefined && { actualPrice }),
        ...(duration !== undefined && { duration }),
        ...(tags !== undefined && { tags }),
        ...(difficulty !== undefined && { difficulty }),
        ...(status !== undefined && { status }),
        ...(questions !== undefined && { questions: JSON.parse(JSON.stringify(questions)) }),
      },
    })

    return NextResponse.json({ mock })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    const message = err instanceof Error ? err.message : "Failed to update mock"
    console.error("PUT /api/admin/mocks error:", message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
