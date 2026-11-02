import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.AUDIT_BASE_URL || 'http://localhost:3001';
const output = process.env.AUDIT_OUTPUT_DIR;
if (output) await mkdir(output, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true });
const slugs = ['manufacturing', 'corporate', 'pharma', 'healthcare', 'education', 'logistics'];
const widths = (process.env.AUDIT_WIDTHS || '390,768,1440').split(',').map(Number);
try {
 const page = await browser.newPage({ reducedMotion: 'reduce' });
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 const links = new Set();
 for (const slug of slugs) {
  for (const width of widths) {
   await page.setViewportSize({ width, height: 900 });
   const response = await page.goto(`${base}/industries/${slug}`, { waitUntil: 'domcontentloaded' });
   assert.equal(response.status(), 200, slug);
   const main = page.locator('main[data-industry-guide]');
   await main.waitFor();
   assert.equal(await page.locator('h1').count(), 1);
   assert.equal(await main.getByRole('navigation', { name: 'On this page' }).count(), 0);
   const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content');
   assert.equal(new URL(socialImage).pathname, `/campaign/industries/${slug}-desktop-v2.webp`);
   await main.locator('img').evaluateAll(images => images.forEach(image => image.loading = 'eager'));
   await page.waitForFunction(() => [...document.querySelectorAll('main img')].every(image => image.complete && image.naturalWidth > 0), undefined, { timeout: 20000 });
   assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${slug}: page overflow at ${width}`);
   assert(await main.innerText().then(text => text.split(/\s+/).length > 1200), `${slug}: incomplete guide`);
   const citationTargets = await main.locator('a[href^="#"]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href').slice(1)));
   for (const id of citationTargets) assert(await page.locator(`[id="${id}"]`).count(), `${slug}: missing anchor ${id}`);
   assert(await main.locator('#references li').count() >= 4);
   for (const details of await main.locator('details').all()) {
    await details.locator('summary').click();
    assert(await details.evaluate(element => element.open));
   }
   const structured = await main.locator('script[type="application/ld+json"]').allTextContents();
   assert(structured.some(json => JSON.parse(json)['@graph']?.some(item => item['@type'] === 'Article')));
   const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
   assert.equal(new URL(canonical).pathname, `/industries/${slug}`);
   for (const href of await main.locator('a[href^="/"]').evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')))) links.add(href.split('#')[0]);
   await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
   if (output) await page.screenshot({ path: `${output}/${slug}-${width}.png`, fullPage: true });
   console.log(`${slug}: ${width}px layout, images, citations, metadata and FAQs OK`);
  }
 }
 for (const width of [390, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  assert.equal((await page.goto(`${base}/industries`)).status(), 200);
  assert.equal(await page.locator('main article').count(), 6);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  if (output) await page.screenshot({ path: `${output}/directory-${width}.png`, fullPage: true });
 }
 for (const href of links) assert((await page.request.get(`${base}${href}`)).status() < 400, `Broken content link: ${href}`);
 assert.deepEqual(errors, []);
 console.log(`${slugs.length} guides and directory passed; ${links.size} internal links verified.`);
} finally { await browser.close(); }
