import {createClient} from '@sanity/client'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rmgfsayz'
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
// Defaults above are valid public configuration too; a token is not required.
export const sanityConfigured = Boolean(sanityProjectId && sanityDataset)

export const sanityClient = createClient({projectId: sanityProjectId, dataset: sanityDataset, apiVersion: '2026-02-01', useCdn: true, token: process.env.SANITY_API_READ_TOKEN})
