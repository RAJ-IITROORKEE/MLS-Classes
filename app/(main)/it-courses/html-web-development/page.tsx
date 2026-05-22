import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "HTML & Web Development Tutoring | MLS Classes",
  description:
    "Learn HTML, CSS, JavaScript, and web development from scratch with expert 1-on-1 tutoring. Project-based learning for beginners to advanced.",
};

export default function HTMLWebDevPage() {
  return <ProgramPage data={PROGRAMS["html-web-development"]} />;
}
