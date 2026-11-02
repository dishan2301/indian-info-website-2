import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.env.AUDIT_BASE_URL || 'http://localhost:3001';
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_EXECUTABLE});
try {
 const page = await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const links=new Set();
 for(const route of ['entrance-control-system','contract-labour-management']) {
  for(const width of [1440,390]) {
   await page.setViewportSize({width,height:900});
   const response=await page.goto(`${base}/${route}`,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200);
   await page.locator('h1').waitFor();
   await page.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');});
   await page.waitForTimeout(1800);
   assert.equal(await page.locator('h1').count(),1);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow: ${route} ${width}`);
   const broken=await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>i.offsetWidth>0&&(!i.complete||!i.naturalWidth)).map(i=>i.src));
   assert.deepEqual(broken,[]);
   const faq=page.locator('section details').first();await faq.locator('summary').click();assert(await faq.evaluate(e=>e.open));
   await page.evaluate(()=>{ document.activeElement?.blur(); window.scrollTo({top:0,behavior:'instant'}); });
   await page.waitForTimeout(400);
   if(process.env.AUDIT_OUTPUT_DIR) await page.screenshot({path:`${process.env.AUDIT_OUTPUT_DIR}/${route}-${width}.png`,fullPage:true});
   for(const href of await page.locator('main > section a[href]').evaluateAll(a=>a.map(e=>e.getAttribute('href'))))if(href.startsWith('/')&&!href.startsWith('//'))links.add(href.split('#')[0]);
   console.log(route,width,'OK',await page.locator('h1').innerText());
  }
 }
 for(const link of links){const res=await page.request.get(`${base}${link}`);assert(res.status()<400,`${link}: ${res.status()}`);}
 assert.deepEqual(errors,[]);
 console.log(`${links.size} internal links checked; no browser errors, broken visible images or page overflow.`);
} finally {await browser.close();}
