"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const KEYS = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
];

export function CalculatorDialog() {
  const [expression, setExpression] = useState("0");

  const formatted = useMemo(() => {
    return expression.length > 16 ? expression.slice(0, 16) + "…" : expression;
  }, [expression]);

  function handleKey(value: string) {
    if (value === "=") {
      try {
        const sanitized = expression.replace(/[^-+/*().0-9]/g, "");
        // eslint-disable-next-line no-new-func
        const result = Function(`"use strict"; return (${sanitized})`)();
        setExpression(String(result));
      } catch {
        setExpression("Error");
      }
      return;
    }

    if (expression === "0" || expression === "Error") {
      setExpression(value);
      return;
    }

    setExpression((prev) => prev + value);
  }

  function handleClear() {
    setExpression("0");
  }

  function handleBackspace() {
    setExpression((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" size="sm">
          <Calculator className="h-4 w-4" />
          Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogHeader>
          <DialogTitle>Calculator</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border border-border/60 bg-muted/40 px-3 py-4 text-right text-2xl font-semibold">
            {formatted}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button
              type="button"
              variant="outline"
              className="col-span-2"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button type="button" variant="outline" onClick={handleBackspace}>
              Del
            </Button>
            <Button type="button" variant="outline" onClick={() => handleKey("/")}
            >
              /
            </Button>
            {KEYS.slice(0, 12).map((key) => (
              <Button
                key={key}
                type="button"
                variant={key === "=" ? "default" : "outline"}
                className={cn(key === "=" && "col-span-2")}
                onClick={() => handleKey(key)}
              >
                {key}
              </Button>
            ))}
            <Button type="button" variant="outline" onClick={() => handleKey("+")}
            >
              +
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
