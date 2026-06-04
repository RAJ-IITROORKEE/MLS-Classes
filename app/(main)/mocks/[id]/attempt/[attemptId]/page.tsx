import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AttemptClient } from "./attempt-client";

export const metadata: Metadata = {
  title: "Mock Attempt",
  description: "Attempt your MLS mock test with live timing and navigation.",
};

type PageProps = {
  params: Promise<{ id: string; attemptId: string }>;
};

export default async function MockAttemptPage({ params }: PageProps) {
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
  });

  if (!attempt) {
    notFound();
  }

  if (attempt.submittedAt) {
    redirect(`/mocks/${id}/result/${attemptId}`);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mock/${id}`, {
    cache: "no-store",
    headers: {
      cookie: (await headers()).get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    notFound();
  }

  const data = await response.json();

  if (!data?.mock?.questions || !Array.isArray(data.mock.questions)) {
    notFound();
  }

  return (
    <AttemptClient
      attemptId={attemptId}
      startedAt={attempt.startedAt.toISOString()}
      mock={data.mock}
      access={data.access}
    />
  );
}
