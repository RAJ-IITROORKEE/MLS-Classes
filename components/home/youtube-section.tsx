"use client";

import { motion } from "framer-motion";

export function YoutubeSection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-2 items-center"
        >
          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why the MLS Classes?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              MLS Classes offers personalized, one-on-one tutoring with a track record of success,
              such as 200-300+ point improvements in SAT scores, 35+ in ACT, 5 out of 5 in AP exams,
              and significant GPA improvements. We&apos;ve also helped students qualify for
              accelerated courses, advancing them one grade level ahead. Our specialized approach
              ensures each child excels academically and is well-prepared for college admissions.
            </p>
            <ul className="space-y-2">
              {[
                "200-300+ point SAT score improvements",
                "35+ ACT score improvements",
                "5/5 in AP exams",
                "Grades K-12 all subjects covered",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* YouTube Iframe */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg aspect-video">
            <iframe
              src="https://www.youtube.com/embed/EvWDKppotyA"
              title="Why choose MLS Classes?"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
