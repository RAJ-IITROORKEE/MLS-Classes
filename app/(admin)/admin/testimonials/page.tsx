import { prisma } from "@/lib/db";
import TestimonialsClient from "./testimonials-client";
import type { Testimonial } from "@prisma/client";
import { requireAdminPathAccess } from "@/lib/admin-auth";

async function getStats() {
  const [total, active, hidden, allRatings] = await Promise.all([
    prisma.testimonial.count(),
    prisma.testimonial.count({ where: { isActive: true } }),
    prisma.testimonial.count({ where: { isActive: false } }),
    prisma.testimonial.findMany({ select: { rating: true } }),
  ]);

  const avgRating =
    allRatings.length > 0
      ? (allRatings.reduce((acc: number, testimonial: Pick<Testimonial, "rating">) => acc + testimonial.rating, 0) / allRatings.length).toFixed(1)
      : "—";

  return { total, active, hidden, avgRating };
}

async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export default async function AdminTestimonialsPage() {
  await requireAdminPathAccess("/admin/testimonials");

  const [stats, testimonials] = await Promise.all([getStats(), getAllTestimonials()]);

  return <TestimonialsClient stats={stats} testimonials={testimonials} />;
}
