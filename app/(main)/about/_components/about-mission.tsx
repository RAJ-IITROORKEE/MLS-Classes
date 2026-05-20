"use client";

import { motion } from "framer-motion";

export function AboutMission() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Mission
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Personalized learning that actually works
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At MLS Classes, we believe every student deserves undivided attention. That&apos;s why
              we focus exclusively on <strong>live, 1-on-1 Zoom sessions</strong> — no group classes,
              no pre-recorded videos. Just you, your dedicated tutor, and a lesson built entirely
              around your needs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our approach is simple: diagnose the gaps, build a personalized plan, and push the
              student <strong>one grade ahead</strong>. Whether it&apos;s strengthening fundamentals
              or preparing for the SAT, our tutors meet students exactly where they are.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are proud to serve families across the United States, United Kingdom, Australia,
              Canada, UAE, and India — bringing world-class tutoring to every timezone.
            </p>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { emoji: "🎯", title: "Personalized Plans", desc: "Every student gets a custom roadmap based on their current level and goals." },
              { emoji: "🏆", title: "Master Teachers", desc: "Subject-matter experts with years of experience in K-12 and test prep." },
              { emoji: "📅", title: "Flexible Scheduling", desc: "Book classes at your convenience — any day, any time, any timezone." },
              { emoji: "📹", title: "Recording Access", desc: "All classes recorded so students can review at their own pace, year-round." },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-card p-5 space-y-2 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{card.emoji}</span>
                <p className="font-semibold">{card.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
