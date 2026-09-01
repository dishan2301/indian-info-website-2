"use client"

import { FormEvent, useState } from "react"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type EnquiryBriefProps = { initialContext?: string }

export function EnquiryBrief({ initialContext = "" }: EnquiryBriefProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [message, setMessage] = useState("")

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus("sending")
    setMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = await response.json() as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to send your message.")
      form.reset()
      setStatus("sent")
      setMessage("Thank you. Your message has been sent to our team.")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Unable to send your message. Please try again.")
    }
  }

  return (
    <ContactCard
      title="Get in touch"
      description="Tell us what you need for attendance, access control, entrance management, HRMS, payroll, or workplace operations. We usually respond within one business day."
      contactInfo={[
        { icon: MailIcon, label: "Email", value: "sales@indianinfotech.org" },
        { icon: PhoneIcon, label: "Phone", value: "+91 76000 66770" },
        { icon: MapPinIcon, label: "Head office", value: "Gala Empire, Thaltej, Ahmedabad" },
      ]}
    >
      <form className="contact-form" onSubmit={submitBrief}>
        <div className="contact-form-field">
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" autoComplete="name" maxLength={100} required />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} required />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-organization">Organization</Label>
          <Input id="contact-organization" name="organization" autoComplete="organization" maxLength={120} />
        </div>
        <div className="contact-form-field">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea id="contact-message" name="message" rows={6} maxLength={2000} required />
        </div>
        <input type="hidden" name="context" value={initialContext} />
        <div className="contact-honeypot" aria-hidden="true">
          <Label htmlFor="contact-website">Leave this field empty</Label>
          <Input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="contact-form-consent">
          <input type="checkbox" required />
          <span>I agree to send these details to Indian Infotech for a response.</span>
        </label>
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p className={`contact-form-status contact-form-status-${status}`} role="status" aria-live="polite">
          {message}
        </p>
      </form>
    </ContactCard>
  )
}
