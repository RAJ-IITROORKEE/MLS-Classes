"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "2500+", label: "Students Taught" },
  { value: "100%", label: "On Time delivery" },
  { value: "7 yrs", label: "Experience" },
  { value: "⭐⭐⭐⭐⭐", label: "1:1 Tutoring & HW Help" },
];

export function StudentCornerHero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Student Corner
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Real students.{" "}
          <span className="text-primary">Real results.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Hear directly from the families who trusted MLS Classes with their children&apos;s
          academic journey — and the results they achieved.
        </motion.p>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-evenly gap-6 rounded-xl px-6 py-5 text-white"
          style={{ background: "var(--theme-color)" }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex min-w-[100px] flex-col items-center gap-0.5">
              <p className="text-2xl font-bold leading-tight">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
