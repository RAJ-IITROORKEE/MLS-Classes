"use client";

import { useEffect } from "react";
import { StatusPage } from "@/components/status-page";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusPage
      variant="error"
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. You can try again, go back, or return home."
      onRetry={reset}
      errorDigest={error.digest}
    />
  );
}
