import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Trust Center', description: destinations.trust.description, path: '/trust' });
export default function TrustPage() { return <TechnicalDestination page={destinations.trust} />; }

