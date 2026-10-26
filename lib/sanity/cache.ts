import {createHash} from 'node:crypto';

export const EDITORIAL_TAG = 'sanity:editorial';
export const EDITORIAL_REVALIDATE_SECONDS = 60;
export function editorialSlugTag(slug: string) {
  return `${EDITORIAL_TAG}:${createHash('sha256').update(slug).digest('hex')}`;
}
