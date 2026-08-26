'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Boxes, Building2, Factory, House, Info, Layers3, Search, UsersRound } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';

const productGroups = [
  { title: 'Biometric & attendance', links: [{ label: 'Face recognition devices', href: '/products#attendance' }, { label: 'Fingerprint devices', href: '/products#access-control' }, { label: 'All attendance devices', href: '/products#attendance' }] },
  { title: 'Access control', links: [{ label: 'Access control terminals', href: '/products#access-control' }, { label: 'Flap barriers', href: '/products#entrance-management' }, { label: 'Turnstiles & screening', href: '/products#entrance-management' }] },
  { title: 'Product tools', links: [{ label: 'All products', href: '/products' }, { label: 'Compare products', href: '/compare' }, { label: 'Product guidance', href: '/resources' }] },
] as const;

const softwareGroups = [
  { title: 'Workforce', links: [{ label: 'Easytime Online', href: '/software/easytime-online' }, { label: 'HRMS & Payroll', href: '/software/hrms-payroll' }] },
  { title: 'Workplace', links: [{ label: 'Visitor Management', href: '/software/visitor-management' }, { label: 'Canteen Management', href: '/software/canteen-management' }, { label: 'Hexin Mediaa Wave', href: '/software/hexin-mediaa-wave' }, { label: 'All software', href: '/software' }] },
  { title: 'HRMS modules', links: [{ label: 'Core HR & payroll', href: '/hrms-payroll' }, { label: 'Time & attendance', href: '/hrms-payroll/time-attendance' }, { label: 'Employee self service', href: '/hrms-payroll/employee-self-service' }, { label: 'Recruitment', href: '/hrms-payroll/recruitment' }] },
] as const;

const solutionGroups = [
  { title: 'Workforce operations', links: [{ label: 'Attendance automation', href: '/platform#workforce' }, { label: 'HR & payroll workflows', href: '/software/hrms-payroll' }, { label: 'Multi-site planning', href: '/contact' }] },
  { title: 'Physical access', links: [{ label: 'Access control', href: '/platform#security' }, { label: 'Entrance management', href: '/products#entrance-management' }, { label: 'Visitor security', href: '/software/visitor-management' }] },
  { title: 'Workplace services', links: [{ label: 'Visitor operations', href: '/software/visitor-management' }, { label: 'Canteen operations', href: '/software/canteen-management' }, { label: 'Solution consultation', href: '/contact' }] },
] as const;

const industryLinks = [
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Corporate offices', href: '/industries/corporate' },
  { label: 'Pharmaceutical & research', href: '/industries/pharma' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Education', href: '/industries/education' },
  { label: 'Logistics & warehousing', href: '/industries/logistics' },
] as const;

function InteractiveMenu({ title, className = '', children }: { title: string; className?: string; children: ReactNode }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = () => { cancelClose(); if (menu.current) menu.current.open = true; };
  const closeMenu = (delay = 240) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => { if (menu.current) menu.current.open = false; }, delay);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <details
      className={`mega-menu ${className}`.trim()}
      ref={menu}
      onPointerEnter={(event) => { if (event.pointerType !== 'touch') openMenu(); }}
      onPointerLeave={(event) => { if (event.pointerType !== 'touch') closeMenu(); }}
      onFocus={openMenu}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(0); }}
      onKeyDown={(event) => { if (event.key === 'Escape') { closeMenu(0); menu.current?.querySelector('summary')?.focus(); } }}
    >
      <summary>{title}<span aria-hidden="true">⌄</span></summary>
      {children}
    </details>
  );
}

function MegaGroup({ title, groups }: { title: string; groups: readonly { title: string; links: readonly { label: string; href: string }[] }[] }) {
  return (
    <InteractiveMenu title={title}>
      <div className="mega-panel">
        <div className="mega-panel-top"><span>Indian Infotech systems</span><Link href="/contact">Discuss a requirement ↗</Link></div>
        <div className="mega-columns">
          {groups.map((group) => <div key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <Link href={link.href} key={`${group.title}-${link.label}`}>{link.label}<span aria-hidden="true">→</span></Link>)}</div>)}
        </div>
      </div>
    </InteractiveMenu>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const intro = document.querySelector<HTMLElement>('.face-scan-intro');
      setScrolled(window.scrollY > (intro?.offsetHeight ?? 0) + 36);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Link className="brand" href="/#home" aria-label="Indian Infotech home"><Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={1030} height={242} priority /></Link>
      <Link className="brand-mark" href="/#home" aria-label="Indian Infotech home"><Image src="/favicon.svg" alt="" width={40} height={40} /></Link>

      <nav className="desktop-nav site-dock-nav" aria-label="Main navigation">
        <Dock className="site-dock-brand" magnification={62} distance={105}>
          <DockItem><DockLabel>Home</DockLabel><DockIcon><Link href="/#home" aria-label="Home"><House /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>Products</DockLabel><DockIcon><Link href="/products" aria-label="Products"><Boxes /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>Software</DockLabel><DockIcon><Link href="/software" aria-label="Software"><Layers3 /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>HRMS &amp; Payroll</DockLabel><DockIcon><Link href="/hrms-payroll" aria-label="HRMS and Payroll"><Building2 /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>Solutions</DockLabel><DockIcon><Link href="/solutions" aria-label="Solutions"><UsersRound /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>Industries</DockLabel><DockIcon><Link href="/industries" aria-label="Industries"><Factory /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>About us</DockLabel><DockIcon><Link href="/about-us" aria-label="About us"><Info /></Link></DockIcon></DockItem>
          <DockItem><DockLabel>Search</DockLabel><DockIcon><Link href="/search" aria-label="Search"><Search /></Link></DockIcon></DockItem>
        </Dock>
        <div className="legacy-nav-menus">
        <MegaGroup title="Products" groups={productGroups} />
        <MegaGroup title="Software" groups={softwareGroups} />
        <MegaGroup title="Solutions" groups={solutionGroups} />
        <InteractiveMenu title="Industries">
          <div className="mega-panel industries-panel"><div className="mega-panel-top"><span>Industry operating contexts</span><Link href="/contact">Plan an industry solution ↗</Link></div><div className="industry-menu-grid">{industryLinks.map((link, index) => <Link href={link.href} key={link.label}><span>0{index + 1}</span>{link.label}<b aria-hidden="true">→</b></Link>)}</div></div>
        </InteractiveMenu>
        <InteractiveMenu title="Company" className="company-menu">
          <div className="mega-panel compact-mega-panel"><div className="mega-columns"><div><h2>Indian Infotech</h2><Link href="/company">Company overview<span aria-hidden="true">→</span></Link><Link href="/about-us">About us<span aria-hidden="true">→</span></Link><Link href="/engineering">Engineering and implementation<span aria-hidden="true">→</span></Link><Link href="/partners">Partners<span aria-hidden="true">→</span></Link></div><div><h2>Proof and updates</h2><Link href="/case-studies">Customer deployments<span aria-hidden="true">→</span></Link><Link href="/insights">News & insights<span aria-hidden="true">→</span></Link><Link href="/resources">Resources<span aria-hidden="true">→</span></Link><Link href="/support">Support center<span aria-hidden="true">→</span></Link></div></div></div>
        </InteractiveMenu>
        </div>
      </nav>

      <div className="header-actions"><Link className="header-search" href="/search" aria-label="Search Indian Infotech website">Search</Link><Link className="header-compare" href="/compare">Compare</Link><Link className="header-cta" href="/contact">Book a demo</Link></div>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <div><Link href="/products">Products</Link><Link href="/compare">Compare products</Link><Link href="/software">Software</Link><Link href="/solutions">Solutions</Link><Link href="/industries">Industries</Link><Link href="/about-us">About us</Link><Link href="/insights">News & insights</Link><Link href="/support">Support</Link><Link href="/search">Search</Link><Link href="/contact">Book a demo</Link></div>
      </details>
    </header>
  );
}
