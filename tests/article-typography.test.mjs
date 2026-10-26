import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {loadTsModule} from './helpers/load-ts-module.mjs';

const {ArticlePortableText, articleComponents} = loadTsModule(new URL('../components/article-portable-text.tsx', import.meta.url));
const {ArticleBody} = loadTsModule(new URL('../components/article-body.tsx', import.meta.url));
const {insights} = loadTsModule(new URL('../app/insights/content.ts', import.meta.url));
const block = (style, text, extra = {}) => ({_key: text, _type: 'block', style, markDefs: [], children: [{_type: 'span', text, marks: []}], ...extra});

test('all five original bodies and their Portable Text equivalents have identical semantic HTML', () => {
  assert.equal(insights.length, 5);
  for (const article of insights) {
    const staticSections = article.sections.map(section => h('section', {key: section.title},
      h('h2', null, section.title), h('p', null, section.body),
      section.points ? h(section.ordered ? 'ol' : 'ul', null, section.points.map(point => h('li', {key: point}, point))) : null));
    const portableBlocks = article.sections.flatMap(section => [block('h2', section.title), block('normal', section.body),
      ...(section.points || []).map(point => block('normal', point, {listItem: section.ordered ? 'number' : 'bullet', level: 1}))]);
    const expected = renderToStaticMarkup(h(ArticleBody, null, staticSections));
    const actual = renderToStaticMarkup(h(ArticleBody, null, h(ArticlePortableText, {value: portableBlocks})));
    assert.equal(actual, expected, article.slug);
  }
});

test('explicit supported marks, subheadings, lists and quotes keep semantic article markup', () => {
  for (const tag of ['strong','em']) assert.equal(articleComponents.marks[tag]({children:'Test'}).type, tag);
  const html = renderToStaticMarkup(h(ArticleBody, null, h(ArticlePortableText, {value: [
    block('h2','Section'), block('normal','Paragraph'), block('h3','Subheading'), block('blockquote','Quote'),
    block('normal','Parent',{listItem:'bullet',level:1}), block('normal','Child',{listItem:'bullet',level:2}),
    block('normal','Step',{listItem:'number',level:1}), block('h2','Next section'),
  ]})));
  assert.equal((html.match(/<section>/g) || []).length, 2);
  for (const element of ['<h3>Subheading</h3>', '<blockquote>Quote</blockquote>', '<ul>', '<ol>', '<li>Child</li>']) assert.ok(html.includes(element), element);
  assert.ok(!html.includes('style='));
});

test('links are safe and images retain their source, alt and shared image class', () => {
  assert.equal(articleComponents.marks.link({children:'Bad',value:{href:'javascript:alert(1)'}}).props.href, undefined);
  assert.equal(articleComponents.marks.link({children:'Bad',value:{href:'//untrusted.test'}}).props.href, undefined);
  const link=articleComponents.marks.link({children:'Reference',value:{href:'https://example.com',openInNewTab:true}});
  assert.equal(link.props.rel, 'noopener noreferrer');
  const image=articleComponents.types.image({value:{asset:{url:'https://cdn.sanity.io/example.png'},alt:'A biometric reader'}});
  assert.equal(image.props.className,'insight-article-image');
  assert.equal(image.props.children.props.alt,'A biometric reader');
  assert.equal(image.props.children.props.src,'https://cdn.sanity.io/example.png');
  assert.equal(articleComponents.types.image({value:{alt:'Unavailable'}}), null);
});

test('both routes use the shared body and CSS contains no CMS-specific typography or inline sizes', () => {
  const route=readFileSync(new URL('../app/insights/[slug]/page.tsx',import.meta.url),'utf8');
  assert.equal((route.match(/<ArticleBody /g)||[]).length,2);
  const css=readFileSync(new URL('../app/globals.css',import.meta.url),'utf8');
  assert.ok(!css.includes('.article-portable-text'));
  const renderer=readFileSync(new URL('../components/article-portable-text.tsx',import.meta.url),'utf8');
  assert.ok(!renderer.includes('style='));
});

test('new CMS articles render through ArticleBody without regenerating static route params', async () => {
  let published = null;
  const empty=()=>null;
  const route=loadTsModule(new URL('../app/insights/[slug]/page.tsx',import.meta.url), {
    'next/link': empty, 'next/navigation': {notFound(){throw Error('NOT_FOUND')}},
    '@/components/structured-data': {StructuredData: empty}, '@/lib/site': {absoluteUrl:x=>x,createPageMetadata:x=>x},
    '../../_components/page-hero': {PageHero:empty}, '../../_components/site-header': {SiteHeader:empty}, '../../_components/site-footer': {SiteFooter:empty},
    '../content': {insights}, '@/lib/sanity/content': {getPublishedInsight:async()=>published},
    '@/lib/insights': {canonicalSlug:x=>x,articlePath:x=>`/insights/${x}`,getPublishedArticles:async()=>insights,getPublishedArticleBySlug:async()=>published ? {...published,source:'sanity',category:'Blog',date:'1 January 2026',imageAlt:''} : null},
    '@/components/article-body': {ArticleBody}, '@/components/article-portable-text': {ArticlePortableText},
  });
  const props={params:Promise.resolve({slug:'future-published-article'})};
  await assert.rejects(route.default(props), /NOT_FOUND/);
  published={_id:'test',_type:'blogPost',slug:'future-published-article',title:'New publication',summary:'Test only',publishedAt:'2026-01-01T00:00:00Z',body:[block('h2','Heading'),block('normal','Article body')]};
  const html=renderToStaticMarkup(await route.default(props));
  assert.match(html, /class="insight-article-body"/);
  assert.match(html, /<section><h2>Heading<\/h2><p>Article body<\/p><\/section>/);
  assert.equal(route.generateStaticParams().some(x=>x.slug===published.slug), false);
  assert.notEqual(route.dynamicParams,false);
  published.title='Updated publication';
  assert.equal((await route.generateMetadata(props)).title, 'Updated publication');
});
