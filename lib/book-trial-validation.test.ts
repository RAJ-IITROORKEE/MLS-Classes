import assert from "node:assert/strict";
import { bookTrialSchema } from "./book-trial-validation";

const validPayload = {
  email: "parent@example.com",
  phone: "+1 555 000 0000",
  studentName: "Aarav Sharma",
  program: "SAT Math",
  grade: "Grade 10",
  timezone: "UTC+05:30 (India)",
  message: "Needs help with algebra.",
};

assert.equal(bookTrialSchema.safeParse(validPayload).success, true);

assert.equal(
  bookTrialSchema.safeParse({
    ...validPayload,
    firstName: "Parent",
    lastName: "Name",
    availability: "Weekend evenings",
  }).success,
  true,
  "legacy extra fields should not be required by the new payload"
);

const missingProgram = bookTrialSchema.safeParse({ ...validPayload, program: "" });
assert.equal(missingProgram.success, false);
assert.equal(missingProgram.error.issues[0]?.message, "Program or subject is required");

const missingGrade = bookTrialSchema.safeParse({ ...validPayload, grade: "" });
assert.equal(missingGrade.success, false);
assert.equal(missingGrade.error.issues[0]?.message, "Grade or year is required");

const missingTimezone = bookTrialSchema.safeParse({ ...validPayload, timezone: "" });
assert.equal(missingTimezone.success, false);
assert.equal(missingTimezone.error.issues[0]?.message, "Please select a timezone");
