import { NextRequest, NextResponse } from "next/server"
import { addWaitlistEntry, getWaitlistEntryByEmail } from "@/lib/notion"
import { sendWaitlistConfirmationEmail } from "@/lib/email"
import { ratelimit } from "@/lib/rate-limit"

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
  }

  try {
    const { name, email } = await req.json()
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    const existingEntry = await getWaitlistEntryByEmail(email)
    if (existingEntry) {
      return NextResponse.json({ error: "You are already on the waitlist!" }, { status: 409 })
    }

    await addWaitlistEntry({ name, email })

    await sendWaitlistConfirmationEmail({ to: email, name })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 })
  }
} 