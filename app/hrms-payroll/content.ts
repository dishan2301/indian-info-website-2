// Original Indian Infotech capability copy for the shared HRMS feature template.
import { hrmsModules, type HrmsModule } from '../content';

export type HrmsDetail = {
  headline: string;
  workflow: readonly string[];
  scenario: readonly [string, string];
  introduction: string;
  features: readonly (readonly [string, string])[];
  highlights: readonly (readonly [string, string])[];
  faqs: readonly (readonly [string, string])[];
  related: readonly string[];
  visual: readonly [string, string, string];
};

export const hrmsDetails: Record<HrmsModule['slug'], HrmsDetail> = {
  recruitment: {
    workflow: ["Define the vacancy and hiring criteria, then collect applications in a common candidate pipeline.", "Review relevant experience and coordinate panel feedback before deciding who progresses to an offer.", "Record the candidate’s response and coordinate the next steps with onboarding for an accepted offer."],
    scenario: ["Hiring across several departments", "A recruiter can review open roles while interview panels evaluate their own candidates. HR follows accepted offers into joining preparation, keeping each hiring decision attached to the candidate record."],
    headline: 'From the first application to the right hire.',
    introduction: 'Bring vacancies, applications, interviews, and offers into a shared hiring pipeline. Give recruiters and interview panels the context to make informed decisions.',
    features: [
      ["Hiring budgets", "Define recruitment budgets around roles, approved positions, and planned headcount. Give hiring teams a spending reference before applications move into interviews and offers."],
      ["Vacancy board", "Keep open positions and recruitment requests together. Review which roles need attention and give recruiters a shared starting point for each hiring assignment."],
      ["Candidate profiles", "Capture qualifications, experience, skills, and role-specific information in a consistent profile. Keep the details used in shortlisting accessible during interviews and selection."],
      ["Job portal connections", "Discuss career-page, LinkedIn, and Naukri connections for your hiring setup. Bring applications into a common recruitment process instead of maintaining separate candidate lists."],
      ["Referral QR codes", "Use shareable application links and referral QR codes to make employee-led sourcing easier. Direct referred candidates into the same application journey as other applicants."],
      ["Resume extraction", "Extract relevant information from uploaded resumes to help build candidate profiles. Recruiters can review the extracted details before using them in the selection process."],
      ["AI candidate screening", "Use skills, experience, and qualification criteria to support initial screening. Keep recruiters responsible for reviewing candidate suitability and making shortlisting decisions."],
      ["Hiring dashboard", "Review candidate movement, open vacancies, and pending recruitment actions together. Help recruiters identify where applications need a decision or the next interview round."],
      ["Interview panels", "Assign interviewers and collect evaluations against agreed criteria. Keep panel observations attached to the candidate so selection discussions have a clear record."],
      ["Offer templates", "Prepare offer letters using reusable formats for selected candidates. Keep the offer process connected to the candidate record and the required internal reviews."],
      ["Candidate decisions", "Record whether a candidate accepts or declines an offer. Give HR a current view of expected joiners and the roles that still need hiring attention."],
      ["Approval routing", "Route recruitment decisions through the relevant levels of authority. Establish who reviews a request, who can proceed, and where a hiring decision is waiting."],
      ["Recruitment reporting", "Bring recruitment activity into reports for hiring reviews. Use candidate and vacancy records to discuss progress, outstanding decisions, and future staffing priorities."],
    ],
    highlights: [['Keep the pipeline moving', 'Follow each candidate from screening to offer.'], ['Work together on selection', 'Keep panel feedback alongside candidate records.']],
    faqs: [
      ["How are candidates shortlisted?", "Candidate records can be reviewed against skills, experience, and qualification criteria. Resume extraction and AI-assisted screening support the initial review, while recruiters decide which candidates should progress to interviews."],
      ["Can interviewers share feedback?", "Interview panels can record structured evaluations alongside the candidate profile. This gives the hiring team a common reference when comparing feedback and making a selection decision."],
    ],
    related: ['onboarding', 'core-hris-payroll', 'pms'],
    visual: ['HIRING PIPELINE', 'Application|Interview|Offer', 'Candidate journey'],
  },
  leave: {
    workflow: ["An employee checks their available balance and submits the dates and leave category.", "The manager reviews the request alongside team availability and the configured leave conditions.", "Approved leave updates the planning context used by attendance and payroll teams."],
    scenario: ["Two people request the same week off", "The manager uses the team planner to review overlapping absences and balances before deciding. Employees follow the request status through the established approval workflow."],
    headline: 'Plan time away with the whole team in view.',
    introduction: 'Give employees clear leave balances and managers a visual planner. Connect policy rules, requests, and approvals without chasing spreadsheets.',
    features: [
      ["Leave policies", "Define leave categories, entitlement accruals, and carry-forward conditions around your policies. Give HR a consistent basis for maintaining balances and reviewing employee requests."],
      ["Approval levels", "Send leave applications through the appropriate reporting and approval levels. Keep employees and managers aligned on which requests are awaiting a decision."],
      ["Team leave planner", "View leave entitlement, usage, and planned absences together. Help managers consider overlapping requests and team availability before approving time away."],
      ["Changes & delegation", "Handle leave revocations and delegate approval responsibility when a manager is unavailable. Keep changes within a defined process rather than relying on informal messages."],
      ["Approvals on the go", "Review leave applications through supported email and mobile workflows. Give managers a practical way to act on requests while working away from their desks."],
      ["Leave history", "Maintain previous leave records alongside current utilization. Help HR answer balance questions and review absence patterns without rebuilding historical spreadsheets."],
    ],
    highlights: [['Requests without the back-and-forth', 'Employees apply and follow balances from one place.'], ['Plan with confidence', 'Review team availability, holidays, and policy conditions together.']],
    faqs: [
      ["Can we configure different leave types?", "Leave categories, accruals, and carry-forward rules can be configured around your policies. Share the types of leave and employee categories you use so the planner and approval process can be demonstrated against them."],
      ["How does the planner support managers?", "The shared planner brings scheduled absences and leave utilization into view. Managers can review overlapping requests and team availability before deciding how to handle an application."],
      ["Are accruals and carryovers tracked?", "Balances use the entitlement and carry-forward policies configured for your organization. Historical records and utilization information help HR explain how an employee’s available leave has been maintained."],
    ],
    related: ['attendance', 'ess', 'core-hris-payroll'],
    visual: ['TEAM LEAVE PLANNER', 'Requested|Approved|Available', 'Team availability'],
  },
  pms: {
    workflow: ["Agree the review period, goals, performance indicators, and relevant competencies.", "Collect progress updates and employee, peer, or manager input against the evaluation criteria.", "Review results and connect development needs with training, promotion, or succession discussions."],
    scenario: ["Preparing for a mid-year review", "An employee reviews progress against agreed goals and completes their assessment. The manager considers feedback and competencies, then records development priorities for the next part of the year."],
    headline: 'Make performance a conversation with direction.',
    introduction: 'Connect goals, competencies, and review cycles. Build a consistent view of employee contribution and turn appraisal outcomes into development decisions.',
    features: [
      ["KRA & KPI goals", "Define key result areas and performance indicators for each review cycle. Give employees and managers measurable expectations that connect individual work with team priorities."],
      ["Multi-level feedback", "Bring employee self-assessments, peer input, and manager evaluations into the review process. Compare perspectives using agreed evaluation criteria rather than scattered feedback."],
      ["Rating normalization", "Review rating distributions and normalization using bell-curve analysis where appropriate. Support calibration discussions while keeping performance decisions with your reviewers."],
      ["Succession & promotions", "Use performance and competency information to discuss future responsibilities. Give promotion and succession conversations a documented foundation across review cycles."],
      ["Competency assessments", "Assess role-relevant skills alongside delivery against goals. Identify development needs that can be carried into training discussions and future performance objectives."],
      ["Review calendars", "Organize mid-year and annual appraisal periods. Set a consistent review rhythm so employees and managers know when goals, feedback, and evaluations are due."],
    ],
    highlights: [['Goals with a shared purpose', 'Align personal targets with team priorities.'], ['Reviews that inform growth', 'Use structured evidence to guide development and promotion discussions.']],
    faqs: [
      ["Can employees update their goals?", "Employees can maintain goals for manager review within the appraisal process. Agree the review period, key result areas, and performance indicators so updates can be assessed against clear expectations."],
      ["Is 360-degree feedback supported?", "The review process can include employee self-assessments, peer feedback, and manager evaluations. The participants and criteria should be mapped to the feedback approach your organization intends to use."],
      ["Can appraisal cycles be scheduled?", "Mid-year and annual review periods can be organized around your appraisal calendar. Define the relevant evaluation criteria and reviewers before starting a cycle, then use the results to guide development discussions."],
    ],
    related: ['training-induction', 'performance-linked-benefits', 'ess'],
    visual: ['PERFORMANCE REVIEW', 'Goals|Feedback|Development', 'Goal progress'],
  },
  'performance-linked-benefits': {
    workflow: ["Record employee production against the relevant items, skills, and shift context.", "Review output against the configured piece rates and incentive thresholds.", "Use reviewed production-linked earnings in the connected wage and payroll process."],
    scenario: ["Calculating a production incentive", "A manufacturing team records output against its items and shifts. HR reviews the production records and applicable rate slabs before carrying the calculated earnings into payroll."],
    headline: 'Connect the work produced with the rewards earned.',
    introduction: 'Bring production, attendance, and payroll together for piece-rate wages and incentives. Apply consistent output rules across employees, skills, and shifts.',
    features: [
      ["Item & SKU output", "Record employee production against the relevant item or SKU. Keep output at the level needed to apply your piece-rate and incentive calculation rules."],
      ["Attendance connection", "Connect production with the employee attendance and shift context. Give payroll a consistent set of reviewed inputs for calculating production-linked earnings."],
      ["Incentive slabs", "Define incentive rates against output thresholds. Make the relationship between production levels and additional earnings easier for HR and payroll to review."],
      ["Skill-based productivity", "Review daily production by employee and skill. Help manufacturing teams understand where work is being delivered and how productivity varies across assigned activities."],
      ["Piece-rate calculations", "Calculate production-linked wages from recorded output and configured rates. Review the underlying production data and wage rules before using the result in payroll."],
    ],
    highlights: [['Transparent production rewards', 'Keep output, rates, and calculated incentives together.'], ['A clearer manufacturing view', 'Review productivity patterns and payroll-linked production reports.']],
    faqs: [
      ["What can determine an incentive?", "Incentive calculations can use item or SKU output, piece rates, and defined production slabs. The appropriate rules depend on how your manufacturing team records production and rewards different output levels."],
      ["Does production connect to payroll?", "The module connects production with attendance and shift information for wage processing. Reviewed output and configured rates provide the basis for the production-linked earnings passed into payroll."],
      ["Can productivity be reviewed by skill?", "Daily production records can be reviewed by employee and skill. This provides context for productivity discussions and helps teams identify where output patterns may point to a development need."],
    ],
    related: ['attendance', 'core-hris-payroll', 'pms'],
    visual: ['PRODUCTION & REWARDS', 'Output|Rate rules|Payroll', 'Production by shift'],
  },
  onboarding: {
    workflow: ["Invite an accepted candidate to complete joining forms and submit the requested documents.", "HR reviews the submissions while managers and supporting teams complete their assigned preparation.", "Review the joining checklist and outstanding actions before welcoming the employee on their first day."],
    scenario: ["A new employee joins next Monday", "The employee submits joining documents in advance. HR checks the files, the manager reviews joining tasks, and the new-joiner dashboard shows what still needs attention before arrival."],
    headline: 'A thoughtful welcome, before day one.',
    introduction: 'Replace scattered joining forms with a digital journey. Coordinate documents, responsibilities, and new-joiner progress from accepted offer to first day.',
    features: [
      ["Digital joining", "Collect joining forms and supporting documents through a digital process. Keep submission, verification, and HR follow-up connected before the employee record is finalized."],
      ["Pre-joining status", "Track accepted offers separately from employees who have joined. Give HR visibility into expected arrivals and outstanding pre-joining actions before the first working day."],
      ["Joining checklist", "Organize the forms, policies, and joining tasks that a new employee needs. Provide a clear checklist so the employee and HR understand what remains incomplete."],
      ["Tasks & access", "Assign onboarding responsibilities across HR, managers, and supporting teams. Use role-based access to keep each person focused on the tasks and information they need."],
      ["Reminders & updates", "Send notifications and reminders for pending joining activities. Keep candidates and HR informed when documentation or another onboarding step requires attention."],
      ["New-joiner dashboard", "Review new-joiner progress and incomplete tasks in one dashboard. Help HR coordinate document reviews and preparation across several employees joining at different times."],
    ],
    highlights: [['Less paperwork, a clearer start', 'Upload, verify, and approve joining documentation digitally.'], ['Prepare before arrival', 'Share resources and responsibilities ahead of the joining date.']],
    faqs: [
      ["Can forms be completed before joining?", "New hires can receive joining forms and submit requested documents before their first working day. HR can review the submissions and follow outstanding items while other teams prepare for arrival."],
      ["Can HR monitor completion?", "The new-joiner dashboard brings completion status and pending tasks together. HR can use this view to coordinate document verification, follow up with candidates, and check that assigned preparation is progressing."],
      ["Are workflows configurable?", "Joining steps can be adapted around your policies and the roles involved. During implementation, map the documents, responsible teams, permissions, and reminders required for your onboarding process."],
    ],
    related: ['recruitment', 'training-induction', 'core-hris-payroll'],
    visual: ['NEW JOINER JOURNEY', 'Documents|Verification|Welcome', 'Joining checklist'],
  },
  attendance: {
    workflow: ["Collect working-time events from the supported biometric, web, mobile, or import sources.", "Review the time records against shifts, holidays, and approved attendance exceptions.", "Use reviewed attendance information as a payroll input for the relevant salary period."],
    scenario: ["Reviewing attendance before payroll", "HR checks shift records, missing punches, overtime, and approved leave together. Resolving those exceptions before salary processing gives payroll a clearer set of attendance inputs."],
    headline: 'Every clock-in, connected to the working day.',
    introduction: 'Capture attendance through biometrics, web login, or batch imports. Connect working hours, shifts, and exceptions directly with payroll.',
    features: [
      ["Attendance-to-payroll sync", "Carry approved attendance inputs into payroll processing. Reduce repeated entry of payable days and time exceptions while retaining a review step before salary calculation."],
      ["Shifts & rosters", "Set up working schedules, shifts, roster patterns, and holidays. Review employee time against the applicable schedule instead of applying one rule to every team."],
      ["Location-aware punching", "Discuss mobile geo-tagging and geo-fencing for field and distributed teams. Match location-based punching requirements to your operating locations and employee attendance policy."],
      ["Overtime & short leave", "Review additional working hours and short-leave requests through an approval process. Keep exceptions alongside time records before they are used for payroll inputs."],
      ["Biometric connections", "Bring supported biometric and access-system events into attendance review. Confirm device compatibility, synchronization method, and employee identification mapping during implementation."],
      ["Attendance analytics", "Use graphical reports to review attendance patterns and recurring exceptions. Give HR and managers a clearer basis for discussions about working time and roster planning."],
    ],
    highlights: [['Time records without duplicate entry', 'Bring capture, review, and payroll inputs together.'], ['Keep shifts running smoothly', 'Coordinate rosters and approvals with current attendance information.']],
    faqs: [
      ["Can remote employees record attendance?", "Supported web and mobile attendance workflows can serve distributed employees. If location-based punching is required, discuss geo-tagging, geo-fencing, and the working locations that should be included in your setup."],
      ["Does the module connect to biometrics?", "Supported biometric device events can be brought into attendance review. Device models, employee mapping, connectivity, and synchronization requirements should be checked before an integration is planned."],
      ["Can managers review overtime?", "Overtime and short-leave requests can follow the configured approval process. Reviewers consider the time records and applicable shift context before those exceptions are used as payroll inputs."],
    ],
    related: ['leave', 'core-hris-payroll', 'timesheet'],
    visual: ['TIME & ATTENDANCE', 'Capture|Review|Payroll', 'Weekly attendance'],
  },
  'hr-help-desk': {
    workflow: ["The employee raises a request under the service category that matches the issue.", "The responsible department reviews the request and follows the configured approval or escalation path.", "The team records the resolution and the employee can follow the updated request status."],
    scenario: ["An employee has a payslip question", "The employee raises a payroll request rather than contacting several teams. Department ownership, progress notifications, and a resolution record help both sides follow the question through completion."],
    headline: 'One place to ask. A clear path to resolution.',
    introduction: 'Give employee requests a central home. Route questions to the right department and make ownership, progress, and escalation visible.',
    features: [
      ["Approvals & escalation", "Define who reviews a request and when it needs escalation. Keep unresolved employee queries moving through a clear chain of responsibility."],
      ["Request categories", "Set up service categories and their approval paths. Route payroll questions, HR requests, and administrative issues according to the process each team follows."],
      ["Status tracking", "Follow open, pending, and resolved tickets in a shared view. Help employees understand progress and help service teams identify work awaiting their attention."],
      ["Email & SMS updates", "Use supported email and SMS notifications to communicate request progress. Reduce the need for employees to contact several people for the latest update."],
      ["Department ticketing", "Assign requests to the department responsible for resolving them. Keep ownership visible when an issue requires coordination between HR, payroll, IT, or administration."],
      ["Employee submission", "Let employees raise service requests through self-service. Capture the request in a common record so the receiving team can review it and respond consistently."],
    ],
    highlights: [['A consistent service experience', 'Keep questions, decisions, and status in one request record.'], ['Accountability across teams', 'Use departmental routing and escalation to manage outstanding work.']],
    faqs: [
      ["Which requests can employees raise?", "Request categories can cover HR, payroll, IT, and administrative services. Each category can follow its own ownership and approval path, helping employees direct a question to the team responsible for resolving it."],
      ["Can employees follow their requests?", "Employees can follow whether a request is open, pending, or resolved. Supported email and SMS notifications help communicate progress while the request record keeps the issue and its status together."],
      ["Can departments have resolution targets?", "Service timelines and escalation responsibilities can be defined as part of the request process. Agree which department owns each category and how outstanding issues should be followed up during configuration."],
    ],
    related: ['ess', 'onboarding', 'off-boarding'],
    visual: ['EMPLOYEE REQUESTS', 'Raised|Assigned|Resolved', 'Request overview'],
  },
  'training-induction': {
    workflow: ["Identify development needs from competencies, role requirements, or performance discussions.", "Plan the program, review nominations, and share materials with the selected participants.", "Record participation and evaluations, then review scores, feedback, and training costs."],
    scenario: ["Planning training after appraisals", "Managers identify a shared competency gap during reviews. HR organizes a relevant program, coordinates nominations, and uses participation and evaluation records to review the learning outcome."],
    headline: 'Learning that starts with a need and ends with progress.',
    introduction: 'Map skills to learning needs, organize training, and review results. Keep nominations, content, participation, scores, and costs connected.',
    features: [
      ["Training need identification", "Use competency assessments and identified skill gaps to plan learning priorities. Connect training requirements with the roles and development needs of your employees."],
      ["Learning calendar", "Organize monthly and annual training plans in a common calendar. Give HR and managers visibility into upcoming programs and the teams expected to attend."],
      ["Nominations & approvals", "Allow employees and managers to nominate participants for relevant programs. Route nominations through approvals so attendance aligns with training priorities and availability."],
      ["Content & participation", "Share learning materials and maintain session attendance records. Keep the program content and participation history together for later evaluation and employee development reviews."],
      ["Evaluation & scoring", "Collect assessments, scores, and program feedback after training. Review whether learning activities address the needs that led to the program being scheduled."],
      ["Training cost analysis", "Review planned budgets, actual spending, and training outcomes together. Give HR a practical basis for discussing the value and future direction of learning programs."],
    ],
    highlights: [['Plan around real skill gaps', 'Connect development priorities with relevant training.'], ['See the complete learning cycle', 'Follow a program from nomination through participation, feedback, and evaluation.']],
    faqs: [
      ["How are training needs identified?", "Competency assessments, skill gaps, and development discussions inform training requirements. HR can use these inputs to plan programs that address a specific need rather than treating the calendar as a list of unrelated sessions."],
      ["Can programs include digital materials?", "Training programs can include online learning resources alongside classroom or virtual sessions. Keeping materials and participation records together helps HR review what was delivered and who attended."],
      ["How are outcomes measured?", "Evaluation scores, participant feedback, program costs, and identified development needs provide the review context. These records help HR discuss program effectiveness and decide what should happen next."],
    ],
    related: ['onboarding', 'pms', 'ess'],
    visual: ['LEARNING & DEVELOPMENT', 'Skill gaps|Learning|Evaluation', 'Learning progress'],
  },
  'core-hris-payroll': {
    workflow: ["Maintain employee master data, salary structures, and the records needed for the payroll period.", "Bring in approved time and adjustment inputs, calculate salaries, and review earnings and deductions.", "Prepare supported payslips, bank outputs, and finance handoffs after the payroll review is complete."],
    scenario: ["Preparing a monthly payroll run", "Payroll reviews employee changes, approved attendance, reimbursements, and recoveries together. The reviewed run becomes the basis for payslips, salary payment files, and accounting outputs."],
    headline: 'One employee record. A stronger payroll foundation.',
    introduction: 'Centralize employee information, compensation, and payroll inputs. Manage records, salary processing, reporting, and connected finance workflows together.',
    features: [
      ["Master data imports", "Bring employee master information from Excel and agreed external sources into the HR database. Review source fields and mapping before moving existing records."],
      ["Employee data integration", "Connect employee information across HR workflows. Reduce repeated maintenance of the same worker details in attendance, leave, payroll, and related people processes."],
      ["Document repository", "Organize employee documents alongside their HR records. Help authorized teams find relevant files when managing joining, employee changes, or exit administration."],
      ["Employee data bank", "Maintain a central profile for each employee. Keep personal, employment, and compensation information together as a reference for everyday HR administration."],
      ["Employee assets", "Record assets assigned to an employee and follow their return. Give HR and supporting teams the context needed for handovers and exit clearance."],
      ["Salary structures", "Configure salary components and apply maker-checker review controls. Separate preparation from approval when managing compensation structures and sensitive payroll changes."],
      ["Arrears & supplementary payroll", "Process backdated changes and additional salary runs through arrears and supplementary payroll. Keep adjustments connected to the employee and relevant payroll period."],
      ["Loans & advances", "Track employee loans, salary advances, and repayments. Bring applicable recovery inputs into payroll so outstanding amounts can be reviewed alongside salary processing."],
      ["Payslip design", "Configure the payslip format around the information your employees need. Present earnings, deductions, and salary details in a consistent company-approved layout."],
      ["Statutory payroll", "Manage configured PF, ESIC, PT, and TDS payroll inputs and outputs. Confirm applicable requirements and supported reports for your locations during the payroll demonstration."],
      ["Payroll inputs", "Bring attendance, leave, and supported biometric inputs into payroll preparation. Review payable time and exceptions before completing the salary calculation cycle."],
      ["Bank payment formats", "Prepare salary payment files in supported bank formats. Align employee banking details and disbursement outputs with your finance team’s payment process."],
      ["Multilingual payslips", "Discuss regional-language payslip formats and supported email or WhatsApp delivery. Match employee communication preferences to the channels configured for your deployment."],
      ["Multilingual registers", "Maintain supported salary registers in relevant languages. Give payroll teams a consistent reporting format suited to the locations and employees in scope."],
      ["Journal voucher formats", "Prepare journal voucher outputs with employee and departmental allocations. Help finance review payroll postings against the organization’s accounting structure."],
      ["ERP journal integration", "Discuss REST API connections for payroll journal handoffs to your ERP. Confirm field mapping, supported endpoints, and the review process before integration begins."],
      ["Multi-currency payments", "Support salary disbursement requirements involving multiple currencies where configured. Agree the relevant currencies, payment formats, and international payroll scope during discovery."],
      ["Employee letters", "Create employee letters from reusable HR templates. Keep standard communications consistent while using the relevant employee information for each document."],
      ["Final settlements", "Bring exit dues and recoveries into final settlement review. Coordinate payroll adjustments with clearance information before closing an employee’s salary account."],
      ["Split-view navigation", "Use parallel employee views when reviewing HR information. Help administrators compare relevant records and move between employee tasks with less navigation."],
      ["Cost centre allocation", "Allocate payroll amounts to the relevant cost centres. Give finance a clearer view of salary costs across departments and other configured organizational units."],
      ["Salary processing", "Calculate salaries using configured structures and approved inputs. Review earnings, deductions, and adjustments together before completing the payroll run."],
      ["Roles & permissions", "Define access according to the user’s responsibilities. Keep employee information and payroll operations available to the teams authorized to work with them."],
      ["Report builder", "Build reports and dashlets for HR and payroll reviews. Present the employee information and payroll measures relevant to the decisions your teams make."],
    ],
    highlights: [['Central employee information', 'Records and documents stay connected.'], ['Connected salary operations', 'Inputs, adjustments, and payments share one workflow.']],
    faqs: [
      ["Can payroll connect to finance?", "Payroll journal outputs can connect with ERP workflows through supported REST API integration. Finance should confirm the destination system, account mapping, allocation structure, and review process before the connection is implemented."],
      ["Can teams design reports?", "The report writer and dashlets support analysis of employee and payroll information. Start with the questions your HR and finance teams need to answer, then agree the fields, access permissions, and output formats."],
    ],
    related: ['attendance', 'leave', 'expense'],
    visual: ['CORE HRIS & PAYROLL', 'Employee data|Salary review|Disbursement', 'Payroll workspace'],
  },
  expense: {
    workflow: ["The employee records the expense category, amount, and supporting receipt.", "The designated reviewer checks the claim against policy limits and approval conditions.", "Approved expense information moves to the configured payroll or finance reimbursement process."],
    scenario: ["A field employee submits a travel claim", "The employee sends the receipt and relevant travel details through the supported mobile workflow. The reviewer checks the policy and forwards the approved claim for reimbursement."],
    headline: 'Expenses submitted anywhere. Progress visible everywhere.',
    introduction: 'Capture expenses with supporting bills, route approvals by policy, and connect approved reimbursements with payroll or finance.',
    features: [
      ["Digital reimbursements", "Bring business expense and salary-related reimbursement requests into a digital workflow. Keep the submitted claim, supporting information, and review status connected."],
      ["Currency & mileage", "Handle supported currencies and per-kilometre travel expenses. Apply the relevant expense rules so reviewers understand how the claimed amount has been calculated."],
      ["Expense ledger", "Connect approved expense records with agreed accounting and ERP workflows. Confirm ledger mapping and the handoff to finance before enabling an integration."],
      ["Policy-based approvals", "Set category limits and approval conditions around company policy. Give reviewers the context to assess a claim and route exceptions to the appropriate authority."],
      ["Mobile submissions", "Submit expense information and attach receipts from supported mobile workflows. Let employees follow their claim’s progress without returning to a desk."],
      ["Expense reporting", "Review submitted spending and approval activity through reports and dashlets. Help HR and finance identify pending claims and discuss expense patterns by category."],
    ],
    highlights: [['A clearer route to reimbursement', 'Keep receipts, reviews, and payment status together.'], ['Spending with context', 'Review claims against categories, budgets, and company rules.']],
    faqs: [
      ["Can employees attach receipts?", "Employees can attach supporting bills when submitting a claim through supported expense workflows. Reviewers can consider the receipt together with the category, amount, and applicable policy conditions."],
      ["Are multiple currencies supported?", "The expense process supports multiple currencies and conversion requirements. Confirm the currencies and reimbursement approach relevant to your organization so the claim review can be demonstrated accurately."],
      ["Can spending limits be configured?", "Category limits and approval conditions can be configured around your expense policy. Agree who should review a claim and how exceptions should be handled before the process is rolled out."],
    ],
    related: ['ess', 'core-hris-payroll', 'timesheet'],
    visual: ['EXPENSE & CLAIMS', 'Receipt|Approval|Reimbursement', 'Claim tracker'],
  },
  'off-boarding': {
    workflow: ["Record the resignation and route the exit request through the designated reviewers.", "Coordinate department clearances, asset returns, and handovers before departure.", "Review outstanding dues and recoveries with payroll, alongside exit feedback and sign-offs."],
    scenario: ["Coordinating an employee’s departure", "HR follows the resignation approval while IT and administration complete their clearances. Payroll reviews approved dues and recoveries, and the exit interview records the employee’s feedback."],
    headline: 'Close every chapter with the details taken care of.',
    introduction: 'Coordinate resignations, clearances, assets, and settlements. Give every responsible team a clear role in the employee exit journey.',
    features: [
      ["Resignation approvals", "Route resignations through the required reviewers. Keep the exit request and its approval progress connected as HR coordinates the departure process."],
      ["Department clearance", "Assign clearance responsibilities across relevant departments. Follow outstanding handovers and sign-offs so HR can see what remains before the last working day."],
      ["Final settlement", "Bring pending earnings, reimbursements, deductions, and applicable gratuity into settlement review. Coordinate the calculation with payroll and approved clearance information."],
      ["Exit interviews", "Capture employee feedback through a structured exit interview. Give HR a documented basis for reviewing departure reasons and discussing employee retention."],
      ["Asset & document returns", "Follow the return of issued assets and relevant documents. Keep outstanding items visible to the teams responsible for completing an employee’s clearance."],
      ["Employee exit surveys", "Gather consistent feedback about the employee’s workplace experience. Review survey responses alongside exit interview information to identify recurring issues worth investigating."],
    ],
    highlights: [['An organized final handoff', 'Coordinate clearance tasks before the last working day.'], ['Settlements with supporting records', 'Bring final earnings, deductions, and adjustments into one process.']],
    faqs: [
      ["Can workflows vary by employee role?", "Clearance steps can be configured for different employee categories and responsibilities. Map the departments involved, required handovers, and asset-return checks so the exit process follows your organization’s policy."],
      ["Can exit interviews be digital?", "Exit interview responses and employee survey feedback can be collected digitally. A structured record helps HR review departure reasons and identify recurring workplace issues for further discussion."],
      ["What feeds the final settlement?", "Final settlement review brings together pending earnings, reimbursements, deductions, recoveries, and applicable leave encashment or gratuity. Payroll should review the relevant inputs alongside approved exit and clearance information."],
    ],
    related: ['core-hris-payroll', 'hr-help-desk', 'ess'],
    visual: ['EXIT & CLEARANCE', 'Resignation|Clearance|Settlement', 'Exit checklist'],
  },
  timesheet: {
    workflow: ["Maintain the project master and the task categories employees use to record work.", "Employees enter daily or weekly hours against the relevant project and task.", "Managers review submissions and use the accepted records for workload and project analysis."],
    scenario: ["A team works across two client projects", "Employees allocate their hours to the appropriate projects during the week. The manager reviews the submissions alongside attendance and leave context before assessing project utilization."],
    headline: 'See where time goes and how projects move.',
    introduction: 'Use a project master to connect tasks, working hours, and approvals. Give teams a consistent record for resource planning and project analysis.',
    features: [
      ["Project time records", "Connect employee working hours with projects and attendance context. Give managers a consistent record of where time has been allocated across assignments."],
      ["Daily & weekly logs", "Record time against categorized tasks using daily or weekly entries. Help employees provide useful work detail without maintaining separate project spreadsheets."],
      ["Leave connection", "Keep approved leave visible in the timesheet context. Help reviewers understand missing working hours before following up with the employee."],
      ["Manager review", "Route submitted timesheets to the appropriate manager. Review the project, task, and recorded hours before accepting the entry for further reporting."],
      ["Productivity reports", "Review recorded hours for utilization, overtime, and project cost analysis. Give managers a basis for discussing workload distribution and future resource allocation."],
      ["Project master", "Maintain the project details used for employee time entry. Use calendar-based updates to keep project work and time reporting organized around a common reference."],
    ],
    highlights: [['Time linked to the work delivered', 'Record hours against the right project and task.'], ['A clearer resource picture', 'Review work patterns alongside attendance and project reporting.']],
    faqs: [
      ["How often can employees log time?", "Employees can record time using daily or weekly entries against projects and categorized tasks. The project master provides a shared reference so hours are recorded consistently across assignments."],
      ["Can managers review submissions?", "Submitted timesheets can pass through manager approval. The reviewer checks the project, task, and recorded hours before the accepted information is used for utilization or project reporting."],
      ["Does leave appear in time records?", "Leave integration keeps approved absence information in the timesheet context. This helps managers understand an employee’s available working time when reviewing entries and following up on gaps."],
    ],
    related: ['attendance', 'expense', 'performance-linked-benefits'],
    visual: ['PROJECTS & TIMESHEETS', 'Project|Time entry|Approval', 'Weekly project hours'],
  },
  ess: {
    workflow: ["Employees access their personal profile and the HR information available to their role.", "Leave, expense, and service requests follow the review process of the connected module.", "Employees find their payslips and compensation information without waiting for a separate payroll response."],
    scenario: ["An employee needs a salary document", "The employee opens their available payslip directly through self-service. If they still have a payroll question, a connected help-desk request gives the responsible team a clear issue to resolve."],
    headline: 'Give employees more answers at their fingertips.',
    introduction: 'A personal HR dashboard brings everyday information and requests closer to employees, on the web and on mobile.',
    features: [
      ["Dashboard & profile", "Give employees a personal dashboard and access to their profile. Let them maintain supported personal details so HR can work from more current employee information."],
      ["Pay & tax information", "Provide access to payslips, compensation information, and tax projections. Help employees find routine salary answers without sending repeated requests to payroll."],
      ["Investment declarations", "Collect investment declarations and related tax information through self-service. Keep employee submissions connected to the payroll review process and applicable declaration cycle."],
      ["Assets & organization", "Let employees see issued assets and the reporting structure. Make everyday organizational information easier to find when coordinating work or checking responsibilities."],
      ["Secure access", "Discuss single sign-on and two-factor authentication for employee access. Match supported authentication options to your organization’s identity setup and access policy."],
      ["Mobile HR", "Bring supported employee services to mobile. Help staff reach personal information and everyday HR requests when working on-site, in the field, or away from a desk."],
    ],
    highlights: [['Everyday HR in one place', 'Find personal information, payslips, and common requests.'], ['Stay connected to work', 'Access updates and services through a personalized employee experience.']],
    faqs: [
      ["Can employees update their details?", "Self-service supports updates to employee profile information. The fields available and the permissions around them should be configured to match the information employees are expected to maintain themselves."],
      ["Can employees view salary information?", "Employees can access supported payslips, compensation information, and tax projections. This makes routine salary information easier to find while payroll remains responsible for reviewing the underlying salary records."],
      ["Is mobile access available?", "Supported employee services are available through the mobile app. Confirm which services, authentication options, and connected modules are in scope for your employees during the demonstration."],
    ],
    related: ['leave', 'expense', 'hr-help-desk'],
    visual: ['EMPLOYEE SELF-SERVICE', 'My profile|My requests|My payslips', 'Employee dashboard'],
  },
  visitors: {
    workflow: ["The host registers an expected visitor and the visit follows the required approval process.", "Reception verifies the visitor through the supported OTP process and issues the appropriate pass.", "Host and security sign-offs record departure and close the active visit."],
    scenario: ["A supplier arrives for a scheduled meeting", "The host prepares the visit in advance. Reception verifies the arriving guest, informs the host, and issues a pass; the exit sign-off completes the same visit record."],
    headline: 'A more welcoming arrival. A more controlled entry.',
    introduction: 'Connect visitor requests, OTP verification, host notifications, and exit sign-offs. Keep reception and security working from the same visit record.',
    features: [
      ["Host invitations", "Let hosts register an expected visit in advance and request approval. Give reception and security the visit context before the guest arrives at your premises."],
      ["Visitor controls", "Identify VIPs and review restricted or blacklisted visitor records. Give authorized reception and security staff the information needed to handle arrivals consistently."],
      ["Mobile OTP verification", "Use mobile OTP verification during the check-in process. Pair visitor verification with the relevant host and security approvals before permitting entry."],
      ["Visitor passes", "Issue supported digital or printed passes after check-in. Keep the pass connected to the visit record so the guest’s presence can be followed through departure."],
      ["Arrival & exit tracking", "Notify hosts when a guest arrives and record the exit sign-off. Keep reception and security aligned on which visits remain active and which have ended."],
      ["Access permissions", "Set responsibilities for hosts, security staff, and administrators. Keep invitations, approvals, verification, and exit actions with the appropriate people."],
    ],
    highlights: [['Follow the complete visit', 'Coordinate invitation, arrival, check-in, and exit.'], ['Clear responsibility at the gate', 'Combine visitor verification with host and security approvals.']],
    faqs: [
      ["Can hosts invite visitors in advance?", "Hosts can register an expected visitor and submit the visit for the required approval. Reception and security can then work from the visit context when the guest arrives."],
      ["How is a visitor verified?", "The check-in process supports mobile OTP verification alongside the relevant visitor controls. Host approvals and restricted-visitor checks provide additional context for the security team’s entry decision."],
      ["How is the exit recorded?", "Host sign-off and a security-controlled exit complete the visit. Keeping departure actions with the same record helps reception and security distinguish active visits from those that have ended."],
    ],
    related: ['attendance', 'ess', 'hr-help-desk'],
    visual: ['VISITOR JOURNEY', 'Invitation|OTP check|Host sign-off', 'Visitor pass'],
  },
};

