// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright entry point.
// PREVIEW_URL and CHROMIUM_PATH are optional overrides for the local preview.
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`${process.env.PREVIEW_URL || 'http://localhost:3001'}/hrms-payroll`, { waitUntil: 'domcontentloaded' });
  const section = page.locator('#hrms-features');
  await section.waitFor();
  await page.waitForTimeout(2500);
  await section.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const tabs = section.getByRole('tab');
  assert.equal(await tabs.count(), 14);
  const first = await section.getByRole('tab', { selected: true }).textContent();
  const popup = section.locator('h3');
  const firstPoint = await popup.textContent();
  await page.waitForFunction(text => document.querySelector('#hrms-features h3')?.textContent !== text, firstPoint, { timeout: 6000 });
  await page.waitForFunction(text => document.querySelector('#hrms-features [aria-selected="true"]')?.textContent !== text, first, { timeout: 12000 });
  await page.getByRole('button', { name: 'Pause automatic feature tour' }).click();
  const paused = await section.getByRole('tab', { selected: true }).textContent();
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.activeElement?.blur());
  await page.waitForTimeout(9500);
  assert.equal(await section.getByRole('tab', { selected: true }).textContent(), paused);
  for (let i = 0; i < 14; i++) {
    await tabs.nth(i).click();
    assert.equal(await tabs.nth(i).getAttribute('aria-selected'), 'true');
    assert.ok(await section.locator('[role="tabpanel"] a').getAttribute('href'));
  }
  await tabs.nth(13).press('Home');
  assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true');
  await tabs.nth(0).press('ArrowDown');
  assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
  await section.getByRole('button', { name: 'Next feature', exact: true }).click();
  assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
  await section.getByRole('button', { name: 'Previous feature', exact: true }).click();
  await page.waitForTimeout(800);
  await section.screenshot({ path: '/tmp/hrms-vertical-tabs-desktop.png' });
  const photos = await section.locator('img').evaluateAll(images => images.map(img => ({ loaded: img.complete && img.naturalWidth > 0, fallback: img.dataset.fallback === 'true', source: img.currentSrc })));
  assert.ok(photos.every(photo => photo.loaded && !photo.fallback));
  assert.equal(await page.locator('section[aria-label="The connected employee journey"]').count(), 0);
  assert.ok(await page.getByRole('heading', { name: 'HRMS & Payroll', exact: true }).count());
  await page.setViewportSize({ width: 390, height: 844 });
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await section.screenshot({ path: '/tmp/hrms-vertical-tabs-mobile.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await section.getByRole('button', { name: 'Next feature', exact: true }).click();
  assert.equal(await tabs.nth(2).getAttribute('aria-selected'), 'true');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ features: 14, autoplay: 'passed', popupRotation: 'passed', pause: 'passed', keyboard: 'passed', mobile: 'passed', photos, errors }));
} finally {
  await browser.close();
}
