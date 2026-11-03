type Guide = { title: string; intro: string; groups: { title: string; items: string[] }[] };

export const technicalDetailGuides: Record<string, Guide> = {
  'Core technologies': { title:'Questions to answer at every technology layer.', intro:'Use this checklist before comparing models or committing to an architecture.', groups:[
    { title:'Identity and credentials', items:['Who will enroll, issue, suspend and revoke credentials?','What happens when a face or fingerprint cannot be used?','Which locations require one factor or multiple factors?','How are privacy notices and consent responsibilities handled?'] },
    { title:'Devices and environment', items:['Indoor or outdoor placement, lighting, dust, moisture and temperature','Expected users, peak movement and transaction volume','Power supply, backup, network and offline operating needs','Mounting, enclosure, cabling and service access'] },
    { title:'Software and records', items:['Attendance, access, visitor or combined workflow in scope','Administrator roles, approvals, corrections and audit history','Required dashboards, reports, exports and retention','Hosting, backup, recovery and operational ownership'] },
    { title:'Connected operation', items:['Source of truth for people and organization data','Required HRMS, payroll, ERP, CCTV or BMS connections','Event timing, acknowledgements, retries and reconciliation','Monitoring, change control and support boundaries'] },
  ]},
  'Engineering & implementation': { title:'What belongs in an implementation-ready engineering brief.', intro:'A complete brief reduces site surprises, variation orders and unclear handovers.', groups:[
    { title:'Site information', items:['Current drawings, entry points, doors, barriers and controlled zones','User groups, visitors, contractors, shifts and peak periods','Power, UPS, network, server and telecom-room availability','Civil, electrical, fire-safety and facility constraints'] },
    { title:'Design decisions', items:['Credential and fallback method by user group','Door hardware, lock behaviour and emergency release sequence','Device, controller, software and hosting architecture','Roles, access groups, schedules and exception ownership'] },
    { title:'Commissioning tests', items:['Valid and invalid credential scenarios','Network loss, power loss and offline recovery','Door-held, forced-door and alarm behaviour where supported','Attendance correction, duplicate event and data synchronization'] },
    { title:'Handover package', items:['As-built drawings, addressing and configuration record','Administrator and technician training completion','Acceptance evidence, open issues and change control','Warranty, escalation, spares and support contacts'] },
  ]},
  'System integrations': { title:'Define the data contract before selecting the connector.', intro:'These fields turn a broad integration request into something engineering teams can verify.', groups:[
    { title:'Business flow', items:['Trigger, source system, destination and expected outcome','People or records included and explicitly excluded','Real-time, scheduled or manually approved exchange','Business owner for errors and corrections'] },
    { title:'Identity and schema', items:['Stable employee, visitor or credential key','Required and optional fields with formats','Time zone, effective dates and status handling','Mapping for departments, shifts, locations and codes'] },
    { title:'Security and reliability', items:['Authentication, secret ownership and rotation','Network boundary, allow-listing and encryption','Duplicate prevention, validation and rejected records','Retries, acknowledgement, reconciliation and alerting'] },
    { title:'Delivery lifecycle', items:['Development, test and production environments','Representative sanitized test data and acceptance cases','Cutover, rollback and historical migration','Version changes, monitoring and support responsibility'] },
  ]},
  'Resource center': { title:'The material to prepare at each stage of a project.', intro:'Resources should help a specific person make or operate a decision—not add another generic download.', groups:[
    { title:'Product selection', items:['Portfolio overview by application and environment','Current model datasheet and supported options','Comparison of credential, capacity and connectivity','Installation and accessory requirements'] },
    { title:'Solution design', items:['Workflow and architecture overview','Site survey and requirement checklist','Integration discovery questionnaire','Industry-specific operating considerations'] },
    { title:'Procurement', items:['Tender scope and compliance response template','Commercial schedule and lifecycle cost headings','Evidence and deviation register','Acceptance and handover checklist'] },
    { title:'Operation and support', items:['Administrator quick-start guidance','Version-specific manuals and release context','Troubleshooting information and evidence checklist','Warranty, repair and escalation route'] },
  ]},
  'Knowledge center': { title:'A decision map for buyers, administrators and engineers.', intro:'Start with the job to be completed, then follow the relevant product and technical evidence.', groups:[
    { title:'For buyers', items:['Translate the business problem into a measurable outcome','Compare authentication and deployment options','Identify recurring software, support and service costs','Confirm evidence behind capacities and compatibility'] },
    { title:'For HR and administrators', items:['Define shifts, approvals, exceptions and corrections','Name the source of employee and policy data','Plan reports, exports and payroll handoff','Prepare training and ongoing ownership'] },
    { title:'For IT and security', items:['Review architecture, roles and authentication','Define network, hosting and integration boundaries','Plan logging, backup, recovery and monitoring','Record security and privacy responsibilities'] },
    { title:'For facilities and consultants', items:['Map doors, barriers, zones and movement','Coordinate power, cabling, hardware and safe egress','Write testable specifications and acceptance cases','Require as-built and handover documentation'] },
  ]},
  'Tender & consultant resources': { title:'A compliance schedule that produces comparable bids.', intro:'Require every bidder to state compliance, evidence, assumptions, exclusions and lifecycle ownership.', groups:[
    { title:'Mandatory bidder response', items:['Compliant, partially compliant, non-compliant or clarification required','Proposed model and relevant document reference','Assumptions, dependencies and customer responsibilities','Deviation and alternative recommendation'] },
    { title:'Technical submission', items:['Architecture and bill of materials','Datasheets and applicable certificates','Integration method and data-flow description','Power, network, hosting and installation prerequisites'] },
    { title:'Commercial submission', items:['Hardware, licenses, services, travel and taxes','Recurring subscriptions, support and renewal','Optional items, spares and rate validity','Payment milestones tied to delivery and acceptance'] },
    { title:'Evaluation and award', items:['Functional and technical compliance','Evidence quality and implementation plan','Lifecycle cost, supportability and risk','Acceptance, warranty and exit commitments'] },
  ]},
  'Customer support': { title:'Information that helps support diagnose instead of guess.', intro:'Collect this context before opening the support conversation whenever it is safe and practical.', groups:[
    { title:'Identify the system', items:['Product or software name and model','Version, serial or deployment reference where available','Site, door, department or module affected','Cloud, on-premise or connected-system context'] },
    { title:'Describe the issue', items:['Expected result and actual result','First occurrence and frequency','Users, devices or records affected','Operational impact and urgency'] },
    { title:'Attach safe evidence', items:['Timestamped screenshot or photo','Exact error message without passwords or personal data','Relevant sanitized log extract','Recent configuration, network or hardware change'] },
    { title:'Prepare the next action', items:['Safe troubleshooting already attempted','Remote or on-site access constraints','Available maintenance window','Responsible customer contact and escalation owner'] },
  ]},
  'Developer & integration resources': { title:'Production readiness checklist for workforce integrations.', intro:'Use it for APIs, file exchange, device protocols or any other approved interface.', groups:[
    { title:'Contract definition', items:['Endpoint or exchange mechanism and version','Authentication and authorization scopes','Request, response and field definitions','Pagination, filtering, ordering and date semantics'] },
    { title:'Data quality', items:['Required fields and validation rules','Duplicate and idempotency behaviour','Corrections, deletions and effective dating','Time zone and clock synchronization'] },
    { title:'Failure handling', items:['Timeout, retry and backoff policy','Acknowledgement and partial failure','Dead-letter or rejected-record handling','Reconciliation and manual recovery'] },
    { title:'Operations', items:['Rate and volume assumptions','Monitoring, logs and alert ownership','Credential rotation and change management','Support, deprecation and rollback process'] },
  ]},
  'Trust center': { title:'Evidence domains for a responsible security review.', intro:'Ask for the evidence that applies to the selected product, software version and deployment model.', groups:[
    { title:'Access and administration', items:['Authentication methods and privileged roles','User provisioning, deprovisioning and reviews','Session and credential management','Administrator action logging'] },
    { title:'Data protection', items:['Data categories, purpose and ownership','Encryption in transit and at rest where applicable','Retention, deletion, export and support access','Backup and recovery scope'] },
    { title:'Secure operations', items:['Change and release ownership','Dependency and vulnerability handling','Logging, monitoring and incident response','Business continuity and recovery testing'] },
    { title:'Deployment responsibility', items:['Customer network and endpoint controls','Physical security and safe installation','Customer administrator and policy obligations','Third-party and connected-system boundaries'] },
  ]},
  'Responsible security reporting': { title:'How to prepare a safe, actionable vulnerability report.', intro:'Demonstrate the suspected issue with minimum impact, then stop and report privately.', groups:[
    { title:'Affected surface', items:['Exact URL, product, model, service or version','Environment and date observed','Whether authentication was required','Any known deployment-specific context'] },
    { title:'Reproduction', items:['Minimal ordered steps','Expected and observed behaviour','Sanitized request or response details','Screenshot or log with secrets removed'] },
    { title:'Impact assessment', items:['What an attacker may be able to do','Required access or preconditions','Data or functions potentially affected','Reasonable severity explanation without exaggeration'] },
    { title:'Safety boundaries', items:['Do not access data that is not yours','Do not degrade availability or use social engineering','Do not send credentials, keys or personal data','Stop testing after establishing minimum proof'] },
  ]},
  'Customer & partner academy': { title:'Role-based curriculum for confident system ownership.', intro:'Each learning path combines concepts, hands-on tasks, exceptions and a clear escalation route.', groups:[
    { title:'Administrator outcomes', items:['Maintain people, shifts, roles and access groups','Review events, exceptions, corrections and approvals','Run reports and prepare downstream handoffs','Manage user access and preserve audit context'] },
    { title:'Technician outcomes', items:['Read architecture and installation drawings','Prepare power, network, mounting and cabling','Enroll, configure and commission supported devices','Document tests, addresses and handover details'] },
    { title:'Partner outcomes', items:['Conduct discovery and define scope','Prepare design, assumptions and responsibilities','Run pilots, acceptance and customer training','Transfer documentation and support ownership'] },
    { title:'Learning format', items:['Role and prerequisite assessment','Instructor-led demonstration','Guided hands-on scenarios','Readiness checklist and follow-up support'] },
  ]},
};
