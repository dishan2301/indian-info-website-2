import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { companyProfile } from "@/lib/company-profile"

const footerSections = [
  { title: "Explore", links: [["Platform", "/platform"], ["Products", "/products"], ["Compare products", "/compare"], ["Software", "/software"], ["HRMS & Payroll", "/hrms-payroll"], ["Solutions", "/solutions"], ["Industries", "/industries"], ["News & insights", "/insights"], ["About us", "/about-us"], ["Testimonials", "/testimonials"]] },
  { title: "Popular solutions", links: [["Biometric attendance", "/platform#workforce"], ["HRMS software", "/software/hrms-payroll"], ["Access control", "/platform#security"], ["Visitor management", "/software/visitor-management"], ["Entrance control", "/products/entrance-management"], ["Canteen management", "/software/canteen-management"]] },
  { title: "Technical", links: [["Technologies", "/technologies"], ["Engineering", "/engineering"], ["Integrations", "/integrations"], ["Resources", "/resources"], ["Knowledge Center", "/knowledge"], ["Tender resources", "/resources/procurement"], ["Support", "/support"], ["Developer resources", "/developers"], ["Trust center", "/trust"], ["Security reporting", "/trust/responsible-disclosure"], ["Academy", "/academy"]] },
] as const

const contactLinks = [
  { label: "Email us", href: "/contact?topic=email", icon: Mail, external: false },
  { label: companyProfile.phoneDisplay, href: companyProfile.phoneHref, icon: Phone, external: false },
  { label: `WhatsApp · ${companyProfile.whatsappDisplay}`, href: companyProfile.whatsappHref, icon: MessageCircle, external: true },
  { label: "LinkedIn", href: companyProfile.linkedInHref, icon: BriefcaseBusiness, external: true },
] as const

export default function Footer() {
  return <footer className="footer-v2"><div aria-hidden="true" className="footer-v2-orb" /><div className="footer-v2-shell">
    <div className="footer-v2-lead"><div><p className="footer-v2-kicker">Build around your facility</p><h2>Let&apos;s map the right system for your operation.</h2></div><Link href="/contact" className="footer-v2-cta">Talk to our team <ArrowUpRight aria-hidden="true" size={18} /></Link></div>
    <Separator className="footer-v2-separator" />
    <div className="footer-v2-main">
      <div className="footer-v2-brand"><Link href="/" aria-label="Indian Infotech home"><img src="/indian-infotech-logo.png" alt="Indian Infotech" className="footer-v2-logo" width="1200" height="199" /></Link><p className="footer-v2-blurb">Workforce and workplace technology for attendance, access, entrance, visitor, canteen, and HR operations—built in Ahmedabad.</p><div className="footer-v2-icons">{contactLinks.map(({ label, href, icon: Icon, ...link }) => <a key={label} href={href} aria-label={label} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} className="footer-v2-icon"><Icon aria-hidden="true" size={19} /></a>)}</div></div>
      {footerSections.map(({ title, links }) => <nav key={title} aria-label={title} className="footer-v2-nav"><h3>{title}</h3><ul>{links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
      <div className="footer-v2-contact"><h3>Contact &amp; office</h3><ul>{contactLinks.map(({ label, href, icon: Icon, ...link }) => <li key={label}><a href={href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}><Icon aria-hidden="true" size={16} /><span>{label}</span></a></li>)}<li><a href={companyProfile.mapsHref} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" size={16} /><address>429, 425, 403 Gala Empire<br />Opp. Doordarshan Kendra, Nilmani Society<br />Thaltej, Ahmedabad {companyProfile.address.postalCode}, {companyProfile.address.region}, {companyProfile.address.country}<span className="footer-v2-map-link">Open in Google Maps <ArrowUpRight aria-hidden="true" size={14} /></span></address></a></li></ul></div>
      <div className="footer-v2-map" role="region" aria-label="Indian Infotech office location"><iframe src="https://www.google.com/maps?q=Indian+Infotech,+429,+425,+403+Gala+Empire,+Opp.+Doordarshan+Kendra,+Nilmani+Society,+Thaltej,+Ahmedabad,+Gujarat+380054&z=17&output=embed" title="Google Map showing Indian Infotech at 429, 425, 403 Gala Empire, Opp. Doordarshan Kendra, Nilmani Society, Thaltej, Ahmedabad, Gujarat 380054" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
    </div>
    <Separator className="footer-v2-separator" />
    <div className="footer-v2-bottom"><span>© {new Date().getFullYear()} Indian Infotech. All rights reserved.</span><nav aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link></nav></div>
  </div></footer>
}
