import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE || '/snap/bin/chromium',args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 for(const width of [360,390,428,768,1440]){
 await page.setViewportSize({width,height:780});await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3001'}/hrms-payroll`,{waitUntil:'networkidle'});
 await page.waitForTimeout(1500);
 const metrics=await page.evaluate(()=>{const s=document.querySelector('[data-travel-device]').parentElement.getBoundingClientRect();const t=document.querySelector('[data-laptop-screen]').getBoundingClientRect();return {source:s.top+scrollY,target:t.top+scrollY}});
 await page.evaluate(m=>scrollTo(0,m.source+(m.target-m.source)*.5-180),metrics);await page.waitForTimeout(1000);
 const transform=await page.locator('[data-travel-device]').evaluate(el=>el.style.transform);assert(!transform.includes('translate(0px,0px)')&&transform!=='none');
 await page.evaluate(m=>scrollTo(0,m.target-120),metrics);await page.waitForTimeout(1500);
 assert.equal(await page.locator('[data-feature-ready]').getAttribute('data-feature-ready'),'true');
 await page.waitForFunction(()=>Number(document.querySelector('[data-travel-device]').style.opacity)<.01,{},{timeout:5000});
 assert((await page.locator('[data-travel-device]').evaluate(el=>Number(el.style.opacity)))<.01);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 if(width===390)await page.screenshot({path:'/tmp/hrms-workflow-followup.png'});
 console.log(`PASS ${width}: laptop travels and arrives; no overflow`);
 }
 for(const height of [640,780]){
 await page.setViewportSize({width:390,height});await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3001'}/easytime`,{waitUntil:'networkidle'});
 await page.locator('.phone-role-entry [data-phone-role], [data-phone-role]').first().click();await page.waitForTimeout(800);
 const dialog=page.locator('dialog.phone-tour');assert(await dialog.isVisible());
 for(const selector of ['.pt-close','.pt-roles','.pt-controls','.pt-phone']){
 const b=await dialog.locator(selector).boundingBox();assert(b.y>=0&&b.y+b.height<=height,`${selector} outside ${height}: ${JSON.stringify(b)}`);
 }
 assert.equal(await dialog.evaluate(el=>el.scrollHeight>el.clientHeight+2),false);
 await page.screenshot({path:`/tmp/easytime-tour-followup-${height}.png`});
 await page.getByRole('button',{name:'Close phone tour',exact:true}).click();assert.equal(await dialog.isVisible(),false);
 console.log(`PASS Easytime ${height}: modal controls and phone fit viewport`);
 }
}finally{await browser.close()}
