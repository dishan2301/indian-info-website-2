import { NextResponse } from "next/server"

import { validateContactSubmission } from "@/lib/security.mjs"

const CONTACT_DESTINATION = "chaudharydishan90@gmail.com"
const CONTACT_PAGE = "https://indian-info-website-2.vercel.app/contact"

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0)
  if (contentLength > 12_000) {
    return NextResponse.json({ ok: false, error: "Message is too large." }, { status: 413 })
  }

  let values: unknown
  try {
    values = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 })
  }

  if (!values || typeof values !== "object" || Array.isArray(values)) {
    return NextResponse.json({ ok: false, error: "Invalid form submission." }, { status: 400 })
  }

  const result = validateContactSubmission(values)
  if (result.spam) return NextResponse.json({ ok: true })
  if (!result.valid) {
    return NextResponse.json({ ok: false, error: result.errors[0] }, { status: 400 })
  }

  try {
    const delivery = await fetch(`https://formsubmit.co/ajax/${CONTACT_DESTINATION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://indian-info-website-2.vercel.app",
        Referer: CONTACT_PAGE,
      },
      body: JSON.stringify({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone,
        organization: result.data.organization || "Not provided",
        message: result.data.message,
        context: result.data.context || "Direct contact page enquiry",
        _subject: `Indian Infotech website enquiry from ${result.data.name}`,
        _template: "table",
        _captcha: "false",
        _url: CONTACT_PAGE,
      }),
    })
    const responseText = await delivery.text()
    let deliveryResult: { success?: string | boolean; message?: string } = {}
    try {
      deliveryResult = JSON.parse(responseText) as typeof deliveryResult
    } catch {
      deliveryResult.message = responseText
    }
    if (/needs activation/iu.test(deliveryResult.message || responseText)) {
      return NextResponse.json({ ok: false, error: "Email delivery is awaiting owner activation. Please try again shortly." }, { status: 503 })
    }
    if (!delivery.ok || deliveryResult.success === false || deliveryResult.success === "false") throw new Error("Delivery rejected")
  } catch {
    return NextResponse.json({ ok: false, error: "Email delivery is temporarily unavailable. Please try again." }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
