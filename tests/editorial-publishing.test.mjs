import assert from 'node:assert/strict';
import {test} from 'node:test';
import {randomBytes} from 'node:crypto';
import {encodeSignatureHeader} from '@sanity/webhook';
import {loadTsModule} from './helpers/load-ts-module.mjs';

const file = path => new URL(path, import.meta.url);
const originals = loadTsModule(file('../app/insights/content.ts')).insights;
const cache = loadTsModule(file('../lib/sanity/cache.ts'));
function harness() {
  let fail = false;
  const documents = new Map(); const errors = []; const calls = [];
  const queries = loadTsModule(file('../lib/sanity/queries.ts'));
  const adapter = loadTsModule(file('../lib/sanity/content.ts'), {
    './cache': cache, './queries': queries,
    './client': {sanityConfigured:true,sanityClient:{fetch:async (query,params,options)=>{
      calls.push({query,params,options});
      if(fail) throw Object.assign(new Error('upstream request failed'),{statusCode:503});
      return query===queries.publishedInsightsQuery ? [...documents.values()] : documents.get(params.slug)||null;
    }}},
  },{console:{error:(...args)=>errors.push(args)}});
  const service=loadTsModule(file('../lib/insights.ts'),{'@/app/insights/content':{insights:originals},'@/lib/sanity/content':adapter});
  return {service,adapter,queries,documents,errors,calls,setFail:value=>{fail=value}};
}
const article = (slug,type='blogPost',overrides={})=>({_id:`id-${slug}`,_type:type,slug,title:slug,summary:'Summary',publishedAt:'2026-10-01T00:00:00Z',body:[],...overrides});

test('generic publishing and lifecycle retrieval across three types and multiple slugs',async()=>{
  const h=harness();
  assert.equal(await h.service.getPublishedArticleBySlug('new-alpha'),null);
  for(const [slug,type] of [['new-alpha','blogPost'],['new-beta','companyNews'],['new-gamma','researchArticle']]) h.documents.set(slug,article(slug,type));
  assert.equal((await h.service.getPublishedArticles()).length,8);
  assert.equal((await h.service.getLatestArticles(3)).length,3);
  assert.equal((await h.service.getPublishedArticleBySlug('new-beta')).category,'Company update');
  h.documents.get('new-alpha').title='Updated';
  assert.equal((await h.service.getPublishedArticleBySlug('new-alpha')).title,'Updated');
  h.documents.set('renamed-alpha',{...h.documents.get('new-alpha'),slug:'renamed-alpha'});h.documents.delete('new-alpha');
  assert.equal(await h.service.getPublishedArticleBySlug('new-alpha'),null);
  assert.equal((await h.service.getPublishedArticleBySlug('renamed-alpha')).title,'Updated');
  // The published query returns no document after unpublish/delete.
  h.documents.delete('new-beta');h.documents.delete('new-gamma');
  assert.equal(await h.service.getPublishedArticleBySlug('new-beta'),null);
  assert.equal(await h.service.getPublishedArticleBySlug('new-gamma'),null);
  for(const original of originals) assert.equal((await h.service.getPublishedArticleBySlug(original.slug)).source,'static');
  assert.ok(h.calls.every(c=>c.options.next.revalidate===60&&c.options.next.tags.includes(cache.EDITORIAL_TAG)));
});

