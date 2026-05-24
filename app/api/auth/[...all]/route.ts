import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextRequest, NextResponse } from "next/server"

const handler = toNextJsHandler(auth)

export async function GET(req: NextRequest) {
  try {
    console.log("🔍 [AUTH DEBUG] GET request to:", req.nextUrl.pathname)
    console.log("🔍 [AUTH DEBUG] Origin:", req.headers.get("origin"))
    console.log("🔍 [AUTH DEBUG] Host:", req.headers.get("host"))
    return await handler.GET(req)
  } catch (error: any) {
    console.error("❌ [BETTER-AUTH GET ERROR]:", error)
    console.error("❌ [ERROR DETAILS]:", error?.message, error?.stack)
    console.error("❌ [ERROR CAUSE]:", error?.cause)
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("🔍 [AUTH DEBUG] POST request to:", req.nextUrl.pathname)
    console.log("🔍 [AUTH DEBUG] Origin:", req.headers.get("origin"))
    console.log("🔍 [AUTH DEBUG] Host:", req.headers.get("host"))
    return await handler.POST(req)
  } catch (error: any) {
    console.error("❌ [BETTER-AUTH POST ERROR]:", error)
    console.error("❌ [ERROR DETAILS]:", error?.message, error?.stack)
    console.error("❌ [ERROR CAUSE]:", error?.cause)
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
