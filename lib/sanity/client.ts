import {createClient} from '@sanity/client'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rmgfsayz'
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const sanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_READ_TOKEN)

export const sanityClient = createClient({projectId: sanityProjectId, dataset: sanityDataset, apiVersion: '2026-02-01', useCdn: false, token: process.env.SANITY_API_READ_TOKEN})
