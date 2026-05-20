"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Anchal's Parents",
    role: "Physics student",
    src: "https://www.mlsclasses.com/static/tsm1.jpg",
    alt: "anchal-parents-profile",
    rating: 5,
    text: "Anchal got Full marks in her Physics exam. So thanks for tutoring. Really made lot of impact.",
  },
  {
    name: "Shreya's Parents",
    role: "PSAT student",
    src: "https://www.mlsclasses.com/static/tsm3.jpg",
    alt: "shreya-parents-profile",
    rating: 5,
    text: "Shreya scored 1390/1440 in PSAT with very little prep. The score was 99 percentile at national level.",
  },
  {
    name: "Dhaitiri's Mom",
    role: "Coding & Math student",
    src: "https://www.mlsclasses.com/static/tsm2.jpg",
    alt: "dhaitiri-mom-profile",
    rating: 5,
    text: "Ritik we are in Texas where the Indian hub is there & there are lots of in-person coaching every street but we like your teaching and matches our frequency, will wait for your availability. We can start coding & Math together. Looking forward thank you.",
  },
  {
    name: "Shyam",
    role: "Digital SAT student",
    src: "https://www.mlsclasses.com/static/tsm4.jpg",
    alt: "shyam-profile",
    rating: 5,
    text: "I got my Digital SAT scores today. I scored 1530. 750 in English and 780 in Math. Thank you so much MLS Classes.",
  },
  {
    name: "Sophia's Mom",
    role: "Tutor feedback",
    src: "https://www.mlsclasses.com/static/tsm5.jpeg",
    alt: "sophia-mom-profile",
    rating: 5,
    text: "I just wanted to say thank you Ritik for tutoring Sophia. I am very impress with the way you teach and communicate. Keep up the good work.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-accent text-accent" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
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
            Parents and students love us!
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Real results from real families who trusted MLS Classes for academic excellence.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="h-6 w-6 text-primary/30 absolute top-4 right-4" />
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
                  <Image
                    src={testimonial.src}
                    alt={testimonial.alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <StarRating rating={testimonial.rating} />
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
