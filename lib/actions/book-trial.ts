"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const bookTrialSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "WhatsApp number is required"),
  studentName: z.string().min(1, "Student name is required"),
  program: z.string().min(1, "Please select a program"),
  grade: z.string().min(1, "Please select a grade"),
  timezone: z.string().min(1, "Please select a timezone"),
  availability: z.string().min(1, "Please indicate your availability"),
  message: z.string().optional(),
});

export type BookTrialFormData = z.infer<typeof bookTrialSchema>;

export async function submitBookTrial(
  data: BookTrialFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const validated = bookTrialSchema.parse(data);

    await prisma.bookTrialRequest.create({
      data: {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email,
        phone: validated.phone,
        studentName: validated.studentName,
        program: validated.program,
        grade: validated.grade,
        timezone: validated.timezone,
        availability: validated.availability,
        message: validated.message ?? null,
        status: "PENDING",
      },
    });

    revalidatePath("/admin/contacts");

    return {
      success: true,
      message:
        "Your trial booking request has been submitted! We'll contact you within 24 hours to confirm your session.",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0]?.message ?? "Validation error",
      };
    }
    console.error("Book trial error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
