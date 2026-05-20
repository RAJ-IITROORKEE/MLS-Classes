"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let progressListeners: (() => void)[] = [];

export function startProgress() {
  progressListeners.forEach((fn) => fn());
}

function useProgressBus(onStart: () => void) {
  useEffect(() => {
    progressListeners.push(onStart);
    return () => {
      progressListeners = progressListeners.filter((fn) => fn !== onStart);
    };
  }, [onStart]);
}

export function TopProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setVisible(true);
    setProgress(10);

    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(id);
          return 90;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    setIntervalId(id);
  }, []);

  const complete = useCallback(() => {
    if (intervalId) clearInterval(intervalId);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 400);
  }, [intervalId]);

  useProgressBus(start);

  useEffect(() => {
    complete();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
      start();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [start]);

  if (!visible) return null;

  return (
    <div
      className="top-progress-bar"
      style={{ width: `${Math.min(progress, 100)}%` }}
      aria-hidden="true"
    />
  );
}
