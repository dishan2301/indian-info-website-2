'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Boxes, Factory, Layers3, UsersRound } from 'lucide-react';

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

const mobilePrimaryLinks = [
  { label: 'Products', href: '/products', icon: Boxes },
  { label: 'Software', href: '/software', icon: Layers3 },
  { label: 'Solutions', href: '/solutions', icon: UsersRound },
  { label: 'Industries', href: '/industries', icon: Factory },
] as const;

const mobileUtilityLinks = [
  { label: 'Support', href: '/support' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const mobileMenuGroups = [
  { title: 'Products', links: [{ label: 'All products', href: '/products' }, { label: 'Attendance devices', href: '/products#attendance' }, { label: 'Access control', href: '/products#access-control' }, { label: 'Entrance management', href: '/products#entrance-management' }] },
  { title: 'Software', links: [{ label: 'Easytime Online', href: '/software/easytime-online' }, { label: 'HRMS & Payroll', href: '/software/hrms-payroll' }, { label: 'Visitor management', href: '/software/visitor-management' }, { label: 'Canteen management', href: '/software/canteen-management' }] },
  { title: 'Company', links: [{ label: 'About us', href: '/about-us' }, { label: 'Case studies', href: '/case-studies' }, { label: 'Testimonials', href: '/testimonials' }, { label: 'Resources', href: '/resources' }, { label: 'Insights', href: '/insights' }] },
] as const;

const menuItems = [
  { title: 'Products', href: '/products', eyebrow: 'Indian Infotech hardware', groups: productGroups },
  { title: 'Software', href: '/software', eyebrow: 'Indian Infotech software', groups: softwareGroups },
  { title: 'Solutions', href: '/solutions', eyebrow: 'Integrated operations', groups: solutionGroups },
  { title: 'Industries', href: '/industries', eyebrow: 'Industry operating contexts', groups: [{ title: 'Built for your environment', links: industryLinks }] },
  { title: 'Company', href: '/about-us', eyebrow: 'Indian Infotech', groups: [{ title: 'Company', links: [{ label: 'About us', href: '/about-us' }, { label: 'Partners', href: '/partners' }, { label: 'Case studies', href: '/case-studies' }] }, { title: 'Insights & support', links: [{ label: 'Insights', href: '/insights' }, { label: 'Resources', href: '/resources' }, { label: 'Support center', href: '/support' }] }] },
] as const;

const primaryNavLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/about-us' },
  { label: 'Blog', href: '/insights' },
] as const;

function PremiumNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = (title: string) => { cancelClose(); setActiveMenu(title); };
  const closeMenu = (delay = 140) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), delay);
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <nav className="desktop-nav premium-nav" aria-label="Main navigation" onPointerLeave={(event) => { if (event.pointerType !== 'touch') closeMenu(); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(0); }} onKeyDown={(event) => { if (event.key === 'Escape') { closeMenu(0); (event.target as HTMLElement).closest('button')?.focus(); } }}>
      <div className="premium-nav-rail" data-open={Boolean(activeMenu)}>
        {primaryNavLinks.map((item) => <Link className="premium-nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
        {menuItems.map((item) => {
          const isActive = activeMenu === item.title;
          return <button aria-controls={`nav-panel-${item.title}`} aria-expanded={isActive} className="premium-nav-trigger" key={item.title} onClick={() => setActiveMenu(isActive ? null : item.title)} onFocus={() => openMenu(item.title)} onPointerEnter={(event) => { if (event.pointerType !== 'touch') openMenu(item.title); }} type="button">{item.title}<span aria-hidden="true">↗</span></button>;
        })}
      </div>
      <div className="premium-mega-shell" data-open={Boolean(activeMenu)}>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.title;
          return <section aria-hidden={!isActive} className={`premium-mega-panel${isActive ? ' is-active' : ''}`} id={`nav-panel-${item.title}`} inert={!isActive} key={item.title}>
            <div className="premium-mega-intro"><span>{item.eyebrow}</span><h2>{item.title} that move with your operation.</h2><Link href={item.href}>View all {item.title.toLowerCase()} <b aria-hidden="true">→</b></Link></div>
            <div className="premium-mega-columns">{item.groups.map((group) => <div key={group.title}><p>{group.title}</p>{group.links.map((link) => <Link href={link.href} key={link.label}>{link.label}<span aria-hidden="true">→</span></Link>)}</div>)}</div>
          </section>;
        })}
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 36);
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

      <PremiumNav />

      <div className="header-actions"><Link className="header-cta" href="/contact">Contact Us</Link></div>

      <details
        className="mobile-menu"
        ref={mobileMenu}
        onClick={(event) => { if ((event.target as Element).closest('a')) mobileMenu.current?.removeAttribute('open'); }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && mobileMenu.current?.open) {
            mobileMenu.current.open = false;
            mobileMenu.current.querySelector('summary')?.focus();
          }
        }}
      >
        <summary aria-label="Navigation menu">Menu</summary>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-shell">
            <div className="mobile-menu-topline">
              <span>Indian Infotech</span>
              <b>Access, workforce, software</b>
            </div>
            <div className="mobile-menu-primary">
              {mobilePrimaryLinks.map((link) => {
                const Icon = link.icon;
                return <Link href={link.href} key={link.label}><Icon aria-hidden="true" /><span>{link.label}</span></Link>;
              })}
            </div>
            <div className="mobile-menu-groups">
              {mobileMenuGroups.map((group) => (
                <div key={group.title}>
                  <p className="mega-heading">{group.title}</p>
                  {group.links.map((link) => <Link href={link.href} key={`${group.title}-${link.label}`}>{link.label}<span aria-hidden="true">→</span></Link>)}
                </div>
              ))}
            </div>
            <div className="mobile-menu-utility">
              {mobileUtilityLinks.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
            </div>
          </div>
        </div>
      </details>
    </header>
  );
}
