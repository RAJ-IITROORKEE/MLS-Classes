"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  program?: string;
  country?: string;
  src: string;
  alt: string;
}

// Hardcoded for now — replace with DB fetch when Testimonial model is added
const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Anchal's Parents",
    role: "Parent",
    rating: 5,
    program: "Math & Science",
    country: "USA",
    text: "MLS Classes has been a game-changer for our daughter Anchal. Her math scores improved dramatically within just a few months. The 1-on-1 attention she gets is truly unmatched. We couldn't be happier with the results!",
    src: "https://www.mlsclasses.com/static/tsm1.jpg",
    alt: "Anchal's Parents",
  },
  {
    id: "2",
    name: "Shreya's Parents",
    role: "Parent",
    rating: 5,
    program: "Digital SAT Prep",
    country: "USA",
    text: "Shreya was struggling with the SAT prep and we were worried. After joining MLS Classes, her confidence grew week by week. Her tutor was incredibly patient and thorough. She scored 200+ points higher than her first practice test!",
    src: "https://www.mlsclasses.com/static/tsm2.jpg",
    alt: "Shreya's Parents",
  },
  {
    id: "3",
    name: "Dhaitiri's Mom",
    role: "Parent",
    rating: 5,
    program: "English (ELA)",
    country: "Australia",
    text: "Finding quality tutoring in our timezone was always a challenge. MLS Classes solved that completely — available 24/7 and always punctual. Dhaitiri's reading and writing skills have improved remarkably. Highly recommend!",
    src: "https://www.mlsclasses.com/static/tsm3.jpg",
    alt: "Dhaitiri's Mom",
  },
  {
    id: "4",
    name: "Shyam",
    role: "Student",
    rating: 5,
    program: "AP Calculus & Physics",
    country: "USA",
    text: "As a high school student juggling multiple AP courses, I needed expert guidance. My MLS tutor broke down complex topics so clearly that I actually started enjoying Physics. Scored a 5 on my AP exam — couldn't have done it without them.",
    src: "https://www.mlsclasses.com/static/tsm4.jpg",
    alt: "Shyam",
  },
  {
    id: "5",
    name: "Sophia's Mom",
    role: "Parent",
    rating: 5,
    program: "IGCSE Maths",
    country: "UK",
    text: "We were looking for IGCSE-specific help and MLS Classes delivered perfectly. The tutor was well-versed in the UK curriculum and exam patterns. Sophia went from a C grade to an A* in just one term. Absolutely worth every penny!",
    src: "https://www.mlsclasses.com/static/tsm5.jpg",
    alt: "Sophia's Mom",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

export function StudentTestimonials() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What our students &amp; parents say
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Thousands of students across the US, UK, Australia, and more have experienced the MLS difference.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 h-6 w-6 text-primary/20" />

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>

              {/* Badges */}
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

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Text */}
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
