import type { MockQuestion } from "../types/mock"

type CreateQuestionId = (questionIndex: number) => string

type ParseMockQuestionCsvResult = {
  questions: MockQuestion[]
  errors: string[]
}

const validQuestionTypes = ["MCQ", "MSQ", "NAT", "DESCRIPTIVE"] as const

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = []
  let current = ""
  let inQuotes = false
  const row: string[] = []

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      row.push(current.trim())
      current = ""
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++
      row.push(current.trim())
      rows.push([...row])
      row.length = 0
      current = ""
    } else {
      current += char
    }
  }

  if (current || row.length > 0) {
    row.push(current.trim())
    rows.push([...row])
  }

  return rows
}

export function parseMockQuestionCsv(
  text: string,
  createQuestionId: CreateQuestionId
): ParseMockQuestionCsvResult {
  const rows = parseCsvRows(text)

  if (rows.length < 2) {
    return { questions: [], errors: ["CSV file appears empty or has only headers."] }
  }

  const headers = rows[0].map((header) => header.toLowerCase().trim())
  const questionIndex = headers.indexOf("question")
  const typeIndex = headers.indexOf("type")
  const answerIndex = headers.indexOf("answer")
  const optionsIndex = headers.indexOf("options")
  const explanationIndex = headers.indexOf("explanation")
  const marksIndex = headers.indexOf("marks")

  const errors: string[] = []
  if (questionIndex === -1) errors.push("Missing required column: 'question'")
  if (typeIndex === -1) errors.push("Missing required column: 'type'")
  if (answerIndex === -1) errors.push("Missing required column: 'answer'")
  if (errors.length > 0) return { questions: [], errors }

  const questions: MockQuestion[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    if (row.every((cell) => !cell)) continue

    const questionText = row[questionIndex] ?? ""
    const typeRaw = (row[typeIndex] ?? "MCQ").toUpperCase().trim()
    const answer = row[answerIndex] ?? ""
    const optionsRaw = optionsIndex !== -1 ? row[optionsIndex] ?? "" : ""
    const explanation = explanationIndex !== -1 ? row[explanationIndex] ?? "" : ""
    const marks = marksIndex !== -1 ? parseInt(row[marksIndex] ?? "1") || 1 : 1

    if (!questionText) continue

    if (!validQuestionTypes.includes(typeRaw as MockQuestion["type"])) {
      errors.push(`Row ${i + 1}: Invalid type '${typeRaw}'. Use MCQ/MSQ/NAT/DESCRIPTIVE.`)
      continue
    }

    const parsedOptions = optionsRaw
      ? optionsRaw.split(";").map((option) => option.trim()).filter(Boolean)
      : []

    if ((typeRaw === "MCQ" || typeRaw === "MSQ") && parsedOptions.length < 2) {
      errors.push(`Row ${i + 1}: MCQ/MSQ requires at least 2 options separated by semicolons.`)
      continue
    }

    if (typeRaw === "NAT" && isNaN(parseFloat(answer))) {
      errors.push(`Row ${i + 1}: NAT answer must be a number.`)
      continue
    }

    questions.push({
      id: createQuestionId(i),
      question: questionText,
      type: typeRaw as MockQuestion["type"],
      options: parsedOptions,
      answer,
      explanation: explanation || undefined,
      marks,
    })
  }

  return { questions, errors }
}
