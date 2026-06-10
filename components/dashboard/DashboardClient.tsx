"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProfileCard } from "./ProfileCard"
import { MockPerformance } from "./MockPerformance"
import { QuickActions } from "./QuickActions"
import { RecentAttempts } from "./RecentAttempts"
import { BookTrialCTA } from "./BookTrialCTA"
import { TestimonialsSection } from "@/components/shared/testimonials-section"

interface DashboardClientProps {
  user: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    createdAt: string
  }
  stats: {
    averagePercentage: number
    attemptedMocks: number
    totalMocks: number
    lastAttemptDate: string | null
    totalCorrect: number
    totalQuestions: number
  }
  recentAttempts: Array<{
    id: string
    mockTestId: string
    mockTitle: string
    score: number
    totalQuestions: number
    percentage: number
    correctCount: number
    incorrectCount: number
    unansweredCount: number
    submittedAt: string | null
    timeTaken: number | null
  }>
  testimonials: Array<{
    id: string
    name: string
    role: string
    rating: number
    text: string
    imageUrl: string | null
  }>
}

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }
  return email?.[0]?.toUpperCase() ?? "U"
}

export function DashboardClient({
  user,
  stats,
  recentAttempts,
  testimonials,
}: DashboardClientProps) {
  const [profileData, setProfileData] = useState(user)

  const handleProfileUpdate = async (updatedUser: {
    id: string
    name: string | null
    email: string
    image: string | null
    role: string
    createdAt: string
  }) => {
    setProfileData(updatedUser)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center text-center">
          {/* Profile Avatar */}
          <Avatar className="h-20 w-20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background mb-4">
            <AvatarImage
              src={profileData.image ?? undefined}
              alt={profileData.name ?? "User"}
            />
            <AvatarFallback className="text-xl font-semibold">
              {getInitials(profileData.name, profileData.email)}
            </AvatarFallback>
          </Avatar>

          {/* Welcome text */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {profileData.name?.split(" ")[0] ?? "Student"}!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening with your learning journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Top Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfileCard user={profileData} onProfileUpdate={handleProfileUpdate} />
          <MockPerformance stats={stats} />
          <QuickActions />
        </div>

        {/* Recent Attempts */}
        {recentAttempts.length > 0 && (
          <RecentAttempts attempts={recentAttempts} />
        )}

        {/* Book Trial CTA */}
        <BookTrialCTA />

        {/* Testimonials */}
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </main>
  )
}
