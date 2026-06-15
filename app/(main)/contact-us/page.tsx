"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.04 3.2C9.02 3.2 3.32 8.88 3.32 15.88c0 2.24.58 4.43 1.7 6.36L3.2 28.8l6.74-1.77a12.72 12.72 0 0 0 6.09 1.55h.01c7.01 0 12.72-5.69 12.72-12.69S23.05 3.2 16.04 3.2Zm0 23.23h-.01c-1.88 0-3.72-.5-5.33-1.46l-.38-.23-4 .95 1.07-3.8-.25-.39a10.47 10.47 0 0 1-1.61-5.62c0-5.81 4.72-10.53 10.52-10.53 2.81 0 5.45 1.1 7.44 3.08a10.46 10.46 0 0 1 3.08 7.45c0 5.8-4.72 10.52-10.53 10.52Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.76.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "+91 9649549754";
const WHATSAPP_HREF = `https://wa.me/919649549754?text=${encodeURIComponent(
  "Hi, I want to know more about MLS Classes."
)}`;

const CONTACT_LINKS = [
  {
    title: "Email",
    value: "ritik@mlsclasses.com",
    description: "For course questions, trial bookings, and support.",
    href: "mailto:ritik@mlsclasses.com",
    icon: Mail,
    className: "border-primary/20 bg-primary/5 text-primary",
  },
  {
    title: "WhatsApp",
    value: WHATSAPP_NUMBER,
    description: "Tap to open chat in WhatsApp app or WhatsApp Web.",
    href: WHATSAPP_HREF,
    icon: WhatsAppIcon,
    className: "border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]",
  },
];

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/message/XMS5KMWBGQZLG1",
    icon: WhatsAppIcon,
    color: "bg-[#25D366]/10 text-[#25D366] hover:border-[#25D366] hover:bg-[#25D366]/15 hover:shadow-[0_0_18px_rgba(37,211,102,0.28)]",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/mlsclasses?mibextid=ZbWKwL",
    icon: FacebookIcon,
    color: "bg-[#1877F2]/10 text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/15 hover:shadow-[0_0_18px_rgba(24,119,242,0.28)]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mlsclasses?utm_source=ig_web_button_share_sheet",
    icon: InstagramIcon,
    color: "bg-[#E4405F]/10 text-[#E4405F] hover:border-[#E4405F] hover:bg-[#E4405F]/15 hover:shadow-[0_0_18px_rgba(228,64,95,0.28)]",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mlsclasses8293?si=KBojcjPosvKjfwjH",
    icon: YoutubeIcon,
    color: "bg-[#FF0000]/10 text-[#FF0000] hover:border-[#FF0000] hover:bg-[#FF0000]/15 hover:shadow-[0_0_18px_rgba(255,0,0,0.24)]",
  },
];

export default function ContactUsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-12 right-4 h-64 w-64 rounded-full bg-brand-yellow/20 blur-3xl" />
        </div>

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-7 text-center lg:text-left"
          >
            <div className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-primary">
              Contact MLS Classes
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Talk to our tutoring team directly.
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
                For fastest help, message us on WhatsApp or book a free trial. We will guide you on classes, curriculum, timings, and next steps.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="h-12 rounded-full px-7 text-sm font-black">
                <Link href="/book-trial">
                  Book Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-7 text-sm font-black">
                <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-5 w-5 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] border border-border/70 bg-card/80 p-4 shadow-2xl shadow-black/5 backdrop-blur sm:p-6 dark:bg-zinc-950/70 dark:shadow-black/30"
          >
            <div className="rounded-[1.5rem] border border-border/60 bg-background/70 p-5 sm:p-7">
              <div className="space-y-2 text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-muted-foreground">Contact Information</p>
                <h2 className="text-2xl font-black text-foreground">Reach us here</h2>
              </div>

              <div className="mt-6 grid gap-4">
                {CONTACT_LINKS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      target={item.title === "WhatsApp" ? "_blank" : undefined}
                      rel={item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                      whileHover={{ y: -3 }}
                      className="group rounded-2xl border border-border/70 bg-muted/25 p-4 transition hover:border-primary/40 hover:bg-muted/40"
                    >
                      <div className="flex items-start gap-4">
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${item.className}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 space-y-1">
                          <span className="block text-sm font-black text-foreground">{item.title}</span>
                          <span className="block break-words text-base font-black text-foreground transition group-hover:text-primary">
                            {item.value}
                          </span>
                          <span className="block text-sm leading-6 text-muted-foreground">{item.description}</span>
                        </span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              <div className="mt-7 border-t border-border/70 pt-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-sm font-black text-foreground">Social Links</h3>
                  <span className="text-xs font-semibold text-muted-foreground">Follow MLS Classes</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-center gap-2 rounded-2xl border border-border/60 px-3 py-3 text-sm font-black transition-all duration-300 ${social.color}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="hidden sm:inline">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
