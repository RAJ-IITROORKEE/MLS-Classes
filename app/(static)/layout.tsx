"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppStickyButton } from "@/components/whatsapp-sticky-button";

interface StaticLayoutProps {
  children: React.ReactNode;
}

export default function StaticLayout({ children }: StaticLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero section with gradient */}
        <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
          </div>
        </div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
      <WhatsAppStickyButton />
    </>
  );
}
