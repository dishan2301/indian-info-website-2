import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {confirmTestimonialApproval} from './actions/confirm-testimonial-approval'

export default defineConfig({
  name: 'default',
  title: 'Indian Infotech CMS',

  projectId: 'rmgfsayz',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  document: {
    actions: (previous, context) => {
      if (context.schemaType !== 'testimonial') return previous
      const user = context.currentUser
      const approver = user?.roles.some((role) => ['administrator', 'editor', 'developer'].includes(role.name))
      return approver && user ? [confirmTestimonialApproval(user.id), ...previous] : previous
    },
  },
  schema: {
    types: schemaTypes,
  },
})
