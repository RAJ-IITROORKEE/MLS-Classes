import { prisma } from "@/lib/db";
import { TestimonialsSection } from "@/components/shared/testimonials-section";

async function getActiveTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
    select: {
      id: true,
      name: true,
      role: true,
      rating: true,
      text: true,
      program: true,
      country: true,
      imageUrl: true,
    },
  });
}

export async function TestimonialsSectionHome() {
  const testimonials = await getActiveTestimonials();
  return (
    <TestimonialsSection
      testimonials={testimonials}
      heading="Parents and students love us!"
      subheading="Real results from real families who trusted MLS Classes for academic excellence."
    />
  );
}
