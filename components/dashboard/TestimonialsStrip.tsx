"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialsStripProps {
  testimonials: Array<{
    id: string
    name: string
    role: string
    rating: number
    text: string
    imageUrl: string | null
  }>
}

export function TestimonialsStrip({ testimonials }: TestimonialsStripProps) {
  if (testimonials.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">What Our Students Say</h3>
        <p className="text-sm text-muted-foreground">
          Success stories from the MLS Classes community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <Card key={t.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted-foreground"
                    )}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-sm leading-relaxed italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={t.imageUrl ?? undefined} alt={t.name} />
                  <AvatarFallback className="text-xs font-semibold">
                    {t.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
