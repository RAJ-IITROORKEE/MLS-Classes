import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export async function proxy(req: NextRequest) {
  const session = getSessionCookie(req)
  const { pathname } = req.nextUrl

  const isAdminAuthRoute = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/sign-in")

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL(session ? "/admin/dashboard" : "/admin/login", req.url))
  }

  const isProtectedRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile")

  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || isAdminAuthRoute

  if (isProtectedRoute && !isAdminAuthRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
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
