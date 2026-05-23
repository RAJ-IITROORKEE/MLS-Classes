import { prisma } from "@/lib/prisma"

// Attempt limits
export const FREE_MOCK_ATTEMPT_LIMIT = 3
export const PAID_MOCK_ATTEMPT_LIMIT = 10

export type MockAccessResult = {
  hasAccess: boolean
  accessType: "free" | "paid" | "bundle" | "admin" | null
  attemptsUsed: number
  attemptsLimit: number
  attemptsRemaining: number
  canAttempt: boolean
}

/**
 * Check whether a user has access to a given mock test,
 * and how many attempts they have left.
 */
export async function checkMockAccess(
  userId: string,
  mockTestId: string
): Promise<MockAccessResult> {
  const mock = await prisma.mockTest.findUnique({
    where: { id: mockTestId },
    select: { price: true, status: true },
  })

  if (!mock) {
    return {
      hasAccess: false,
      accessType: null,
      attemptsUsed: 0,
      attemptsLimit: 0,
      attemptsRemaining: 0,
      canAttempt: false,
    }
  }

  // Count existing attempts (submitted or in-progress)
  const attemptsUsed = await prisma.mockAttempt.count({
    where: {
      userId,
      mockTestId,
    },
  })

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  if (user?.role === "ADMIN") {
    return {
      hasAccess: true,
      accessType: "admin",
      attemptsUsed,
      attemptsLimit: 999,
      attemptsRemaining: 999,
      canAttempt: true,
    }
  }

  // Free mock
  if (mock.price === 0) {
    const remaining = Math.max(0, FREE_MOCK_ATTEMPT_LIMIT - attemptsUsed)
    return {
      hasAccess: true,
      accessType: "free",
      attemptsUsed,
      attemptsLimit: FREE_MOCK_ATTEMPT_LIMIT,
      attemptsRemaining: remaining,
      canAttempt: remaining > 0,
    }
  }

  // Check for individual paid access
  const individualAccess = await prisma.mockAccess.findFirst({
    where: {
      userId,
      mockTestId,
      paid: true,
      mockBundleId: null,
    },
  })

  if (individualAccess) {
    const remaining = Math.max(0, PAID_MOCK_ATTEMPT_LIMIT - attemptsUsed)
    return {
      hasAccess: true,
      accessType: "paid",
      attemptsUsed,
      attemptsLimit: PAID_MOCK_ATTEMPT_LIMIT,
      attemptsRemaining: remaining,
      canAttempt: remaining > 0,
    }
  }

  // Check for bundle access
  const bundleAccess = await prisma.mockAccess.findFirst({
    where: {
      userId,
      mockTestId,
      paid: true,
      mockBundleId: { not: null },
    },
  })

  if (bundleAccess) {
    const remaining = Math.max(0, PAID_MOCK_ATTEMPT_LIMIT - attemptsUsed)
    return {
      hasAccess: true,
      accessType: "bundle",
      attemptsUsed,
      attemptsLimit: PAID_MOCK_ATTEMPT_LIMIT,
      attemptsRemaining: remaining,
      canAttempt: remaining > 0,
    }
  }

  // No access
  return {
    hasAccess: false,
    accessType: null,
    attemptsUsed,
    attemptsLimit: PAID_MOCK_ATTEMPT_LIMIT,
    attemptsRemaining: 0,
    canAttempt: false,
  }
}
