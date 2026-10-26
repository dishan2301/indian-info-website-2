import {defineArrayMember, defineField, defineType} from 'sanity'

export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      marks: {annotations: [{name: 'link', type: 'object', fields: [defineField({name: 'href', type: 'url'}), defineField({name: 'openInNewTab', type: 'boolean'})]}]},
    }),
    defineArrayMember({type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', type: 'string', validation: (rule) => rule.required()})]}),
  ],
})
