import Link from 'next/link';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  marker?: string;
  breadcrumbs?: readonly { label: string; href?: string }[];
};

export function PageHero({ eyebrow, title, description, marker = 'II / SYSTEMS', breadcrumbs }: PageHeroProps) {
  const trail = breadcrumbs ?? [{ label: eyebrow }];
  return (
    <>
      <section className="page-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="page-hero-copy">
          <p className="eyebrow"><span /> {eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="page-marker" aria-hidden="true"><span>{marker}</span><i /></div>
      </section>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        {trail.map((item) => <span className="breadcrumb-item" key={`${item.href ?? 'current'}-${item.label}`}><span aria-hidden="true">/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}
      </nav>
    </>
  );
}
