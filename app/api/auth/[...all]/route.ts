import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
import { NextRequest, NextResponse } from "next/server"

const handler = toNextJsHandler(auth)

export async function GET(req: NextRequest) {
  try {
    return await handler.GET(req)
  } catch (error: any) {
    console.error("❌ [BETTER-AUTH GET ERROR]:", error)
    console.error("❌ [ERROR DETAILS]:", error?.message, error?.stack)
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handler.POST(req)
  } catch (error: any) {
    console.error("❌ [BETTER-AUTH POST ERROR]:", error)
    console.error("❌ [ERROR DETAILS]:", error?.message, error?.stack)
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
