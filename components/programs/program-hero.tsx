"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProgramData } from "@/lib/program-data";

function isRemoteImage(src?: string) {
  return Boolean(src?.startsWith("http://") || src?.startsWith("https://"));
}

const COLOR_BADGE: Record<string, string> = {
  blue: "bg-primary/10 text-primary dark:bg-primary/20",
  purple: "bg-primary/10 text-primary dark:bg-primary/20",
  teal: "bg-primary/10 text-primary dark:bg-primary/20",
  green: "bg-primary/10 text-primary dark:bg-primary/20",
  orange: "bg-primary/10 text-primary dark:bg-primary/20",
};

interface ProgramHeroProps {
  data: Pick<ProgramData, "heroTitle" | "heroSubtitle" | "category" | "categoryColor" | "stats" | "coverage" | "media">;
}

export function ProgramHero({ data }: ProgramHeroProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "inline-block mb-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest",
            COLOR_BADGE[data.categoryColor]
          )}
        >
          {data.category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight"
        >
          {data.heroTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed lg:mx-0"
        >
          {data.heroSubtitle}
        </motion.p>

        {data.coverage && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
          >
            {data.coverage}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start"
        >
          <Button asChild size="lg" className="font-semibold">
            <Link href="/book-trial">Book a Free Trial Class</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://wa.me/message/XMS5KMWBGQZLG1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start"
        >
          {data.stats.map((stat) => (
            <span
              key={stat}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm"
            >
              {stat}
            </span>
          ))}
        </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/10">
            {isRemoteImage(data.media?.image) ? (
              <img
                src={data.media?.image}
                alt={data.media?.caption ?? data.heroTitle}
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
            ) : (
              <Image
                src={data.media?.image ?? "/carousal.webp"}
                alt={data.media?.caption ?? data.heroTitle}
                width={720}
                height={560}
                priority
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
            )}
          </div>
          <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
            {data.media?.caption ?? "Live 1-on-1 MLS Classes tutoring with structured practice and measurable progress."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