test('drafts, releases, future dates, timezone offsets, optional fields and deterministic conflicts',async()=>{
  const h=harness();const now=Date.parse('2026-10-26T09:43:00Z');
  const cards=h.service.mergeInsights([
    article('draft','blogPost',{_id:'drafts.x'}),article('release','blogPost',{_id:'versions.release.x'}),
    article('future','blogPost',{publishedAt:'2026-10-26T15:13:01+05:30'}),
    article('due','blogPost',{publishedAt:'2026-10-26T15:13:00+05:30',title:undefined,summary:undefined}),
    article('invalid','blogPost',{publishedAt:'not a date'}),article('wrong-type','product'),
    article('duplicate'),article('/duplicate/','blogPost',{_id:'z-duplicate'}),article(originals[0].slug),
  ],now);
  assert.equal(cards.length,7);assert.ok(cards.some(c=>c.slug==='due'));
  assert.ok(!cards.some(c=>['draft','release','future','invalid','wrong-type'].includes(c.slug)));
  assert.equal(cards.find(c=>c.slug==='due').title,'Untitled article');
  assert.equal(cards.find(c=>c.slug===originals[0].slug).source,'static');
  assert.equal(cards.filter(c=>c.slug==='duplicate').length,1);
  for(let i=1;i<cards.length;i++) assert.ok(Date.parse(cards[i-1].publishedAt)>=Date.parse(cards[i].publishedAt));
  assert.equal(h.service.mergeInsights([article('future','blogPost',{publishedAt:'2026-10-26T09:43:01Z'})],now+1000).length,6,'scheduled post becomes eligible without edits');
  assert.equal(h.service.isArticleSlug('../escape'),false);
  assert.equal(h.service.articlePath('समाचार'),'/%s'.replace('%s','insights/'+encodeURIComponent('समाचार')));
  assert.match(h.queries.publishedInsightsQuery,/dateTime\(publishedAt\) <= dateTime\(now\(\)\)/);
});

test('API failures are recorded, originals survive, and detail outage is not reported as a missing article',async()=>{
  const h=harness();h.setFail(true);
  assert.equal((await h.service.getPublishedArticles()).length,5);
  await assert.rejects(h.service.getPublishedArticleBySlug('new-alpha'),{name:'SanityContentError'});
  assert.equal(h.errors.length,2);
  assert.ok(JSON.stringify(h.errors).includes('503'));
  assert.equal((await h.service.getPublishedArticleBySlug(originals[0].slug)).source,'static');
});

function webhookHarness(secret='test-only-'+randomBytes(24).toString('hex')) {
  const calls=[];const logs=[];
  const route=loadTsModule(file('../app/api/sanity/revalidate/route.ts'),{
    'next/cache':{revalidatePath:(...args)=>calls.push(['path',...args]),revalidateTag:(...args)=>calls.push(['tag',...args])},
    'node:timers/promises':{setTimeout:async()=>{}},
    '@/lib/insights':harness().service,'@/lib/sanity/cache':cache,
  },{process:{env:{SANITY_REVALIDATE_SECRET:secret,NEXT_PUBLIC_SANITY_PROJECT_ID:'rmgfsayz',NEXT_PUBLIC_SANITY_DATASET:'production'}},console:{error:(...a)=>logs.push(a),info:()=>{}}});
  async function send(payload,signature='valid') {
    const body=typeof payload==='string'?payload:JSON.stringify(payload);
    const headers={'content-type':'application/json'};
    if(signature==='valid')headers['sanity-webhook-signature']=await encodeSignatureHeader(body,Date.now(),secret||'test');
    else if(signature)headers['sanity-webhook-signature']=signature;
    return route.POST(new Request('https://preview.test/api/sanity/revalidate',{method:'POST',headers,body}));
  }
  return {send,calls,logs};
}
const event=(overrides={})=>({projectId:'rmgfsayz',dataset:'production',_id:'published-id',_type:'blogPost',operation:'update',beforeSlug:'old-slug',afterSlug:'new-slug',...overrides});

test('unsigned, invalid, tampered and malformed webhook requests cannot invalidate caches',async()=>{
  const h=webhookHarness();
  assert.equal((await h.send(event(),null)).status,401);
  assert.equal((await h.send(event(),'invalid')).status,401);
  assert.equal((await h.send('{broken')).status,400);
  assert.equal((await h.send(event({projectId:'other'}))).status,400);
  assert.equal((await h.send(event({afterSlug:'../escape'}))).status,400);
  assert.equal((await h.send('x'.repeat(17000))).status,413);
  assert.equal(h.calls.length,0);
  const missing=webhookHarness('');assert.equal((await missing.send(event())).status,503);
});

