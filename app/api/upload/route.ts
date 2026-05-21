import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Allow larger bodies for file uploads
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";
    const requestedResourceType =
      ((formData.get("resourceType") as string) || "auto") as
        | "image"
        | "raw"
        | "auto";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
    const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20 MB
    const maxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${isPdf ? "20 MB" : "10 MB"}. Your file is ${(file.size / 1024 / 1024).toFixed(1)} MB.`,
        },
        { status: 413 }
      );
    }

    // Determine the actual resource type
    const resourceType: "image" | "raw" | "auto" = isPdf
      ? "raw"
      : requestedResourceType;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      resource_type: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: resourceType,
            folder,
            ...(isPdf && { format: "pdf" }),
          },
          (err, result) => {
            if (err || !result)
              return reject(err ?? new Error("Cloudinary upload failed"));
            resolve(result as { secure_url: string; public_id: string; resource_type: string });
          }
        )
        .end(buffer);
    });

    // Cloudinary sometimes returns /image/upload/ for raw files — fix it
    let url = result.secure_url;
    if (resourceType === "raw" && url.includes("/image/upload/")) {
      url = url.replace("/image/upload/", "/raw/upload/");
    }

    return NextResponse.json({
      url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      fileName: file.name,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("[/api/upload]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
