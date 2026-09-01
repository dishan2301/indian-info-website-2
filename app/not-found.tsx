import Link from 'next/link';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found">
        <p className="eyebrow"><span /> 404</p>
        <h1>Page not found.</h1>
        <p>The page may have moved. Search the website or continue to products, solutions, and demo support.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/">Return home</Link><Link className="button outline-button" href="/search">Search website</Link></div>
        <div className="route-link-list"><Link href="/products">Browse products <span aria-hidden="true">↗</span></Link><Link href="/solutions">Explore solutions <span aria-hidden="true">↗</span></Link><Link href="/contact">Book a demo <span aria-hidden="true">↗</span></Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}
