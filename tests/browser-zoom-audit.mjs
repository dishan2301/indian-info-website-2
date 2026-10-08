import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.AUDIT_BASE_URL || 'http://localhost:3001';
const out = path.resolve(process.env.AUDIT_OUTPUT_DIR || 'audits/responsiveness/zoom');
const smoke = process.env.AUDIT_SMOKE === '1';
const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'indian-native-zoom-'));
const extension = path.join(temporary, 'extension');
await fs.mkdir(extension);
await fs.mkdir(out, { recursive: true });
// Native browser zoom, not CSS zoom, viewport approximation, or pinch scaling.
// https://developer.chrome.com/docs/extensions/reference/api/tabs#method-setZoom
await fs.writeFile(path.join(extension, 'manifest.json'), JSON.stringify({
  manifest_version: 3, name: 'Isolated browser zoom audit', version: '1.0',
  permissions: ['tabs'], background: { service_worker: 'background.js' },
}));
await fs.writeFile(path.join(extension, 'background.js'), 'chrome.runtime.onInstalled.addListener(() => {});');
const browser = await chromium.launchPersistentContext(path.join(temporary, 'profile'), {
  executablePath: process.env.CHROMIUM_EXECUTABLE,
  headless: true, viewport: { width: 1366, height: 768 }, reducedMotion: 'reduce',
  ignoreDefaultArgs: ['--disable-extensions'],
  args: ['--no-sandbox', `--load-extension=${extension}`, `--disable-extensions-except=${extension}`],
});
const worker = browser.serviceWorkers()[0] || await browser.waitForEvent('serviceworker');
const page = browser.pages()[0];
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const zooms = smoke ? [25, 100, 175, 200] : [25, 40, 50, 60, 70, 80, 90, 100, 110, 120, 125, 150, 175, 200];
const results = [];
async function frames() {
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}
async function zoom(percent) {
  const actual = await worker.evaluate(async ({ base, factor }) => {
    const tab = (await chrome.tabs.query({})).find(tab => tab.url?.startsWith(base));
    await chrome.tabs.setZoomSettings(tab.id, { mode: 'automatic', scope: 'per-tab' });
    await chrome.tabs.setZoom(tab.id, factor);
    return chrome.tabs.getZoom(tab.id);
  }, { base, factor: percent / 100 });
  assert(Math.abs(actual - percent / 100) < .001);
  await page.waitForFunction(factor => Math.abs(devicePixelRatio - factor) < .01, percent / 100);
  await frames();
}
async function go(route) {
  await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.locator('.site-splash').waitFor({ state: 'detached' });
  await page.evaluate(() => document.fonts.ready);
}
async function check(name, operation) {
  try { results.push({ name, status: 'PASS', ...await operation() }); }
  catch (error) {
    const screenshot = `failure-${name.replace(/[^a-z0-9]+/gi, '-')}.png`;
    await page.screenshot({ path: path.join(out, screenshot), fullPage: true }).catch(() => {});
    results.push({ name, status: 'FAIL', error: error.message, screenshot });
  }
  await fs.writeFile(path.join(out, 'results.json'), JSON.stringify({ zooms, results, errors }, null, 2));
  console.log(results.at(-1).status, name, results.at(-1).error || '');
}
try {
  for (const [width, height] of (smoke ? [[1024, 600], [1366, 768]] : [[1024, 600], [1024, 768], [1280, 720], [1280, 800], [1366, 768], [1440, 900], [1536, 864], [1600, 900], [1920, 1080], [2560, 1600]])) {
    await page.setViewportSize({ width, height });
    await go('/');
    for (const percent of zooms) await check(`home ${width}x${height} ${percent}%`, async () => {
      await zoom(percent);
      const panels = page.locator('.workforce-screen-card');
      for (let index = 0; index < 5; index++) {
        await panels.nth(index).focus();
        await page.waitForFunction(index => document.querySelectorAll('.workforce-screen-card')[index].dataset.active === 'true', index);
        await frames();
        await page.waitForFunction(() => {
          const hero = document.querySelector('.workforce-screen');
          const copy = hero.querySelector('[data-active="true"] .workforce-screen-card-copy');
          return parseFloat(hero.style.getPropertyValue('--hero-content-height')) >= parseFloat(getComputedStyle(copy).top) + copy.scrollHeight + 31 && copy.getBoundingClientRect().bottom <= copy.closest('.workforce-screen-card').getBoundingClientRect().bottom + 1;
        });
        const panel = await panels.nth(index).evaluate(element => {
          const copy = element.querySelector('.workforce-screen-card-copy');
          const box = element.getBoundingClientRect();
          const text = copy.getBoundingClientRect();
          return { bottom: text.bottom - box.bottom, right: text.right - box.right, textOverflow: copy.scrollWidth - copy.clientWidth };
        });
        assert(panel.bottom <= 1 && panel.right <= 1 && panel.textOverflow <= 1, JSON.stringify({ index, panel }));
      }
      await panels.first().focus();
      await frames();
      await page.evaluate(() => scrollTo(0, 0));
      const metrics = await page.evaluate(() => ({
        width: innerWidth, height: innerHeight, dpr: devicePixelRatio,
        direction: getComputedStyle(document.querySelector('.workforce-screen-grid')).flexDirection,
        collapsedTitles: [...document.querySelectorAll('.workforce-screen-card:not([data-active="true"]) .workforce-screen-title')].map(e => getComputedStyle(e).writingMode),
        overflow: document.documentElement.scrollWidth - innerWidth,
        headerBottom: document.querySelector('.site-header').getBoundingClientRect().bottom,
        heroTop: document.querySelector('.workforce-screen').getBoundingClientRect().top,
      }));
      assert.equal(metrics.direction, 'row');
      assert(metrics.collapsedTitles.every(mode => mode === 'vertical-rl'));
      assert(metrics.overflow <= 1);
      assert(metrics.heroTop >= metrics.headerBottom - 1);
      const centered = await page.locator('.workforce-screen-card:not([data-active="true"])').evaluateAll(elements => elements.every(element => {
        const card = element.getBoundingClientRect();
        const title = element.querySelector('.workforce-screen-title').getBoundingClientRect();
        return Math.abs((card.left + card.right - title.left - title.right) / 2) <= 1;
      }));
      assert(centered, 'Collapsed vertical titles must stay centered in their panels');
      const unclipped = await page.locator('.workforce-screen-card:not([data-active="true"])').evaluateAll(elements => elements.every(element => {
        const card = element.getBoundingClientRect();
        const title = element.querySelector('.workforce-screen-title').getBoundingClientRect();
        return title.top >= card.top - 1 && title.bottom <= card.bottom + 1;
      }));
      assert(unclipped, 'Collapsed vertical titles must fit the hero height');
      const sections = page.locator('#home > section');
      for (let i = 0; i < await sections.count(); i++) {
        await sections.nth(i).scrollIntoViewIfNeeded();
        await frames();
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
      }
      const aligned = await sections.evaluateAll(elements => elements.every((element, index) => index === 0 || element.getBoundingClientRect().top >= elements[index - 1].getBoundingClientRect().bottom - 1));
      assert(aligned, 'Homepage sections must remain in order without overlap');
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 1366) await page.screenshot({ path: path.join(out, `home-${percent}.png`) });
      return metrics;
    });
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  for (const route of (smoke ? [] : ['/products', '/contact', '/about-us', '/careers', '/platform', '/solution-builder', '/resources', '/support', '/privacy', '/case-studies'])) {
    await go(route);
    for (const percent of zooms) await check(`${route} ${percent}%`, async () => {
      await zoom(percent);
      const overflow = await page.evaluate(() => {
        document.querySelectorAll('main details').forEach(e => e.open = true);
        return document.documentElement.scrollWidth - innerWidth;
      });
      assert(overflow <= 1, `overflow ${overflow}px`);
      return { effectiveWidth: await page.evaluate(() => innerWidth), overflow };
    });
  }
  // Browser zoom is separate from a phone's coarse-pointer layout.
  const phone = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox'] });
  const mobile = await phone.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  await check('touch mobile layout and orientation resize', async () => {
    await mobile.goto(base + '/', { waitUntil: 'domcontentloaded' });
    await mobile.locator('.site-splash').waitFor({ state: 'detached' });
    assert.equal(await mobile.locator('.workforce-screen-grid').evaluate(e => getComputedStyle(e).flexDirection), 'column');
    await mobile.setViewportSize({ width: 844, height: 390 });
    assert.equal(await mobile.locator('.workforce-screen-grid').evaluate(e => getComputedStyle(e).flexDirection), 'row');
    return {};
  });
  await phone.close();
} finally {
  await browser.close();
  await fs.rm(temporary, { recursive: true, force: true });
}
if (results.some(result => result.status === 'FAIL') || errors.length) process.exitCode = 1;
console.log('RESULT', results.length, 'checks', results.filter(result => result.status === 'FAIL').length, 'failures', errors);
