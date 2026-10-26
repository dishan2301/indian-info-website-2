import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import test from 'node:test';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

const require = createRequire(import.meta.url);

function load(path, dependencies) {
  const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true},
  }).outputText;
  const context = {exports: {}, console: {error() {}}, require: (name) => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name];
    if (name === 'react/jsx-runtime') return require(name);
    throw new Error(`Unexpected dependency: ${name}`);
  }};
  runInNewContext(source, context);
  return context.exports;
}


const originals = load('../app/insights/content.ts', {}).insights;
const sample = {_id: 'published', _type: 'blogPost', slug: 'cms-test', title: 'CMS test', summary: 'Test', publishedAt: '2026-10-01T00:00:00Z'};
function collection(fetch = async () => [sample]) {
  return load('../lib/insights.ts', {'@/app/insights/content': {insights: originals}, '@/lib/sanity/content': {getPublishedInsights: fetch}});
}
test('five originals and CMS merge, sort and deduplicate deterministically', async () => {
  const {mergeInsights, getAllInsights} = collection();
  const cards = await getAllInsights();
  assert.equal(cards.length, 6);
  assert.equal(cards[0].slug, sample.slug);
  assert.ok(cards.slice(0, 5).some(item => item.slug === sample.slug));
  assert.equal(new Set(cards.map(item => item.slug)).size, 6);
  assert.equal(mergeInsights([sample, sample]).length, 6);
  const collision = {...sample, slug: originals[0].slug};
  assert.equal(mergeInsights([collision]).find(item => item.slug === collision.slug).title, originals[0].title);
  assert.equal(mergeInsights([{...sample, publishedAt: 'invalid'}]).length, 5);
  assert.equal(mergeInsights([{...sample, publishedAt: '2999-01-01'}]).length, 5);
  assert.equal(mergeInsights([{...sample, _id: 'drafts.test'}]).length, 5);
  assert.equal(mergeInsights([]).length, 5);

  for (let i = 1; i < cards.length; i++) assert.ok(Date.parse(cards[i-1].publishedAt) >= Date.parse(cards[i].publishedAt));
});
test('listing and homepage use shared collection and original static URLs remain generated', async () => {
  const source = path => readFileSync(new URL(path, import.meta.url), 'utf8');
  assert.match(source('../app/page.tsx'), /await getLatestArticles\(5\)/);
  assert.match(source('../app/insights/page.tsx'), /await getPublishedArticles\(\)/);
  assert.match(source('../components/homepage/home-curated-sections.tsx'), /href="\/insights"/);
  const empty = () => null;
  const route = load('../app/insights/[slug]/page.tsx', {
    'next/image': empty, 'next/link': empty, 'next/navigation': {notFound() {throw Error('404')}},
    '@/components/structured-data': {StructuredData: empty}, '@/lib/site': {absoluteUrl: x => x, createPageMetadata: x => x},
    '../../_components/page-hero': {PageHero: empty}, '../../_components/site-footer': {SiteFooter: empty}, '../../_components/site-header': {SiteHeader: empty},
    '../content': {insights: originals}, '@/lib/sanity/content': {getPublishedInsight: async () => null},
    '@/lib/insights': {...collection(), getPublishedArticleBySlug: async slug => ({...originals.find(item => item.slug === slug), source: 'static', staticArticle: originals.find(item => item.slug === slug)})}, '@/components/article-portable-text': {ArticlePortableText: empty}, '@/components/article-body': {ArticleBody: empty},
  });
  assert.equal(route.generateStaticParams().length, 5);
  for (const article of originals) assert.ok(await route.default({params: Promise.resolve({slug: article.slug})}));
});
test('Portable Text explicitly renders article headings, paragraphs and lists inside original sections', () => {
  const empty = () => null;
  const {articleComponents, ArticlePortableText} = load('../components/article-portable-text.tsx', {'next/image': empty, '@portabletext/react': {PortableText: empty}});
  for (const tag of ['h2', 'h3', 'normal', 'blockquote']) assert.equal(articleComponents.block[tag]({children:'text'}).type, tag === 'normal' ? 'p' : tag);
  assert.equal(articleComponents.list.bullet({children:'x'}).type, 'ul');
  assert.equal(articleComponents.list.number({children:'x'}).type, 'ol');
  assert.equal(articleComponents.listItem.bullet({children:'x'}).type, 'li');
  const tree = ArticlePortableText({value:[{_type:'block', style:'h2'}, {_type:'block', style:'normal'}]});
  assert.equal(tree.props.className, undefined);
  assert.equal(tree.props.children[0].type, 'section');
});
