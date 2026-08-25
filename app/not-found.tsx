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
        <p>The page may have moved as Indian Infotech’s website is rebuilt.</p>
        <Link className="button button-primary" href="/">Return home</Link>
      </section>
      <SiteFooter />
    </main>
  );
}
