import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MockAttemptsClient } from "./attempts-client";

export const metadata: Metadata = {
  title: "Mock Attempts",
  description: "Review all attempts for your MLS mock test.",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MockAttemptsPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/mocks/sign-in");
  }

  const attempts = await prisma.mockAttempt.findMany({
    where: {
      userId: session.user.id,
      mockTestId: id,
      submittedAt: { not: null },
    },
    include: {
      mockTest: { select: { title: true, id: true } },
    },
    orderBy: { submittedAt: "desc" },
  });

  if (!attempts.length) {
    redirect("/mocks");
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <MockAttemptsClient attempts={attempts} />
      </div>
    </section>
  );
}
