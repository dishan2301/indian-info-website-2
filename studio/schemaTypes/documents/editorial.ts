import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineField, defineType} from 'sanity'
import {insights} from '../../../app/insights/content'

const editorialFields = [
  defineField({name: 'title', type: 'string', validation: (rule) => rule.required().max(120)}),
  defineField({name: 'slug', type: 'slug', options: {
    source: 'title', maxLength: 96,
    isUnique: async (slug, context) => {
      if (insights.some((article) => article.slug === slug)) return false
      const id = context.document?._id?.replace(/^drafts\./, '')
      return context.getClient({apiVersion: '2026-02-01'}).withConfig({useCdn: false, perspective: 'raw'}).fetch<boolean>(
        '!defined(*[_type in ["blogPost", "companyNews", "researchArticle"] && slug.current == $slug && !(_id in [$id, $draftId])][0]._id)',
        {slug, id: id || '', draftId: `drafts.${id || ''}`},
      )
    },
  }, validation: (rule) => rule.required().custom((value) => !value?.current || /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current) || 'Use letters/numbers separated by single hyphens.')}),
  defineField({name: 'summary', type: 'text', rows: 3, validation: (rule) => rule.required().max(320)}),
  defineField({name: 'body', type: 'richText', validation: (rule) => rule.required().min(1)}),
  defineField({name: 'mainImage', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text', validation: (rule) => rule.required()})]}),
  defineField({name: 'attachment', type: 'file', options: {accept: 'application/pdf'}, fields: [defineField({name: 'title', type: 'string'})]}),
  defineField({name: 'publishedAt', type: 'datetime',
    initialValue: () => new Date().toISOString(),
    description: 'Your local time is saved as an ISO instant. Future dates intentionally schedule website visibility.',
    validation: (rule) => rule.required().custom((value) => !value || (Number.isFinite(Date.parse(value)) && /(?:Z|[+-]\d{2}:\d{2})$/.test(value)) || 'Enter a valid date and timezone.'),}),
  defineField({name: 'featured', type: 'boolean', initialValue: false}),
  defineField({name: 'author', type: 'reference', to: [{type: 'author'}]}),
  defineField({name: 'categories', type: 'array', of: [{type: 'reference', to: [{type: 'category'}]}]}),
  defineField({name: 'seo', type: 'seo'}),
]

function makeEditorial(name: string, title: string) {
  return defineType({name, title, type: 'document', icon: DocumentTextIcon, fields: editorialFields, preview: {select: {title: 'title', subtitle: 'publishedAt', media: 'mainImage'}, prepare: ({title, subtitle, media}) => ({title: title || 'Untitled', subtitle: subtitle ? new Date(subtitle).toLocaleDateString('en-IN') : 'Unpublished', media})}})
}

export const blogPost = makeEditorial('blogPost', 'Blog post')
export const companyNews = makeEditorial('companyNews', 'Company news')
export const researchArticle = makeEditorial('researchArticle', 'Research article')
