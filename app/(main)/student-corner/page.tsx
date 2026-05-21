import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { StudentCornerHero } from "./_components/student-corner-hero";
import { AchievementCards } from "./_components/achievement-cards";
import { StudentTestimonials } from "./_components/student-testimonials";
import { StudentShareCTA } from "./_components/student-share-cta";

export const metadata: Metadata = {
  title: "Student Corner | MLS Classes",
  description:
    "Read real success stories from MLS Classes students and parents. See how our 1-on-1 personalized tutoring has transformed academic results worldwide.",
};

async function getAchievements() {
  return prisma.studentAchievement.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: { id: true, title: true, description: true, imageUrl: true },
  });
}

export default async function StudentCornerPage() {
  const achievements = await getAchievements();

  return (
    <>
      <StudentCornerHero />
      <AchievementCards achievements={achievements} />
      <StudentTestimonials />
      <StudentShareCTA />
    </>
  );
}
