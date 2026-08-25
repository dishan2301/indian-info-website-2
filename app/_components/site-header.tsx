import Image from 'next/image';
import Link from 'next/link';

const links = [
  { label: 'Platform', href: '/platform' },
  { label: 'Products', href: '/products' },
  { label: 'Software', href: '/software' },
  { label: 'Industries', href: '/industries/pharma' },
  { label: 'About', href: '/about' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Indian Infotech home">
        <Image
          src="/indian-infotech-logo.png"
          alt="Indian Infotech"
          width={1030}
          height={242}
          priority
        />
      </Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>

      <Link className="header-cta" href="/contact">Book a consultation</Link>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <div>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <Link href="/contact">Contact</Link>
        </div>
      </details>
    </header>
  );
}
