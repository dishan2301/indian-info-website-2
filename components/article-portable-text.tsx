import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';

export const articleComponents: PortableTextComponents = {
  block: {
    normal: ({children}) => <p>{children}</p>,
    h2: ({children}) => <h2>{children}</h2>,
    h3: ({children}) => <h3>{children}</h3>,
    blockquote: ({children}) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul>{children}</ul>,
    number: ({children}) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => <li>{children}</li>,
    number: ({children}) => <li>{children}</li>,
  },
  marks: {
    strong: ({children}) => <strong>{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    link: ({children, value}) => {
      const href = value?.href;
      if (typeof href !== 'string' || !/^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href)) return <>{children}</>;
      return <a href={href} target={value?.openInNewTab ? '_blank' : undefined} rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}>{children}</a>;
    },
  },
  types: {
    image: ({value}) => value.asset?.url ? <div className="insight-article-image"><Image src={value.asset.url} alt={value.alt || ''} fill sizes="(max-width: 760px) 100vw, 760px" /></div> : null,
  },
};

export function ArticlePortableText({value}: {value: unknown[]}) {
  // Sections mirror the original articles: each heading starts a spaced, bordered section.
  const sections: unknown[][] = [];
  for (const block of value) {
    const style = (block as PortableTextBlock).style;
    if (!sections.length || style === 'h2') sections.push([]);
    sections[sections.length - 1].push(block);
  }
  return <>{sections.map((blocks, index) => <section key={index}><PortableText value={blocks as PortableTextBlock[]} components={articleComponents} /></section>)}</>;
}
