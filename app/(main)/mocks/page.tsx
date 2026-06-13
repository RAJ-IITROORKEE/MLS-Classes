import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import {
  FREE_MOCK_ATTEMPT_LIMIT,
  PAID_MOCK_ATTEMPT_LIMIT,
} from "@/lib/mock-access";
import { MocksListingClient } from "@/app/(main)/mocks/_components/mocks-listing-client";

export const metadata: Metadata = {
  title: "Mock Tests",
  description:
    "Browse MLS mock tests, unlock premium practice bundles, and track attempts.",
};

type PageProps = {
  searchParams?: Promise<{ tab?: string }>;
};

export default async function MocksPage({ searchParams }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [mocks, bundles, mockAccess] = await Promise.all([
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
    session?.user
      ? prisma.mockAccess.findMany({
          where: { userId: session.user.id, paid: true },
          select: { mockTestId: true, mockBundleId: true },
        })
      : Promise.resolve([]),
  ]);

  const mocksWithCount = mocks.map((mock) => ({
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
    createdAt: mock.createdAt.toISOString(),
  }));

  const bundleSummaries = bundles.map((bundle) => ({
    id: bundle.id,
    title: bundle.title,
    description: bundle.description,
    mockIds: bundle.mockIds,
    basePrice: bundle.basePrice,
    discountedPrice: bundle.discountedPrice,
    status: bundle.status,
    order: bundle.order,
    mockCount: bundle.mockIds.length,
    createdAt: bundle.createdAt.toISOString(),
  }));

  const purchasedMockIds = Array.from(
    new Set(mockAccess.map((access) => access.mockTestId).filter(Boolean))
  ) as string[];
  const purchasedBundleIds = Array.from(
    new Set(mockAccess.map((access) => access.mockBundleId).filter(Boolean))
  ) as string[];

  const params = (await searchParams) ?? {};
  const tabParam = params.tab;
  const initialTab =
    tabParam === "bundles" || tabParam === "premium" || tabParam === "free"
      ? tabParam
      : "free";

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <MocksListingClient
          mocks={mocksWithCount}
          bundles={bundleSummaries}
          purchasedMockIds={purchasedMockIds}
          purchasedBundleIds={purchasedBundleIds}
          limits={{
            freeAttempts: FREE_MOCK_ATTEMPT_LIMIT,
            premiumAttempts: PAID_MOCK_ATTEMPT_LIMIT,
          }}
          initialTab={initialTab}
        />
      </div>
    </section>
  );
}
