# Testimonial webhook configuration

Create two signed Sanity document webhooks using `webhook.preview.json` and `webhook.production.json`. Both use project `rmgfsayz` and dataset `production`, with create/update/delete events. Add a different random secret to each webhook and set the matching `SANITY_REVALIDATE_SECRET` in the respective Vercel environment. The secret is intentionally absent from the JSON templates.

The Preview target is the stable branch alias so new Preview deployments retain the same webhook URL. Keep its Vercel protection bypass header configured in Sanity; do not disable Preview protection. Configure the Production webhook only after release approval and Production deployment. Test a signed delivery for a safe non-customer test document and confirm `/` and `/testimonials` revalidate on each deployment. Remove the test document afterward.
