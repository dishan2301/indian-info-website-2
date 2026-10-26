// Browser acceptance using existing published content only. Never creates fixtures/documents.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {loadTsModule} from './helpers/load-ts-module.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {insights}=loadTsModule(new URL('../app/insights/content.ts',import.meta.url));
const base=new URL(process.env.PREVIEW_BASE_URL || 'http://localhost:3113');
const output=process.env.ARTICLE_AUDIT_OUTPUT || '/tmp/indian-infotech-publishing';await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH,args:['--no-sandbox']});
const context=await browser.newContext({reducedMotion:'reduce'});
if(process.env.VERCEL_AUTOMATION_BYPASS_SECRET)await context.route('**/*',route=>{
  if(new URL(route.request().url()).origin===base.origin)return route.continue({headers:{...route.request().headers(),'x-vercel-protection-bypass':process.env.VERCEL_AUTOMATION_BYPASS_SECRET}});
  return route.continue();
});
const metrics=[];
try {
  const page=await context.newPage();
  for(const width of [1920,1366,768,375]) {
    await page.setViewportSize({width,height:1000});
    for(const slug of [...insights.map(x=>x.slug),'demo']) {
      const r=await page.goto(new URL('/insights/'+slug,base).href,{waitUntil:'load',timeout:45000});assert.equal(r.status(),200);
      await page.evaluate(()=>document.fonts.ready);await page.locator('.site-splash').waitFor({state:'detached',timeout:15000});
      const result=await page.evaluate(()=>{
        const body=document.querySelector('.insight-article-body');const p=body.querySelector('section p');const h2=body.querySelector('section h2');
        const style=el=>{const s=getComputedStyle(el);return {fontFamily:s.fontFamily,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight}};
        return {bodyWidth:body.getBoundingClientRect().width,p:p?style(p):null,h2:h2?style(h2):null,overflow:document.documentElement.scrollWidth>innerWidth,title:document.title,canonical:document.querySelector('link[rel="canonical"]')?.href,schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent)),imageAlts:[...document.querySelectorAll('.insight-article img')].map(img=>img.alt)};
      });
      assert.ok(result.bodyWidth<=760);assert.equal(result.overflow,false);assert.ok(result.p.fontFamily.includes('Geist'));assert.equal(result.p.fontSize,'16.32px');assert.equal(result.p.lineHeight,'30.192px');
      assert.equal(result.canonical,`https://indianinfotech.org/insights/${slug}`);
      assert.ok(result.schemas.some(s=>['BlogPosting','NewsArticle'].includes(s['@type'])));
      await page.locator('.insight-article').evaluate(async el=>{await Promise.all([...el.querySelectorAll('img')].map(img=>img.decode().catch(()=>{})))});
      assert.equal(await page.locator('.insight-article img').evaluateAll(imgs=>imgs.filter(img=>!img.complete||img.naturalWidth===0).length),0,'Article images load');
      metrics.push({width,slug,...result});
      if(slug==='demo'||slug===insights[3].slug){await page.locator('.insight-article-body').scrollIntoViewIfNeeded();await page.evaluate(()=>scrollTo(0,document.querySelector('.insight-article-body').getBoundingClientRect().top+scrollY-110));await page.screenshot({path:`${output}/${width}-${slug==='demo'?'demo':'original'}.png`,animations:'disabled'});}
    }
    for(const path of ['/','/insights']) {
      const r=await page.goto(new URL(path,base).href,{waitUntil:'load',timeout:45000});assert.equal(r.status(),200);await page.locator('.site-splash').waitFor({state:'detached',timeout:15000});
      if(path==='/') {assert.equal(await page.locator('.home-news-track > a').count(),5);assert.equal(await page.locator('.home-news-track > a[href="/insights/demo"]').count(),1);}
      else {for(const article of insights)assert.ok(await page.locator(`.insight-grid a[href="/insights/${article.slug}"]`).count()>0);assert.ok(await page.locator('.insight-grid a[href="/insights/demo"]').count()>0);}
    }
    console.log(`PASS ${width}px: five originals, real demo, homepage/listing, metadata and image loading`);
  }
  await writeFile(`${output}/real-content-computed.json`,JSON.stringify(metrics,null,2));
} finally {await browser.close();}
