"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  Clock3,
  FileText,
  Lightbulb,
  ListChecks,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { MockQuestion } from "@/types/mock";
import { BuyMockButton } from "@/components/mocks/buy-mock-button";

type AccessInfo = {
  hasAccess: boolean;
  accessType: "free" | "paid" | "bundle" | "admin" | null;
  attemptsUsed: number;
  attemptsLimit: number;
  attemptsRemaining: number;
  canAttempt: boolean;
} | null;

type MockSummary = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  actualPrice: number | null;
  duration: number | null;
  tags: string[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questionCount: number;
  createdAt: string;
  questions?: MockQuestion[] | null;
};

type StartClientProps = {
  mock: MockSummary;
  access: AccessInfo;
};

const DIFFICULTY_STYLES: Record<MockSummary["difficulty"], string> = {
  EASY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  MEDIUM: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  HARD: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

const typeLabels: Record<MockQuestion["type"], string> = {
  MCQ: "MCQ",
  MSQ: "MSQ",
  NAT: "NAT",
  DESCRIPTIVE: "Descriptive",
};

function formatPrice(amount: number | null | undefined) {
  if (!amount || amount === 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function MockStartClient({ mock, access }: StartClientProps) {
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();

  const questionTypeCounts = useMemo(() => {
    if (!mock.questions || mock.questions.length === 0) return [];
    const counts = mock.questions.reduce<Record<string, number>>((acc, q) => {
      acc[q.type] = (acc[q.type] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([type, count]) => ({
      type: type as MockQuestion["type"],
      count,
      percent: (count / (mock.questions?.length ?? 1)) * 100,
    }));
  }, [mock.questions]);

  async function handleStart() {
    if (!access?.hasAccess || !access?.canAttempt) return;
    setIsStarting(true);
    try {
      const response = await fetch("/api/mock/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mockTestId: mock.id }),
      });

      if (!response.ok) {
        setIsStarting(false);
        return;
      }

      const data = await response.json();
      if (data?.attempt?.id) {
        router.push(`/mocks/${mock.id}/attempt/${data.attempt.id}`);
      } else {
        setIsStarting(false);
      }
    } catch {
      setIsStarting(false);
    }
  }

  const attemptsUsed = access?.attemptsUsed ?? 0;
  const attemptsLimit = access?.attemptsLimit ?? 0;
  const attemptsRemaining = access?.attemptsRemaining ?? 0;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={DIFFICULTY_STYLES[mock.difficulty]}>
                  {mock.difficulty.toLowerCase()}
                </Badge>
                {mock.price === 0 ? (
                  <Badge variant="outline">Free Mock</Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary">Premium</Badge>
                )}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {mock.title}
                </h1>
                <p className="text-base text-muted-foreground">
                  {mock.description ?? "Mock test description coming soon."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border/60 bg-background/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Questions</CardTitle>
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {mock.questionCount}
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-background/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Duration</CardTitle>
                  <Clock3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {mock.duration ? `${mock.duration} min` : "Timed"}
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-background/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Price</CardTitle>
                  <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {formatPrice(mock.price)}
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-background/70 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Attempts</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent className="text-2xl font-semibold">
                  {access?.accessType === "admin"
                    ? "Unlimited"
                    : attemptsLimit > 0
                    ? `${attemptsRemaining} left`
                    : "Unlimited"}
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/60 bg-background/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Question types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questionTypeCounts.length > 0 ? (
                  questionTypeCounts.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {typeLabels[item.type]}
                        </span>
                        <span className="text-muted-foreground">
                          {item.count} questions
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percent}%` }}
                          transition={{ duration: 0.4 }}
                          className="h-full rounded-full bg-primary/80"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Question breakdown will appear once the mock is published.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Mock instructions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Clock3 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Timed attempt</p>
                    <p>Timer auto-submits when time runs out.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Calculator ready</p>
                    <p>Use the built-in calculator during the attempt.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Attempt history</p>
                    <p>Review all attempts from your mock dashboard.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Detailed review</p>
                    <p>Get correct answers and explanations instantly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/70 bg-background/80 shadow-lg">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">Access status</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {access?.hasAccess
                    ? "You are eligible to attempt this mock."
                    : "Purchase is required to unlock this mock."}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "rounded-lg border px-4 py-3 text-sm",
                    access?.hasAccess
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  )}
                >
                  {access?.hasAccess ? (
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4" />
                      <span>
                        Access granted — {access?.accessType ?? "member"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4" />
                      <span>Access required to start this mock.</span>
                    </div>
                  )}
                </div>

                <div className="rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Attempts used</span>
                    <span className="font-semibold text-foreground">
                      {attemptsUsed} / {access?.accessType === "admin" ? "∞" : (attemptsLimit || "-")}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span>Attempts remaining</span>
                    <span
                      className={cn(
                        "font-semibold",
                        !access?.accessType || access.accessType === "admin"
                          ? "text-foreground"
                          : attemptsRemaining === 0
                          ? "text-destructive"
                          : "text-foreground"
                      )}
                    >
                      {access?.accessType === "admin"
                        ? "Unlimited"
                        : attemptsLimit > 0
                        ? attemptsRemaining
                        : "Unlimited"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {access?.hasAccess ? (
                    <Button
                      size="lg"
                      className="w-full gap-2"
                      onClick={handleStart}
                      disabled={!access?.canAttempt || isStarting}
                    >
                      {isStarting ? "Starting" : "Start mock now"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : mock.price > 0 ? (
                    <BuyMockButton
                      mockTestId={mock.id}
                      title={mock.title}
                      amount={mock.price}
                    />
                  ) : (
                    <Button size="lg" className="w-full gap-2" disabled>
                      Start mock now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/mocks">Back to mocks</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-background/70 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Need a bundle?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Bundle purchases unlock multiple mocks with premium attempt
                  limits. Great for rapid revision.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/mocks?tab=bundles">View bundles</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
