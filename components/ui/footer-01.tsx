import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import Logo from "@/components/ui/footer-01-utils/logo"
import { Separator } from "@/components/ui/separator"
import { companyProfile } from "@/lib/company-profile"

const footerSections = [
  {
    title: "Explore",
    links: [
      ["Platform", "/platform"],
      ["Products", "/products"],
      ["Compare products", "/compare"],
      ["Software", "/software"],
      ["HRMS & Payroll", "/hrms-payroll"],
      ["Solutions", "/solutions"],
      ["Industries", "/industries"],
      ["News & insights", "/insights"],
      ["About us", "/about-us"],
      ["Testimonials", "/testimonials"],
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
      ["Developers (coming soon)", "/developers"],
      ["Trust center", "/trust"],
      ["Academy", "/academy"],
    ],
  },
] as const

const contactLinks = [
  {
    label: companyProfile.email,
    href: `mailto:${companyProfile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: companyProfile.phoneDisplay,
    href: companyProfile.phoneHref,
    icon: Phone,
    external: false,
  },
  {
    label: `WhatsApp · ${companyProfile.whatsappDisplay}`,
    href: companyProfile.whatsappHref,
    icon: MessageCircle,
    external: true,
  },
] as const

export default function Footer() {
  return (
    <footer className="footer-v2">
      <div aria-hidden="true" className="footer-v2-orb" />
      <div className="footer-v2-shell">
        <div className="footer-v2-lead">
          <div>
            <p className="footer-v2-kicker">
              Build around your facility
            </p>
            <h2>
              Let&apos;s map the right system for your operation.
            </h2>
          </div>
          <Link
            href="/contact"
            className="footer-v2-cta"
          >
            Talk to our team <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </div>

        <Separator className="footer-v2-separator" />

        <div className="footer-v2-main">
          <div className="footer-v2-brand">
            <Link href="/" aria-label="Indian Infotech home">
              <Logo />
            </Link>
            <p className="footer-v2-blurb">
              Workforce and workplace technology for attendance, access,
              entrance, visitor, canteen, and HR operations—built in Ahmedabad.
            </p>
            <div className="footer-v2-icons">
              {contactLinks.map(({ label, href, icon: Icon, ...link }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="footer-v2-icon"
                >
                  <Icon aria-hidden="true" size={19} />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <nav key={title} aria-label={title} className="footer-v2-nav">
              <h3>
                {title}
              </h3>
              <ul>
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-v2-contact">
            <h3>
              Contact &amp; office
            </h3>
            <ul>
              {contactLinks.map(({ label, href, icon: Icon, ...link }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                  >
                    <Icon aria-hidden="true" size={16} />
                    <span>{label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://maps.app.goo.gl/77cgnPHz1p1tyUyb6"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MapPin aria-hidden="true" size={16} />
                  <address>
                    429, 425, 403 Gala Empire<br />
                    Opp. Doordarshan Kendra, Thaltej<br />
                    {companyProfile.address.locality} {companyProfile.address.postalCode}, {companyProfile.address.region}, {companyProfile.address.country}
                    <span className="footer-v2-map-link">
                      Open in Google Maps <ArrowUpRight aria-hidden="true" size={14} />
                    </span>
                  </address>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="footer-v2-separator" />

        <div className="footer-v2-bottom">
          <span>© {new Date().getFullYear()} Indian Infotech. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
