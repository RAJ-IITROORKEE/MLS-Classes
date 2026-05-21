import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  original_filename: string;
};

/**
 * Upload a file (image or PDF) to Cloudinary from a server context.
 * @param file - Buffer, base64 data URI, or remote URL
 * @param folder - Destination folder in Cloudinary (e.g. "blogs", "resources")
 * @param resourceType - "image" | "raw" (use "raw" for PDFs)
 */
export async function uploadToCloudinary(
  file: string,
  folder: string,
  resourceType: "image" | "raw" | "auto" = "auto"
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: resourceType,
  });

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    format: result.format,
    resource_type: result.resource_type,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    original_filename: result.original_filename,
  };
}

/**
 * Delete a file from Cloudinary by its public_id.
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

export default cloudinary;
