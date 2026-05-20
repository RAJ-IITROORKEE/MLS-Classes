"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURES = [
  {
    image: "https://www.mlsclasses.com/static/fea1.jpg",
    alt: "dedicated-classes",
    title: "1:1 Dedicated Classes",
  },
  {
    image: "https://www.mlsclasses.com/static/fea2.jpg",
    alt: "lowest-cost",
    title: "Lowest Cost $ per class",
  },
  {
    image: "https://www.mlsclasses.com/static/fea3.jpg",
    alt: "expert-teachers",
    title: "Master Teachers",
  },
  {
    image: "https://www.mlsclasses.com/static/1gradeahead.jpg",
    alt: "grade",
    title: "1 grade ahead",
  },
  {
    image: "https://www.mlsclasses.com/static/Regulartestseries.jpg",
    alt: "test-series",
    title: "Regular test series",
  },
  {
    image: "https://www.mlsclasses.com/static/Recordedclass.jpg",
    alt: "recording-access",
    title: "Recording access",
  },
  {
    image: "https://www.mlsclasses.com/static/PTM.jpg",
    alt: "ptm",
    title: "PTM (Parents Teacher Meeting)",
  },
  {
    image: "https://www.mlsclasses.com/static/homworkhelp.jpg",
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
              className="group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.alt ?? feature.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-foreground">{feature.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
