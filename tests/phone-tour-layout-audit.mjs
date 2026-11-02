import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE || '/snap/bin/chromium',args:['--no-sandbox']});
try{
const page=await browser.newPage({isMobile:true,hasTouch:true});
for(const [width,height] of [[360,560],[390,640],[390,780]]){
await page.setViewportSize({width,height});await page.goto(`${process.env.AUDIT_BASE_URL||'http://localhost:3001'}/easytime`,{waitUntil:'networkidle'});
await page.locator('[data-phone-role]').first().click();const dialog=page.locator('dialog.phone-tour');await dialog.locator('.pt-play').click();
for(let i=0;i<9;i++){
if(i)await dialog.locator('.pt-next').click();await page.waitForTimeout(100);
await dialog.locator('.pt-tour-detail').waitFor({state:'visible'});
const {phone,detail}=await dialog.evaluate(el=>({phone:el.querySelector('.pt-phone').getBoundingClientRect().toJSON(),detail:el.querySelector('.pt-tour-detail').getBoundingClientRect().toJSON()}));
assert(detail.y>=phone.y+phone.height-1,'explanation overlaps phone');assert(detail.y+detail.height<=height,'explanation offscreen');
assert.equal(await dialog.evaluate(el=>el.scrollHeight>el.clientHeight+2),false,'modal overflow');
}
if(height===640)await page.screenshot({path:'/tmp/easytime-unobscured.png'});
console.log(`PASS ${width}x${height}: features 1–9 have no phone/explanation overlap`);
await dialog.locator('.pt-close').click();
}
}finally{await browser.close()}
