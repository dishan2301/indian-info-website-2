import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author', title: 'Author', type: 'document', icon: UserIcon,
  fields: [defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}), defineField({name: 'role', type: 'string'}), defineField({name: 'bio', type: 'text', rows: 3}), defineField({name: 'image', type: 'image', options: {hotspot: true}}), defineField({name: 'url', type: 'url'})],
  preview: {select: {title: 'name', subtitle: 'role', media: 'image'}},
})
