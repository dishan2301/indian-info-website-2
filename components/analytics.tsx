import { headers } from 'next/headers';
import { AnalyticsScripts } from './analytics-scripts';

export async function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const tagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const validMeasurementId = measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : undefined;
  const validTagManagerId = tagManagerId && /^GTM-[A-Z0-9]+$/.test(tagManagerId) ? tagManagerId : undefined;
  const validMetaPixelId = metaPixelId && /^\d{5,20}$/.test(metaPixelId) ? metaPixelId : undefined;
  if (!validMeasurementId && !validTagManagerId && !validMetaPixelId) return null;
  const nonce = process.env.NODE_ENV === 'production' ? (await headers()).get('x-nonce') ?? undefined : undefined;
  return <AnalyticsScripts measurementId={validMeasurementId} tagManagerId={validTagManagerId} metaPixelId={validMetaPixelId} nonce={nonce} />;
}
