import Image from 'next/image';
import Link from 'next/link';

const productGroups = [
  { title: 'Biometric & attendance', links: [{ label: 'Face recognition devices', href: '/products#attendance' }, { label: 'Fingerprint devices', href: '/products#access-control' }, { label: 'All attendance devices', href: '/products#attendance' }] },
  { title: 'Access control', links: [{ label: 'Access control terminals', href: '/products#access-control' }, { label: 'Flap barriers', href: '/products#entrance-management' }, { label: 'Turnstiles & screening', href: '/products#entrance-management' }] },
  { title: 'Product tools', links: [{ label: 'All products', href: '/products' }, { label: 'Compare products', href: '/compare' }, { label: 'Product guidance', href: '/resources' }] },
] as const;

const softwareGroups = [
  { title: 'Workforce', links: [{ label: 'Easytime Online', href: '/software/easytime-online' }, { label: 'HRMS & Payroll', href: '/software/hrms-payroll' }] },
  { title: 'Workplace', links: [{ label: 'Visitor Management', href: '/software/visitor-management' }, { label: 'Canteen Management', href: '/software/canteen-management' }, { label: 'All software', href: '/software' }] },
] as const;

const solutionGroups = [
  { title: 'Workforce operations', links: [{ label: 'Attendance automation', href: '/platform#workforce' }, { label: 'HR & payroll workflows', href: '/software/hrms-payroll' }, { label: 'Multi-site planning', href: '/contact' }] },
  { title: 'Physical access', links: [{ label: 'Access control', href: '/platform#security' }, { label: 'Entrance management', href: '/products#entrance-management' }, { label: 'Visitor security', href: '/software/visitor-management' }] },
  { title: 'Workplace services', links: [{ label: 'Visitor operations', href: '/software/visitor-management' }, { label: 'Canteen operations', href: '/software/canteen-management' }, { label: 'Solution consultation', href: '/contact' }] },
] as const;

const industryLinks = [
  { label: 'Pharmaceutical & research', href: '/industries/pharma' },
  { label: 'Manufacturing', href: '/platform#industries' },
  { label: 'Chemical', href: '/platform#industries' },
  { label: 'Textiles', href: '/platform#industries' },
  { label: 'Corporate offices', href: '/platform#industries' },
  { label: 'Food industries', href: '/platform#industries' },
] as const;

function MegaGroup({ title, groups }: { title: string; groups: readonly { title: string; links: readonly { label: string; href: string }[] }[] }) {
  return (
    <details className="mega-menu">
      <summary>{title}<span aria-hidden="true">⌄</span></summary>
      <div className="mega-panel">
        <div className="mega-panel-top"><span>Indian Infotech systems</span><Link href="/contact">Discuss a requirement ↗</Link></div>
        <div className="mega-columns">
          {groups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <Link href={link.href} key={`${group.title}-${link.label}`}>{link.label}<span aria-hidden="true">→</span></Link>)}</div>)}
        </div>
      </div>
    </details>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Indian Infotech home"><Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={1030} height={242} priority /></Link>

      <nav className="desktop-nav" aria-label="Main navigation">
        <MegaGroup title="Products" groups={productGroups} />
        <MegaGroup title="Software" groups={softwareGroups} />
        <MegaGroup title="Solutions" groups={solutionGroups} />
        <details className="mega-menu">
          <summary>Industries<span aria-hidden="true">⌄</span></summary>
          <div className="mega-panel industries-panel"><div className="mega-panel-top"><span>Industry operating contexts</span><Link href="/contact">Plan an industry solution ↗</Link></div><div className="industry-menu-grid">{industryLinks.map((link, index) => <Link href={link.href} key={link.label}><span>0{index + 1}</span>{link.label}<b aria-hidden="true">→</b></Link>)}</div></div>
        </details>
        <Link href="/resources">Resources</Link>
        <details className="mega-menu company-menu">
          <summary>Company<span aria-hidden="true">⌄</span></summary>
          <div className="mega-panel compact-mega-panel"><div className="mega-columns"><div><h2>Indian Infotech</h2><Link href="/about">About the company<span aria-hidden="true">→</span></Link><Link href="/contact">Ahmedabad office<span aria-hidden="true">→</span></Link></div><div><h2>Information</h2><Link href="/privacy">Privacy policy<span aria-hidden="true">→</span></Link><Link href="/terms">Terms and conditions<span aria-hidden="true">→</span></Link></div></div></div>
        </details>
      </nav>

      <div className="header-actions"><Link className="header-search" href="/search" aria-label="Search Indian Infotech website">Search</Link><Link className="header-compare" href="/compare">Compare</Link><Link className="header-cta" href="/contact">Book a demo</Link></div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <div><Link href="/products">Products</Link><Link href="/compare">Compare products</Link><Link href="/software">Software</Link><Link href="/platform">Solutions</Link><Link href="/industries/pharma">Industries</Link><Link href="/resources">Resources</Link><Link href="/search">Search</Link><Link href="/about">Company</Link><Link href="/contact">Book a demo</Link></div>
      </details>
    </header>
  );
}
