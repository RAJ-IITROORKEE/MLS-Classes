"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UploadedFile {
  url: string;
  publicId: string;
  resourceType?: string;
  fileName?: string;
}

type ShapeVariant = "circle" | "square" | "rectangle";

interface CloudinaryUploadProps {
  /** Currently uploaded file (controlled) */
  value?: UploadedFile | null;
  /** Called when a file is uploaded or removed */
  onChange: (value: UploadedFile | null) => void;
  /** Native accept attribute, e.g. "image/*" or "application/pdf,image/*" */
  accept?: string;
  /** Cloudinary destination folder */
  folder?: string;
  /** Cloudinary resource type hint */
  resourceType?: "image" | "raw" | "auto";
  /**
   * Layout shape:
   * - "circle"    → circular, 1:1 aspect ratio (profile photos)
   * - "square"    → square card  (general images)
   * - "rectangle" → 16:9 card    (achievement / banner images) [default]
   */
  shape?: ShapeVariant;
  /** Primary label shown in the empty state */
  label?: string;
  /** Secondary hint shown below the label */
  hint?: string;
  className?: string;
  disabled?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CloudinaryUpload({
  value,
  onChange,
  accept = "image/*",
  folder = "uploads",
  resourceType = "auto",
  shape = "rectangle",
  label = "Click to upload",
  hint,
  className,
  disabled = false,
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // ── Upload handler ───────────────────────────────────────────────────────
  async function handleFile(file: File) {
    setUploading(true);
    setProgress(0);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    fd.append("resourceType", resourceType);

    try {
      const uploaded = await new Promise<UploadedFile>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText) as {
              url?: string;
              publicId?: string;
              resourceType?: string;
              fileName?: string;
              error?: string;
            };
            if (data.error || !data.url || !data.publicId) {
              reject(new Error(data.error ?? "Invalid server response"));
            } else {
              resolve({
                url: data.url,
                publicId: data.publicId,
                resourceType: data.resourceType,
                fileName: data.fileName ?? file.name,
              });
            }
          } else {
            try {
              const data = JSON.parse(xhr.responseText) as { error?: string };
              reject(new Error(data.error ?? "Upload failed"));
            } catch {
              reject(new Error(`Upload failed (HTTP ${xhr.status})`));
            }
          }
        });

        xhr.addEventListener("error", () => reject(new Error("Network error")));
        xhr.open("POST", "/api/upload");
        xhr.send(fd);
      });

      onChange(uploaded);
      toast.success("Uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
      // Reset input so the same file can be re-selected if needed
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  // ── Derived state ────────────────────────────────────────────────────────
  const hasFile = Boolean(value);
  const isImageFile =
    value?.resourceType === "image" ||
    (!value?.resourceType &&
      !!value?.url &&
      !value.url.includes("/raw/upload/"));
  const isPdfFile =
    value?.resourceType === "raw" || value?.url?.includes("/raw/upload/");

  // ── Style helpers ────────────────────────────────────────────────────────
  const shapeClasses: Record<ShapeVariant, string> = {
    circle: "rounded-full aspect-square",
    square: "rounded-xl aspect-square",
    rectangle: "rounded-xl aspect-video",
  };

  const containerCn = cn(
    "relative overflow-hidden border-2 border-dashed transition-colors bg-muted/30",
    shapeClasses[shape],
    disabled
      ? "opacity-50 cursor-not-allowed"
      : !hasFile
        ? "cursor-pointer hover:border-primary/60 hover:bg-muted/60"
        : "border-border",
    className
  );

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={containerCn}
      onClick={
        !hasFile && !uploading && !disabled
          ? () => inputRef.current?.click()
          : undefined
      }
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      {/* ── Uploading state ───────────────────────────────────────────── */}
      {uploading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80 z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs font-medium text-muted-foreground">{progress}%</p>
          <div className="w-2/3 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Filled state ─────────────────────────────────────────────── */}
      {!uploading && hasFile && (
        <>
          {isImageFile && value?.url && (
            <Image
              src={value.url}
              alt="Uploaded file"
              fill
              sizes="400px"
              className="object-cover"
            />
          )}

          {isPdfFile && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
              <FileText className="h-10 w-10 text-primary/60" />
              <p className="text-xs text-muted-foreground text-center truncate max-w-full px-2">
                {value?.fileName ?? "PDF uploaded"}
              </p>
            </div>
          )}

          {/* Remove button */}
          {!disabled && (
            <button
              type="button"
              aria-label="Remove file"
              onClick={(e) => {
                e.stopPropagation();
                onChange(null);
              }}
              className="absolute top-2 right-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow hover:bg-destructive/80 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}

          {/* Hover-to-change overlay */}
          {!disabled && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10"
              onClick={() => inputRef.current?.click()}
            >
              <span className="text-white text-xs font-semibold">Change</span>
            </div>
          )}
        </>
      )}

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {!uploading && !hasFile && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4 text-center">
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {hint && (
            <span className="text-xs text-muted-foreground">{hint}</span>
          )}
        </div>
      )}
    </div>
  );
}
