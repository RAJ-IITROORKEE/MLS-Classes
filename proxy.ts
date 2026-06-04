import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export async function proxy(req: NextRequest) {
  const session = getSessionCookie(req)
  const { pathname } = req.nextUrl

  const isAdminSignInRoute = pathname.startsWith("/admin/sign-in")

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile")

  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || isAdminSignInRoute

  if (isProtectedRoute && !isAdminSignInRoute && !session) {
    return NextResponse.redirect(new URL("/admin/sign-in", req.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
