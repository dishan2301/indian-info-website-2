import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TechnicalDestination } from '../../_components/technical-destination';
import { destinations } from '../../_components/technical-destination-content';

export const metadata: Metadata = createPageMetadata({ title: 'Tender Resources', description: destinations.procurement.description, path: '/resources/procurement' });
export default function ProcurementResourcePage() { return <TechnicalDestination page={destinations.procurement} />; }

