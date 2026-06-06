"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Faq = {
  id: string;
  question: string;
  answer: string;
};

export function FAQSection() {
  const [faqData, setFaqData] = useState<Faq[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>("0");
  const [loading, setLoading] = useState(true);
  const [hasMoreFaqs, setHasMoreFaqs] = useState(false);

  const toggleItem = (index: string) => {
    setActiveItem(activeItem === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faq");
        const json = await res.json();
        const data: Faq[] = Array.isArray(json) ? json : json.faqs || json.data || [];
        setHasMoreFaqs(data.length > 5);
        setFaqData(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch FAQs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <section id="faq" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex flex-col items-center gap-4 xl:max-w-[30%] xl:items-start">
            <span className="inline-flex items-center border-primary/40 border justify-center rounded-full bg-primary/10 dark:bg-transparent px-3 py-1 text-primary dark:text-gray-300 text-sm font-medium">
              Find Answers to Common Queries
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-center text-slate-800 dark:text-gray-100 xl:text-left">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-center text-slate-600 dark:text-gray-200 xl:text-left">
              Your path to clarity and understanding
            </p>

            {hasMoreFaqs && (
              <Link
                href="/faqs"
                prefetch
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary px-6 py-2 text-primary transition duration-300 ease-in-out hover:border-primary/80 hover:text-primary/80 hover:shadow-[0_0_15px_color-mix(in_srgb,var(--theme-color)_45%,transparent)]"
              >
                More FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <ul className="flex w-full flex-col gap-12 xl:max-w-[70%]">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <li key={idx} className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-lg" />
                  <Skeleton className="h-10 w-3/4 rounded-lg" />
                </li>
              ))
            ) : (
              faqData.map((item, index) => {
                const itemIndex = `${index}`;
                const isActive = activeItem === itemIndex;

                return (
                  <li
                    key={item.id}
                    className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-transparent shadow-sm dark:shadow-none overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(itemIndex)}
                      className={`flex w-full justify-between items-center gap-5 p-6 ${
                        isActive ? "text-primary" : "text-slate-800 dark:text-gray-100"
                      }`}
                      aria-expanded={isActive}
                    >
                      <p className="flex-1 text-left text-lg font-semibold text-inherit">
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
                            ? "rotate-180 text-primary"
                            : "text-gray-300"
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
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
