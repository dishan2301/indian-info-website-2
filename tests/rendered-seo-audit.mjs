const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:3000';
const expectedCanonicalOrigin = process.env.AUDIT_CANONICAL_ORIGIN || 'https://indianinfotech.org';

const decode = (value = '') => value
  .replaceAll('&amp;', '&').replaceAll('&quot;', '"')
  .replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const match = (html, pattern) => decode(html.match(pattern)?.[1]?.trim());
const stripQuery = (href) => href.split('#')[0].split('?')[0] || '/';

async function get(path, init) {
  const response = await fetch(new URL(path, base), { ...init, headers: { 'x-forwarded-proto': 'https', ...init?.headers } });
  return { response, text: await response.text() };
}

const sitemap = await get('/sitemap.xml');
if (!sitemap.response.ok) throw new Error(`sitemap.xml returned ${sitemap.response.status}`);
const paths = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((entry) => new URL(decode(entry[1])).pathname);
const errors = [];
const pages = [];

for (let offset = 0; offset < paths.length; offset += 12) {
  const batch = await Promise.all(paths.slice(offset, offset + 12).map(async (path) => {
    const result = await get(path);
    return { path, ...result };
  }));
  pages.push(...batch);
}

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const internalLinks = new Set();
const internalImages = new Set();
const inboundLinks = new Map(paths.map((path) => [path, new Set()]));
let schemaBlocks = 0;

for (const { path, response, text: html } of pages) {
  if (response.status !== 200) errors.push(`${path}: HTTP ${response.status}`);
  const title = match(html, /<title>([^<]*)<\/title>/i);
  const description = match(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i)
    || match(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
  const canonical = match(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)
    || match(html, /<link[^>]+href="([^"]*)"[^>]+rel="canonical"/i);
  const robots = match(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) ?? []).length;
  const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/gi)].map((heading) => Number(heading[1]));

  if (!title) errors.push(`${path}: missing title`);
  if (!description) errors.push(`${path}: missing description`);
  if (!canonical) errors.push(`${path}: missing canonical`);
  if (canonical && !canonical.startsWith(expectedCanonicalOrigin)) errors.push(`${path}: unexpected canonical ${canonical}`);
  if (robots.includes('noindex')) errors.push(`${path}: sitemap page is noindex`);
  if (h1Count !== 1) errors.push(`${path}: expected one H1, found ${h1Count}`);
  for (let index = 1; index < headingLevels.length; index += 1) {
    if (headingLevels[index] > headingLevels[index - 1] + 1) {
      errors.push(`${path}: heading level jumps from H${headingLevels[index - 1]} to H${headingLevels[index]}`);
    }
  }
  for (const social of ['og:title', 'og:description', 'twitter:card']) {
    if (!html.includes(`content="${social}`) && !html.includes(`property="${social}`) && !html.includes(`name="${social}`)) {
      errors.push(`${path}: missing ${social}`);
    }
  }
  const socialImage = match(html, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i)
    || match(html, /<meta[^>]+content="([^"]*)"[^>]+property="og:image"/i);
  if (path === '/' && !socialImage?.endsWith('/og.png')) errors.push('/: missing company social image');
  if (/^\/insights\//.test(path) && (!socialImage || socialImage.endsWith('/og.png'))) errors.push(`${path}: missing record-specific social image`);
  if (/^\/(?:products|software|solutions|industries|hrms-payroll)\//.test(path) && socialImage?.endsWith('/og.png')) errors.push(`${path}: inherited generic social image`);

  for (const [map, value, label] of [[titles, title, 'title'], [descriptions, description, 'description'], [canonicals, canonical, 'canonical']]) {
    if (value && map.has(value)) errors.push(`${path}: duplicate ${label} also used by ${map.get(value)}`);
    else if (value) map.set(value, path);
  }

  for (const script of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(script[1]); schemaBlocks += 1; } catch { errors.push(`${path}: invalid JSON-LD`); }
  }
  for (const hrefMatch of html.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    const href = decode(hrefMatch[1]);
    if (href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/_next/')) {
      const target = stripQuery(href);
      internalLinks.add(target);
      if (target !== path) inboundLinks.get(target)?.add(path);
    }
  }
  for (const imageTag of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = imageTag[0];
    if (!/\balt="[^"]*"/i.test(tag)) errors.push(`${path}: image missing alt attribute`);
    const src = match(tag, /\bsrc="([^"]+)"/i);
    if (src?.startsWith('/')) internalImages.add(src.split('#')[0]);
  }
}

const orphanedPages = [...inboundLinks].filter(([path, sources]) => path !== '/' && sources.size === 0).map(([path]) => path);
for (const path of orphanedPages) errors.push(`${path}: no internal link from another sitemap page`);

for (const path of internalLinks) {
  const { response } = await get(path, { redirect: 'follow' });
  if (response.status >= 400) errors.push(`internal link ${path}: HTTP ${response.status}`);
}

for (const path of internalImages) {
  const { response } = await get(path, { redirect: 'follow' });
  if (response.status >= 400) errors.push(`image ${path}: HTTP ${response.status}`);
}

const search = await get('/search');
if (!/name="robots"[^>]+content="[^"]*noindex/i.test(search.text)) errors.push('/search: missing noindex');
const missing = await get('/this-route-must-not-exist');
if (missing.response.status !== 404) errors.push(`/this-route-must-not-exist: expected 404, got ${missing.response.status}`);
const robotsTxt = await get('/robots.txt');
if (!robotsTxt.text.includes('Allow: /') || !robotsTxt.text.includes('Sitemap:')) errors.push('/robots.txt: production discovery directives missing');

console.log(JSON.stringify({ pages: pages.length, internalLinks: internalLinks.size, internalImages: internalImages.size, schemaBlocks, orphanedPages, errors }, null, 2));
if (errors.length) process.exitCode = 1;
