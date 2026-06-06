"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LIVE_METHODS = [
  {
    image: "/features/live-class-explanation.webp",
    title: "Explanation",
    description:
      "We explore the topics and strategies using a combination of videos, diagrams, and interactive examples.",
  },
  {
    image: "/features/live-class-practice-test.webp",
    title: "Organized Practice Test",
    description:
      "Use 10 to 20 appropriate practice questions to evaluate your knowledge and abilities.",
  },
  {
    image: "/features/live-class-mistake-review.webp",
    title: "Examine your mistakes",
    description:
      "Learn from your errors with our comprehensive, detailed instructions.",
  },
];

export function LiveClassesSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Use Live Classes to Learn
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            To help you prepare for each area of the test, we categorised the ACT, SAT, and AP into 52 specific skills.
          </p>
        </motion.div>

        <div className="grid gap-6 mt-12 sm:grid-cols-3">
          {LIVE_METHODS.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_22px_55px_color-mix(in_srgb,var(--theme-color)_22%,transparent)] dark:hover:shadow-[0_22px_55px_color-mix(in_srgb,var(--theme-color)_32%,transparent)]"
              style={{
                background: "linear-gradient(145deg, var(--theme-color) 0%, color-mix(in srgb, var(--theme-color) 82%, black) 100%)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={method.image}
                  alt={method.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="relative bg-white px-4 py-2 dark:bg-card">
                <h3 className="border-t border-primary/40 py-2 text-center text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {method.title}
                </h3>
              </div>
              <div className="relative px-5 py-4">
                <p className="text-white/90 text-sm leading-relaxed text-center">
                  {method.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
