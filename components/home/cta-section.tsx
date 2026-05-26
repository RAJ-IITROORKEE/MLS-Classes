"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Users, Trophy } from "lucide-react";

const STATS = [
  { icon: Users, value: "15k+", label: "Applications" },
  { icon: Trophy, value: "100%", label: "On Time Delivery" },
  { icon: GraduationCap, value: "5 yrs", label: "Experience" },
];

export function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #5496b6 0%, #3a7a9b 60%, #2a5a7a 100%)",
          }}
        >
          <div className="absolute inset-0 bg-grid-white/[0.05]" />
          <div className="relative px-8 py-16 sm:px-12 sm:py-20 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your Academic Journey?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of students who have achieved their academic goals with MLS Classes.
              Book your free trial session today — no commitment required.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg"
              >
                <Link href="/book-trial" className="flex items-center gap-2">
                  Book Free Trial Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/contact-us">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
