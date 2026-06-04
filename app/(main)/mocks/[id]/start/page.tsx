import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { MockStartClient } from "@/app/(main)/mocks/_components/mock-start-client";

export const metadata: Metadata = {
  title: "Start Mock Test",
  description: "Review mock details, attempt limits, and begin your test.",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function MockStartPage({ params }: PageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
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

  if (!data?.mock) {
    notFound();
  }

  return <MockStartClient mock={data.mock} access={data.access} />;
}
