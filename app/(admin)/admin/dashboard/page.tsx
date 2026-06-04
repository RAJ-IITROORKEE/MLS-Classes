import { prisma } from "@/lib/db";
import DashboardClient from "./dashboard-client";

async function getDashboardStats() {
  const [totalContacts, pendingContacts, totalFAQs, totalTestimonials, totalAchievements, recentContacts] =
    await Promise.all([
      prisma.bookTrialRequest.count(),
      prisma.bookTrialRequest.count({ where: { status: "PENDING" } }),
      prisma.fAQ.count({ where: { isActive: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.studentAchievement.count({ where: { isActive: true } }),
      prisma.bookTrialRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          program: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  return { totalContacts, pendingContacts, totalFAQs, totalTestimonials, totalAchievements, recentContacts };
}

export default async function AdminDashboardPage() {
  const { totalContacts, pendingContacts, totalFAQs, totalTestimonials, totalAchievements, recentContacts } =
    await getDashboardStats();

  return <DashboardClient
    totalContacts={totalContacts}
    pendingContacts={pendingContacts}
    totalFAQs={totalFAQs}
    totalTestimonials={totalTestimonials}
    totalAchievements={totalAchievements}
    recentContacts={recentContacts}
  />;
}
