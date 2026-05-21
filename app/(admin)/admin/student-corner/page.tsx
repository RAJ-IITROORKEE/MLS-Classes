import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentAchievementsTable } from "@/components/admin/student-achievements-table";
import { Trophy, Eye, EyeOff, TrendingUp, CalendarDays } from "lucide-react";

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
  const [stats, achievements] = await Promise.all([getStats(), getAllAchievements()]);

  const STAT_CARDS = [
    {
      title: "Total Achievements",
      value: stats.total,
      description: "All student achievements",
      icon: Trophy,
    },
    {
      title: "Live on Site",
      value: stats.active,
      description: "Currently visible",
      icon: Eye,
    },
    {
      title: "Hidden",
      value: stats.hidden,
      description: "Drafts / unpublished",
      icon: EyeOff,
    },
    {
      title: "Added This Month",
      value: stats.thisMonth,
      description: "New this month",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Corner</h1>
        <p className="text-muted-foreground mt-1">
          Showcase student achievements with images, titles, and descriptions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cloudinary preset note */}
      {stats.total === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          <p className="font-semibold mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Before uploading images
          </p>
          <p>
            Create an <strong>unsigned upload preset</strong> named{" "}
            <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">mls_achievements</code>{" "}
            in your Cloudinary dashboard (Settings → Upload → Add upload preset).
          </p>
        </div>
      )}

      {/* Table / Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentAchievementsTable initialData={achievements} />
        </CardContent>
      </Card>
    </div>
  );
}
