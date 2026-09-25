import Link from "next/link"
import { BriefcaseBusiness, Mail, MessageCircle, Phone } from "lucide-react"

import Logo from "@/components/ui/footer-01-utils/logo"
import { companyProfile } from "@/lib/company-profile"

const columns = [
  { title: "Products", links: [["All products", "/products"], ["Attendance devices", "/products/attendance"], ["Access control devices", "/products/access-control"], ["Entrance management", "/products/entrance-management"], ["Compare products", "/compare"]] },
  { title: "Solutions", links: [["All solutions", "/solutions"], ["Attendance automation", "/platform#workforce"], ["Access control", "/platform#security"], ["Visitor operations", "/software/visitor-management"], ["Canteen operations", "/software/canteen-management"]] },
  { title: "Software", links: [["All software", "/software"], ["Easytime Online", "/software/easytime-online"], ["HRMS & Payroll", "/software/hrms-payroll"], ["Visitor Management", "/software/visitor-management"], ["Canteen Management", "/software/canteen-management"]] },
  { title: "Company", links: [["About us", "/about-us"], ["Partners", "/partners"], ["Case studies", "/case-studies"], ["Testimonials", "/testimonials"], ["Insights", "/insights"]] },
  { title: "Resources", links: [["Support", "/support"], ["Resources", "/resources"], ["Knowledge Center", "/knowledge"], ["Engineering", "/engineering"], ["Contact Us", "/contact"]] },
] as const

const socials = [
  { label: "Email", href: "/contact?topic=email", icon: Mail },
  { label: "Phone", href: companyProfile.phoneHref, icon: Phone },
  { label: "WhatsApp", href: companyProfile.whatsappHref, icon: MessageCircle },
  { label: "LinkedIn", href: companyProfile.linkedInHref, icon: BriefcaseBusiness },
]

export default function FooterBlock() {
  return (
    <footer className="footer-v4">
      <div className="footer-v4-shell">
        <div className="footer-v4-cta">
          <div><span>Have a requirement?</span><strong>Let&apos;s build the right system for your operation.</strong></div>
          <Link href="/contact">Talk to our team <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-v4-grid">
          <div className="footer-v4-brand">
            <Link href="/" aria-label="Indian Infotech home"><Logo /></Link>
            <p>Workforce and workplace technology for attendance, access, entrance, visitor, canteen, and HR operations—built in Ahmedabad.</p>
            <div className="footer-v4-socials">
              {socials.map(({ label, href, icon: Icon }) => <a key={label} href={href} aria-label={label} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}><Icon size={17} /></a>)}
            </div>
          </div>
          {columns.map((column) => <nav key={column.title} aria-label={column.title}><h3>{column.title}</h3><ul>{column.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}
        </div>
        <div className="footer-v4-divider" />
        <div className="footer-v4-bottom"><span>© {new Date().getFullYear()} Indian Infotech. All rights reserved.</span><nav aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/cookies">Cookies</Link><Link href="/terms">Terms</Link></nav></div>
      </div>
    </footer>
  )
}
