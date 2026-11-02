import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { StructuredData } from '@/components/structured-data';
import { absoluteUrl } from '@/lib/site';
import { products } from '../../content';
import { SiteHeader } from '../../_components/site-header';
import { SiteFooter } from '../../_components/site-footer';
import { SolutionHeading, SolutionFaq } from '../../_components/solution-page-parts';
import { industryStudies, researchSources, type IndustryStudy, type ResearchSource } from './content';
import s from '../../_components/solution-detail.module.css';
import i from './industry-study.module.css';

function Citation({ source, study }: { source: ResearchSource; study: IndustryStudy }) {
  return <a className={i.citation} href={`#source-${source}`} aria-label={`Reference: ${researchSources[source].title}`}>[{String(study.sources.indexOf(source) + 1).padStart(2, '0')}]</a>;
}

export function IndustryStudyPage({ study }: { study: IndustryStudy }) {
  const path = `/industries/${study.slug}`;
  const url = absoluteUrl(path);
  const imageOptions = { alt: study.heroAlt, fill: true, sizes: '(max-width: 800px) 100vw, 50vw', loading: 'eager' as const, fetchPriority: 'high' as const };
  const { props: { srcSet: desktopSrcSet } } = getImageProps({ ...imageOptions, src: `/campaign/industries/${study.slug}-desktop-v2.webp` });
  const { props: mobileImageProps } = getImageProps({ ...imageOptions, src: `/campaign/industries/${study.slug}-mobile-v2.webp` });
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', '@id': `${url}#guide`, headline: `${study.name}: workforce, access and attendance guide`, description: study.summary, image: absoluteUrl(`/campaign/industries/${study.slug}-desktop-v2.webp`), dateModified: '2026-11-02', author: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') }, mainEntityOfPage: url, citation: study.sources.map(key => researchSources[key].href.startsWith('/') ? absoluteUrl(researchSources[key].href) : researchSources[key].href) },
    { '@type': 'Service', name: `${study.name} workforce and access solutions`, description: study.summary, url, provider: { '@type': 'Organization', name: 'Indian Infotech', url: absoluteUrl('/') } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') }, { '@type': 'ListItem', position: 2, name: 'Industries', item: absoluteUrl('/industries') }, { '@type': 'ListItem', position: 3, name: study.name, item: url }] },
    { '@type': 'FAQPage', mainEntity: study.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <>
    <SiteHeader />
    <main className={`${s.page} ${i.page}`} data-industry-guide={study.slug}>
      <StructuredData data={schema} />
      <div className={`${s.hero} ${i.hero}`}>
        <div className={s.heroCopy}>
          <nav className={s.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/industries">Industries</Link><span>/</span><span aria-current="page">{study.name}</span></nav>
          <p className={s.eyebrow}>Built for your environment · {study.name}</p><h1>{study.title}</h1><p className={s.lead}>{study.summary}</p>
          <div className={s.actions}><Link className={s.primary} href={`/contact?industry=${study.slug}`}>Discuss your {study.slug === 'education' ? 'campus' : study.slug === 'healthcare' || study.slug === 'pharma' ? 'facility' : 'workplace'} <span aria-hidden="true">↗</span></Link><a className={s.secondary} href="#operating-context">Read the industry guide ↓</a></div>
          <p className={i.researchLine}>Industry guidance + published product information<br /><time dateTime="2026-11-02">Research reviewed 02 November 2026</time></p>
        </div>
        <figure className={`${s.heroVisual} ${i.heroImage}`}><picture><source media="(min-width: 801px)" srcSet={desktopSrcSet} /><img {...mobileImageProps} /></picture><figcaption><span>{study.name}</span>Illustrated workplace context</figcaption></figure>
      </div>
      <div className={s.summary}>{study.priorities.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}</div>

      <section className={`${s.section} ${i.context}`} id="operating-context"><div><p className={s.eyebrow}>01 / Understand the environment</p><h2>{study.context.title}</h2><p className={i.chapterNote}>Start with how people work.<br />Then decide where systems help.</p></div><div className={i.prose}>{study.context.paragraphs.map(text => <p key={text}>{text}</p>)}</div></section>
      <section className={`${s.section} ${s.tint} ${i.evidenceSection}`} aria-labelledby="evidence-heading"><div className={i.evidenceHeading}><p className={s.eyebrow}>Research into practice</p><h2 id="evidence-heading">What the guidance changes in the design.</h2><p>Source findings and our application to the workplace are shown separately.</p></div><div className={i.findings}>{study.findings.map(finding => <article key={finding.title}><div className={i.findingTitle}><h3>{finding.title}</h3><Citation source={finding.source} study={study} /></div><p>{finding.evidence}</p><p className={i.application}>{finding.application}</p><span>{researchSources[finding.source].publisher}</span></article>)}</div></section>

      <section className={s.section} id="workflow"><SolutionHeading label="02 / Follow the operating workflow" title={study.workflow.title} text="This is a proposed operating sequence. The selected devices, software configuration and site responsibilities are confirmed together." /><ol className={s.steps}>{study.workflow.steps.map(([title, text], index) => <li key={title}><span className={s.number}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>

      <section className={`${s.section} ${s.tint}`}><SolutionHeading label="Map the workplace" title="Different areas. Different decisions." text="Use this map to identify the people, permissions and records at each boundary. It is a planning model to review against your actual layout." /><div className={i.zoneMap}>{study.zones.map((zone, index) => <article key={zone.area}><span className={i.zoneIndex}>ZONE 0{index + 1}</span><h3>{zone.area}</h3><p>{zone.people}</p><div><small>DECISION TO MAKE</small><p>{zone.decision}</p></div><footer><small>SYSTEM / PROCESS</small><span>{zone.system}</span></footer></article>)}</div></section>

      <section className={`${s.section} ${s.split}`}><figure className={`${s.photo} ${i.spotlightImage}`}><Image src={study.spotlight.image} alt={study.spotlight.alt} fill sizes="(max-width: 800px) 90vw, 45vw" /><figcaption>Illustrated operating scenario</figcaption></figure><div className={s.explanation}><p className={s.eyebrow}>A closer look · {study.name}</p><h2>{study.spotlight.title}</h2>{study.spotlight.paragraphs.map(text => <p key={text}>{text}</p>)}<ul className={s.checkList}>{study.spotlight.checks.map(([title, text]) => <li key={title}><b>{title}:</b> {text}</li>)}</ul></div></section>

      <section className={`${s.section} ${s.tint}`} id="system-fit"><SolutionHeading label="03 / Match the devices to the job" title="Hardware to evaluate for this environment." text="These are catalogue candidates with a stated role, not a claim that every model suits every installation. Check the exact variant, interfaces and conditions before procurement." /><div className={i.hardwareGrid}>{study.hardware.map(item => { const product = products.find(p => p.slug === item.slug)!; return <article className={s.product} key={item.slug}><div className={`${s.productImage} ${i.productImage}`}><Image src={product.image!} alt={`${product.name}: ${item.role}`} fill sizes="(max-width: 600px) 90vw, 30vw" /><span className={i.hardwareTag}>{product.authentication}</span></div><div className={s.productBody}><small>{item.role}</small><h3>{product.name}</h3><p>{item.why}</p><p className={i.check}><b>Confirm before selection</b>{item.check}</p><Link href={`/products/${item.slug}`}>Explore device & specifications ↗</Link>{product.pdf && <a href={product.pdf}>Read the product datasheet ↗</a>}</div></article>; })}</div></section>

      <section className={s.section}><SolutionHeading label="The software behind the record" title="Give each platform a clear responsibility." text="Published software scope is the starting point. We confirm the deployment model, enabled modules, role access and any interfaces in the proposed setup." /><div className={i.softwareGrid}>{study.software.map(software => <article className={s.product} key={software.name}><div className={i.softwareImage}><Image src={software.image} alt={software.alt} fill sizes="(max-width: 600px) 90vw, 30vw" /></div><div className={s.productBody}><h3>{software.name}</h3><p>{software.purpose}</p><div className={i.handoff}><small>THE HANDOFF</small><p>{software.handoff}</p></div><Link href={software.href}>Explore {software.name} ↗</Link></div></article>)}</div><p className={s.note}>Product basis: <Citation source="brochure" study={study} /> {study.sources.includes('app') && <><Citation source="app" study={study} /> </>} The brochure and app listing describe different parts of the portfolio; cloud, mobile and client-server capabilities are confirmed for the selected deployment.</p></section>

      <section className={`${s.section} ${i.scenario}`} aria-labelledby="scenario-heading"><div><p className={s.eyebrow}>04 / A worked example</p><h2 id="scenario-heading">{study.scenario.title}</h2><p>{study.scenario.setup}</p><span className={i.exampleLabel}>ILLUSTRATIVE PROCESS · NOT A CUSTOMER CASE STUDY</span></div><ol>{study.scenario.steps.map(([owner, action], index) => <li key={owner}><span>0{index + 1}</span><div><h3>{owner}</h3><p>{action}</p></div></li>)}</ol></section>

      <section className={s.section} id="rollout"><SolutionHeading label="05 / Plan the rollout" title="Validate the complete working day before expanding." text="Use the pilot to check both system behavior and the handoffs between teams. Agree acceptance criteria and a named owner for each unresolved item." /><div className={s.cards}>{study.rollout.map(([title, text], index) => <article className={s.card} key={title}><span className={s.number}>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className={i.measureHeading}><h3>What to measure in the pilot</h3><p>Establish a baseline and agreed review period. These are measures to collect, not promised improvements.</p></div><dl className={i.measures}>{study.measures.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl></section>

      <section className={`${s.section} ${s.tint}`}><SolutionHeading label="Before your demonstration" title={`Questions about ${study.name.toLowerCase()}.`} /><SolutionFaq items={study.faqs} /></section>
      <section className={s.section} id="references"><SolutionHeading label="06 / Sources & product evidence" title="Read the basis behind this guide." text="Industry findings use the references below. The workflow and product-fit suggestions are our planning applications. International references provide context; local applicability and facility requirements are assessed for the site." /><ol className={i.references}>{study.sources.map((key, index) => { const source = researchSources[key]; return <li id={`source-${key}`} key={key}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{source.publisher}</small><a href={source.href}>{source.title} <span aria-hidden="true">↗</span></a><p>{source.detail}</p></div></li>; })}</ol><p className={s.note}>Illustrated workplace scenes explain the intended context; they do not represent verified client installations. Equipment images are from the Indian Infotech catalogue. Research reviewed 02 November 2026.</p></section>
      <section className={s.section}><div className={s.cta}><div><h2>Bring your environment into the conversation.</h2><p>Share your layout, people groups, current devices and the reports your teams need. We’ll work through a relevant workflow and a proposed system configuration.</p></div><Link className={s.primary} href={`/contact?industry=${study.slug}`}>Plan an industry demo ↗</Link></div><div className={i.otherIndustries}><span>Explore another environment</span>{Object.values(industryStudies).filter(other => other.slug !== study.slug).map(other => <Link key={other.slug} href={`/industries/${other.slug}`}>{other.name} ↗</Link>)}</div></section>
    </main>
    <SiteFooter />
  </>;
}
