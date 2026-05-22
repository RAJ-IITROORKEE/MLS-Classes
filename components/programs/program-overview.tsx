"use client";

import { motion } from "framer-motion";
import type { ProgramData } from "@/lib/program-data";

interface ProgramOverviewProps {
  data: ProgramData["overview"];
}

export function ProgramOverview({ data }: ProgramOverviewProps) {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">{data.heading}</h2>
          <div className="space-y-4">
            {data.body.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-[1.05rem]">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
