import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
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
    const { email, name } = await req.json()
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user is already on the waitlist
    const existingEntry = await getWaitlistEntryByEmail(email)
    if (existingEntry) {
      return NextResponse.json({ error: "You are already on the waitlist!" }, { status: 409 })
    }

    // Add to Notion
    await addWaitlistEntry({ email, name })

    // Send confirmation email via Nodemailer
    await sendWaitlistConfirmationEmail({ to: email, name })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
} 