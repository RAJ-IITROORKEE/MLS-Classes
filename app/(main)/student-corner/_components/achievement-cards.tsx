"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy } from "lucide-react";
import type { StudentAchievement } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <Dialog key={achievement.id}>
              <DialogTrigger asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                          {achievement.title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {achievement.description}
                        </p>
                        <span className="mt-3 inline-flex text-xs font-medium text-primary">
                          View details
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-center scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100" />
                </motion.button>
              </DialogTrigger>

              <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
                <div className="relative h-[55vh] max-h-[520px] min-h-[280px] overflow-hidden rounded-t-xl bg-muted sm:h-[60vh]">
                  <Image
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 672px"
                    className="object-contain"
                  />
                </div>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold leading-tight sm:text-2xl">
                      {achievement.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {achievement.description}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <DialogFooter showCloseButton className="mx-0 mb-0" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
