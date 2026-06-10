"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, Home, RefreshCw, SearchX, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type StatusPageVariant = "not-found" | "error";

type StatusPageProps = {
  variant: StatusPageVariant;
  title: string;
  description: string;
  eyebrow?: string;
  homeHref?: string;
  homeLabel?: string;
  showBackButton?: boolean;
  onRetry?: () => void;
  retryLabel?: string;
  errorDigest?: string;
};

type VariantConfig = {
  defaultEyebrow: string;
  Icon: LucideIcon;
  iconClassName: string;
  glowClassName: string;
};

const variantConfig = {
  "not-found": {
    defaultEyebrow: "404 error",
    Icon: SearchX,
    iconClassName: "text-primary",
    glowClassName: "from-primary/20 via-primary/5 to-transparent",
  },
  error: {
    defaultEyebrow: "Application error",
    Icon: AlertTriangle,
    iconClassName: "text-destructive",
    glowClassName: "from-destructive/20 via-destructive/5 to-transparent",
  },
} satisfies Record<StatusPageVariant, VariantConfig>;

export function StatusPage({
  variant,
  title,
  description,
  eyebrow,
  homeHref = "/",
  homeLabel = "Go home",
  showBackButton = true,
  onRetry,
  retryLabel = "Try again",
  errorDigest,
}: StatusPageProps) {
  const router = useRouter();
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground">
      <div
        className={`absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] blur-3xl ${config.glowClassName}`}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

      <section
        aria-labelledby="status-page-title"
        className="relative w-full max-w-2xl rounded-3xl border bg-card/85 p-6 text-center shadow-2xl shadow-black/5 backdrop-blur md:p-10 dark:shadow-black/30"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
          <Icon className={`h-8 w-8 ${config.iconClassName}`} aria-hidden="true" />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          {eyebrow ?? config.defaultEyebrow}
        </p>
        <h1 id="status-page-title" className="text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground md:text-base">
          {description}
        </p>

        {errorDigest ? (
          <p className="mx-auto mt-5 w-fit rounded-full border bg-muted/60 px-3 py-1 font-mono text-xs text-muted-foreground">
            Error ID: {errorDigest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {onRetry ? (
            <Button type="button" onClick={onRetry} className="w-full gap-2 sm:w-auto">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              {retryLabel}
            </Button>
          ) : null}

          {showBackButton ? (
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full gap-2 sm:w-auto">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go back
            </Button>
          ) : null}

          <Button asChild variant={onRetry ? "outline" : "default"} className="w-full gap-2 sm:w-auto">
            <Link href={homeHref}>
              <Home className="h-4 w-4" aria-hidden="true" />
              {homeLabel}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
