import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../_components/technical-destination';
import { destinations } from '../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Knowledge Center', description: destinations.knowledge.description, path: '/knowledge' });
export default function KnowledgePage() { return <TechnicalDestination page={destinations.knowledge} />; }