test('signed lifecycle events expire shared tags, old/new slugs, homepage, listing and cached 404 routes',async()=>{
  for(const operation of ['create','update','publish','unpublish','delete']) {
    const h=webhookHarness();assert.equal((await h.send(event({operation}))).status,200);
    assert.ok(h.calls.some(c=>c[0]==='tag'&&c[1]===cache.EDITORIAL_TAG&&c[2].expire===0));
    for(const path of ['/','/insights','/insights/old-slug','/insights/new-slug'])assert.ok(h.calls.some(c=>c[0]==='path'&&c[1]===path),path);
    assert.ok(h.calls.some(c=>c[0]==='path'&&c[1]==='/insights/[slug]'&&c[2]==='page'));
    for(const slug of ['old-slug','new-slug'])assert.ok(h.calls.some(c=>c[0]==='tag'&&c[1]===cache.editorialSlugTag(slug)));
  }
});

test('author/category edits invalidate all article pages; draft events are ignored',async()=>{
  for(const _type of ['author','category']) {
    const h=webhookHarness();assert.equal((await h.send(event({_type}))).status,200);
    assert.ok(h.calls.some(c=>c[1]==='/insights/[slug]'));assert.ok(!h.calls.some(c=>c[1]==='/insights/old-slug'));
  }
  const h=webhookHarness();assert.equal((await h.send(event({_id:'drafts.hidden'}))).status,200);assert.equal(h.calls.length,0);
});

test('Studio schemas validate required fields, cross-type slugs, reserved URLs and ISO publication dates',async()=>{
  const schema=loadTsModule(file('../studio/schemaTypes/documents/editorial.ts'),{
    'sanity':{defineField:x=>x,defineType:x=>x},'@sanity/icons/DocumentText':{DocumentTextIcon:()=>null},'../../../app/insights/content':{insights:originals},
  });
  for(const type of ['blogPost','companyNews','researchArticle']){
    const fields=Object.fromEntries(schema[type].fields.map(f=>[f.name,f]));
    for(const name of ['title','slug','summary','body','publishedAt']){
      let required=false;const rule={required(){required=true;return this},max(){return this},min(){return this},custom(){return this}};
      fields[name].validation(rule);assert.equal(required,true,name);
    }
    for(const name of ['author','categories','mainImage'])assert.equal(fields[name].validation,undefined,name);
    const date=fields.publishedAt.initialValue();assert.ok(Math.abs(Date.now()-Date.parse(date))<1000);assert.match(date,/Z$/);
    let validate;fields.publishedAt.validation({required(){return this},custom(fn){validate=fn;return this}});
    assert.equal(validate('2026-10-26T15:13:00+05:30'),true);assert.notEqual(validate('invalid'),true);assert.notEqual(validate('2026-10-26T15:13:00'),true);
    const context={document:{_id:'drafts.record'},getClient:()=>({withConfig:()=>({fetch:async(query,params)=>{
      assert.ok(query.includes('"blogPost", "companyNews", "researchArticle"'));assert.equal(params.id,'record');assert.equal(params.draftId,'drafts.record');return params.slug!=='taken';
    }})})};
    assert.equal(await fields.slug.options.isUnique(originals[0].slug,context),false);
    assert.equal(await fields.slug.options.isUnique('taken',context),false);
    assert.equal(await fields.slug.options.isUnique('unique-slug',context),true);
  }
});

test('signed testimonial create, edit, reorder, unpublish and delete invalidate both public routes', async () => {
  for (const operation of ['create', 'update', 'unpublish', 'delete']) {
    const h = webhookHarness();
    assert.equal((await h.send(event({_type: 'testimonial', operation, beforeSlug: null, afterSlug: null}))).status, 200);
    for (const path of ['/', '/testimonials']) assert.ok(h.calls.some((call) => call[0] === 'path' && call[1] === path));
    assert.ok(h.calls.some((call) => call[0] === 'tag' && call[1] === 'sanity:testimonials' && call[2].expire === 0));
  }
});
