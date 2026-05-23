import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"
import { nanoid } from "nanoid"
import { getRazorpay, isRazorpayConfigured } from "@/lib/razorpay"


// POST /api/payment/mock — create a Razorpay order for a mock or bundle
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mockTestId, mockBundleId } = await req.json()

    if (!mockTestId && !mockBundleId) {
      return NextResponse.json(
        { error: "mockTestId or mockBundleId is required" },
        { status: 400 }
      )
    }

    let amount = 0
    let description = ""

    if (mockBundleId) {
      const bundle = await prisma.mockBundle.findUnique({
        where: { id: mockBundleId },
        select: { id: true, title: true, discountedPrice: true, basePrice: true, status: true },
      })
      if (!bundle || bundle.status !== "PUBLISHED") {
        return NextResponse.json({ error: "Bundle not found" }, { status: 404 })
      }
      amount = (bundle.discountedPrice ?? bundle.basePrice) * 100 // Razorpay uses paise
      description = `Bundle: ${bundle.title}`
    } else if (mockTestId) {
      const mock = await prisma.mockTest.findUnique({
        where: { id: mockTestId },
        select: { id: true, title: true, price: true, status: true },
      })
      if (!mock || mock.status !== "PUBLISHED") {
        return NextResponse.json({ error: "Mock not found" }, { status: 404 })
      }
      if (mock.price === 0) {
        return NextResponse.json({ error: "This mock is free" }, { status: 400 })
      }
      amount = mock.price * 100
      description = `Mock: ${mock.title}`
    }

    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { error: "Payment system is not configured" },
        { status: 503 }
      )
    }

    const receiptId = nanoid(16)

    const order = await getRazorpay().orders.create({
      amount,
      currency: "INR",
      receipt: receiptId,
      notes: {
        userId: session.user.id,
        mockTestId: mockTestId ?? "",
        mockBundleId: mockBundleId ?? "",
      },
    })

    // Pre-create MockAccess record with unpaid status
    await prisma.mockAccess.create({
      data: {
        userId: session.user.id,
        mockTestId: mockTestId ?? null,
        mockBundleId: mockBundleId ?? null,
        type: mockBundleId ? "BUNDLE" : "PAID",
        razorpayOrderId: order.id,
        paid: false,
        originalPrice: amount / 100,
      },
    })

    return NextResponse.json({
      orderId: order.id,
      amount,
      currency: "INR",
      description,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch {
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 })
  }
}
