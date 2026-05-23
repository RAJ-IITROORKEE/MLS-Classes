import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAuthSession } from "@/lib/admin-auth"
import crypto from "crypto"

// POST /api/payment/verify — verify Razorpay payment and activate MockAccess
export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json()

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ error: "Missing payment details" }, { status: 400 })
    }

    // Verify the signature
    const secret = process.env.RAZORPAY_KEY_SECRET ?? ""
    const body = `${razorpayOrderId}|${razorpayPaymentId}`
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
    }

    // Find the pre-created access record
    const access = await prisma.mockAccess.findFirst({
      where: {
        razorpayOrderId,
        userId: session.user.id,
        paid: false,
      },
    })

    if (!access) {
      return NextResponse.json({ error: "Access record not found" }, { status: 404 })
    }

    // Mark as paid
    await prisma.mockAccess.update({
      where: { id: access.id },
      data: {
        paid: true,
        razorpayPaymentId,
        paidAt: new Date(),
      },
    })

    // If it's a bundle purchase, create MockAccess for each individual mock in the bundle
    if (access.mockBundleId) {
      const bundle = await prisma.mockBundle.findUnique({
        where: { id: access.mockBundleId },
        select: { mockIds: true },
      })

      if (bundle?.mockIds?.length) {
        await prisma.mockAccess.createMany({
          data: bundle.mockIds.map((mockId) => ({
            userId: session.user.id,
            mockTestId: mockId,
            mockBundleId: access.mockBundleId,
            type: "BUNDLE" as const,
            razorpayOrderId,
            razorpayPaymentId,
            paid: true,
            paidAt: new Date(),
          })),
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 })
  }
}
