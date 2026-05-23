"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Clock3,
  Coins,
  ListChecks,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MockBundleSummary, MockTestSummary } from "@/types/mock";
import { BuyMockButton } from "@/components/mocks/buy-mock-button";

type ListingProps = {
  mocks: MockTestSummary[];
  bundles: MockBundleSummary[];
  purchasedMockIds: string[];
  purchasedBundleIds: string[];
  limits: {
    freeAttempts: number;
    premiumAttempts: number;
  };
  initialTab?: TabKey;
};

type TabKey = "free" | "premium" | "bundles";

const TABS: { key: TabKey; label: string }[] = [
  { key: "free", label: "Free Mocks" },
  { key: "premium", label: "Premium Mocks" },
  { key: "bundles", label: "Bundles" },
];

const DIFFICULTY_STYLES: Record<MockTestSummary["difficulty"], string> = {
  EASY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  MEDIUM: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  HARD: "bg-rose-500/10 text-rose-600 dark:text-rose-300",
};

const fadeVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function formatPrice(amount: number | null | undefined) {
  if (!amount || amount === 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function MocksListingClient({
  mocks,
  bundles,
  purchasedMockIds,
  purchasedBundleIds,
  limits,
  initialTab = "free",
}: ListingProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  const { freeMocks, premiumMocks } = useMemo(() => {
    return {
      freeMocks: mocks.filter((mock) => mock.price === 0),
      premiumMocks: mocks.filter((mock) => mock.price > 0),
    };
  }, [mocks]);

  const hasFree = freeMocks.length > 0;
  const hasPremium = premiumMocks.length > 0;
  const hasBundles = bundles.length > 0;

  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            Practice Tests
          </Badge>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              MLS Mock Test Library
            </h1>
            <p className="text-base text-muted-foreground">
              Train with timed mock exams, track progress, and unlock premium
              bundles built for MLS Classes learners.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border/60 bg-background/70 shadow-sm">
            <CardHeader className="space-y-1 pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Free Attempts
              </p>
              <CardTitle className="text-2xl">{limits.freeAttempts}</CardTitle>
              <CardDescription>per free mock test</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60 bg-background/70 shadow-sm">
            <CardHeader className="space-y-1 pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Premium Attempts
              </p>
              <CardTitle className="text-2xl">{limits.premiumAttempts}</CardTitle>
              <CardDescription>per premium mock test</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-border/60 bg-background/70 shadow-sm">
            <CardHeader className="space-y-1 pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Instant Review
              </p>
              <CardTitle className="text-2xl">Detailed</CardTitle>
              <CardDescription>see answers and explanations</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 rounded-full border border-border/60 bg-muted/40 p-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "free" && (
          <motion.div
            key="free"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {hasFree ? (
              freeMocks.map((mock) => (
                <MockCard
                  key={mock.id}
                  mock={mock}
                  isPurchased={purchasedMockIds.includes(mock.id)}
                  attemptLimit={limits.freeAttempts}
                />
              ))
            ) : (
              <EmptyState
                title="No free mocks yet"
                description="Free mock tests will appear here as soon as they are published."
              />
            )}
          </motion.div>
        )}

        {activeTab === "premium" && (
          <motion.div
            key="premium"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {hasPremium ? (
              premiumMocks.map((mock) => (
                <MockCard
                  key={mock.id}
                  mock={mock}
                  isPurchased={purchasedMockIds.includes(mock.id)}
                  attemptLimit={limits.premiumAttempts}
                />
              ))
            ) : (
              <EmptyState
                title="No premium mocks yet"
                description="Premium mock tests will appear here as soon as they are published."
              />
            )}
          </motion.div>
        )}

        {activeTab === "bundles" && (
          <motion.div
            key="bundles"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {hasBundles ? (
              bundles.map((bundle) => (
                <BundleCard
                  key={bundle.id}
                  bundle={bundle}
                  isPurchased={purchasedBundleIds.includes(bundle.id)}
                />
              ))
            ) : (
              <EmptyState
                title="No bundles yet"
                description="Mock bundles will appear here once they are published."
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MockCard({
  mock,
  isPurchased,
  attemptLimit,
}: {
  mock: MockTestSummary;
  isPurchased: boolean;
  attemptLimit: number;
}) {
  const isFree = mock.price === 0;

  return (
    <Card className="flex h-full flex-col border-border/60 bg-background/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className={DIFFICULTY_STYLES[mock.difficulty]}>
            {mock.difficulty.toLowerCase()}
          </Badge>
          {isFree ? (
            <Badge variant="outline">Free</Badge>
          ) : isPurchased ? (
            <Badge variant="secondary" className="gap-1">
              <BadgeCheck className="h-3.5 w-3.5" />
              Access granted
            </Badge>
          ) : (
            <Badge className="bg-primary/10 text-primary">Premium</Badge>
          )}
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">{mock.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {mock.description ?? "Mock test description coming soon."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-foreground/60" />
            {mock.questionCount} questions
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-foreground/60" />
            {mock.duration ? `${mock.duration} min duration` : "Timed mock"}
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-foreground/60" />
            {attemptLimit} attempts per learner
          </div>
        </div>
        {mock.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mock.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Coins className="h-4 w-4 text-primary" />
          <span>{formatPrice(mock.price)}</span>
          {mock.actualPrice && mock.actualPrice > mock.price ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(mock.actualPrice)}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href={`/mocks/${mock.id}/start`}>View details</Link>
          </Button>
          {!isFree && !isPurchased ? (
            <BuyMockButton
              mockTestId={mock.id}
              title={mock.title}
              amount={mock.price}
            />
          ) : null}
        </div>
      </CardFooter>
    </Card>
  );
}

function BundleCard({
  bundle,
  isPurchased,
}: {
  bundle: MockBundleSummary;
  isPurchased: boolean;
}) {
  return (
    <Card className="flex h-full flex-col border-border/60 bg-background/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-primary/10 text-primary">Bundle</Badge>
          {isPurchased ? (
            <Badge variant="secondary" className="gap-1">
              <BadgeCheck className="h-3.5 w-3.5" />
              Owned
            </Badge>
          ) : null}
        </div>
        <div className="space-y-1">
          <CardTitle className="text-lg">{bundle.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {bundle.description ?? "Mock bundle overview coming soon."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4 text-foreground/60" />
          Includes {bundle.mockCount} mocks
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
          Ideal for students preparing across multiple MLS mock tests.
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Coins className="h-4 w-4 text-primary" />
          <span>{formatPrice(bundle.discountedPrice ?? bundle.basePrice)}</span>
          {bundle.discountedPrice && bundle.discountedPrice < bundle.basePrice ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(bundle.basePrice)}
            </span>
          ) : null}
        </div>
        {isPurchased ? (
          <Badge variant="secondary">Owned</Badge>
        ) : (
          <BuyMockButton
            mockBundleId={bundle.id}
            title={bundle.title}
            amount={bundle.discountedPrice ?? bundle.basePrice}
          />
        )}
      </CardFooter>
    </Card>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="col-span-full border-dashed border-border/70 bg-background/50">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
