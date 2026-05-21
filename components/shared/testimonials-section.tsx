"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  program?: string | null;
  country?: string | null;
  imageUrl?: string | null;
}

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  heading?: string;
  subheading?: string;
  showBadges?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(/[\s']+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({
  testimonials,
  heading = "Parents and students love us!",
  subheading = "Real results from real families who trusted MLS Classes for academic excellence.",
  showBadges = false,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            {subheading}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Quote className="absolute top-5 right-5 h-6 w-6 text-primary/20" />

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  {t.imageUrl ? (
                    <Image
                      src={t.imageUrl}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <Avatar className="h-14 w-14 rounded-full">
                      <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {getInitials(t.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Optional badges */}
              {showBadges && (t.program || t.country) && (
                <div className="flex flex-wrap gap-2">
                  {t.program && (
                    <Badge variant="secondary" className="text-xs">
                      {t.program}
                    </Badge>
                  )}
                  {t.country && (
                    <Badge variant="outline" className="text-xs">
                      {t.country}
                    </Badge>
                  )}
                </div>
              )}

              <StarRating rating={t.rating} />

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
