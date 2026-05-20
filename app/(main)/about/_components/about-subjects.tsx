"use client";

import { motion } from "framer-motion";

const SUBJECTS = [
  {
    category: "Test Preparation",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    items: ["Digital SAT", "ACT", "AP Exams", "PSAT", "AMC 8 / 10 / 12", "STAAR"],
  },
  {
    category: "Core Academics",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-200 dark:border-purple-800",
    items: ["Math", "English (ELA)", "Science", "Coding / IT"],
  },
  {
    category: "UK / International",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    items: ["GCSE / IGCSE", "AS / A-Level", "IB Curriculum", "NAPLAN (AU)"],
  },
  {
    category: "Grade Levels",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    border: "border-orange-200 dark:border-orange-800",
    items: ["Kindergarten", "Elementary (1–5)", "Middle School (6–8)", "High School (9–12)"],
  },
];

export function AboutSubjects() {
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
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Subjects & Programs
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Every subject. Every grade. Every exam.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Whether it&apos;s strengthening foundations or cracking competitive exams, we cover it all.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`rounded-2xl border p-5 space-y-3 ${group.bg} ${group.border}`}
            >
              <p className={`text-sm font-bold uppercase tracking-wide ${group.color}`}>
                {group.category}
              </p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${group.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
