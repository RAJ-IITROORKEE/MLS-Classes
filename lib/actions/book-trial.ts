"use server";

import { prisma } from "@/lib/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { bookTrialSchema, type BookTrialFormData } from "@/lib/book-trial-validation";

export async function submitBookTrial(
  data: BookTrialFormData
): Promise<{ success: boolean; message: string }> {
  try {
    const validated = bookTrialSchema.parse(data);

    await prisma.bookTrialRequest.create({
      data: {
        email: validated.email,
        phone: validated.phone,
        studentName: validated.studentName,
        program: validated.program,
        grade: validated.grade,
        timezone: validated.timezone,
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
