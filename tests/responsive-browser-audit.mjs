import fs from 'node:fs';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const executablePath = process.env.CHROMIUM_EXECUTABLE;
const out = process.env.AUDIT_OUTPUT_DIR || process.cwd() + '/audits/responsiveness';
fs.mkdirSync(out, { recursive: true });
const widths = [320, 360, 375, 390, 414, 430, 480, 568, 600, 667, 736, 768, 820, 912, 1024, 1280, 1366, 1440, 1536, 1600, 1920, 2560, 3440, 3840];
const base = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
async function matrix(laptops = false) {
    const viewports = laptops ? [[1024,600],[1024,768],[1280,720],[1280,800],[1366,768],[1440,900],[1536,864],[1600,900],[1920,1080],[2560,1600]].map(([width,height]) => ({width,height})) : widths.map(width => ({width,height:900}));
    const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
    const context = await b.newContext({ reducedMotion: 'reduce' });
    const p = await context.newPage();
    await p.goto(base + '/sitemap.xml');
    const xml = await p.locator('body').innerText();
    const paths = [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat(['/careers', '/search', '/about', '/contract-labour-management', '/industries/pharma', '/not-a-real-route', '/products/not-a-valid-product', '/software/not-a-valid-software', '/hrms-payroll/not-a-valid-module', '/industries/not-a-valid-industry', '/solutions/not-a-valid-solution', '/insights/not-a-valid-post', '/case-studies/not-a-valid-story']))];
    // Catalogue family URLs are valid dynamic pages outside the sitemap.
    await p.goto(base + '/products');
    await p.waitForTimeout(300);
    paths.push(...await p.locator('.mobile-menu a[href^="/products/"]').evaluateAll(es => es.map(e => new URL(e.href).pathname)));
    const routes = [...new Set(paths)];
    fs.writeFileSync(out + '/routes.json', JSON.stringify(routes, null, 2));
    const previous = process.env.AUDIT_RESUME === '1' && fs.existsSync(out + '/matrix.json') ? JSON.parse(fs.readFileSync(out + '/matrix.json', 'utf8')) : { results: [], errors: [] };
    const recheck = new Set((process.env.AUDIT_RECHECK_ROUTES || '').split(',').filter(Boolean));
    const complete = new Set(routes.filter(route => !recheck.has(route) && viewports.every(({width,height}) => previous.results.some(r => r.route === route && r.width === width && r.height === height))));
    const results = previous.results.filter(r => complete.has(r.route));
    const errors = [...previous.errors];
    p.on('pageerror', e => errors.push(e.message));
    let cursor = 0;
    await Promise.all(Array.from({ length: Number(process.env.AUDIT_WORKERS || 1) }, async () => {
        const p = await context.newPage();
        p.on('pageerror', e => errors.push(e.message));
        while (cursor < routes.length) {
            const i = cursor++;
            const route = routes[i];
            if (complete.has(route))
                continue;
            try {
                await p.setViewportSize({ width: 320, height: 900 });
                const response = await p.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
                await p.locator('.site-splash').waitFor({ state: 'detached', timeout: 10000 });
                await p.evaluate(() => document.fonts.ready);
                await p.addStyleTag({ content: 'html {font-size:200% !important}' });
                const enlargedOverflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
                await p.locator('style').filter({ hasText: 'html {font-size:200% !important}' }).evaluateAll(es => es.forEach(e => e.remove()));
                for (const {width,height} of viewports) {
                    await p.setViewportSize({ width, height });
                    await p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
                    const expandedOverflow = await p.evaluate(() => { const details = [...document.querySelectorAll('main details')].filter(e => !e.closest('.mobile-menu')); const previous = details.map(e => e.open); details.forEach(e => e.open = true); const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth; details.forEach((e, i) => e.open = previous[i]); return { overflow, count: details.length }; });
                    const r = await p.evaluate(() => ({ overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, scrollLocked: ['hidden', 'clip'].includes(getComputedStyle(document.body).overflowY), offenders: [...document.querySelectorAll('body *')].filter(e => {
                            const r = e.getBoundingClientRect();
                            if (r.width === 0 || r.right <= innerWidth + 1 && r.left >= -1)
                                return false;
                            let a = e.parentElement;
                            while (a && a !== document.body) {
                                const c = getComputedStyle(a);
                                if (['hidden', 'clip', 'auto', 'scroll'].includes(c.overflowX))
                                    return false;
                                a = a.parentElement;
                            }
                            return getComputedStyle(e).position !== 'fixed';
                        }).slice(0, 10).map(e => ({ tag: e.tagName, cls: String(e.className), width: Math.round(e.getBoundingClientRect().width) })) }));
                    const navigation = await p.locator('.site-header').evaluateAll(headers => headers.flatMap(header => {
                        const boxes = [...header.querySelectorAll('.brand, .brand-mark, .premium-nav-rail > a, .premium-nav-rail > button, .header-cta, .mobile-menu > summary')].filter(e => e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden' && getComputedStyle(e).opacity !== '0').map(e => ({text:e.textContent || e.getAttribute('aria-label'),box:e.getBoundingClientRect()}));
                        return boxes.flatMap((a,i) => boxes.slice(i+1).filter(b => Math.min(a.box.right,b.box.right)-Math.max(a.box.left,b.box.left)>1 && Math.min(a.box.bottom,b.box.bottom)-Math.max(a.box.top,b.box.top)>1).map(b => [a.text,b.text]));
                    }));
                    const images = await p.locator('img').evaluateAll(elements => {
                        const issues = [];
                        let loaded = 0, pending = 0;
                        for (const image of elements) {
                            const box = image.getBoundingClientRect();
                            if (!box.width || !box.height || image.closest('[aria-hidden="true"]')) continue;
                            if (!image.naturalWidth) { if (image.complete) issues.push({src:image.src,issue:'broken image'}); else pending++; continue; }
                            loaded++;
                            const style = getComputedStyle(image);
                            if (style.objectFit === 'fill' && Math.abs((box.width/box.height)/(image.naturalWidth/image.naturalHeight)-1) > .1) issues.push({src:image.src,issue:'distorted aspect ratio',width:box.width,height:box.height});
                            if (box.left < -1 || box.right > innerWidth+1) {
                                let parent = image.parentElement, contained = false;
                                while (parent && parent !== document.body) { if (['hidden','clip','auto','scroll'].includes(getComputedStyle(parent).overflowX)) {contained=true;break;} parent=parent.parentElement; }
                                if (!contained && style.position !== 'fixed') issues.push({src:image.src,issue:'image exceeds viewport'});
                            }
                        }
                        return {loaded,pending,issues};
                    });
                    if (r.overflow > 1 || expandedOverflow.overflow > 1 || navigation.length || images.issues.length || response?.status() >= 500) await p.screenshot({path: `${out}/failure-${route.slice(1).replaceAll('/', '-') || 'home'}-${width}x${height}.png`,fullPage:true});
                    results.push({ route, width, height, navigation, images, status: response.status(), expandedOverflow, enlargedOverflow, ...r });
                }
                console.log(`${i + 1}/${routes.length} ${route}: ${results.filter(r => r.route === route && r.overflow > 1).map(r => r.width).join(',') || 'no overflow'}`);
            }
            catch (e) {
                results.push({ route, error: e.message });
                console.log(route, e.message);
            }
            fs.writeFileSync(out + '/matrix.json', JSON.stringify({ routes, widths, viewports, results, errors }, null, 2));
        }
        await p.close();
    }));
    if (results.some(r => r.overflow > 1 || r.expandedOverflow?.overflow > 1 || r.enlargedOverflow > 1 || r.scrollLocked || r.navigation?.length || r.images?.issues.length || r.status >= 500 || r.error) || errors.length)
        process.exitCode = 1;
    await b.close();
    console.log('RESULT', results.length, 'checks', results.filter(r => r.overflow > 1 || r.expandedOverflow?.overflow > 1 || r.enlargedOverflow > 1 || r.scrollLocked || r.navigation?.length || r.images?.issues.length || r.status >= 500 || r.error).length, 'failures');
}
async function interactions() {
    const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
    const p = await b.newPage({ reducedMotion: 'reduce' });
    const results = [];
    async function check(name, fn) {
        try {
            await fn();
            results.push({ name, status: 'PASS' });
            console.log('PASS', name);
        }
        catch (e) {
            results.push({ name, status: 'FAIL', error: e.message });
            console.log('FAIL', name, e.message.slice(0, 200));
        }
        fs.writeFileSync(out + '/interactions.json', JSON.stringify(results, null, 2));
    }
    async function go(route) { await p.goto(base + route, { waitUntil: 'domcontentloaded' }); await p.locator('.site-splash').waitFor({ state: 'detached' }); }
    async function fit() { assert((await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 1); }
    for (const [width, height] of [[320, 568], [736, 360], [768, 800], [1024, 768], [1366, 768], [1920, 1080]]) {
        await p.setViewportSize({ width, height });
        await check(`menu ${width}x${height}`, async () => {
            await go('/');
            if (width <= 1180) {
                const summary = p.locator('.mobile-menu > summary');
                await summary.focus();
                await p.keyboard.press('Enter');
                assert(await p.locator('.mobile-menu').evaluate(e => e.open));
                const menu = p.locator('.mobile-menu-panel');
                const bounds = await menu.boundingBox();
                assert(bounds.x >= 0 && bounds.x + bounds.width <= width + 1);
                assert(bounds.y + bounds.height <= height);
                assert(await menu.evaluate(e => getComputedStyle(e).overflowY === 'auto'));
                for (const href of ['/contact', '/compare', '/search', '/software/hrms-payroll', '/industries/pharma'])
                    assert(await menu.locator(`a[href="${href}"]`).count() > 0);
                await menu.locator('.mobile-menu-groups details').first().locator('summary').click();
                await fit();
                await p.keyboard.press('Escape');
                assert(!(await p.locator('.mobile-menu').evaluate(e => e.open)));
                assert(await summary.evaluate(e => document.activeElement === e));
                await summary.click();
                await menu.locator('a[href="/contact"]').last().click();
                await p.waitForURL('**/contact');
            }
            else {
                const trigger = p.locator('.premium-nav-trigger').first();
                await trigger.focus();
                await p.waitForTimeout(200);
                const panel = p.locator('.premium-mega-panel.is-active');
                assert(await panel.isVisible());
                await panel.locator('a').first().focus();
                await p.keyboard.press('Escape');
                assert(await trigger.evaluate(e => document.activeElement === e));
                await p.waitForTimeout(100);
                assert(!(await panel.count()));
            }
            await fit();
        });
        await check(`catalogue empty, filters, comparison ${width}`, async () => { await go('/products'); await p.getByRole('searchbox', { name: 'Search catalogue' }).fill('zzzz-no-matching-model'); assert(await p.getByText('No products match these filters.').isVisible()); await p.getByRole('button', { name: 'Reset catalogue' }).click(); await p.locator('.comparison-toggle').nth(0).click(); await p.locator('.comparison-toggle').nth(1).click(); await p.locator('.comparison-toggle').nth(2).click(); assert.equal(await p.locator('.product-comparison th[scope="col"]').count(), 4); await fit(); const scroller = p.locator('.comparison-scroll'); await scroller.evaluate(e => e.scrollLeft = e.scrollWidth); await p.getByRole('button', { name: 'Clear comparison', exact: true }).click(); assert.equal(await p.locator('.product-comparison').count(), 0); });
        await check(`search results and empty ${width}`, async () => { await go('/search'); await p.locator('#site-search').fill('attendance'); assert(await p.locator('.search-results a').count() > 0); await fit(); await p.locator('#site-search').fill('zzzz-not-a-result'); assert(await p.getByText('No matching content').isVisible()); await fit(); });
        await check(`contact validation, mocked error and success ${width}`, async () => { await go('/contact'); await p.locator('.contact-form button[type="submit"]').click(); assert(!(await p.locator('#contact-name').evaluate(e => e.validity.valid))); await p.locator('#contact-name').fill('Responsive test'); await p.locator('#contact-email').fill('test@example.com'); await p.locator('#contact-phone').fill('9000000000'); await p.locator('#contact-message').fill('Layout test, intercepted locally.'); await p.locator('#contact-consent').check(); await p.route('https://formsubmit.co/**', r => r.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Test error' }) })); await p.locator('.contact-form button[type="submit"]').click(); await p.waitForTimeout(500); await p.locator('.contact-form-status-error').waitFor(); assert.match(await p.locator('.contact-form-status').innerText(), /temporarily unavailable/); await fit(); await p.unroute('https://formsubmit.co/**'); await p.route('https://formsubmit.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) })); await p.locator('.contact-form button[type="submit"]').click(); await p.locator('.contact-form-status-sent').waitFor(); await fit(); await p.unroute('https://formsubmit.co/**'); });
        await check(`builder selection ${width}`, async () => { await go('/solution-builder'); await p.locator('#size').selectOption('2000+'); await p.locator('.builder-options input[type="checkbox"]').last().check(); assert(await p.locator('.builder-result').isVisible()); await fit(); });
        await check(`resources empty, filter and ROI ${width}`, async () => {
            await go('/resources');
            await p.getByRole('searchbox').fill('zzzz-no-resource');
            assert(await p.locator('.resource-empty').isVisible());
            await p.getByRole('searchbox').fill('');
            await p.locator('.resource-controls fieldset button').last().click();
            if (await p.locator('.roi-controls').count()) {
                await p.locator('.roi-controls input').first().fill('100000');
                await fit();
                await p.locator('.roi-controls input').last().fill('0');
                await fit();
            }
        });
        await check(`support empty and filters ${width}`, async () => { await go('/support'); await p.getByRole('searchbox').fill('zzzz-not-support'); assert(await p.getByText('No support results').isVisible()); await p.getByRole('searchbox').fill(''); await p.locator('.resource-controls fieldset button').last().click(); await fit(); });
        await check(`homepage carousel controls and reduced motion ${width}`, async () => { await go('/'); await p.getByRole('button', { name: 'Next client quote' }).click(); assert.equal(await p.locator('.home-quote-dots [aria-current="true"]').count(), 1); await p.getByRole('button', { name: 'Next article' }).click(); assert.equal(await p.locator('.home-news-dots [aria-current="true"]').count(), 1); const state = await p.locator('.home-industry-list [aria-pressed="true"]').innerText(); await p.waitForTimeout(3200); assert.equal(await p.locator('.home-industry-list [aria-pressed="true"]').innerText(), state); await fit(); });
    }
    if (results.some(r => r.status === 'FAIL'))
        process.exitCode = 1;
    await b.close();
    console.log(results.filter(r => r.status === 'FAIL').length, 'failures');
}
async function extra() {
    const b = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
    const p = await b.newPage({ reducedMotion: 'reduce' });
    const results = [];
    async function check(name, fn) {
        try {
            await fn();
            results.push({ name, status: 'PASS' });
        }
        catch (e) {
            results.push({ name, status: 'FAIL', error: e.message });
        }
        console.log(results.at(-1));
        fs.writeFileSync('audits/responsiveness/extra.json', JSON.stringify(results, null, 2));
    }
    ;
    async function go(r) { await p.goto(base + r, { waitUntil: 'domcontentloaded' }); await p.locator('.site-splash').waitFor({ state: 'detached' }); }
    ;
    async function fit() { assert(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); }
    for (const [width, height] of [[320, 568], [375, 667], [768, 800], [1024, 768], [1366, 568], [1920, 1080]]) {
        await p.setViewportSize({ width, height });
        await check(`product viewer controls, swipe and thumbnails ${width}`, async () => { await go('/products/ai-60'); const badge = p.locator('.product-viewer-badge'); const original = await badge.innerText(); await p.locator('.product-viewer-controls button').last().click(); assert.notEqual(await badge.innerText(), original); await p.locator('.product-viewer-controls button').first().focus(); await p.keyboard.press('Enter'); assert.equal(await badge.innerText(), original); await p.locator('.product-viewer-thumbs button').last().click(); assert.equal(await p.locator('.product-viewer-thumbs [aria-pressed="true"]').count(), 1); await p.locator('.product-viewer-stage').dispatchEvent('pointerdown', { clientX: 200, pointerType: 'touch' }); await p.locator('.product-viewer-stage').dispatchEvent('pointerup', { clientX: 100, pointerType: 'touch' }); await fit(); });
        await check(`FAQ open and keyboard access ${width}`, async () => { await go('/access-control-system'); const details = p.locator('.seo-faq details').first(); await details.locator('summary').focus(); await p.keyboard.press('Enter'); assert(await details.evaluate(e => e.open)); await fit(); await p.keyboard.press('Enter'); assert(!(await details.evaluate(e => e.open))); });
    }
    for (const route of ['/', '/contact', '/products', '/about-us', '/careers', '/resources', '/solution-builder', '/hrms-payroll', '/privacy'])
        for (const width of [320, 640, 1280])
            await check(`200% text enlargement ${route} ${width}`, async () => {
                await p.setViewportSize({ width, height: 800 });
                await go(route);
                await p.addStyleTag({ content: 'html {font-size:200% !important}' });
                await fit();
                if (await p.locator('.mobile-menu').isVisible()) {
                    await p.locator('.mobile-menu > summary').click();
                    await fit();
                    const rect = await p.locator('.mobile-menu-panel').boundingBox();
                    assert(rect.x >= -1 && rect.x + rect.width <= width + 1);
                }
            });
    for (const height of [568, 667, 768, 800, 900, 1080])
        for (const width of [320, 768, 1366])
            await check(`independent height ${width}x${height}`, async () => { await p.setViewportSize({ width, height }); await go('/'); await fit(); await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); assert(await p.evaluate(() => window.scrollY > 0)); });
    for (const dpr of [1, 2, 3])
        await check(`DPR ${dpr}`, async () => { const c = await b.newContext({ deviceScaleFactor: dpr, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); const q = await c.newPage(); await q.goto(base, { waitUntil: 'domcontentloaded' }); await q.locator('.site-splash').waitFor({ state: 'detached' }); assert(await q.evaluate(() => devicePixelRatio) === dpr); assert(await q.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); await c.close(); });
    if (results.some(r => r.status === 'FAIL'))
        process.exitCode = 1;
    await b.close();
}
async function screenshots() {
    const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const routes = ['/', '/products', '/products/ai-60', '/contact', '/about-us', '/careers', '/privacy', '/platform', '/solution-builder', '/resources', '/support', '/industries/pharma', '/hrms-payroll', '/access-control-system', '/developers/integration-reference'];
    const media = [];
    for (const route of routes) {
        await page.goto(base + route, { waitUntil: 'domcontentloaded' });
        await page.locator('.site-splash').waitFor({ state: 'detached' });
        await page.locator('img').evaluateAll(es => Promise.all(es.map(e => { e.loading = 'eager'; return e.decode().catch(() => { }); })));
        media.push({ route, broken: await page.locator('img').evaluateAll(es => es.filter(e => !e.naturalWidth).map(e => e.src)) });
        for (const width of route === '/' ? [320, 375, 768, 1024, 1366, 1920, 2560, 3840] : [320, 768, 1366, 3840]) {
            await page.setViewportSize({ width, height: 900 });
            // Freeze scroll reveals and render offscreen content only for full-page screenshots.
            await page.evaluate(() => {
                document.querySelectorAll('.home-reveal').forEach(e => e.dataset.visible = 'true');
                document.querySelectorAll('body *').forEach(e => {
                    if (getComputedStyle(e).contentVisibility === 'auto')
                        e.style.contentVisibility = 'visible';
                });
                window.scrollTo(0, 0);
            });
            await page.screenshot({ path: `${out}/after-${route.slice(1).replaceAll('/', '-') || 'home'}-${width}.png`, fullPage: true });
            if (route === '/')
                await page.locator('.workforce-screen').screenshot({ path: `${out}/hero-${width}.png` });
            console.log('screenshot', route, width);
        }
    }
    fs.writeFileSync(out + '/media.json', JSON.stringify(media, null, 2));
    await browser.close();
}
async function dense() {
    const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const results = [];
    const sweep = [...new Set([...Array.from({ length: 44 }, (_, i) => 320 + i * 37), 759, 760, 761, 979, 980, 981, 1179, 1180, 1181, 1920])].sort((a, b) => a - b);
    for (const route of ['/', '/products', '/about-us', '/contact', '/careers', '/platform', '/solution-builder', '/case-studies']) {
        await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await page.locator('.site-splash').waitFor({ state: 'detached' });
        await page.evaluate(() => document.fonts.ready);
        for (const width of sweep) {
            await page.setViewportSize({ width, height: 800 });
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
            results.push({ route, width, height: 800, overflow, status: overflow <= 1 ? 'PASS' : 'FAIL' });
        }
        fs.writeFileSync(out + '/dense.json', JSON.stringify(results, null, 2));
        console.log('dense', route, results.filter(r => r.route === route && r.status === 'FAIL'));
    }
    await browser.close();
    if (results.some(r => r.status === 'FAIL'))
        process.exitCode = 1;
}
const modes = { matrix, laptops: () => matrix(true), interactions, extra, screenshots, dense };
const mode = process.argv[2] || 'matrix';
if (!modes[mode])
    throw new Error(`Unknown audit mode: ${mode}`);
await modes[mode]();
