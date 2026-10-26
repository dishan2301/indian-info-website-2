// Read-only content check plus signed cache-invalidation probe. No content mutations.
import assert from 'node:assert/strict';
import {encodeSignatureHeader} from '@sanity/webhook';
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
const body=JSON.stringify({projectId:'rmgfsayz',dataset:'production',_id:'read-only-cache-probe',_type:'blogPost',operation:'update',beforeSlug:'demo',afterSlug:'demo'});
const signature=await encodeSignatureHeader(body,Date.now(),secret);
const start=performance.now();
const signed=await request('/api/sanity/revalidate',{method:'POST',headers:{'content-type':'application/json','sanity-webhook-signature':signature},body});
assert.equal(signed.response.status,200,'Signed cache probe accepted');
assert.equal(JSON.parse(signed.text).revalidated,true);
console.log(JSON.stringify({test:'manual signed delivery (not a Sanity publication)',unsignedStatus:401,invalidSignatureStatus:401,signedStatus:200,deliveryMs:Math.round(performance.now()-start)}));
for(const path of ['/','/insights','/insights/demo']) {
  const result=await request(path);assert.equal(result.response.status,200,path);
  assert.ok(result.text.includes('demo 1'),`${path} includes real published demo`);
  console.log(JSON.stringify({path,status:result.response.status,hasDemo:true}));
}
