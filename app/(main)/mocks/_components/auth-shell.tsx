"use client";

import type { ReactNode } from "react";
import { Check, Sparkles } from "lucide-react";

const FEATURES = [
  "Timed mock attempts with smart navigation",
  "Instant scoring with detailed review",
  "Track progress across free and premium tests",
  "Secure access across every device",
];

type MockAuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function MockAuthShell({
  title,
  description,
  children,
}: MockAuthShellProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
      <div className="absolute -top-24 right-0 hidden h-56 w-56 rounded-full bg-muted/40 blur-3xl lg:block" />
      <div className="absolute -bottom-24 left-0 hidden h-56 w-56 rounded-full bg-muted/30 blur-3xl lg:block" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              MLS Practice Tests
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h1>
              <p className="text-base text-muted-foreground">{description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/70 p-3 text-sm"
                >
                  <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Focus:</span> Timed
              attempts, multi-type questions, and deep analytics built for MLS
              Classes learners.
            </div>
          </div>
          <div className="relative">{children}</div>
        </div>
      </div>
    </section>
  );
}
