// Shared types for mock tests — used in both API routes and frontend components

export type QuestionType = "MCQ" | "MSQ" | "NAT" | "DESCRIPTIVE"

export interface MockQuestion {
  id: string
  question: string
  type: QuestionType
  // For MCQ/MSQ: list of option strings
  options: string[]
  // Correct answer: string for MCQ/NAT/DESCRIPTIVE, semicolon-joined sorted strings for MSQ
  answer: string
  explanation?: string
  // Optional Cloudinary image URL for the question
  imageUrl?: string
  marks?: number
}

export interface MockTestSummary {
  id: string
  title: string
  description: string | null
  price: number
  actualPrice: number | null
  duration: number | null
  tags: string[]
  difficulty: "EASY" | "MEDIUM" | "HARD"
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  questionCount: number
  attemptCount: number
  createdAt: string
}

export interface MockBundleSummary {
  id: string
  title: string
  description: string | null
  mockIds: string[]
  basePrice: number
  discountedPrice: number | null
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  order: number
  mockCount: number
  createdAt: string
}
