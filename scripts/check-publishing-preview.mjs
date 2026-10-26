// Read-only content check plus signed cache-invalidation probe. No content mutations.
import assert from 'node:assert/strict';
import {encodeSignatureHeader} from '@sanity/webhook';
import {loadTsModule} from '../tests/helpers/load-ts-module.mjs';
const base=new URL(process.env.PREVIEW_BASE_URL || 'https://demo-website-git-codex-vercel-cms-preview-dish1.vercel.app');
const bypass=process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
const secret=process.env.SANITY_REVALIDATE_SECRET;
if(!secret) throw Error('Set SANITY_REVALIDATE_SECRET privately');
const headers=bypass?{'x-vercel-protection-bypass':bypass}:{};
async function request(path,options={}) {
  const response=await fetch(new URL(path,base),{...options,headers:{...headers,...options.headers},redirect:'manual',signal:AbortSignal.timeout(30000)});
  return {response,text:await response.text()};
}
const unsigned=await request('/api/sanity/revalidate',{method:'POST',body:'{}'});
assert.equal(unsigned.response.status,401,'Unsigned webhook rejected');
const invalid=await request('/api/sanity/revalidate',{method:'POST',headers:{'sanity-webhook-signature':'invalid'},body:'{}'});
assert.equal(invalid.response.status,401,'Invalid signature rejected');
const body=JSON.stringify({projectId:'rmgfsayz',dataset:'production',_id:'read-only-cache-probe',_type:'blogPost',operation:'update',beforeSlug:null,afterSlug:null});
const signature=await encodeSignatureHeader(body,Date.now(),secret);
const start=performance.now();
const signed=await request('/api/sanity/revalidate',{method:'POST',headers:{'content-type':'application/json','sanity-webhook-signature':signature},body});
assert.equal(signed.response.status,200,'Signed cache probe accepted');
assert.equal(JSON.parse(signed.text).revalidated,true);
console.log(JSON.stringify({test:'manual signed delivery (not a Sanity publication)',unsignedStatus:401,invalidSignatureStatus:401,signedStatus:200,deliveryMs:Math.round(performance.now()-start)}));
const queries=loadTsModule(new URL('../lib/sanity/queries.ts',import.meta.url));
const inventoryResponse=await fetch('https://rmgfsayz.api.sanity.io/v2026-02-01/data/query/production?perspective=published&query='+encodeURIComponent(queries.publishedInsightsQuery),{signal:AbortSignal.timeout(20000)});
assert.equal(inventoryResponse.status,200,'Live Sanity inventory available');
const inventory=(await inventoryResponse.json()).result;
const {insights}=loadTsModule(new URL('../app/insights/content.ts',import.meta.url));
const service=loadTsModule(new URL('../lib/insights.ts',import.meta.url),{'@/app/insights/content':{insights},'@/lib/sanity/content':{getPublishedInsights:async()=>inventory}});
const articles=service.mergeInsights(inventory);
const listing=await request('/insights');assert.equal(listing.response.status,200);
for(const article of articles)assert.ok(listing.text.includes(`/insights/${encodeURIComponent(article.slug)}`),`Listing contains ${article.slug}`);
const home=await request('/');assert.equal(home.response.status,200);
for(const article of articles.slice(0,5))assert.ok(home.text.includes(`/insights/${encodeURIComponent(article.slug)}`),`Homepage contains ${article.slug}`);
for(const article of [...articles.filter(a=>a.source==='sanity').slice(0,3),articles.find(a=>a.source==='static')].filter(Boolean)){
 const result=await request(`/insights/${encodeURIComponent(article.slug)}`);assert.equal(result.response.status,200);
 assert.ok(result.text.includes('insight-article-body'));console.log(JSON.stringify({slug:article.slug,status:200,source:article.source}));
}
console.log(JSON.stringify({collectionCount:articles.length,publishedCmsCount:inventory.length,livePublishingAcceptance:inventory.length?'existing content verified; publication transition not measured':'blocked: no currently published CMS article'}));
