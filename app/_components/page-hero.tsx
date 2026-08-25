type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  marker?: string;
};

export function PageHero({ eyebrow, title, description, marker = 'II / SYSTEMS' }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="page-hero-copy">
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-marker" aria-hidden="true">
        <span>{marker}</span>
        <i />
      </div>
    </section>
  );
}
