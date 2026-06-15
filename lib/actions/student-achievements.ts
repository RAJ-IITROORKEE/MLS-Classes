"use server";

import { prisma } from "@/lib/db";
import { assertAdminApiAccess } from "@/lib/admin-auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const achievementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("A valid image URL is required"),
  imagePublicId: z.string().min(1, "Image public ID is required"),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});

type AchievementInput = z.infer<typeof achievementSchema>;
type ActionResult = { success: boolean; message: string };

function revalidate() {
  revalidatePath("/admin/student-corner");
  revalidatePath("/student-corner");
}

export async function createAchievement(data: AchievementInput): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/student-corner");
    const validated = achievementSchema.parse(data);
    await prisma.studentAchievement.create({ data: validated });
    revalidate();
    return { success: true, message: "Achievement created successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to create achievement." };
  }
}

export async function updateAchievement(
  id: string,
  data: AchievementInput,
  oldImagePublicId?: string | null
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/student-corner");
    const validated = achievementSchema.parse(data);

    if (
      oldImagePublicId &&
      validated.imagePublicId !== oldImagePublicId
    ) {
      try {
        await deleteFromCloudinary(oldImagePublicId, "image");
      } catch {
        // Non-fatal
      }
    }

    await prisma.studentAchievement.update({ where: { id }, data: validated });
    revalidate();
    return { success: true, message: "Achievement updated successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to update achievement." };
  }
}

export async function deleteAchievement(
  id: string,
  imagePublicId?: string | null
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/student-corner");
    if (imagePublicId) {
      try {
        await deleteFromCloudinary(imagePublicId, "image");
      } catch {
        // Non-fatal
      }
    }
    await prisma.studentAchievement.delete({ where: { id } });
    revalidate();
    return { success: true, message: "Achievement deleted successfully." };
  } catch {
    return { success: false, message: "Failed to delete achievement." };
  }
}

export async function toggleAchievementStatus(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/student-corner");
    await prisma.studentAchievement.update({ where: { id }, data: { isActive } });
    revalidate();
    return {
      success: true,
      message: `Achievement ${isActive ? "published" : "hidden"} successfully.`,
    };
  } catch {
    return { success: false, message: "Failed to update status." };
  }
}
