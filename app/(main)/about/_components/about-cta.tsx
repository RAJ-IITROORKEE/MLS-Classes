"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutCTA() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-card p-10 text-center space-y-6 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get Started Today
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see the difference?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Book a free 1-week trial and experience live 1-on-1 tutoring with one of our master
            teachers. No commitment required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/book-trial">Book Free Trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://wa.me/message/XMS5KMWBGQZLG1"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Questions? Email us at{" "}
            <a
              href="mailto:ritik@mlsclasses.com"
              className="text-primary hover:underline"
            >
              ritik@mlsclasses.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919649549754" className="text-primary hover:underline">
              (+91) 9649549754
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
