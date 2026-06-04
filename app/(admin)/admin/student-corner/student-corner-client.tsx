"use client";

import type { StudentAchievement } from "@prisma/client";
import { CalendarDays, Eye, EyeOff, TrendingUp, Trophy } from "lucide-react";
import { StudentAchievementsTable } from "@/components/admin/student-achievements-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentCornerClientProps {
  stats: {
    total: number;
    active: number;
    hidden: number;
    thisMonth: number;
  };
  achievements: StudentAchievement[];
}

export default function StudentCornerClient({ stats, achievements }: StudentCornerClientProps) {
  const statCards = [
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Corner</h1>
        <p className="text-muted-foreground mt-1">
          Showcase student achievements with images, titles, and descriptions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
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

      {stats.total === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800/40 dark:bg-amber-900/10 dark:text-amber-300">
          <p className="font-semibold mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Before uploading images
          </p>
          <p>
            Create an <strong>unsigned upload preset</strong> named{" "}
            <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/30">mls_achievements</code>{" "}
            in your Cloudinary dashboard (Settings - Upload - Add upload preset).
          </p>
        </div>
      )}

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
