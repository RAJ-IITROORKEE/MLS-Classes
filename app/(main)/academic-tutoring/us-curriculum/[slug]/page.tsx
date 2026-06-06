import { createProgramMetadata, ProgramRoutePage } from "@/components/programs/program-route-page";

const SLUGS = ["elementary-school", "middle-school", "high-school"];

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

export default async function USCurriculumStagePage({ params }: PageProps) {
  const { slug } = await params;
  return <ProgramRoutePage slug={slug} />;
}
