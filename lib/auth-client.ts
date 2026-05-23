import { createAuthClient } from "better-auth/react"

const getClientBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.trim().replace(/\/$/, "");
  }
  return "http://localhost:3000";
};

const baseURL = getClientBaseURL();

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient
