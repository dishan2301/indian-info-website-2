import React from "react"
import { type LucideIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type ContactInfoProps = {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

type ContactCardProps = React.ComponentProps<"div"> & {
  title?: string
  description?: string
  contactInfo?: ContactInfoProps[]
  formSectionClassName?: string
}

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our services or need help, please send us a message.",
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div className={cn("contact-card", className)} {...props}>
      <PlusIcon className="contact-card-corner contact-card-corner-tl" aria-hidden="true" />
      <PlusIcon className="contact-card-corner contact-card-corner-tr" aria-hidden="true" />
      <PlusIcon className="contact-card-corner contact-card-corner-bl" aria-hidden="true" />
      <PlusIcon className="contact-card-corner contact-card-corner-br" aria-hidden="true" />
      <div className="contact-card-copy">
        <div>
          <p className="contact-card-kicker">Indian Infotech · Ahmedabad</p>
          <h2>{title}</h2>
          <p className="contact-card-description">{description}</p>
          <div className="contact-card-info-grid">
            {contactInfo?.map((info) => (
              <ContactInfo key={`${info.label}-${info.value}`} {...info} />
            ))}
          </div>
        </div>
      </div>
      <div className={cn("contact-card-form-section", formSectionClassName)}>
        {children}
      </div>
    </div>
  )
}

function ContactInfo({ icon: Icon, label, value, href }: ContactInfoProps) {
  const content = <>
      <div className="contact-card-info-icon"><Icon aria-hidden="true" /></div>
      <div>
        <p>{label}</p>
        <span>{value}</span>
      </div>
    </>
  return href ? <a className="contact-card-info" href={href}>{content}</a> : <div className="contact-card-info">{content}</div>
}
