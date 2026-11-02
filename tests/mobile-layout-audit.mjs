import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_EXECUTABLE || '/snap/bin/chromium',args:['--no-sandbox']});
try {
const page = await browser.newPage();
for (const width of [360,390,428,768,1440]) {
 await page.setViewportSize({width,height:844});
 await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3001'}/hrms-payroll`,{waitUntil:'networkidle'});
 await page.waitForTimeout(1200);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${width}`);
 if(width<1180){
 await page.locator('.mobile-menu > summary').click();
 const panel=await page.locator('.mobile-menu-panel').boundingBox();
 assert(panel.x>=0&&panel.x+panel.width<=width+1);
 await page.locator('.mobile-nav-group > summary').filter({hasText:'HRMS & payroll features'}).click();
 const feature=page.locator('.mobile-nav-group-links a').filter({hasText:'Advanced interview'});
 assert(await feature.isVisible());
 const direction=await feature.evaluate(el=>getComputedStyle(el).display);assert.equal(direction,'block');
 if(width===390)await page.screenshot({path:'/tmp/mobile-menu-fixed.png'});
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.mobile-menu').getAttribute('open'),null);
 }
 if(width<=760){
 const hero=page.locator('[aria-labelledby="device-hero-title"]');await hero.scrollIntoViewIfNeeded();
 const card=page.locator('[aria-label="Connected HRMS feature highlights"] article');
 const bottom=hero.locator('a[href="/contact?solution=hrms-payroll"]');
 const c=await card.boundingBox(),b=await bottom.boundingBox();assert(c.y+c.height<=b.y,`hero overlap at ${width}`);
 if(width===390)await hero.screenshot({path:'/tmp/mobile-hero-fixed.png'});
 }
 console.log(`PASS ${width}px: no overflow, mobile disclosures and hero layout`);
}
} finally {await browser.close();}
