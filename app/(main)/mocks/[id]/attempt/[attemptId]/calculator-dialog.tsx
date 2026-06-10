"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  evaluateCalculatorExpression,
  formatCalculatorResult,
  type CalculatorAngleMode,
} from "@/lib/basic-scientific-calculator";

const SCIENTIFIC_KEYS = [
  { label: "sin", value: "sin(" },
  { label: "cos", value: "cos(" },
  { label: "tan", value: "tan(" },
  { label: "x^y", value: "^" },
  { label: "sin^-1", value: "asin(" },
  { label: "cos^-1", value: "acos(" },
  { label: "tan^-1", value: "atan(" },
  { label: "sqrt", value: "sqrt(" },
  { label: "log", value: "log(" },
  { label: "ln", value: "ln(" },
  { label: "(", value: "(" },
  { label: ")", value: ")" },
  { label: "pi", value: "pi" },
  { label: "e", value: "e" },
  { label: "%", value: "%" },
  { label: "+/-", value: "sign" },
] as const;

const BASIC_KEYS = [
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
] as const;

function isOperator(value: string) {
  return ["+", "-", "*", "/", "^"].includes(value);
}

export function CalculatorDialog() {
  const [expression, setExpression] = useState("0");
  const [angleMode, setAngleMode] = useState<CalculatorAngleMode>("DEG");

  const formatted = useMemo(() => {
    return expression.length > 28 ? `${expression.slice(0, 28)}...` : expression;
  }, [expression]);

  function evaluateExpression() {
    try {
      const value = evaluateCalculatorExpression(expression, angleMode);
      setExpression(formatCalculatorResult(value));
    } catch {
      setExpression("Error");
    }
  }

  function appendValue(value: string) {
    if (value === "=") {
      evaluateExpression();
      return;
    }

    if (value === "sign") {
      setExpression((prev) => {
        if (prev === "0" || prev === "Error") return "0";
        if (prev.startsWith("-(") && prev.endsWith(")")) return prev.slice(2, -1);
        return `-(${prev})`;
      });
      return;
    }

    setExpression((prev) => {
      if (prev === "Error") return value;
      if (prev === "0" && !isOperator(value) && value !== "." && value !== ")") return value;
      if (isOperator(value) && isOperator(prev.at(-1) ?? "")) return `${prev.slice(0, -1)}${value}`;
      return `${prev}${value}`;
    });
  }

  function handleClear() {
    setExpression("0");
  }

  function handleBackspace() {
    setExpression((prev) => (prev.length <= 1 || prev === "Error" ? "0" : prev.slice(0, -1)));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" size="sm">
          <Calculator className="h-4 w-4" />
          Calculator
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-sm overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scientific Calculator</DialogTitle>
          <DialogDescription>
            Basic arithmetic, powers, roots, logs, and trigonometry for mock attempts.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-xl border border-border/60 bg-muted/40 p-3">
            <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
              <span>{angleMode === "DEG" ? "Degrees" : "Radians"}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-7 rounded-full px-3 text-[11px]"
                onClick={() => setAngleMode((mode) => (mode === "DEG" ? "RAD" : "DEG"))}
              >
                {angleMode}
              </Button>
            </div>
            <div className="min-h-12 break-all text-right text-2xl font-semibold tabular-nums text-foreground">
              {formatted}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <Button type="button" variant="outline" className="col-span-3" onClick={handleClear}>
              Clear
            </Button>
            <Button type="button" variant="outline" onClick={handleBackspace}>
              Del
            </Button>

            {SCIENTIFIC_KEYS.map((key) => (
              <Button
                key={key.value}
                type="button"
                variant="secondary"
                className="h-9 px-2 text-xs"
                onClick={() => appendValue(key.value)}
              >
                {key.label}
              </Button>
            ))}

            {BASIC_KEYS.map((key) => (
              <Button
                key={key}
                type="button"
                variant={key === "=" ? "default" : "outline"}
                className={cn("h-10", key === "=" && "font-semibold")}
                onClick={() => appendValue(key)}
              >
                {key}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
