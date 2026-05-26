import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestimonialsTable } from "@/components/admin/testimonials-table";
import { MessageSquare, Star, Eye, EyeOff, TrendingUp } from "lucide-react";

async function getStats() {
  const [total, active, hidden, allRatings] = await Promise.all([
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { isActive: true } }),
    prisma.testimonial.count({ where: { isActive: false } }),
    prisma.testimonial.findMany({ select: { rating: true } }),
  ]);

  const avgRating =
    allRatings.length > 0
      ? (allRatings.reduce((acc: number, t: any) => acc + t.rating, 0) / allRatings.length).toFixed(1)
      : "—";

  return { total, active, hidden, avgRating };
}

async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminTestimonialsPage() {
  const [stats, testimonials] = await Promise.all([getStats(), getAllTestimonials()]);

  const STAT_CARDS = [
    {
      title: "Total Testimonials",
      value: stats.total,
      description: "All submitted testimonials",
      icon: MessageSquare,
    },
    {
      title: "Published",
      value: stats.active,
      description: "Visible on website",
      icon: Eye,
    },
    {
      title: "Hidden",
      value: stats.hidden,
      description: "Drafts / unpublished",
      icon: EyeOff,
    },
    {
      title: "Average Rating",
      value: stats.avgRating,
      description: "Across all testimonials",
      icon: Star,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
        <p className="text-muted-foreground mt-1">
          Manage parent and student testimonials shown across the website.
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

      {/* Note about Cloudinary upload preset */}
      {stats.total === 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-900/10 p-4 text-sm text-amber-800 dark:text-amber-300">
          <p className="font-semibold mb-1 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Before uploading images
          </p>
          <p>
            Create an <strong>unsigned upload preset</strong> named{" "}
            <code className="bg-amber-100 dark:bg-amber-900/30 px-1 rounded">mls_testimonials</code>{" "}
            in your Cloudinary dashboard (Settings → Upload → Add upload preset).
          </p>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialsTable initialData={testimonials} />
        </CardContent>
      </Card>
    </div>
  );
}
