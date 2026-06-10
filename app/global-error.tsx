"use client";

import { useEffect } from "react";
import { StatusPage } from "@/components/status-page";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <StatusPage
          variant="error"
          title="Something went wrong"
          description="A critical error interrupted the page. Please try again, go back, or return home."
          onRetry={reset}
          errorDigest={error.digest}
        />
      </body>
    </html>
  );
}
