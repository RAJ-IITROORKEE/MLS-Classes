"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Edit2,
  Save,
  X,
  Loader2,
  User,
  Camera,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ProfileCardProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    createdAt: string
  }
  onProfileUpdate: (user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    createdAt: string
  }) => void
}

export function ProfileCard({ user, onProfileUpdate }: ProfileCardProps) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: user.name ?? "",
    image: user.image ?? "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function uploadImage(file: File) {
    setUploadingImage(true)
    try {
      const data = new FormData()
      data.append("file", file)
      data.append("folder", "avatars")
      data.append("resourceType", "image")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Upload failed")
      }

      const result = await res.json()
      return result.url as string
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed")
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    const url = await uploadImage(file)
    if (url) {
      setFormData((prev) => ({ ...prev, image: url }))
      toast.success("Image uploaded")
    } else {
      setPreviewUrl(null)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleRemoveImage() {
    setFormData((prev) => ({ ...prev, image: "" }))
    setPreviewUrl(null)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim() || undefined,
          image: formData.image.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to update")
      }

      const { user: updated } = await res.json()
      onProfileUpdate({
        id: updated.id,
        name: updated.name,
        email: updated.email,
        image: updated.image,
        role: updated.role,
        createdAt: updated.createdAt,
      })
      setEditing(false)
      setPreviewUrl(null)
      toast.success("Profile updated successfully")
      // Refresh so auth session and navbar pick up the new image
      window.location.reload()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user.name ?? "",
      image: user.image ?? "",
    })
    setPreviewUrl(null)
    setEditing(false)
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    }
    return user.email[0].toUpperCase()
  }

  const displayImage = previewUrl || formData.image || user.image

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <User className="h-4 w-4" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={displayImage ?? undefined}
                alt={user.name ?? "User"}
              />
              <AvatarFallback className="text-lg font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            {editing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                title="Change photo"
                disabled={uploadingImage}
              >
                {uploadingImage ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Camera className="h-3 w-3" />
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploadingImage}
            />
          </div>
          <div>
            <p className="font-semibold text-lg">{user.name ?? "User"}</p>
            <Badge
              variant={user.role === "ADMIN" ? "default" : "secondary"}
              className="mt-1"
            >
              {user.role}
            </Badge>
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Joined</p>
          <p className="font-medium">{joinedDate}</p>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="space-y-3 pt-3 border-t">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full name"
              />
            </div>

            {/* Image preview + remove in edit mode */}
            {displayImage && (
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={displayImage}
                    alt="Preview"
                    className="h-14 w-14 rounded-full object-cover border"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={handleRemoveImage}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {editing ? (
            <>
              <Button
                size="sm"
                className="flex-1"
                onClick={handleSave}
                disabled={saving || uploadingImage}
              >
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={saving || uploadingImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
