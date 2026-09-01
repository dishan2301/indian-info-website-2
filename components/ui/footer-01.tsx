import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import Logo from "@/components/ui/footer-01-utils/logo"
import { Separator } from "@/components/ui/separator"

const footerSections = [
  {
    title: "Explore",
    links: [
      ["Platform", "/platform"],
      ["Products", "/products"],
      ["Software", "/software"],
      ["HRMS & Payroll", "/hrms-payroll"],
      ["Solutions", "/solutions"],
      ["Industries", "/industries"],
      ["News & insights", "/insights"],
      ["About us", "/about-us"],
    ],
  },
  {
    title: "Popular solutions",
    links: [
      ["Biometric attendance", "/biometric-attendance-system"],
      ["HRMS software", "/hrms-software"],
      ["Access control", "/access-control-system"],
      ["Visitor management", "/visitor-management-system"],
      ["Entrance control", "/entrance-control-system"],
      ["Canteen management", "/canteen-management-system"],
    ],
  },
  {
    title: "Technical",
    links: [
      ["Technologies", "/technologies"],
      ["Engineering", "/engineering"],
      ["Integrations", "/integrations"],
      ["Resources", "/resources"],
      ["Support", "/support"],
      ["Developers", "/developers"],
      ["Trust center", "/trust"],
      ["Academy", "/academy"],
      ["System status", "/status"],
    ],
  },
] as const

const contactLinks = [
  {
    label: "sales@indianinfotech.org",
    href: "mailto:sales@indianinfotech.org",
    icon: Mail,
    external: false,
  },
  {
    label: "+91 76000 66770",
    href: "tel:+917600066770",
    icon: Phone,
    external: false,
  },
  {
    label: "WhatsApp · +91 77780 66770",
    href: "https://wa.me/917778066770",
    icon: MessageCircle,
    external: true,
  },
] as const

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-[#13acf4]/20 bg-[linear-gradient(145deg,#f7fbfd_0%,#eef9ff_52%,#f4faea_100%)] text-[#17344a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-[#9ecf09]/25 bg-[#13acf4]/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-[7.5rem]">
        <div className="flex flex-col items-start justify-between gap-8 py-12 md:flex-row md:items-end lg:py-16">
          <div>
            <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#628800]">
              Build around your facility
            </p>
            <h2 className="max-w-[19ch] text-balance text-3xl font-semibold tracking-[-0.045em] text-[#073e61] sm:text-4xl lg:text-5xl">
              Let&apos;s map the right system for your operation.
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#073e61] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(7,62,97,.18)] transition hover:-translate-y-0.5 hover:bg-[#0877a8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#13acf4]"
          >
            Talk to our team <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>

        <Separator />

        <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <Link href="/" aria-label="Indian Infotech home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#53675d]">
              Workforce and workplace technology for attendance, access,
              entrance, visitor, canteen, and HR operations—built in Ahmedabad.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {contactLinks.map(({ label, href, icon: Icon, ...link }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#13acf4]/25 bg-white/75 text-[#0877a8] shadow-sm transition hover:-translate-y-0.5 hover:border-[#9ecf09] hover:text-[#518000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13acf4]"
                >
                  <Icon aria-hidden="true" size={19} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="lg:col-span-2">
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#073e61]">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm leading-6 text-[#53675d] transition-colors hover:text-[#0877a8] focus-visible:text-[#0877a8]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#073e61]">
              Contact &amp; office
            </h3>
            <ul className="space-y-4">
              {contactLinks.map(({ label, href, icon: Icon, ...link }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="group flex items-start gap-3 text-sm leading-6 text-[#53675d] transition-colors hover:text-[#0877a8]"
                  >
                    <Icon aria-hidden="true" className="mt-1 shrink-0 text-[#628800]" size={16} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://maps.app.goo.gl/77cgnPHz1p1tyUyb6"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 text-sm leading-6 text-[#53675d] transition-colors hover:text-[#0877a8]"
                >
                  <MapPin aria-hidden="true" className="mt-1 shrink-0 text-[#628800]" size={16} />
                  <address className="not-italic">
                    429, 425, 403 Gala Empire<br />
                    Opp. Doordarshan Kendra, Thaltej<br />
                    Ahmedabad 380054, Gujarat, India
                    <span className="mt-1 flex items-center gap-1 font-semibold text-[#0877a8]">
                      Open in Google Maps <ArrowUpRight aria-hidden="true" size={14} />
                    </span>
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 py-6 text-xs text-[#627078] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Indian Infotech. All rights reserved.</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-[#0877a8]">Privacy</Link>
            <Link href="/cookies" className="hover:text-[#0877a8]">Cookies</Link>
            <Link href="/terms" className="hover:text-[#0877a8]">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
