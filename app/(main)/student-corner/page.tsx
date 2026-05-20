import type { Metadata } from "next";
import { StudentCornerHero } from "./_components/student-corner-hero";
import { StudentTestimonials } from "./_components/student-testimonials";
import { StudentShareCTA } from "./_components/student-share-cta";

export const metadata: Metadata = {
  title: "Student Corner | MLS Classes",
  description:
    "Read real success stories from MLS Classes students and parents. See how our 1-on-1 personalized tutoring has transformed academic results worldwide.",
};

export default function StudentCornerPage() {
  return (
    <>
      <StudentCornerHero />
      <StudentTestimonials />
      <StudentShareCTA />
    </>
  );
}
