"use client"

import { FormEvent, useState } from "react"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { validateContactSubmission } from "@/lib/security.mjs"
import { companyProfile } from "@/lib/company-profile"

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
      const values = Object.fromEntries(new FormData(form))
      const validation = validateContactSubmission(values)
      if (validation.spam) return
      if (!validation.valid) throw new Error(validation.errors[0])

      const response = await fetch("https://formsubmit.co/ajax/chaudharydishan90@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: validation.data.name,
          email: validation.data.email,
          phone: validation.data.phone,
          organization: validation.data.organization || "Not provided",
          message: validation.data.message,
          context: validation.data.context || "Direct contact page enquiry",
          _subject: `Indian Infotech website enquiry from ${validation.data.name}`,
          _template: "table",
          _captcha: "false",
          _url: window.location.href.split("?")[0],
        }),
      })
      const result = await response.json() as { success?: string | boolean; message?: string }
      if (/needs activation/iu.test(result.message || "")) {
        form.reset()
        setStatus("sent")
        setMessage("We sent a one-time activation email to the site owner. Click the newest activation link, then submit again.")
        return
      }
      if (!response.ok || result.success === false || result.success === "false") throw new Error("Email delivery is temporarily unavailable. Please try again.")
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
        { icon: MailIcon, label: "Email", value: companyProfile.email },
        { icon: PhoneIcon, label: "Phone", value: companyProfile.phoneDisplay },
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
