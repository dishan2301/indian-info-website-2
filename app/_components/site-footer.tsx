import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <div>
          <p className="section-kicker light">Build around your facility</p>
          <h2>Let’s map the right system for your operation.</h2>
        </div>
        <Link className="button button-primary" href="/contact">
          Talk to our team <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={1030} height={242} />
          <p>Workforce and workplace technology from Ahmedabad, Gujarat.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/platform">Platform</Link>
          <Link href="/products">Products</Link>
          <Link href="/software">Software</Link>
          <Link href="/hrms-payroll">HRMS & Payroll</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/industries">Industries</Link>
        </div>
        <div>
          <h3>Technical</h3>
          <Link href="/technologies">Technologies</Link>
          <Link href="/engineering">Engineering</Link>
          <Link href="/integrations">Integrations</Link>
          <Link href="/compare">Compare products</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/support">Support</Link>
          <Link href="/about">Company</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:sales@indianinfotech.org">sales@indianinfotech.org</a>
          <a href="tel:+917600066770">+91 76000 66770</a>
          <a href="https://wa.me/917778066770">WhatsApp</a>
        </div>
        <div>
          <h3>Office</h3>
          <address>
            429, 425, 403 Gala Empire<br />
            Opp. Doordarshan Kendra, Thaltej<br />
            Ahmedabad 380054, Gujarat, India
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Indian Infotech. All rights reserved.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}
