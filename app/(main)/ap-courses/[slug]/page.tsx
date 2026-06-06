import { createProgramMetadata, ProgramRoutePage } from "@/components/programs/program-route-page";

const SLUGS = [
  "ap-precalculus",
  "ap-calculus-ab",
  "ap-calculus-bc",
  "ap-statistics",
  "ap-physics-1-2",
  "ap-physics-c-electricity-magnetism",
  "ap-physics-c-mechanics",
  "ap-chemistry",
  "ap-biology",
  "ap-environmental-science",
  "ap-computer-science-a",
  "ap-english-literature-composition",
  "ap-microeconomics",
  "ap-macroeconomics",
];

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

export default async function APCoursePage({ params }: PageProps) {
  const { slug } = await params;
  return <ProgramRoutePage slug={slug} />;
}
