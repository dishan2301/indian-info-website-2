import 'server-only';
import {sanityClient} from './client';
import {authorizedTestimonial} from '../testimonial-permission.mjs';

export type PublicTestimonial = {id: string; quote: string; customerName: string; companyName: string; designation: string; photoUrl: string | null; logoUrl: string | null; relatedProductService: string | null; featured: boolean; displayOrder: number};
type Candidate = {_id: string; quote: string; customerName: string; companyName: string; designation: string; relatedProductService?: string; featured?: boolean; displayOrder?: number; publicationStatus: string; publicDisplay: boolean; permissionReference: string; permissionStatus?: string; revocationDate?: string; approval?: {status?: string; confirmedBy?: string; reference?: string; digest?: string; scope?: string[]; confirmedAt?: string; expiresAt?: string; revokedAt?: string}; photoRef?: string; logoRef?: string; photoUrl?: string; logoUrl?: string};

const query = `*[_type == "testimonial" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && publicationStatus == "published" && publicDisplay == true] | order(displayOrder asc, _createdAt asc) { _id, quote, customerName, companyName, designation, relatedProductService, featured, displayOrder, publicationStatus, publicDisplay, permissionReference, permissionStatus, revocationDate, approval, "photoRef": photo.asset._ref, "logoRef": logo.asset._ref, "photoUrl": photo.asset->url, "logoUrl": logo.asset->url }`;

export async function getPublicTestimonials(options: {featured?: boolean; productService?: string} = {}): Promise<PublicTestimonial[]> {
  try {
    const candidates = await sanityClient.fetch<Candidate[]>(query, {}, {next: {revalidate: 60, tags: ['sanity:testimonials']}});
    return candidates.map((item) => authorizedTestimonial(item) as PublicTestimonial | null).filter((item): item is PublicTestimonial => Boolean(item)).filter((item) => (options.featured === undefined || item.featured === options.featured) && (!options.productService || item.relatedProductService === options.productService));
  } catch { console.error('Sanity testimonial retrieval failed'); return []; }
}
