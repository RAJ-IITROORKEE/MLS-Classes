import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"

export async function proxy(req: NextRequest) {
  const session = getSessionCookie(req)
  const { pathname } = req.nextUrl

  const isAdminAuthRoute = pathname.startsWith("/admin/login") || pathname.startsWith("/admin/sign-in")
  const isUserAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL(session ? "/admin/dashboard" : "/admin/login", req.url))
  }

  const isAdminProtectedRoute = pathname.startsWith("/admin") && !isAdminAuthRoute

  const isUserProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/profile") ||
    /^\/mocks\/[^/]+\/(?:start|attempt|attempts|result)(?:\/|$)/.test(pathname)

  if (isAdminProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/admin/login", req.url))
  }

  if (isUserProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  if (isAdminAuthRoute && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url))
  }

  if (isUserAuthRoute && session) {
    return NextResponse.redirect(new URL("/mocks", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
