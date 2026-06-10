"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const STATS = [
  { value: "2500+", label: "Students Taught" },
  { value: "100%", label: "On Time delivery" },
  { value: "7 yrs", label: "Experience" },
  { value: "⭐⭐⭐⭐⭐", label: "1:1 Tutoring & HW Help" },
];

export function HeroContentSection() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-evenly gap-6 rounded-xl px-6 py-5 mb-14 text-white"
          style={{ background: "var(--theme-color)" }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5 min-w-[100px]">
              <p className="text-2xl font-bold leading-tight">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Headline + YouTube */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 mb-10"
        >
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">
            MLS Classes offers Live, Online 1-1 Personalized Tutoring
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            <strong>Math, English(ELA), Science,&nbsp;Coding</strong> And{" "}
            <strong>SAT, ACT, AP,</strong> Digital SSAT, STAAR, AMC, GCSE, A-level, IGCSE, IB and
            NAPLAN Classes for students in grades K-12. These programs are specifically designed to
            accelerate your child&apos;s academic progress <strong>GUARANTEED</strong>.
          </p>

          <div className="flex justify-center">
            <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-border shadow-lg">
              <iframe
                title="MLS Classes — 1-1 Online Tutoring"
                src="https://www.youtube.com/embed/Ihc9GwY6tBw"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>

          <Button asChild size="lg" className="font-semibold">
            <Link href="/book-trial">Book 1 Week Free Class</Link>
          </Button>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center"
        >
          Our 1-1 Programs For Grades K-12
        </motion.h2>
      </div>
    </section>
  );
}
