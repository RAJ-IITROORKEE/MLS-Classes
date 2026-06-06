import type { Metadata } from "next";
import { BookTrialForm } from "@/components/book-trial-form";

export const metadata: Metadata = {
  title: "Book a Free Trial | MLS Classes",
  description:
    "Book your free 1-on-1 trial session with MLS Classes. No commitment required.",
};

const BENEFITS = [
  {
    icon: "OK",
    title: "100% Free",
    desc: "No credit card or commitment needed",
  },
  {
    icon: "24",
    title: "Any Timezone",
    desc: "Classes scheduled 24/7 globally",
  },
  {
    icon: "1:1",
    title: "Best Tutor Match",
    desc: "Matched by subject & learning style",
  },
  {
    icon: "K12",
    title: "K-12 Coverage",
    desc: "All grades, all subjects covered",
  },
];

export default function BookTrialPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-24 px-4"
        style={{
          background: "linear-gradient(135deg, var(--theme-color) 0%, color-mix(in srgb, var(--theme-color) 78%, black) 50%, color-mix(in srgb, var(--theme-color) 58%, black) 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm">
            🎓 Limited Slots Available — Book Today
          </span>
          <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight sm:text-6xl">
            Book Your Free<br />Trial Session
          </h1>
          <p className="mt-5 text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Experience personalized 1-on-1 tutoring with an expert tutor. Fill in your details
            and we&apos;ll confirm your session within 24 hours.
          </p>

          {/* Benefit badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 py-4 backdrop-blur-sm"
              >
                <span className="flex h-6 items-center text-sm font-semibold text-white/80">{b.icon}</span>
                <p className="text-sm font-bold text-white">{b.title}</p>
                <p className="text-xs text-white/60 leading-snug text-center">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Tell Us About Your Student</h2>
            <p className="mt-2 text-muted-foreground">
              All fields marked with <span className="text-destructive font-semibold">*</span> are required.
            </p>
          </div>
          <BookTrialForm />
        </div>
      </section>
    </div>
  );
}
