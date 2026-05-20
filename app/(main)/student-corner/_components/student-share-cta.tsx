"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail } from "lucide-react";

export function StudentShareCTA() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-border bg-card p-10 text-center space-y-5 shadow-sm"
        >
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquare className="h-7 w-7 text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Share your story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Have an MLS Classes success story? We&apos;d love to hear from you and
              feature your experience to inspire other students.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="font-semibold gap-2">
              <a
                href="https://wa.me/message/XMS5KMWBGQZLG1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-4 w-4" />
                Share on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold gap-2">
              <a href="mailto:ritik@mlsclasses.com?subject=My MLS Classes Experience">
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your feedback helps thousands of families make the right choice for their children.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
