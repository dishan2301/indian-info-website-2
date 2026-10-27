import {useState} from 'react'
import {useClient, type DocumentActionComponent} from 'sanity'
import {approvalPayload} from '../../lib/testimonial-approval-payload.mjs'

const requiredScope = ['website', 'quote', 'customerName', 'companyName', 'designation']

export function confirmTestimonialApproval(userId: string): DocumentActionComponent {
  return function ConfirmTestimonialApproval({draft, onComplete}) {
    const client = useClient({apiVersion: '2026-02-01'})
    const [error, setError] = useState<string | null>(null)
    const scope = Array.isArray(draft?.permissionScope) ? draft.permissionScope.filter((value): value is string => typeof value === 'string') : []
    const complete = Boolean(draft && [draft.quote, draft.customerName, draft.companyName, draft.designation, draft.permissionReference, draft.permissionDate].every((value) => typeof value === 'string' && value.trim()) && requiredScope.every((value) => scope.includes(value)) && !draft.revocationDate)
    return {
      label: 'Confirm customer approval',
      disabled: !complete,
      title: error || (complete ? 'Confirm that the internal record covers this exact quote, identity, and selected media.' : 'Complete the draft, reference, permission date, and website scope first.'),
      onHandle: async () => {
        if (!draft || !complete) return
        try {
          const bytes = new TextEncoder().encode(approvalPayload(draft as unknown as Parameters<typeof approvalPayload>[0]))
          const hash = await crypto.subtle.digest('SHA-256', bytes)
          const digest = Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('')
          await client.patch(draft._id).set({
            approval: {status: 'confirmed', reference: draft.permissionReference, digest, scope, confirmedBy: userId, confirmedAt: new Date().toISOString(), expiresAt: draft.permissionExpiryDate || null},
            permissionStatus: 'verified',
          }).commit()
          onComplete()
        } catch { setError('Approval confirmation could not be saved. Try again.') }
      },
    }
  }
}
