import type { Session, User } from "@/lib/auth"

declare module "better-auth" {
  interface UserAdditionalFields {
    // Add future fields here e.g.:
    // role?: "student" | "admin" | "instructor"
    // enrolledPrograms?: string[]
  }
}

export type { Session, User }
