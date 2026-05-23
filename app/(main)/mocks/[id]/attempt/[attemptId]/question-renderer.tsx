"use client";

import type { AttemptAnswerMap, AttemptQuestion } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const optionLabels = ["A", "B", "C", "D", "E", "F"];

type QuestionRendererProps = {
  question: AttemptQuestion;
  answerMap: AttemptAnswerMap;
  onAnswerChange: (questionId: string, value: string) => void;
};

export function QuestionRenderer({
  question,
  answerMap,
  onAnswerChange,
}: QuestionRendererProps) {
  const currentAnswer = answerMap[question.id] ?? "";

  if (question.type === "MCQ") {
    return (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const label = optionLabels[index] ?? String(index + 1);
            const isSelected = currentAnswer.trim() === option.trim();
            return (
              <button
                key={option + index}
                type="button"
                onClick={() => onAnswerChange(question.id, option)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/70 bg-background hover:border-primary/50"
                )}
              >
                <Badge variant={isSelected ? "default" : "outline"}>{label}</Badge>
                <span className="text-foreground/80">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === "MSQ") {
    const selections = currentAnswer
      .split(";")
      .map((value) => value.trim())
      .filter(Boolean);

    function toggleSelection(option: string) {
      const next = selections.includes(option)
        ? selections.filter((item) => item !== option)
        : [...selections, option];
      onAnswerChange(question.id, next.join(";"));
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select all correct options.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option, index) => {
            const label = optionLabels[index] ?? String(index + 1);
            const isSelected = selections.includes(option);
            return (
              <button
                key={option + index}
                type="button"
                onClick={() => toggleSelection(option)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/70 bg-background hover:border-primary/50"
                )}
              >
                <Badge variant={isSelected ? "default" : "outline"}>{label}</Badge>
                <span className="text-foreground/80">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === "NAT") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Enter a numerical value. Decimals are allowed.
        </p>
        <Input
          type="number"
          value={currentAnswer}
          placeholder="Type your answer"
          onChange={(event) => onAnswerChange(question.id, event.target.value)}
          className="h-11 text-base"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Provide a short descriptive answer. This will be reviewed.
      </p>
      <Textarea
        value={currentAnswer}
        placeholder="Write your response..."
        onChange={(event) => onAnswerChange(question.id, event.target.value)}
        className="min-h-[140px] text-base"
      />
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAnswerChange(question.id, "")}
        >
          Clear response
        </Button>
      </div>
    </div>
  );
}
