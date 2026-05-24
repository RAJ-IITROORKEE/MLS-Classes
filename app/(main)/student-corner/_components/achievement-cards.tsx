"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy } from "lucide-react";
import type { StudentAchievement } from "@prisma/client";

interface AchievementCardsProps {
  achievements: Pick<StudentAchievement, "id" | "title" | "description" | "imageUrl">[];
}

export function AchievementCards({ achievements }: AchievementCardsProps) {
  if (achievements.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Student Achievements
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Every score, every grade, every breakthrough — celebrating the wins
            of our students across the globe.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={achievement.imageUrl}
                  alt={achievement.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover overlay text */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-xs leading-relaxed line-clamp-3">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
