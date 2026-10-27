import {createHash} from 'node:crypto';

export function permissionDigest(item) {
  return createHash('sha256').update(JSON.stringify({quote: item.quote, customerName: item.customerName, companyName: item.companyName, designation: item.designation, photo: item.photoUrl || '', logo: item.logoUrl || ''})).digest('hex');
}

export function authorizedTestimonial(item, permission, now = Date.now()) {
  if (!item || ![item.quote, item.customerName, item.companyName, item.designation].every((value) => typeof value === 'string' && value.trim()) || item.publicDisplay !== true || item.publicationStatus !== 'published' || !item.permissionReference || !permission || permission.verified !== true || permission.status !== 'verified') return null;
  if (permission.reference !== item.permissionReference || permission.digest !== permissionDigest(item)) return null;
  if (!Array.isArray(permission.scope) || !['website', 'quote', 'customerName', 'companyName', 'designation'].every((scope) => permission.scope.includes(scope))) return null;
  if (permission.revokedAt || !permission.verifiedAt || !Number.isFinite(Date.parse(permission.verifiedAt)) || Date.parse(permission.verifiedAt) > now) return null;
  if (permission.expiresAt && (!Number.isFinite(Date.parse(permission.expiresAt)) || Date.parse(permission.expiresAt) <= now)) return null;
  return {id: item._id, quote: item.quote, customerName: item.customerName, companyName: item.companyName, designation: item.designation, photoUrl: item.photoUrl && permission.scope.includes('photo') ? item.photoUrl : null, logoUrl: item.logoUrl && permission.scope.includes('logo') ? item.logoUrl : null, relatedProductService: item.relatedProductService || null, featured: item.featured === true, displayOrder: Number.isFinite(item.displayOrder) ? item.displayOrder : 0};
}
