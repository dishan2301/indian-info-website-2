import {createHash} from 'node:crypto';
import {approvalPayload} from './testimonial-approval-payload.mjs';

// Deliberately exclude ordering, featured status, and product grouping: those do not alter the approved claim.
export function approvalDigest(item) {
  return createHash('sha256').update(approvalPayload(item)).digest('hex');
}

export function authorizedTestimonial(item, now = Date.now()) {
  const approval = item?.approval;
  if (!item || ![item.quote, item.customerName, item.companyName, item.designation].every((value) => typeof value === 'string' && value.trim()) || item.publicDisplay !== true || item.publicationStatus !== 'published') return null;
  if (!approval || approval.status !== 'confirmed' || !approval.confirmedBy || !approval.reference || approval.reference !== item.permissionReference || approval.digest !== approvalDigest(item)) return null;
  if (!Array.isArray(approval.scope) || !['website', 'quote', 'customerName', 'companyName', 'designation'].every((scope) => approval.scope.includes(scope))) return null;
  if (!approval.confirmedAt || !Number.isFinite(Date.parse(approval.confirmedAt)) || Date.parse(approval.confirmedAt) > now) return null;
  if (item.permissionStatus !== 'verified' || item.revocationDate || approval.revokedAt || (approval.expiresAt && (!Number.isFinite(Date.parse(approval.expiresAt)) || Date.parse(approval.expiresAt) <= now))) return null;
  return {id: item._id, quote: item.quote, customerName: item.customerName, companyName: item.companyName, designation: item.designation, photoUrl: item.photoUrl && approval.scope.includes('photo') ? item.photoUrl : null, logoUrl: item.logoUrl && approval.scope.includes('logo') ? item.logoUrl : null, relatedProductService: item.relatedProductService || null, featured: item.featured === true, displayOrder: Number.isFinite(item.displayOrder) ? item.displayOrder : 0};
}
