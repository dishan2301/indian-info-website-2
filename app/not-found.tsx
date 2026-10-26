import Link from 'next/link';
import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found" aria-labelledby="not-found-title">
        <div className="not-found-content">
          <p className="eyebrow"><span aria-hidden="true" /> 404 · Page not found</p>
          <h1 id="not-found-title">Let’s get you back<br />on track.</h1>
          <p>We couldn’t find this page. It may have moved, or the link may be incorrect.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/">Return home</Link><Link className="button outline-button" href="/search">Search website</Link></div>
          <nav className="not-found-links" aria-label="Helpful pages"><Link href="/products">Browse products <span aria-hidden="true">↗</span></Link><Link href="/solutions">Explore solutions <span aria-hidden="true">↗</span></Link><Link href="/contact">Contact us <span aria-hidden="true">↗</span></Link></nav>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
