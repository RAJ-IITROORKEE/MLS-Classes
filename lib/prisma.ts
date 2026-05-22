// Re-exports the shared Prisma singleton to avoid duplicate client instances.
// Existing actions use lib/db.ts — both point to the same instance.
export { prisma } from "@/lib/db"
