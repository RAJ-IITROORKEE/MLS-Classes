"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProgramData } from "@/lib/program-data";

interface ProgramEnrollStepsProps {
  steps: NonNullable<ProgramData["enrollSteps"]>;
}

export function ProgramEnrollSteps({ steps }: ProgramEnrollStepsProps) {
  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How to Get Started
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Joining MLS Classes is simple. Follow these steps to begin your learning journey.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-full w-6 h-px bg-border -translate-y-0.5 z-10" />
              )}

              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                  "bg-primary text-primary-foreground"
                )}
              >
                {step.number}
              </div>
              <h3 className="font-semibold text-sm leading-snug">{step.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
