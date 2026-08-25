import Image from 'next/image';
import Link from 'next/link';

export type RouteCard = {
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  image?: string;
};

export function RouteCardGrid({ cards }: { cards: readonly RouteCard[] }) {
  return (
    <div className="route-card-grid">
      {cards.map((card, index) => (
        <Link className="route-card" href={card.href} key={`${card.href}-${card.title}`}>
          {card.image ? (
            <span className="route-card-media"><Image src={card.image} alt="" width={720} height={480} /></span>
          ) : null}
          <span className="route-card-index">0{index + 1}</span>
          {card.eyebrow ? <span className="route-card-eyebrow">{card.eyebrow}</span> : null}
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <span className="text-link">Explore <b aria-hidden="true">↗</b></span>
        </Link>
      ))}
    </div>
  );
}

export function WorkflowBand({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="route-workflow">
      {steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}
    </ol>
  );
}
