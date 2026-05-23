import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { assertAdminAccess, AuthError } from "@/lib/admin-auth"

// GET /api/admin/mock-bundles — list all bundles
export async function GET() {
  try {
    await assertAdminAccess()

    const bundles = await prisma.mockBundle.findMany({
      orderBy: { order: "asc" },
    })

    // Enrich with mock details for each bundle
    const enriched = await Promise.all(
      bundles.map(async (bundle) => {
        const mocks = await prisma.mockTest.findMany({
          where: { id: { in: bundle.mockIds } },
          select: { id: true, title: true, price: true, difficulty: true },
        })
        return { ...bundle, mocks }
      })
    )

    return NextResponse.json({ bundles: enriched })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to fetch bundles" }, { status: 500 })
  }
}

// POST /api/admin/mock-bundles — create a bundle
export async function POST(req: NextRequest) {
  try {
    await assertAdminAccess()

    const body = await req.json()
    const { title, description, mockIds, discountedPrice, status } = body

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const ids: string[] = mockIds ?? []

    // Auto-calculate basePrice from selected mocks
    let basePrice = 0
    if (ids.length > 0) {
      const mocks = await prisma.mockTest.findMany({
        where: { id: { in: ids } },
        select: { price: true },
      })
      basePrice = mocks.reduce((sum, m) => sum + m.price, 0)
    }

    // Get the next order value
    const lastBundle = await prisma.mockBundle.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const bundle = await prisma.mockBundle.create({
      data: {
        title,
        description: description ?? null,
        mockIds: ids,
        basePrice,
        discountedPrice: discountedPrice ?? null,
        status: status ?? "DRAFT",
        order: (lastBundle?.order ?? 0) + 1,
      },
    })

    return NextResponse.json({ bundle }, { status: 201 })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to create bundle" }, { status: 500 })
  }
}

// PUT /api/admin/mock-bundles — update a bundle
export async function PUT(req: NextRequest) {
  try {
    await assertAdminAccess()

    const body = await req.json()
    const { id, title, description, mockIds, discountedPrice, status } = body

    if (!id) {
      return NextResponse.json({ error: "Bundle id is required" }, { status: 400 })
    }

    let basePrice: number | undefined
    if (mockIds !== undefined) {
      const ids: string[] = mockIds
      if (ids.length > 0) {
        const mocks = await prisma.mockTest.findMany({
          where: { id: { in: ids } },
          select: { price: true },
        })
        basePrice = mocks.reduce((sum, m) => sum + m.price, 0)
      } else {
        basePrice = 0
      }
    }

    const bundle = await prisma.mockBundle.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(mockIds !== undefined && { mockIds }),
        ...(basePrice !== undefined && { basePrice }),
        ...(discountedPrice !== undefined && { discountedPrice }),
        ...(status !== undefined && { status }),
      },
    })

    return NextResponse.json({ bundle })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to update bundle" }, { status: 500 })
  }
}

// DELETE /api/admin/mock-bundles?id=... — delete a bundle
export async function DELETE(req: NextRequest) {
  try {
    await assertAdminAccess()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Bundle id is required" }, { status: 400 })
    }

    await prisma.mockBundle.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to delete bundle" }, { status: 500 })
  }
}
