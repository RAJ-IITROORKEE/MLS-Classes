"use server";

import { prisma } from "@/lib/db";
import { assertAdminApiAccess } from "@/lib/admin-auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  text: z.string().min(10, "Testimonial text must be at least 10 characters"),
  program: z.string().optional(),
  country: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  imagePublicId: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});

type TestimonialInput = z.infer<typeof testimonialSchema>;
type ActionResult = { success: boolean; message: string };

function revalidate() {
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  revalidatePath("/student-corner");
}

export async function createTestimonial(data: TestimonialInput): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/testimonials");
    const validated = testimonialSchema.parse(data);
    await prisma.testimonial.create({
      data: {
        name: validated.name,
        role: validated.role,
        rating: validated.rating,
        text: validated.text,
        program: validated.program ?? null,
        country: validated.country ?? null,
        imageUrl: validated.imageUrl || null,
        imagePublicId: validated.imagePublicId ?? null,
        isActive: validated.isActive,
        order: validated.order,
      },
    });
    revalidate();
    return { success: true, message: "Testimonial created successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to create testimonial." };
  }
}

export async function updateTestimonial(
  id: string,
  data: TestimonialInput,
  oldImagePublicId?: string | null
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/testimonials");
    const validated = testimonialSchema.parse(data);

    // If image was replaced, remove old one from Cloudinary
    if (
      oldImagePublicId &&
      validated.imagePublicId &&
      oldImagePublicId !== validated.imagePublicId
    ) {
      try {
        await deleteFromCloudinary(oldImagePublicId, "image");
      } catch {
        // Non-fatal — continue even if Cloudinary delete fails
      }
    }

    await prisma.testimonial.update({
      where: { id },
      data: {
        name: validated.name,
        role: validated.role,
        rating: validated.rating,
        text: validated.text,
        program: validated.program ?? null,
        country: validated.country ?? null,
        imageUrl: validated.imageUrl || null,
        imagePublicId: validated.imagePublicId ?? null,
        isActive: validated.isActive,
        order: validated.order,
      },
    });
    revalidate();
    return { success: true, message: "Testimonial updated successfully." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message ?? "Validation error" };
    }
    return { success: false, message: "Failed to update testimonial." };
  }
}

export async function deleteTestimonial(
  id: string,
  imagePublicId?: string | null
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/testimonials");
    if (imagePublicId) {
      try {
        await deleteFromCloudinary(imagePublicId, "image");
      } catch {
        // Non-fatal
      }
    }
    await prisma.testimonial.delete({ where: { id } });
    revalidate();
    return { success: true, message: "Testimonial deleted successfully." };
  } catch {
    return { success: false, message: "Failed to delete testimonial." };
  }
}

export async function toggleTestimonialStatus(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  try {
    await assertAdminApiAccess("/api/admin/testimonials");
    await prisma.testimonial.update({ where: { id }, data: { isActive } });
    revalidate();
    return {
      success: true,
      message: `Testimonial ${isActive ? "published" : "hidden"} successfully.`,
    };
  } catch {
    return { success: false, message: "Failed to update status." };
  }
}
