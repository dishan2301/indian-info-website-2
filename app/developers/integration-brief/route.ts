import { companyProfile } from '@/lib/company-profile';

export function GET() {
  const text = [
    'INDIAN INFOTECH — INTEGRATION DISCOVERY BRIEF', '',
    'Complete one brief per data flow. Do not include passwords, tokens, private keys, production personal data, or other live credentials.', '',
    'OPERATING CONTEXT',
    '- Business outcome and triggering event:',
    '- Source system, version, and owner:',
    '- Destination system, version, and owner:',
    '- Identity or reconciliation key:',
    '- Data direction, timing, and expected volume:', '',
    'INTERFACE CONTRACT',
    '- Supported mechanism and version evidence:',
    '- Authentication and authorization:',
    '- Network boundary and allowlisting:',
    '- Fields, formats, validation, and mapping:',
    '- Errors, retries, idempotency, and reconciliation:',
    '- Rate, payload, retention, and availability limits:', '',
    'PROOF AND OPERATIONS',
    '- Representative test data and acceptance cases:',
    '- Monitoring, alerts, logs, and support owner:',
    '- Cutover, rollback, backup, and recovery:',
    '- Change, deprecation, and exit/export ownership:', '',
    'PUBLICATION GATE',
    '- Do not publish endpoints, schemas, credentials, SDKs, rate limits, or compatibility promises without the production-interface owner’s approval.',
    '- Retain the approved source, applicable versions, review date, and accountable owner with every published reference.', '',
    `Contact: ${companyProfile.email}`,
  ].join('\n');

  return new Response(text, { headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Disposition': 'attachment; filename="indian-infotech-integration-discovery-brief.txt"',
    'X-Content-Type-Options': 'nosniff',
  } });
}
