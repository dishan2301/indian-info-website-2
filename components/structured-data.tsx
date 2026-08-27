import { headers } from 'next/headers';
import { serializeStructuredData } from '@/lib/security.mjs';

export async function StructuredData({ data }: { data: unknown }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(data) }} />;
}
