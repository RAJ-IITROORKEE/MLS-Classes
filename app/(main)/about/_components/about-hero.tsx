"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          About MLS Classes
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight"
        >
          Empowering Students,{" "}
          <span className="text-primary">One Class at a Time</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          MLS Classes is a premier live, online 1-on-1 tutoring platform serving students
          from kindergarten through grade 12 across the US, UK, Australia, Canada, UAE, and beyond.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="font-semibold">
            <Link href="/book-trial">Book a Free Trial Class</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://wa.me/message/XMS5KMWBGQZLG1" target="_blank" rel="noopener noreferrer">
              Contact Us on WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
