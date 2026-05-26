"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Calendar } from "lucide-react";
import { motion } from "framer-motion";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  program?: string | null;
  country?: string | null;
  imageUrl?: string | null;
};

function getInitials(name: string): string {
  return name
    .split(/[\s']+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function FAQsPage() {
  const [activeItem, setActiveItem] = useState<string | null>("0");
  const [faqData, setFaqData] = useState<Faq[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const toggleItem = (index: string) => {
    setActiveItem(activeItem === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faq");
        const json = await res.json();
        const data: Faq[] = Array.isArray(json) ? json : json.faqs || json.data || [];
        setFaqData(data);
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        const data: Testimonial[] = Array.isArray(json) ? json : json.testimonials || json.data || [];
        setTestimonials(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    Promise.all([fetchFaqs(), fetchTestimonials()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqData.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    );
  }, [faqData, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-transparent text-slate-900 dark:text-gray-100">
      {/* FAQ Header Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6 xl:flex-row xl:items-center xl:justify-between mb-10">
            <div className="flex flex-col items-center gap-4 xl:items-start">
              <span className="inline-flex items-center border-cyan-400 border justify-center rounded-full bg-cyan-50 dark:bg-transparent px-3 py-1 text-cyan-700 dark:text-gray-300 text-sm font-medium">
                Find Answers to Common Queries
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-center text-slate-900 dark:text-gray-100 xl:text-left">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-center text-slate-700 dark:text-gray-200 xl:text-left">
                Your path to clarity and understanding
              </p>
            </div>
          </div>

          {/* Search box */}
          <div className="w-full max-w-sm mb-6">
            <Input
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-transparent text-slate-900 dark:text-gray-100 border-purple-400 dark:border-purple-700 placeholder:text-slate-500"
            />
          </div>

          {/* FAQ Items */}
          <ul className="flex w-full flex-col gap-12">
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <li key={idx} className="space-y-4">
                  <div className="h-10 w-full rounded-lg bg-muted animate-pulse" />
                </li>
              ))
            ) : (
              filteredFaqs.map((item, index) => {
                const itemIndex = `${index}`;
                const isActive = activeItem === itemIndex;

                return (
                  <li key={item.id} className="w-full space-y-5">
                    <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none overflow-hidden">
                      <button
                        type="button"
                        onClick={() => toggleItem(itemIndex)}
                        className={`flex w-full justify-between items-center gap-5 p-6 ${
                          isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-800 dark:text-gray-100"
                        }`}
                        aria-expanded={isActive}
                      >
                        <p className="flex-1 text-left text-lg font-semibold">
                          {item.question}
                        </p>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`flex-shrink-0 transition-transform duration-300 ${
                            isActive
                              ? "rotate-180 text-cyan-600 dark:text-primary-400"
                              : "text-slate-400 dark:text-gray-400"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.0608 5.49999L13.5304 6.03032L8.70722 10.8535C8.3167 11.2441 7.68353 11.2441 7.29301 10.8535L2.46978 6.03032L1.93945 5.49999L3.00011 4.43933L3.53044 4.96966L8.00011 9.43933L12.4698 4.96966L13.0001 4.43933L14.0608 5.49999Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isActive
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>

      {/* Book a Trial Session Card */}
      <section className="py-12 px-4 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm mb-4">
              🎓 Limited Slots Available — Book Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Book Your Free Trial Session
            </h2>
            <p className="mt-4 text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              Experience personalized 1-on-1 tutoring with an expert tutor. Fill in your details
              and we&apos;ll confirm your session within 24 hours.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: CheckCircle2, title: "100% Free", desc: "No credit card needed" },
                { icon: Clock4, title: "Any Timezone", desc: "Classes scheduled 24/7" },
                { icon: UserCheck, title: "Best Tutor", desc: "Expert tutor match" },
                { icon: GraduationCap, title: "K-12", desc: "All grades covered" },
              ].map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm"
                >
                  <b.icon className="h-6 w-6 text-white/80" />
                  <p className="text-sm font-bold text-white">{b.title}</p>
                  <p className="text-xs text-white/60 leading-snug text-center">{b.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/book-trial">
              <Button
                size="lg"
                className="mt-8 bg-white text-purple-900 hover:bg-white/90 font-semibold px-8 py-6 text-base rounded-full"
              >
                Book Free Trial <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Parents and students love us!
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Real results from real families who trusted MLS Classes for academic excellence.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <Quote className="absolute top-5 right-5 h-6 w-6 text-primary/20" />

                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                    {t.imageUrl ? (
                      <Image
                        src={t.imageUrl}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : (
                      <Avatar className="h-14 w-14 rounded-full">
                        <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {getInitials(t.name)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>

                {(t.program || t.country) && (
                  <div className="flex flex-wrap gap-2">
                    {t.program && (
                      <Badge variant="secondary" className="text-xs">
                        {t.program}
                      </Badge>
                    )}
                    {t.country && (
                      <Badge variant="outline" className="text-xs">
                        {t.country}
                      </Badge>
                    )}
                  </div>
                )}

                <StarRating rating={t.rating} />

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function Clock4({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function UserCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
