import { z } from "zod";

export const bookTrialSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "WhatsApp number is required"),
  studentName: z.string().min(1, "Student name is required"),
  program: z.string().min(1, "Program or subject is required"),
  grade: z.string().min(1, "Grade or year is required"),
  timezone: z.string().min(1, "Please select a timezone"),
  message: z.string().optional(),
});

export type BookTrialFormData = z.infer<typeof bookTrialSchema>;
