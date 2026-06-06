import { createProgramMetadata, ProgramRoutePage } from "@/components/programs/program-route-page";

const SLUGS = ["csharp-programming", "cplusplus-programming", "java", "python"];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createProgramMetadata(slug);
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function ITCoursePage({ params }: PageProps) {
  const { slug } = await params;
  return <ProgramRoutePage slug={slug} />;
}
