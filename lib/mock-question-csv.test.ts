import assert from "node:assert/strict"
import { parseMockQuestionCsv } from "./mock-question-csv"

const csv = `question,type,answer,options,explanation,marks
"What is 2+2?",MCQ,4,"3;4;5;6","Because 2 plus 2 equals 4.",1
"Select prime numbers",MSQ,"2;3","2;3;4","Prime numbers are divisible only by 1 and themselves.",2`

const result = parseMockQuestionCsv(csv, (index) => `question-${index}`)

assert.deepEqual(result.errors, [])
assert.equal(result.questions.length, 2)
assert.equal(result.questions[0].id, "question-1")
assert.equal(result.questions[0].explanation, "Because 2 plus 2 equals 4.")
assert.equal(result.questions[1].explanation, "Prime numbers are divisible only by 1 and themselves.")
assert.deepEqual(result.questions[1].options, ["2", "3", "4"])
