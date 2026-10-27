import 'server-only';
import {sanityClient} from './client';
import {authorizedTestimonial, permissionDigest} from '../testimonial-permission.mjs';

export type PublicTestimonial = {id: string; quote: string; customerName: string; companyName: string; designation: string; photoUrl: string | null; logoUrl: string | null; relatedProductService: string | null; featured: boolean; displayOrder: number};
type Candidate = Omit<PublicTestimonial, 'id' | 'featured' | 'displayOrder'> & {_id: string; publicationStatus: string; publicDisplay: boolean; permissionReference: string; featured?: boolean; displayOrder?: number};

const query = `*[_type == "testimonial" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && publicationStatus == "published" && publicDisplay == true] | order(displayOrder asc, _createdAt asc) { _id, quote, customerName, companyName, designation, relatedProductService, featured, displayOrder, publicationStatus, publicDisplay, permissionReference, "photoUrl": photo.asset->url, "logoUrl": logo.asset->url }`;

export async function getPublicTestimonials(options: {featured?: boolean; productService?: string} = {}): Promise<PublicTestimonial[]> {
  const endpoint = process.env.TESTIMONIAL_PERMISSION_URL;
  const token = process.env.TESTIMONIAL_PERMISSION_TOKEN;
  if (!endpoint || !token || !endpoint.startsWith('https://')) { console.error('Testimonial permission service is not configured'); return []; }
  try {
    // A live permission check on every render prevents stale revocations from remaining public.
    const candidates = await sanityClient.fetch<Candidate[]>(query, {}, {cache: 'no-store'});
    const results = await Promise.all(candidates.map(async (item) => {
      try {
        const response = await fetch(endpoint, {method: 'POST', cache: 'no-store', headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, body: JSON.stringify({reference: item.permissionReference, digest: permissionDigest(item)}), signal: AbortSignal.timeout(3000)});
        if (!response.ok) throw new Error(`Permission service status ${response.status}`);
        const permission = await response.json();
        return authorizedTestimonial(item, permission) as PublicTestimonial | null;
      } catch { console.error('Testimonial permission check failed', {id: item._id}); return null; }
    }));
    return results.filter((item): item is PublicTestimonial => Boolean(item)).filter((item) => (options.featured === undefined || item.featured === options.featured) && (!options.productService || item.relatedProductService === options.productService));
  } catch { console.error('Sanity testimonial retrieval failed'); return []; }
}
