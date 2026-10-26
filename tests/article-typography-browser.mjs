// Run against a production build. PLAYWRIGHT_MODULE / PLAYWRIGHT_EXECUTABLE_PATH
// allow an existing browser installation without adding a website dependency.
import assert from 'node:assert/strict';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {createElement as h} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {loadTsModule} from './helpers/load-ts-module.mjs';

const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {ArticleBody}=loadTsModule(new URL('../components/article-body.tsx',import.meta.url));
const {ArticlePortableText}=loadTsModule(new URL('../components/article-portable-text.tsx',import.meta.url));
const {insights}=loadTsModule(new URL('../app/insights/content.ts',import.meta.url));
const base=process.env.ARTICLE_BASE_URL || 'http://localhost:3112';
const output=process.env.ARTICLE_AUDIT_OUTPUT || '/tmp/indian-infotech-typography';
const baseline=process.env.ARTICLE_BASELINE ? JSON.parse(await readFile(process.env.ARTICLE_BASELINE,'utf8')) : null;
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true, executablePath:process.env.PLAYWRIGHT_EXECUTABLE_PATH,args:['--no-sandbox']});
const results=[];
const block=(style,text,extra={})=>({_key:text,_type:'block',style,markDefs:[],children:[{_type:'span',text,marks:[]}],...extra});