// Canonical order also defines previous/next navigation in the feature template.
export const hrmsModuleOrder = [
  'recruitment', 'onboarding', 'core-hris-payroll', 'ess', 'leave',
  'attendance', 'expense', 'timesheet', 'pms', 'performance-linked-benefits',
  'hr-help-desk', 'training-induction', 'off-boarding', 'visitors',
] as const;

export type HrmsSlug = (typeof hrmsModuleOrder)[number];
type Capability = { title: string; description: string };
export type HrmsFeatureData = {
  slug: HrmsSlug;
  title: string;
  tagline: string;
  heroImage: string;
  imageAlt: string;
  overview: string;
  capabilities: Capability[];
  steps: string[];
  benefits: Capability[];
  related: readonly string[];
  faq: { question: string; answer: string }[];
};

// Adapt the existing records so current pages continue working during the staged rebuild.
export const hrmsFeatureData: HrmsFeatureData[] = hrmsModuleOrder.map((slug) => {
  const module = hrmsModules.find((candidate) => candidate.slug === slug);
  if (!module) throw new Error(`Missing HRMS module: ${slug}`);
  const detail = hrmsDetails[slug];
  return {
    slug,
    title: slug === 'ess' ? 'ESS (Employee Self Service)' : module.name,
    tagline: module.summary,
    heroImage: module.image,
    imageAlt: module.imageAlt,
    overview: detail.introduction,
    capabilities: detail.features.slice(0, 6).map(([title, description]) => ({ title, description })),
    steps: detail.visual[1].split('|'),
    benefits: [
      { title: 'Less time chasing updates', description: `Keep the next action in the ${module.name.toLowerCase()} workflow visible to the responsible team.` },
      { title: 'Fewer missed details', description: 'Review the information and outstanding tasks together before completing a handoff.' },
      { title: 'A clearer working view', description: 'Give employees and reviewers a shared process to follow from start to finish.' },
    ],
    related: detail.related,
    faq: detail.faqs.map(([question, answer]) => ({ question, answer })),
  };
});
