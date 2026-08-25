'use client';

import { FormEvent, useState } from 'react';

type EnquiryBriefProps = { initialContext?: string };

export function EnquiryBrief({ initialContext = '' }: EnquiryBriefProps) {
  const [status, setStatus] = useState('');

  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = [
      ['Enquiry type', form.get('enquiryType')], ['Organization', form.get('organization')], ['Contact name', form.get('name')],
      ['Telephone', form.get('phone')], ['Sites', form.get('sites')], ['Workforce size', form.get('workforce')],
      ['Product or software context', form.get('context')], ['Requirements', form.get('requirements')],
    ];
    const body = fields.map(([label, value]) => `${label}: ${String(value ?? '').trim() || 'Not provided'}`).join('\n');
    setStatus('Your email application should open with the completed enquiry brief.');
    window.location.href = `mailto:sales@indianinfotech.org?subject=${encodeURIComponent('Website solution enquiry')}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="enquiry-form" onSubmit={submitBrief}>
      <div className="enquiry-form-heading"><p className="section-kicker">Structured enquiry</p><h2>Prepare a useful solution brief.</h2><p>This form opens your email application and does not upload data to the website.</p></div>
      <div className="enquiry-fields">
        <label><span>Enquiry type</span><select name="enquiryType" defaultValue="Product or solution quote"><option>Product or solution quote</option><option>Software demo</option><option>Technical material</option><option>Support request</option><option>General enquiry</option></select></label>
        <label><span>Organization</span><input name="organization" autoComplete="organization" required /></label>
        <label><span>Contact name</span><input name="name" autoComplete="name" required /></label>
        <label><span>Telephone</span><input name="phone" type="tel" autoComplete="tel" required /></label>
        <label><span>Number and type of sites</span><input name="sites" placeholder="Example: two manufacturing facilities" /></label>
        <label><span>Approximate workforce size</span><input name="workforce" inputMode="numeric" /></label>
        <label className="full-field"><span>Product or software context</span><input name="context" defaultValue={initialContext} /></label>
        <label className="full-field"><span>Requirements</span><textarea name="requirements" rows={6} required placeholder="Entry points, authentication, attendance, HRMS, visitor, canteen, reporting, integration, rollout, or support needs…" /></label>
        <label className="consent-field full-field"><input type="checkbox" required /><span>I agree to send these details to Indian Infotech for a response to this enquiry.</span></label>
        <div className="enquiry-submit full-field"><button className="button button-primary" type="submit">Open completed email <span aria-hidden="true">↗</span></button><p role="status">{status}</p></div>
      </div>
    </form>
  );
}
