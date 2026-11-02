import {spawn} from 'node:child_process';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from 'playwright';

const root = resolve(import.meta.dirname, '..');
const reportPath = resolve(root, 'RESPONSIVENESS_REPORT.md');
const screenshotDir = resolve(root, 'responsiveness-screenshots');
const base = 'http://127.0.0.1:3001';
const widths = [375, 768, 1440];
const source = await readFile(reportPath, 'utf8');
const rows = [...source.matchAll(/^\| `([^`]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)];
const listedRoutes = new Set(rows.map((row) => row[1]));
let previous = [];
if (process.argv.includes('--resume')) {
  try { previous = JSON.parse(await readFile(resolve(screenshotDir, 'results.json'), 'utf8')); } catch {}
}
if (!rows.length) throw new Error('No page rows found in RESPONSIVENESS_REPORT.md');

let server;
try {
  let ready = false;
  try { const response = await fetch(base, {signal: AbortSignal.timeout(2000)}); ready = response.ok; } catch {}
  if (!ready) {
    server = spawn('npm', ['run', 'dev'], {cwd: root, stdio: 'ignore', detached: true});
    for (let attempt = 0; attempt < 90; attempt++) {
      await new Promise((done) => setTimeout(done, 1000));
      try { await fetch(base, {signal: AbortSignal.timeout(2000)}); ready = true; break; } catch {}
    }
    if (!ready) throw new Error('Dev server did not start within 90 seconds');
  }
  await mkdir(screenshotDir, {recursive: true});
  const browser = await chromium.launch({headless: true, executablePath: '/snap/bin/chromium', args: ['--no-sandbox']});
  try {
    const page = await browser.newPage();
    const results = [];
    const resolveRoute = async (route) => {
      if (!route.includes('[')) return route;
      if (route === '/[seo]') return '/biometric-attendance-system';
      if (route === '/easytime/[slug]') return '/easytime/blog';
      const parent = route.slice(0, route.indexOf('/['));
      await page.goto(base + parent, {waitUntil: 'domcontentloaded', timeout: 45000});
      const links = await page.locator('a[href]').evaluateAll((nodes) => nodes.map((a) => a.getAttribute('href')));
      const match = links.find((href) => href?.startsWith(parent + '/') && href.slice(parent.length + 1).split('/')[0] && !href.slice(parent.length + 1).includes('[') && !listedRoutes.has(href.split('?')[0].split('#')[0]));
      if (!match) throw new Error(`No link found for dynamic route ${route}`);
      return match.split('?')[0].split('#')[0];
    };
    for (const row of rows) {
      const route = row[1];
      const prior = process.argv.includes('--retest=' + route) ? undefined : previous.find((result) => result.route === route);
      if (prior && prior.checks.length === 3 && prior.checks.every((check) => !check.error)) {
        results.push(prior);
        continue;
      }
      const checks = [];
      let concrete = route;
      try { concrete = await resolveRoute(route); } catch (error) {
        results.push({route, concrete, checks: widths.map((width) => ({width, pass: false, error: String(error)}))});
        continue;
      }
      for (const width of widths) {
        const oldCheck = prior?.checks.find((check) => check.width === width && !check.error);
        if (oldCheck) { checks.push(oldCheck); continue; }
        try {
          await page.setViewportSize({width, height: 900});
          const response = await page.goto(base + concrete, {waitUntil: 'domcontentloaded', timeout: 45000});
          await page.locator('body').waitFor();
          await page.waitForTimeout(400);
          const metrics = await page.evaluate(() => {
            const images = [...document.querySelectorAll('img')];
            return {
              scrollWidth: document.body.scrollWidth,
              overflowElements: [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().right > innerWidth + 1).filter(el => { for(let p=el.parentElement;p && p!==document.body;p=p.parentElement) if(['hidden','clip','auto','scroll'].includes(getComputedStyle(p).overflowX)) return false; return true; }).map(el => ({tag:el.tagName, cls:el.className, right:el.getBoundingClientRect().right})),
              viewportWidth: window.innerWidth,
              maxWidthFailures: images.filter((img) => getComputedStyle(img).maxWidth !== '100%').map((img) => ({src: img.getAttribute('src'), maxWidth: getComputedStyle(img).maxWidth})),
              widthFailures: images.filter((img) => img.getBoundingClientRect().width > window.innerWidth + 1).map((img) => ({src: img.getAttribute('src'), width: Math.round(img.getBoundingClientRect().width)})),
              images: images.length,
            };
          });
          const pass = response?.ok() && metrics.scrollWidth <= metrics.viewportWidth && !metrics.maxWidthFailures.length && !metrics.widthFailures.length;
          checks.push({width, pass: Boolean(pass), status: response?.status(), ...metrics});
          if (width === 375) await page.screenshot({path: resolve(screenshotDir, `${route.replace(/^\//, '').replaceAll('/', '_').replaceAll('[', '').replaceAll(']', '') || 'home'}.png`), fullPage: true, animations: 'disabled', timeout: 30000});
        } catch (error) { checks.push({width, pass: false, error: String(error)}); }
      }
      results.push({route, concrete, checks});
      console.log(`${route} -> ${concrete}: ${checks.map((check) => check.pass ? 'PASS' : 'FAIL').join(' / ')}`);
    }
    let updated = source;
    for (const result of results) {
      const old = updated.split('\n').find((line) => line.startsWith(`| \`${result.route}\` |`));
      if (!old) throw new Error(`Missing report row for ${result.route}`);
      updated = updated.replace(old, (() => {
        const cells = old.split('|');
        for (let i = 0; i < 3; i++) cells[i + 2] = ` ${result.checks[i].pass ? '✅ PASS' : '❌ FAIL'} `;
        return cells.join('|');
      })());
    }
    const passed = results.flatMap((result) => result.checks).filter((check) => check.pass).length;
    updated = updated.replace('⚠️ MINOR ISSUES — browser review pending', passed === results.length * 3 ? '✅ PASS' : '❌ NEEDS WORK');
    updated = updated.replace(/\*\*Overall Status\*\* \| [^|]+ \|/, `**Overall Status** | ${passed === results.length * 3 ? '✅ PASS' : '❌ NEEDS WORK'} |`);
    updated = updated.replace(/(?:The width columns show \*\*⚠️\*\*|Playwright measured)[^\n]*/, `Playwright measured ${passed}/${results.length * 3} page-width combinations. Dynamic routes use one representative linked URL per page template. Screenshots are in \`responsiveness-screenshots/\`.`);
    const overflow = results.flatMap((result) => result.checks.filter((check) => check.scrollWidth > check.viewportWidth).map((check) => `${result.route} at ${check.width}px`));
    updated = updated.replace(/(?<=## Executive Summary\n\n)[\s\S]*?(?=\n---\n)/, `Playwright tested ${results.length * 3} page-width combinations; ${passed} passed all requested checks. ${overflow.length ? `Horizontal overflow was measured on ${overflow.join(' and ')}.` : 'No horizontal overflow was measured.'} Fixed pixel image caps also fail the literal computed \`max-width: 100%\` check, even where the page fits.\n`);
    const summary = results.flatMap((result) => result.checks.filter((check) => !check.pass).map((check) => {
      const problems = check.error ? [check.error] : [check.status >= 400 && `HTTP ${check.status}`, check.scrollWidth > check.viewportWidth && `horizontal scroll ${check.scrollWidth}px`, check.maxWidthFailures?.length && `${check.maxWidthFailures.length} image max-width failures`, check.widthFailures?.length && `${check.widthFailures.length} oversized images`].filter(Boolean);
      return `| \`${result.route}\` (${check.width}px) | ${problems.join('; ')} |`;
    }));
    updated = updated.split('\n## Playwright Audit Results\n')[0];
    updated += `\n## Playwright Audit Results\n\n| Page and width | Failure details |\n|----------------|-----------------|\n${summary.length ? summary.join('\n') : '| All | None |'}\n`;
    await writeFile(reportPath, updated);
    await writeFile(resolve(screenshotDir, 'results.json'), JSON.stringify(results, null, 2));
    console.log(`Completed: ${passed}/${results.length * 3} checks passed`);
  } finally { await browser.close(); }
} finally { if (server) process.kill(-server.pid, 'SIGTERM'); }
