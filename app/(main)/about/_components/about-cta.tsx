"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3.2C9.02 3.2 3.32 8.88 3.32 15.88c0 2.24.58 4.43 1.7 6.36L3.2 28.8l6.74-1.77a12.72 12.72 0 0 0 6.09 1.55h.01c7.01 0 12.72-5.69 12.72-12.69S23.05 3.2 16.04 3.2Zm0 23.23h-.01c-1.88 0-3.72-.5-5.33-1.46l-.38-.23-4 .95 1.07-3.8-.25-.39a10.47 10.47 0 0 1-1.61-5.62c0-5.81 4.72-10.53 10.52-10.53 2.81 0 5.45 1.1 7.44 3.08a10.46 10.46 0 0 1 3.08 7.45c0 5.8-4.72 10.52-10.53 10.52Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.76.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

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
            or WhatsApp us at{" "}
            <a
              href="https://wa.me/919649549754?text=Hi%2C%20I%20want%20to%20know%20more%20about%20MLS%20Classes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
              (+91) 9649549754
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
