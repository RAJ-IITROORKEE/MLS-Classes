"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function CancellationRefundPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="inline-block">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Legal Document
          </span>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl text-foreground">
          Cancellation & Refund Policy
        </h1>
        <p className="text-base text-muted-foreground">
          Last updated on <span className="font-semibold">October 27th, 2023</span>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Desktop Sidebar - Important Info */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-32 space-y-2 rounded-lg bg-amber-500/5 p-4 border border-amber-500/20">
            <div className="flex gap-2 items-start">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-900 dark:text-amber-200 mb-2">
                  Important
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-100">
                  Please read this policy carefully before making any purchases.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Main Policy Section */}
          <section className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  No Cancellations & Refunds
                </h2>
                <p className="text-lg font-semibold text-primary">
                  Our Policy is Final and Non-Negotiable
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-primary/20">
                <p className="text-foreground leading-relaxed">
                  In accordance with our business terms and conditions, <span className="font-semibold">no cancellations or refunds are entertained</span> under any circumstances.
                </p>

                <div className="bg-background/60 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    What This Means
                  </h3>
                  <ul className="space-y-2 ml-4 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">✓</span>
                      <span>All purchases are final once confirmed</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">✓</span>
                      <span>No partial refunds are available</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-semibold">✓</span>
                      <span>No credits or adjustments after purchase</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Information Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Before You Purchase</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Review Your Selection</h4>
                <p className="text-sm text-muted-foreground">
                  Carefully review all course details, pricing, and terms before completing your purchase.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Confirm Your Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Make sure the selected course meets your learning objectives and schedule.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Check Eligibility</h4>
                <p className="text-sm text-muted-foreground">
                  Verify that you meet all prerequisites and requirements for the course.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Contact Support</h4>
                <p className="text-sm text-muted-foreground">
                  Reach out to us if you have any questions before making a purchase.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-12 rounded-lg bg-primary/5 border border-primary/20 p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Questions or Concerns?</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions about our Cancellation & Refund Policy before making a purchase, please feel free to contact us at{" "}
              <a
                href="mailto:ritik@mlsclasses.com"
                className="font-semibold text-primary hover:underline"
              >
                ritik@mlsclasses.com
              </a>
            </p>
          </section>

          {/* Important Notice */}
          <section className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-6 space-y-3">
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Important Notice
            </h3>
            <p className="text-sm text-amber-800 dark:text-amber-100">
              By proceeding with your purchase, you acknowledge that you have read, understood, and agree to this Cancellation & Refund Policy. This policy is binding and applies to all purchases made through our website.
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <Link
              href="/privacy-policy"
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span>← Privacy Policy</span>
            </Link>
            <Link
              href="/terms-conditions"
              className="group flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-auto"
            >
              <span>Terms & Conditions</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
