"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"];

export async function updateContactStatus(
  id: string,
  status: string
): Promise<{ success: boolean; message: string }> {
  if (!VALID_STATUSES.includes(status)) {
    return { success: false, message: "Invalid status value." };
  }
  try {
    await prisma.bookTrialRequest.update({
      where: { id },
      data: { status: status as "PENDING" | "CONTACTED" | "SCHEDULED" | "COMPLETED" | "CANCELLED" },
    });
    revalidatePath("/admin/contacts");
    revalidatePath("/admin/dashboard");
    return { success: true, message: `Status updated to ${status}.` };
  } catch {
    return { success: false, message: "Failed to update status." };
  }
}
