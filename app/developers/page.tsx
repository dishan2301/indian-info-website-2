import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Developer Resources', description: destinations.developers.description, path: '/developers' });
export default function DevelopersPage() { return <TechnicalDestination page={destinations.developers} />; }

