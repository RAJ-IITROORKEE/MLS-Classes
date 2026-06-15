"use server";

import { prisma } from "@/lib/db";
import { assertAdminApiAccess } from "@/lib/admin-auth";
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
    await assertAdminApiAccess("/api/admin/contacts");
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

export async function deleteContact(
  id: string
): Promise<{ success: boolean; message: string }> {
  try {
    await assertAdminApiAccess("/api/admin/contacts");
    await prisma.bookTrialRequest.delete({
      where: { id },
    });
    revalidatePath("/admin/contacts");
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Trial request deleted successfully." };
  } catch {
    return { success: false, message: "Failed to delete trial request." };
  }
}
