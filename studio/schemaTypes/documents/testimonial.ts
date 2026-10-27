import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial', type: 'document', title: 'Testimonial',
  description: 'Publication still requires a live verified permission response. Never upload permission evidence here.',
  fields: [
    defineField({name: 'customerName', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'companyName', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'designation', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'quote', title: 'Exact approved testimonial text', type: 'text', validation: (rule) => rule.required()}),
    defineField({name: 'photo', title: 'Approved customer photo', type: 'image'}),
    defineField({name: 'logo', title: 'Approved company logo', type: 'image'}),
    defineField({name: 'relatedProductService', type: 'string'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'displayOrder', type: 'number', initialValue: 0, validation: (rule) => rule.integer()}),
    defineField({name: 'publicDisplay', type: 'boolean', initialValue: false}),
    defineField({name: 'publicationStatus', type: 'string', initialValue: 'pending', options: {list: ['pending', 'published', 'unpublished', 'revoked']}, validation: (rule) => rule.required().custom((status, context) => status !== 'published' || (context.document?.permissionReference && context.document?.publishedAt) || 'Published testimonials need a permission reference and publication date.')}),
    defineField({name: 'permissionReference', type: 'string', description: 'Opaque reference in the external permission register; no evidence or private URL.'}),
    defineField({name: 'permissionStatus', type: 'string', options: {list: ['pending', 'verified', 'revoked', 'expired']}, description: 'Editor-facing only. The website never trusts this value.'}),
    defineField({name: 'permissionScope', type: 'array', of: [{type: 'string'}], description: 'Editor-facing summary only; the website checks the live register.'}),
    defineField({name: 'permissionDate', type: 'datetime'}),
    defineField({name: 'revocationDate', type: 'datetime'}),
    defineField({name: 'publishedAt', type: 'datetime'}),
    defineField({name: 'updatedAt', type: 'datetime', description: 'Sanity also maintains immutable _updatedAt metadata.'}),
  ],
  preview: {select: {title: 'customerName', subtitle: 'companyName', media: 'photo'}},
})
