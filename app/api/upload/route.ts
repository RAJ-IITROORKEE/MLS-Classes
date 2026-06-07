import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Allow larger bodies for file uploads
export const maxDuration = 60;

const MB = 1024 * 1024;

function formatFileSize(bytes: number) {
  if (bytes >= MB) return `${(bytes / MB).toFixed(bytes % MB === 0 ? 0 : 1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

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
    const requestedMaxSizeMb = Number(formData.get("maxSizeMb"));

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (requestedResourceType === "image" && !file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed for this upload." },
        { status: 400 }
      );
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    const MAX_IMAGE_SIZE = 10 * MB;
    const MAX_PDF_SIZE = 20 * MB;
    const defaultMaxSize = isPdf ? MAX_PDF_SIZE : MAX_IMAGE_SIZE;
    const requestedMaxSize = Number.isFinite(requestedMaxSizeMb) && requestedMaxSizeMb > 0
      ? requestedMaxSizeMb * MB
      : undefined;
    const maxSize = requestedMaxSize ? Math.min(requestedMaxSize, defaultMaxSize) : defaultMaxSize;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is ${formatFileSize(maxSize)}. Your file is ${formatFileSize(file.size)}.`,
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
