import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { assertAdminApiAccess, AuthError } from "@/lib/admin-auth"

// GET /api/admin/mocks/[id] — get single mock with full questions
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminApiAccess("/api/admin/mocks")
    const { id } = await params

    const mock = await prisma.mockTest.findUnique({
      where: { id },
      include: {
        _count: { select: { attempts: true, access: true } },
      },
    })

    if (!mock) {
      return NextResponse.json({ error: "Mock not found" }, { status: 404 })
    }

    return NextResponse.json({ mock })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to fetch mock" }, { status: 500 })
  }
}

// DELETE /api/admin/mocks/[id] — delete a mock
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminApiAccess("/api/admin/mocks")
    const { id } = await params

    await prisma.mockTest.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: err.statusCode })
    }
    return NextResponse.json({ error: "Failed to delete mock" }, { status: 500 })
  }
}
