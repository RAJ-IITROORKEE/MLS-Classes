"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PROGRAMS = [
  {
    title: "Digital SAT",
    badge: "Test Prep",
    description:
      "1500+ Score Mastery. Comprehensive 1-on-1 coaching for Digital SAT prep — Math, Reading & Writing.",
    link: "/test-prep/digital-sat",
    color: "blue",
  },
  {
    title: "ACT",
    badge: "Test Prep",
    description:
      "35+ Score Mastery. Standardized test coaching for US and Canada college admissions.",
    link: "/test-prep/act",
    color: "blue",
  },
  {
    title: "AP",
    badge: "Test Prep",
    description:
      "Unlock 5/5 in AP exams with expert-led Advanced Placement courses across all subjects.",
    link: "/test-prep/ap-test",
    color: "blue",
  },
  {
    title: "AMC",
    badge: "Test Prep",
    description:
      "Expert AMC 8, AMC 10 & AMC 12 preparation with comprehensive problem-solving plans.",
    link: "/test-prep/amc-8",
    color: "blue",
  },
  {
    title: "A-levels",
    badge: "UK Curriculum",
    description:
      "Full A-level potential achieved through individualized coaching and a methodical approach.",
    link: "/academic-tutoring/as-a-level-curriculum",
    color: "purple",
  },
  {
    title: "IGCSE / GCSE",
    badge: "UK Curriculum",
    description:
      "Complete IGCSE/GCSE mastery with dedicated tools and preparation for future success.",
    link: "/academic-tutoring/igcse-curriculum",
    color: "purple",
  },
  {
    title: "IB",
    badge: "International",
    description:
      "Best IB (International Baccalaureate) exam preparation with expert study techniques.",
    link: "/academic-tutoring/ib-curriculum",
    color: "purple",
  },
  {
    title: "NAPLAN",
    badge: "AU Curriculum",
    description:
      "Boost NAPLAN performance with expert tutors who ensure thorough exam readiness.",
    link: "/academic-tutoring/au-curriculum/naplan",
    color: "purple",
  },
  {
    title: "Math",
    badge: "Core Subject",
    description:
      "Algebra, Geometry, Pre-Calculus, AP Calculus — comprehensive math for grades K-12.",
    link: "/test-prep/mathcounts",
    color: "green",
  },
  {
    title: "Science",
    badge: "Core Subject",
    description:
      "Biology, Chemistry, Physics — innovative study material with expert-led live sessions.",
    link: "/college-courses/college-biology",
    color: "green",
  },
  {
    title: "English (ELA)",
    badge: "Core Subject",
    description:
      "Reading, writing, grammar & literature analysis. Build confidence in English at every grade.",
    link: "/college-courses/college-english",
    color: "green",
  },
  {
    title: "Coding",
    badge: "IT Courses",
    description:
      "Python, Java, HTML/CSS & more — from basics to advanced programming for K-12 students.",
    link: "/it-courses/html-web-development",
    color: "orange",
  },
];

const BADGE_COLORS: Record<string, string> = {
  "Test Prep":
    "bg-primary/10 text-primary dark:bg-primary/20",
  "UK Curriculum":
    "bg-primary/10 text-primary dark:bg-primary/20",
  International:
    "bg-primary/10 text-primary dark:bg-primary/20",
  "AU Curriculum":
    "bg-primary/10 text-primary dark:bg-primary/20",
  "Core Subject":
    "bg-primary/10 text-primary dark:bg-primary/20",
  "IT Courses":
    "bg-primary/10 text-primary dark:bg-primary/20",
};

const BORDER_HOVER: Record<string, string> = {
  blue: "hover:border-primary/70 hover:shadow-primary/20 dark:hover:shadow-primary/20",
  purple: "hover:border-primary/70 hover:shadow-primary/20 dark:hover:shadow-primary/20",
  green: "hover:border-primary/70 hover:shadow-primary/20 dark:hover:shadow-primary/20",
  orange: "hover:border-primary/70 hover:shadow-primary/20 dark:hover:shadow-primary/20",
};

export function ProgramsSection() {
  return (
    <section id="programs" className="pb-24 pt-6 px-4 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={cn(
                "group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6",
                "shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                BORDER_HOVER[program.color]
              )}
            >
              {/* Badge */}
              <span
                className={cn(
                  "self-start rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  BADGE_COLORS[program.badge]
                )}
              >
                {program.badge}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {program.title}
              </h3>

              {/* Description */}
              <p className="text-[0.9rem] text-muted-foreground leading-relaxed flex-1">
                {program.description}
              </p>

              {/* CTA */}
              <Link
                href={program.link}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
