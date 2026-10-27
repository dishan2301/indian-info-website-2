'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Boxes, Factory, UsersRound } from 'lucide-react';
import { hrmsModules, products } from '../content';

const productFamilies = [...new Set(products.map((product) => product.family))];
const familySlug = (family: string) => family.toLowerCase().replace(/\s+/g, '-');

const productGroups = [{ title: 'Product categories', links: productFamilies.map((family) => ({ label: family, href: `/products/${familySlug(family)}` })) }, { title: 'Product tools', links: [{ label: 'All products', href: '/products' }, { label: 'Compare products', href: '/compare' }, { label: 'Product guidance', href: '/resources' }] }] as const;

const hrmsFeatureGroups = [{
  title: 'HRMS & payroll features',
  links: hrmsModules.map((module) => ({ label: module.name, href: `/hrms-payroll/${module.slug}` })),
}];

const workforceProducts = [
  { id: 'attendance-automation', label: 'Attendance Automation', href: '/solutions/attendance-automation', summary: 'Connect time capture, shift review, and attendance workflows.' },
  { id: 'hrms-payroll', label: 'HR & payroll workflows', href: '/hrms-payroll', summary: 'Coordinate the employee lifecycle across 14 people-operation features.' },
] as const;

const otherSolutionGroups = [
  { title: 'Physical access', links: [{ label: 'Access control', href: '/solutions/physical-access-control' }, { label: 'Entrance management', href: '/solutions/entrance-management' }, { label: 'Visitor security', href: '/solutions/visitor-security' }] },
  { title: 'Workplace services', links: [{ label: 'Visitor operations', href: '/software/visitor-management' }, { label: 'Canteen operations', href: '/solutions/canteen-operations' }, { label: 'Solution consultation', href: '/contact' }] },
] as const;

const solutionDirectoryGroups: { title: string; links: readonly { id?: string; label: string; href: string; summary?: string }[] }[] = [
  { title: 'Workforce operations', links: workforceProducts },
  ...otherSolutionGroups,
] as const;

const solutionGroups = solutionDirectoryGroups.map(({ title, links }) => ({
  title,
  links: links.map(({ label, href }) => ({ label, href })),
}));

const industryLinks = [
  { label: 'Manufacturing', href: '/industries/manufacturing' },
  { label: 'Corporate offices', href: '/industries/corporate' },
  { label: 'Pharmaceutical & research', href: '/industries/pharma' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Education', href: '/industries/education' },
  { label: 'Logistics & warehousing', href: '/industries/logistics' },
] as const;

const mobilePrimaryLinks = [
  { label: 'Solutions', href: '/solutions', icon: UsersRound },
  { label: 'Products', href: '/products', icon: Boxes },
] as const;

const mobileIndustriesLink = { label: 'Industries', href: '/industries', icon: Factory } as const;

const mobileUtilityLinks = [
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/insights' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Search', href: '/search' },
] as const;

const mobileMenuGroups = [
  { title: 'Products', links: [{ label: 'All products', href: '/products' }] },
  productGroups[1],
  { title: 'Workforce solutions', links: workforceProducts.map(({ label, href }) => ({ label, href })) },
  ...hrmsFeatureGroups,
  ...otherSolutionGroups,
  { title: 'Industry environments', links: industryLinks },
] as const;

const menuItems = [
  { title: 'Solutions', href: '/solutions', eyebrow: 'Integrated operations', groups: solutionGroups },
  { title: 'Products', href: '/products', eyebrow: 'Indian Infotech hardware', groups: productGroups },
  { title: 'Industries', href: '/industries', eyebrow: 'Industry operating contexts', groups: [{ title: 'Built for your environment', links: industryLinks }] },
] as const;

const homeNavLink = { label: 'Home', href: '/' } as const;
const endingNavLinks = [{ label: 'Careers', href: '/careers' }, { label: 'Blog', href: '/insights' }, { label: 'About Us', href: '/about-us' }] as const;

function PremiumNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeProductFamily, setActiveProductFamily] = useState(productFamilies[0] ?? '');
  const [activeWorkforceProduct, setActiveWorkforceProduct] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const pathname = usePathname();
  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = (title: string) => {
    cancelClose();
    if (title === 'Solutions') setActiveWorkforceProduct(null);
    setActiveMenu(title);
  };
  const closeMenu = (delay = 140) => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), delay);
  };
  const activeSolution = solutionDirectoryGroups.flatMap((group) => group.links).find((solution) => solution.href === activeWorkforceProduct);

  useEffect(() => () => cancelClose(), []);

  return (
    <nav className="desktop-nav premium-nav" aria-label="Main navigation" onPointerLeave={(event) => { if (event.pointerType !== 'touch') closeMenu(); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(0); }} onKeyDown={(event) => { if (event.key === 'Escape') { cancelClose(); event.currentTarget.querySelector<HTMLElement>(`[data-menu-title="${activeMenu}"]`)?.focus(); setActiveMenu(null); } }}>
      <div className="premium-nav-rail" data-open={Boolean(activeMenu)}>
        <Link className="premium-nav-link" href={homeNavLink.href} onClick={handleHomeClick}>{homeNavLink.label}</Link>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.title;
          return item.title === 'Products'
            ? <Link className="premium-nav-link" data-menu-title={item.title} href={item.href} key={item.title} onFocus={() => openMenu(item.title)} onPointerEnter={(event) => { if (event.pointerType !== 'touch') openMenu(item.title); }}>{item.title}</Link>
            : <button data-menu-title={item.title} aria-controls={`nav-panel-${item.title}`} aria-expanded={isActive} className="premium-nav-trigger" key={item.title} onClick={() => { if (item.title === 'Solutions') setActiveWorkforceProduct(null); setActiveMenu(item.title); }} onFocus={() => openMenu(item.title)} onPointerEnter={(event) => { if (event.pointerType !== 'touch') openMenu(item.title); }} type="button">{item.title}</button>;
        })}
        {endingNavLinks.map((item) => <Link className="premium-nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
      </div>
      <div className="premium-mega-shell" data-open={Boolean(activeMenu)}>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.title;
          return <section aria-hidden={!isActive} className={`premium-mega-panel${isActive ? ' is-active' : ''}`} id={`nav-panel-${item.title}`} inert={!isActive} key={item.title}>
            <div className="premium-mega-intro"><span>{item.eyebrow}</span><h2>{item.title} that move with your operation.</h2><Link href={item.href}>View all {item.title.toLowerCase()}</Link></div>
            {item.title === 'Products' ? <div className="premium-product-bifurcation"><div className="premium-product-categories"><p>Product categories</p>{productFamilies.map((family) => <Link className={activeProductFamily === family ? 'is-active' : ''} href={`/products/${familySlug(family)}`} onFocus={() => setActiveProductFamily(family)} onPointerEnter={() => setActiveProductFamily(family)} key={family}>{family}<small>{products.filter((product) => product.family === family).length} products</small></Link>)}</div><div className="premium-product-items"><p>{activeProductFamily} products</p>{products.filter((product) => product.family === activeProductFamily).map((product) => <Link href={`/products/${product.slug}`} key={product.slug}>{product.name}<small>{product.authentication} · {product.application}</small></Link>)}</div></div> : item.title === 'Solutions' && isActive ? <div className="premium-solutions-content">
              <div className="premium-workforce-picker">
                {solutionDirectoryGroups.map((group) => (
                  <div className="premium-solution-group" key={group.title}>
                    <p>{group.title}</p>
                    {group.links.map((solution) => (
                      <Link
                        className={activeWorkforceProduct === solution.href ? 'is-active' : ''}
                        href={solution.href}
                        key={solution.href}
                        onFocus={() => setActiveWorkforceProduct(solution.href)}
                        onPointerEnter={(event) => { if (event.pointerType !== 'touch') setActiveWorkforceProduct(solution.href); }}
                      >
                        {solution.label}<span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="premium-workforce-detail">
                {activeWorkforceProduct === '/hrms-payroll' ? <>
                  <p>HR & payroll workflow features</p>
                  <div className="premium-workforce-features">
                    {hrmsFeatureGroups.flatMap((group) => group.links).map((feature) => <Link href={feature.href} key={feature.href}>{feature.label}<span aria-hidden="true">↗</span></Link>)}
                  </div>
                </> : <>
                  <p>{activeSolution ? `Explore ${activeSolution.label}` : 'Explore solutions'}</p>
                  <div className="premium-workforce-callout">
                    <strong>{activeSolution?.label ?? 'Choose a workflow to get started.'}</strong>
                    <span>{activeSolution?.summary ?? 'Hover over or focus a solution to see more, or choose HR & payroll workflows to browse all 14 features.'}</span>
                    {activeSolution && <Link href={activeSolution.href}>Explore {activeSolution.label} <b aria-hidden="true">↗</b></Link>}
                  </div>
                </>}
              </div>
            </div> : <div className="premium-mega-columns">{item.groups.map((group) => <div key={group.title}><p>{group.title}</p>{group.links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}</div>)}</div>}
          </section>;
        })}
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

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

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Link className="brand" href="/" aria-label="Indian Infotech home"><Image src="/indian-infotech-logo.png" alt="Indian Infotech" width={1200} height={199} priority /></Link>
      <Link className="brand-mark" href="/" aria-label="Indian Infotech home"><Image src="/favicon.svg" alt="" width={40} height={40} /></Link>

      <PremiumNav key={pathname} />

      <div className="header-actions"><Link className="header-cta" href="/contact">Contact</Link></div>

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
                  {group.title === 'Products' ? <>{productFamilies.map((family) => <details key={family}><summary>{family}</summary><div>{products.filter((product) => product.family === family).map((product) => <Link href={`/products/${product.slug}`} key={product.slug}>{product.name}</Link>)}</div><Link href={`/products/${familySlug(family)}`}>View all {family.toLowerCase()}</Link></details>)}</> : group.links.map((link) => <Link href={link.href} key={`${group.title}-${link.label}`}>{link.label}</Link>)}
                </div>
              ))}
            </div>
            <div className="mobile-menu-primary mobile-menu-industries">
              <Link href={mobileIndustriesLink.href} key={mobileIndustriesLink.label}><Factory aria-hidden="true" /><span>{mobileIndustriesLink.label}</span></Link>
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
