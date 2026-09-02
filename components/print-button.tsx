'use client';

export function PrintButton({ label = 'Print or save as PDF' }: { label?: string }) {
  return <button className="button outline-button print-button" type="button" onClick={() => window.print()}>{label}</button>;
}
