import fs from 'node:fs/promises';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const mode = process.env.IMAGE_AUDIT_MODE || 'all';
const base = process.env.AUDIT_BASE_URL || 'http://localhost:3001';
const out = path.resolve('audits/responsiveness/images');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox'] });
const results = process.env.AUDIT_RESUME === '1' ? JSON.parse(await fs.readFile(path.join(out, 'decoded.json'), 'utf8').catch(() => '[]')).filter(r => r.status === 'PASS') : [];
const routes = JSON.parse(await fs.readFile('audits/responsiveness/laptops/routes.json', 'utf8'));
async function geometry(page) {
  return page.evaluate(() => {
    const issues = [];
    let images = 0;
    for (const img of document.images) {
      const box = img.getBoundingClientRect();
      if (!box.width || !box.height) continue;
      images++;
      const style = getComputedStyle(img);
      if (style.objectFit === 'fill' && img.naturalWidth && Math.abs(box.width / box.height / (img.naturalWidth / img.naturalHeight) - 1) > .1) issues.push({ src: img.getAttribute('src'), reason: 'distortion' });
      if (img.hasAttribute('data-nimg') && img.getAttribute('data-nimg') === 'fill') {
        const parent = img.parentElement.getBoundingClientRect();
        if (Math.abs(box.width - parent.width) > 2 || Math.abs(box.height - parent.height) > 2) issues.push({ src: img.getAttribute('src'), reason: 'fill dimensions differ from container' });
      }
    }
    return { images, issues, overflow: document.documentElement.scrollWidth - innerWidth };
  });
}
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  for (const route of (mode === 'scaling' ? [] : routes.filter(route => !results.some(r => r.route === route)))) {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.locator('.site-splash').waitFor({ state: 'detached' });
    const loaded = await page.evaluate(async () => {
      const imgs = [...document.images];
      imgs.forEach(img => img.loading = 'eager');
      return Promise.all(imgs.map(async img => {
        try { const asset = new Image(); asset.src = img.currentSrc || img.src; await Promise.race([asset.decode(), new Promise((_, reject) => setTimeout(() => reject(new Error('Image decode timed out')), 60000))]); return { src: img.getAttribute('src'), loaded: true }; }
        catch { return { src: img.getAttribute('src'), loaded: false }; }
      }));
    });
    const metrics = await geometry(page);
    const broken = loaded.filter(img => !img.loaded);
    const record = { route, ...metrics, broken, decoded: loaded.length, status: broken.length || metrics.issues.length || metrics.overflow > 1 ? 'FAIL' : 'PASS' };
    results.push(record);
    if (record.status === 'FAIL') await page.screenshot({ path: path.join(out, `failure-${route.replaceAll('/', '-') || 'home'}.png`), fullPage: true });
    await fs.writeFile(path.join(out, 'decoded.json'), JSON.stringify(results, null, 2));
    console.log(record.status, route, record.decoded, 'images', JSON.stringify(record.issues), JSON.stringify(broken));
  }
  const sweep = process.env.AUDIT_RESUME === '1' ? JSON.parse(await fs.readFile(path.join(out, 'pixel-sweep.json'), 'utf8').catch(() => '[]')) : [];
  for (const route of (mode === 'all' ? ['/', '/products', '/about-us', '/contact', '/careers', '/platform', '/solution-builder', '/case-studies'] : [])) {
    if (sweep.filter(r => r.route === route).length === 2241) continue;
    await page.goto(base + route, { waitUntil: 'domcontentloaded' });
    await page.locator('.site-splash').waitFor({ state: 'detached' });
    await page.evaluate(() => document.fonts.ready);
    for (let width = 320; width <= 2560; width++) {
      if (sweep.some(record => record.route === route && record.width === width)) continue;
      await page.setViewportSize({ width, height: 600 });
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
      const metric = await geometry(page);
      const record = { route, width, height: 600, ...metric, status: metric.issues.length || metric.overflow > 1 ? 'FAIL' : 'PASS' };
      sweep.push(record);
      if (width % 250 === 0) {
        await fs.writeFile(path.join(out, 'pixel-sweep.json'), JSON.stringify(sweep));
        console.log('sweep progress', route, width);
      }
      if (record.status === 'FAIL') await page.screenshot({ path: path.join(out, `failure-${route.replaceAll('/', '-') || 'home'}-${width}.png`) });
    }
    await fs.writeFile(path.join(out, 'pixel-sweep.json'), JSON.stringify(sweep));
    console.log('pixel sweep', route, sweep.filter(r => r.route === route && r.status === 'FAIL').length, 'failures');
  }
  const scaling = [];
  for (const factor of (mode === 'assets' ? [] : [1, 1.25, 1.5, 1.75, 2, 3])) {
    const context = await browser.newContext({ deviceScaleFactor: factor, viewport: { width: Math.round(1920 / factor), height: Math.round(1080 / factor) }, reducedMotion: 'reduce' });
    const scaledPage = await context.newPage();
    for (const route of ['/', '/products', '/about-us', '/contact', '/careers', '/platform', '/solution-builder', '/case-studies']) {
      await scaledPage.goto(base + route, { waitUntil: 'domcontentloaded' });
      await scaledPage.locator('.site-splash').waitFor({ state: 'detached' });
      const metric = await geometry(scaledPage);
      const record = { route, factor, ...metric, status: metric.issues.length || metric.overflow > 1 ? 'FAIL' : 'PASS' };
      scaling.push(record);
      if (record.status === 'FAIL') await scaledPage.screenshot({ path: path.join(out, `failure-scaling-${factor}-${route.replaceAll('/', '-') || 'home'}.png`), fullPage: true });
    }
    await context.close();
  }
  if (mode !== 'assets') await fs.writeFile(path.join(out, 'display-scaling.json'), JSON.stringify(scaling, null, 2));
  if ([...results, ...sweep, ...scaling].some(r => r.status === 'FAIL')) process.exitCode = 1;
} finally { await browser.close(); }
