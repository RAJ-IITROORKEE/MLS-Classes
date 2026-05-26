import { prisma } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  HelpCircle,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Trophy,
} from "lucide-react";

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

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONTACTED: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  SCHEDULED: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

export default async function AdminDashboardPage() {
  const { totalContacts, pendingContacts, totalFAQs, totalTestimonials, totalAchievements, recentContacts } =
    await getDashboardStats();

  const CARDS = [
    {
      title: "Total Trial Requests",
      value: totalContacts,
      description: "All time submissions",
      icon: Mail,
      trend: "+12% this month",
    },
    {
      title: "Pending Follow-ups",
      value: pendingContacts,
      description: "Awaiting contact",
      icon: Clock,
      trend: "Needs attention",
    },
    {
      title: "Active FAQs",
      value: totalFAQs,
      description: "Published on website",
      icon: HelpCircle,
      trend: "Manage in FAQ section",
    },
    {
      title: "Conversion Rate",
      value: `${totalContacts > 0 ? Math.round(((totalContacts - pendingContacts) / totalContacts) * 100) : 0}%`,
      description: "Contacted / Total",
      icon: TrendingUp,
      trend: "Improving",
    },
    {
      title: "Testimonials",
      value: totalTestimonials,
      description: "Published on website",
      icon: MessageSquare,
      trend: "Manage in Testimonials",
    },
    {
      title: "Student Achievements",
      value: totalAchievements,
      description: "Live in Student Corner",
      icon: Trophy,
      trend: "Manage in Student Corner",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the MLS Classes admin panel.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {CARDS.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              <p className="text-xs text-primary mt-1">{card.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Trial Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Recent Trial Requests
          </CardTitle>
          <CardDescription>Latest 5 trial booking submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentContacts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No trial requests yet.
            </p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact: any) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.email} · {contact.program}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[contact.status] ?? ""}`}
                    >
                      {contact.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content In Progress Sections */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Analytics Charts", desc: "Booking trends over time" },
          { title: "User Management", desc: "Manage admin users" },
          { title: "Email Notifications", desc: "Auto-email configuration" },
        ].map((item) => (
          <Card key={item.title} className="border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Content In Progress</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
