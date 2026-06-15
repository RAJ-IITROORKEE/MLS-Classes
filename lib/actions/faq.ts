"use server";

import { prisma } from "@/lib/db";
import { assertAdminApiAccess } from "@/lib/admin-auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  order: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

type FAQResult = { success: boolean; message: string };

export async function createFAQ(data: z.infer<typeof faqSchema>): Promise<FAQResult> {
  try {
    await assertAdminApiAccess("/api/admin/faq");
    const validated = faqSchema.parse(data);
    await prisma.fAQ.create({ data: validated });
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true, message: "FAQ created successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to create FAQ." };
  }
}

export async function updateFAQ(
  id: string,
  data: z.infer<typeof faqSchema>
): Promise<FAQResult> {
  try {
    await assertAdminApiAccess("/api/admin/faq");
    const validated = faqSchema.parse(data);
    await prisma.fAQ.update({ where: { id }, data: validated });
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true, message: "FAQ updated successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to update FAQ." };
  }
}

export async function deleteFAQ(id: string): Promise<FAQResult> {
  try {
    await assertAdminApiAccess("/api/admin/faq");
    await prisma.fAQ.delete({ where: { id } });
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return { success: true, message: "FAQ deleted successfully." };
  } catch {
    return { success: false, message: "Failed to delete FAQ." };
  }
}

export async function toggleFAQStatus(
  id: string,
  isActive: boolean
): Promise<FAQResult> {
  try {
    await assertAdminApiAccess("/api/admin/faq");
    await prisma.fAQ.update({ where: { id }, data: { isActive } });
    revalidatePath("/admin/faq");
    revalidatePath("/");
    return {
      success: true,
      message: `FAQ ${isActive ? "published" : "hidden"} successfully.`,
    };
  } catch {
    return { success: false, message: "Failed to update FAQ status." };
  }
}
