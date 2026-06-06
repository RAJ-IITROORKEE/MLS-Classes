"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURES = [
  {
    image: "/features/dedicated-classes.webp",
    alt: "dedicated-classes",
    title: "1:1 Dedicated Classes",
  },
  {
    image: "/features/lowest-cost.webp",
    alt: "lowest-cost",
    title: "Lowest Cost $ per class",
  },
  {
    image: "/features/master-teachers.webp",
    alt: "expert-teachers",
    title: "Master Teachers",
  },
  {
    image: "/features/one-grade-ahead.webp",
    alt: "grade",
    title: "1 grade ahead",
  },
  {
    image: "/features/regular-test-series.webp",
    alt: "test-series",
    title: "Regular test series",
  },
  {
    image: "/features/recording-access.webp",
    alt: "recording-access",
    title: "Recording access",
  },
  {
    image: "/features/ptm.webp",
    alt: "ptm",
    title: "PTM (Parents Teacher Meeting)",
  },
  {
    image: "/features/homework-help.webp",
    alt: "homework-help",
    title: "School homework help",
  },
];

export function FeaturesSection() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Main Features</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Everything you need for complete academic success in one platform.
          </p>
        </motion.div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--theme-color)_18%,transparent)] dark:hover:border-primary/50 dark:hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--theme-color)_28%,transparent)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
              </div>
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt ?? feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <div className="relative p-3 text-center">
                <p className="text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">{feature.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
