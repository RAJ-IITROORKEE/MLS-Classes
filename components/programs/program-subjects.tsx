"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { ProgramData } from "@/lib/program-data";

interface ProgramSubjectsProps {
  data: NonNullable<ProgramData["subjects"]>;
}

export function ProgramSubjects({ data }: ProgramSubjectsProps) {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{data.heading}</h2>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <BookOpen className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
