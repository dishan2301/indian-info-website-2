export type PermissionCandidate = {_id: string; quote: string; customerName: string; companyName: string; designation: string; photoUrl?: string | null; logoUrl?: string | null; relatedProductService?: string | null; featured?: boolean; displayOrder?: number; publicationStatus: string; publicDisplay: boolean; permissionReference: string};
export function permissionDigest(item: PermissionCandidate): string;
export function authorizedTestimonial(item: PermissionCandidate, permission: unknown, now?: number): unknown;
