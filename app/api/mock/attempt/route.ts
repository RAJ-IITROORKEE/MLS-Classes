import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"
import { checkMockAccess } from "@/lib/mock-access"

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mockTestId } = await req.json()

    if (!mockTestId) {
      return NextResponse.json({ error: "mockTestId is required" }, { status: 400 })
    }

    const mock = await prisma.mockTest.findUnique({
      where: { id: mockTestId },
      select: { id: true, status: true, title: true },
    })

    if (!mock || mock.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Mock not found or not published" }, { status: 404 })
    }

    const accessInfo = await checkMockAccess(session.user.id, mockTestId)

    if (!accessInfo.hasAccess) {
      return NextResponse.json({ error: "Access denied — please purchase this mock" }, { status: 403 })
    }

    if (!accessInfo.canAttempt) {
      return NextResponse.json(
        {
          error: `Attempt limit reached. You have used all ${accessInfo.attemptsLimit} attempts for this mock.`,
        },
        { status: 403 }
      )
    }

    // Create a new attempt
    const attempt = await prisma.mockAttempt.create({
      data: {
        userId: session.user.id,
        mockTestId,
        answers: {},
      },
    })

    return NextResponse.json({ attempt })
  } catch {
    return NextResponse.json({ error: "Failed to create attempt" }, { status: 500 })
  }
}
