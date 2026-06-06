import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProgram, PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "./program-page";

export function createProgramMetadata(slug: string): Metadata {
  const program = getProgram(slug);

  if (!program) {
    return {};
  }

  return {
    title: `${program.title} | MLS Classes`,
    description: program.heroSubtitle,
  };
}

export function generateProgramStaticParams(slugs: string[]) {
  return slugs.filter((slug) => PROGRAMS[slug]).map((slug) => ({ slug }));
}

export async function ProgramRoutePage({ slug }: { slug: string }) {
  const program = getProgram(slug);

  if (!program) {
    notFound();
  }

  return <ProgramPage data={program} />;
}
