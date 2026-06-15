import { prisma } from "@/lib/db";
import StudentCornerClient from "./student-corner-client";
import { requireAdminPathAccess } from "@/lib/admin-auth";

async function getStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, active, hidden, thisMonth] = await Promise.all([
    prisma.studentAchievement.count(),
    prisma.studentAchievement.count({ where: { isActive: true } }),
    prisma.studentAchievement.count({ where: { isActive: false } }),
    prisma.studentAchievement.count({ where: { createdAt: { gte: startOfMonth } } }),
  ]);

  return { total, active, hidden, thisMonth };
}

async function getAllAchievements() {
  return prisma.studentAchievement.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminStudentCornerPage() {
  await requireAdminPathAccess("/admin/student-corner");

  const [stats, achievements] = await Promise.all([getStats(), getAllAchievements()]);

  return <StudentCornerClient stats={stats} achievements={achievements} />;
}
