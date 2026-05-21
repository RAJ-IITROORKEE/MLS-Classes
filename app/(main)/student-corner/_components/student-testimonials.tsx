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

export async function StudentTestimonials() {
  const testimonials = await getActiveTestimonials();
  return (
    <div className="bg-muted/30">
      <TestimonialsSection
        testimonials={testimonials}
        heading="What our students &amp; parents say"
        subheading="Thousands of students across the US, UK, Australia, and more have experienced the MLS difference."
        showBadges
      />
    </div>
  );
}
