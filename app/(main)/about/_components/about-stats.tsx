"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "15k+", label: "Students Helped", description: "Across all grades and subjects" },
  { value: "5+", label: "Years of Excellence", description: "Delivering quality education since 2019" },
  { value: "100%", label: "On-Time Delivery", description: "Classes always start and end on schedule" },
  { value: "24/7", label: "Scheduling Flexibility", description: "Book classes in any timezone, any day" },
];

export function AboutStats() {
  return (
    <section className="py-16 px-4" style={{ background: "#5496b6" }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center text-white"
            >
              <p className="text-4xl font-bold sm:text-5xl">{stat.value}</p>
              <p className="mt-1 font-semibold text-white">{stat.label}</p>
              <p className="mt-1 text-sm text-white/70">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
