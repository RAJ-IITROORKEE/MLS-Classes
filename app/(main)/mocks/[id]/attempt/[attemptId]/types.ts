export type QuestionType = "MCQ" | "MSQ" | "NAT" | "DESCRIPTIVE";

export type AttemptAnswerMap = Record<string, string>;

export type QuestionState = {
  isVisited: boolean;
  isAnswered: boolean;
  isBookmarked: boolean;
};

export type AttemptQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  options: string[];
  answer: string;
  explanation?: string;
  imageUrl?: string;
  marks?: number;
};

export type AttemptPayload = {
  mock: {
    id: string;
    title: string;
    description: string | null;
    duration: number | null;
    questionCount: number;
    questions: AttemptQuestion[];
  };
  access: {
    hasAccess: boolean;
    attemptsRemaining: number;
    attemptsLimit: number;
  } | null;
};
