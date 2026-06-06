"use client";

import { motion } from "framer-motion";
import type { ProgramData } from "@/lib/program-data";

interface ProgramMediaShowcaseProps {
  media: NonNullable<ProgramData["media"]>;
  title: string;
}

const DIGITAL_SAT_FEATURES = [
  {
    image: "https://www.mlsclasses.com/static/calendar.jpg",
    label: "Live Online Interactive Classes",
  },
  {
    image: "https://www.mlsclasses.com/static/clock.png",
    label: "+50 hours of tutoring",
  },
  {
    image: "https://www.mlsclasses.com/static/computer.png",
    label: "1:1 Classes available for SAT Exam",
  },
  {
    image: "https://www.mlsclasses.com/static/paper.jpg",
    label: "100+ adaptive mock tests",
  },
  {
    image: "https://www.mlsclasses.com/static/attempts.png",
    label: "Support for 2 attempts for the Digital SAT Exam",
  },
  {
    image: "https://www.mlsclasses.com/static/book.jpg",
    label: "Specialized prep materials",
  },
];

function getImageName(url: string) {
  const fileName = url.split("/").pop()?.split(".")[0] ?? "MLS Classes";

  return fileName
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ProgramMediaShowcase({ media, title }: ProgramMediaShowcaseProps) {
  const assets = media.legacyAssets ?? [];

  if (assets.length === 0) {
    return null;
  }

  if (title !== "Digital SAT Prep") {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {title} Learning Experience
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {assets.map((asset, index) => (
              <motion.figure
                key={asset}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  <img
                    src={asset}
                    alt={`${title} ${getImageName(asset)}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="border-t border-border px-4 py-3 text-sm font-medium text-muted-foreground">
                  {getImageName(asset)}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/20 px-4 py-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Main Features of Our Digital SAT Tutoring
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DIGITAL_SAT_FEATURES.map((feature, index) => (
            <motion.article
              key={feature.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-border/70 bg-card px-5 py-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={feature.image}
                alt={`${title} ${feature.label}`}
                loading="lazy"
                className="mb-4 h-11 w-11 object-contain"
              />
              <h3 className="text-sm font-medium text-foreground">
                {feature.label}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