async function computed(page) {
  return page.evaluate(()=>{
    const selectors={h1:'.page-hero h1',body:'.insight-article-body',section:'.insight-article-body section',h2:'.insight-article-body section h2',h3:'.insight-article-body section h3',p:'.insight-article-body section p',ul:'.insight-article-body section ul',ol:'.insight-article-body section ol',li:'.insight-article-body section li',link:'.insight-references a',image:'.insight-article-image',byline:'.insight-byline'};
    const props=['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','color','textAlign','marginTop','marginBottom','marginLeft','marginRight','paddingTop','paddingBottom','paddingLeft','paddingRight','maxWidth','listStyleType','textDecorationLine','borderTopWidth','borderBottomWidth','aspectRatio'];
    return Object.fromEntries(Object.entries(selectors).map(([key,selector])=>{
      const el=document.querySelector(selector); if(!el)return [key,null]; const style=getComputedStyle(el);
      return [key,{...Object.fromEntries(props.map(p=>[p,style[p]])),width:el.getBoundingClientRect().width}];
    }));
  });
}
async function ready(page) {
  await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.locator('body').evaluate(el=>getComputedStyle(el).fontFamily.includes('Geist')), 'Site CSS must load');
  await page.locator('.site-splash').waitFor({state:'detached',timeout:15000});
}
async function screenshot(page,path) {
  const body=page.locator('.insight-article-body');
  await body.scrollIntoViewIfNeeded();
  await page.evaluate(()=>scrollTo(0,document.querySelector('.insight-article-body').getBoundingClientRect().top+scrollY-110));
  await page.screenshot({path,animations:'disabled'});
}
try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  for(const width of [1920,1366,768,375]) {
    await page.setViewportSize({width,height:1000});
    for(const article of insights) {
      const response=await page.goto(`${base}/insights/${article.slug}`,{waitUntil:'load',timeout:45000});
      assert.equal(response.status(),200);
      await ready(page);
      const original=await computed(page);
      const approved=baseline?.find(item=>item.width===width&&item.slug===article.slug)?.metrics;
      if(baseline) assert.ok(approved, 'Approved snapshot exists');
      if(approved) assert.deepEqual(original,approved,`Original design changed: ${width}/${article.slug}`);
      const approvedSizes={1920:{h1:72,h2:44.8,body:760},1366:{h1:58.738,h2:38.248,body:760},768:{h1:39.2,h2:28,body:675.84375},375:{h1:36.8,h2:28,body:335}}[width];
      for(const key of ['h1','h2']) assert.ok(Math.abs(parseFloat(original[key].fontSize)-approvedSizes[key])<.01, `${key} approved size`);
      assert.ok(Math.abs(original.body.width-approvedSizes.body)<.01,'Approved column width');
      assert.equal(original.image.aspectRatio,width<=760?'4 / 3':'16 / 8');
      assert.equal(await page.locator('.insight-article-body > section:not([class])').first().evaluate(el=>getComputedStyle(el).paddingTop),'40px');
      assert.ok(original.body.width <= 760);
      assert.equal(original.p.fontSize,'16.32px');
      assert.equal(original.p.lineHeight,'30.192px');
      assert.equal(original.h2.fontWeight,'700');
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal page overflow');
      if(article===insights[0]) await screenshot(page,`${output}/${width}-original.png`);

      // Local fixture only: preserve the real page and auxiliary sections, replacing
      // the original content sections with actual Portable Text renderer output.
      const portable=renderToStaticMarkup(h(ArticlePortableText,{value:article.sections.flatMap(section=>[
        block('h2',section.title),block('normal',section.body),
        ...(section.points||[]).map(point=>block('normal',point,{listItem:section.ordered?'number':'bullet',level:1})),
      ])}));
      const inner=await page.locator('.insight-article-body').evaluate((el,{titles,portable})=>{
        const template=document.createElement('template');template.innerHTML=portable;
        const sections=[...template.content.children];
        for(const section of [...el.children]) {
          const index=titles.indexOf(section.querySelector('h2')?.textContent);
          if(index>=0) section.replaceWith(sections[index]);
        }
        return el.innerHTML;
      },{titles:article.sections.map(s=>s.title),portable});
      const frame=renderToStaticMarkup(h(ArticleBody,{image:{src:article.image,alt:`Illustration for ${article.title}`}},h('span',{'data-fixture-body':true}))).replace('<span data-fixture-body="true"></span>',inner);
      let html=await page.content();
      html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<article class="insight-article">[\s\S]*?<\/article>/,frame);
      await page.setContent(html,{waitUntil:'load'});
      await ready(page);
      const sanity=await computed(page);
      assert.deepEqual(sanity,original,`CMS typography differs: ${width}/${article.slug}`);
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No CMS horizontal overflow');
      if(article===insights[0]) await screenshot(page,`${output}/${width}-sanity-fixture.png`);
      results.push({width,slug:article.slug,original,sanity});
      await writeFile(`${output}/computed.json`,JSON.stringify(results,null,2));
      console.log(`PASS ${width}px ${article.slug}: original unchanged, CMS styles identical`);
    }

    // Exercise semantic elements absent from the five original articles, comparing
    // equivalent static markup and CMS markup under the same approved body rules.
    const extra=[block('h2','Formatting'),block('normal','A paragraph'),block('normal','A second paragraph'),block('h3','Subheading'),block('blockquote','A quotation'),block('normal','Bullet',{listItem:'bullet',level:1}),block('normal','Step',{listItem:'number',level:1}),block('normal','Bold and italic',{children:[{_type:'span',text:'Bold',marks:['strong']},{_type:'span',text:'italic',marks:['em']},{_type:'span',text:'Reference',marks:['reference']}],markDefs:[{_key:'reference',_type:'link',href:'https://example.com'}]}),{_type:'image',_key:'image',asset:{url:'/insights/cloud-attendance.png'},alt:'Cloud attendance illustration'}];
    const portable=renderToStaticMarkup(h(ArticleBody,null,h(ArticlePortableText,{value:extra})));
    const staticHtml=renderToStaticMarkup(h(ArticleBody,null,h('section',null,
      h('h2',null,'Formatting'),h('p',null,'A paragraph'),h('p',null,'A second paragraph'),h('h3',null,'Subheading'),h('blockquote',null,'A quotation'),h('ul',null,h('li',null,'Bullet')),h('ol',null,h('li',null,'Step')),h('p',null,h('strong',null,'Bold'),h('em',null,'italic'),h('a',{href:'https://example.com'},'Reference')),
      h('div',{className:'insight-article-image'},h('img',{src:'/insights/cloud-attendance.png',alt:'Cloud attendance illustration',style:{position:'absolute',height:'100%',width:'100%',inset:0,color:'transparent'}})))));
    const getFormatting=()=>page.evaluate(()=>Object.fromEntries(['h2','h3','p','p + p','strong','em','a','ul','ol','li','blockquote','.insight-article-image','img'].map(selector=>{
      const el=document.querySelector(`.insight-article-body ${selector}`); const s=getComputedStyle(el);
      return [selector,Object.fromEntries(['fontFamily','fontSize','fontWeight','fontStyle','lineHeight','marginTop','marginBottom','paddingLeft','color','borderBottomWidth','objectFit','aspectRatio'].map(key=>[key,s[key]]))];
    })));
    const shell=await page.content();
    await page.setContent(shell.replace(/<article class="insight-article">[\s\S]*?<\/article>/,staticHtml),{waitUntil:'load'});
    await ready(page);const reference=await getFormatting();
    await page.setContent(shell.replace(/<article class="insight-article">[\s\S]*?<\/article>/,portable),{waitUntil:'load'});
    await ready(page);const actual=await getFormatting();
    assert.deepEqual(actual,reference,`Extended formatting at ${width}px`);
    assert.equal(actual.strong.fontWeight,'700');assert.equal(actual.em.fontStyle,'italic');
    assert.equal(actual.a.fontWeight,'700');assert.equal(actual['p + p'].marginTop,'20px');
    await writeFile(`${output}/${width}-formatting.json`,JSON.stringify(actual,null,2));
  }
  await writeFile(`${output}/computed.json`,JSON.stringify(results,null,2));
  console.log(`Verified ${results.length} original/CMS pairs and 4 extended-formatting pairs.`);
} finally {await browser.close();}
