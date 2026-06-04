import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResultClient } from "./result-client";

export const metadata: Metadata = {
  title: "Mock Results",
  description: "Review your mock attempt with detailed analytics and explanations.",
};

type PageProps = {
  params: Promise<{ id: string; attemptId: string }>;
  searchParams?: Promise<{ q?: string }>;
};

export default async function MockResultPage({ params, searchParams }: PageProps) {
  const { id, attemptId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const attempt = await prisma.mockAttempt.findFirst({
    where: {
      id: attemptId,
      userId: session.user.id,
      mockTestId: id,
    },
    include: {
      mockTest: {
        select: {
          id: true,
          title: true,
          questions: true,
          price: true,
        },
      },
    },
  });

  if (!attempt) {
    notFound();
  }

  if (!attempt.submittedAt) {
    redirect(`/mocks/${id}/attempt/${attemptId}`);
  }

  const attemptCount = await prisma.mockAttempt.count({
    where: { userId: session.user.id, mockTestId: id },
  });

  const searchParamsResolved = (await searchParams) ?? {};
  const qParam = searchParamsResolved.q;
  const initialQuestion = qParam ? Number.parseInt(qParam, 10) - 1 : 0;

  return (
    <ResultClient
      attempt={attempt}
      attemptCount={attemptCount}
      initialQuestion={Number.isNaN(initialQuestion) ? 0 : initialQuestion}
    />
  );
}
