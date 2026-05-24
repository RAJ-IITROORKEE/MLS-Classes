import { betterAuth } from "better-auth"
import { prismaAdapter } from "@better-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

const cleanBaseURL = (url: string) => {
  let cleaned = url.trim().replace(/\/$/, "");
  if (cleaned.endsWith("/api/auth")) {
    cleaned = cleaned.replace(/\/api\/auth$/, "");
  }
  return cleaned;
};

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) {
    return cleanBaseURL(process.env.BETTER_AUTH_URL);
  }
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return cleanBaseURL(process.env.NEXT_PUBLIC_APP_URL);
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.trim()}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.trim()}`;
  }
  return "http://localhost:3000";
};

// Validate required environment variables
if (typeof window === "undefined") {
  if (!process.env.BETTER_AUTH_SECRET) {
    console.error("❌ [BETTER-AUTH] CRITICAL: BETTER_AUTH_SECRET is missing! Set it in your environment variables.")
  }
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error("❌ [BETTER-AUTH] CRITICAL: Google OAuth credentials are missing! Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.")
  }
  console.log("✅ [BETTER-AUTH] baseURL:", getBaseURL())
  console.log("✅ [BETTER-AUTH] trustedOrigins:", [
    "http://localhost:3000",
    "https://mls-classes.vercel.app",
    getBaseURL(),
  ])
}

const baseURL = getBaseURL();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  baseURL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://mls-classes.vercel.app",
    baseURL,
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: (process.env.GOOGLE_CLIENT_ID ?? "").trim(),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET ?? "").trim(),
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24,       // refresh session daily
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,              // client cache 5 mins
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        input: false, // not settable by user directly
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session["user"]
