import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Customer Support', description: destinations.support.description, path: '/support' });
export default function SupportPage() { return <TechnicalDestination page={destinations.support} />; }

