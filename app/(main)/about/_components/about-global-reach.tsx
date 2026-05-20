"use client";

import { motion } from "framer-motion";

const REGIONS = [
  { flag: "🇺🇸", country: "United States", note: "Common Core, SAT, ACT, AP" },
  { flag: "🇬🇧", country: "United Kingdom", note: "GCSE, A-Level, 11+" },
  { flag: "🇦🇺", country: "Australia", note: "NAPLAN, Australian Curriculum" },
  { flag: "🇨🇦", country: "Canada", note: "Provincial curricula, Math & Science" },
  { flag: "🇦🇪", country: "UAE / Middle East", note: "IGCSE, IB, AMC" },
  { flag: "🇮🇳", country: "India", note: "CBSE, ICSE, JEE Foundation" },
];

export function AboutGlobalReach() {
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Global Reach
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by families worldwide
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            We serve students across 6+ countries — all time zones, all curricula, 24/7.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((region, index) => (
            <motion.div
              key={region.country}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl">{region.flag}</span>
              <div>
                <p className="font-semibold">{region.country}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{region.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
