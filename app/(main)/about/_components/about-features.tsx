"use client";

import { motion } from "framer-motion";
import {
  Users,
  Video,
  ClipboardList,
  BookMarked,
  CalendarCheck,
  LineChart,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "1-on-1 Dedicated Classes",
    description:
      "Every student gets their own dedicated tutor — no shared sessions, no distractions. Pure focused learning.",
  },
  {
    icon: Video,
    title: "Live Zoom Sessions",
    description:
      "All classes are conducted live via Zoom with interactive whiteboards, screen sharing, and real-time Q&A.",
  },
  {
    icon: LineChart,
    title: "1 Grade Ahead Approach",
    description:
      "We don't just keep up — we push students ahead of their curriculum to build lasting confidence.",
  },
  {
    icon: ClipboardList,
    title: "Regular Test Series",
    description:
      "Frequent mock tests and practice exams ensure students are always exam-ready and tracking their progress.",
  },
  {
    icon: BookMarked,
    title: "Homework Help",
    description:
      "Students get support with daily homework through our portal, IXL, DeltaMath, Quizizz, and more.",
  },
  {
    icon: CalendarCheck,
    title: "Parent-Teacher Meetings",
    description:
      "Regular PTMs keep parents informed and involved in their child's academic journey.",
  },
  {
    icon: MessageSquare,
    title: "Recording Access",
    description:
      "Every class is recorded and accessible year-round so students can revisit lessons at any time.",
  },
  {
    icon: BadgeCheck,
    title: "Lowest Cost Per Class",
    description:
      "Premium 1-on-1 tutoring at a fraction of the cost of local tutoring centres — with better results.",
  },
];

export function AboutFeatures() {
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
            What We Offer
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your child needs to succeed
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            From live sessions to homework help — we cover every aspect of a student&apos;s learning journey.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card p-5 space-y-3 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-semibold">{feature.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
