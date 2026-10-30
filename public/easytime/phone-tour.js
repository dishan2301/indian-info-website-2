(() => {
  const trigger = document.querySelector('.mobile-proof');
  if (!trigger) return;
  // Each rectangle presents an unchanged panel from the supplied desktop references.
  const panel = (title, file, x, y, w, h) => ({ title, file, x, y, w, h });
  const employee = [panel('My profile', 'employee-overview',279,223,500,358), panel('Leave balance & requests','employee-overview',1458,223,369,358), panel('Attendance & punch out','employee-overview',279,604,500,361), panel('Daily & weekly hours','employee-overview',803,604,500,177), panel('Monthly hours & overtime','employee-overview',1327,604,500,177), panel('Working-day timeline','employee-overview',803,808,1024,157), panel('Attendance & leave history','employee-overview',803,223,631,358), panel('My projects','employee-work',299,114,349,291), panel('My tasks','employee-work',1065,55,762,370), panel('Performance','employee-work',279,449,631,439), panel('My skills','employee-work',934,449,500,439), panel('Team, policies & holidays','employee-work',1458,449,369,439), panel('Team members','employee-team',279,415,500,477), panel('Notifications','employee-team',803,415,500,477), panel('Meeting schedule','employee-team',1327,415,500,477)];
  const admin = [panel('Attendance & projects','admin-overview',279,279,500,174), panel('Clients & tasks','admin-overview',803,279,500,174), panel('Earnings & profit','admin-overview',279,476,500,173), panel('Applicants & new hires','admin-overview',803,476,500,173), panel('Employees by department','admin-overview',1327,279,500,370), panel('Employee status','admin-overview',279,673,500,295), panel('Attendance overview','admin-overview',803,673,500,295), panel('Clock-in & clock-out','admin-overview',1327,673,500,295), panel('Employee directory','admin-people',803,117,500,403), panel('Recruitment','admin-people',279,117,500,403), panel('Tasks & payroll planning','admin-people',1327,117,500,403), panel('Sales overview','admin-people',279,544,893,421), panel('Invoices','admin-people',1196,544,631,421), panel('Project progress','admin-work',279,80,1024,382), panel('Task overview','admin-work',1327,55,500,407), panel('Schedules','admin-work',279,486,500,469), panel('Recent activity','admin-work',803,486,500,469), panel('Birthdays','admin-work',1327,486,500,469)];
  const hr = [panel('Employee status & type','hr-overview',279,158,631,228), panel('Headcount & new joiners','hr-overview',955,244,851,155), panel('Late arrivals & payroll cost','hr-overview',955,415,851,155), panel('Leave distribution','hr-overview',279,401,631,192), panel('Attendance trends','hr-overview',279,617,1024,346), panel('Department distribution','hr-overview',1327,617,500,346), panel('Late arrivals','hr-people',279,178,500,454), panel('Recruitment & training','hr-people',803,178,500,454), panel('Upcoming interviews','hr-people',1327,178,500,454), panel('Payroll & benefits','hr-people',279,657,893,129), panel('Pending approvals','hr-people',1196,657,631,309)];
  const explanations = {
    'My profile': 'See your employee profile and work information in one place.',
    'Leave balance & requests': 'Check available leave and review your leave requests.',
    'Attendance & punch out': 'Check your attendance and review the punch-out panel for your workday.',
    'Daily & weekly hours': 'Compare your recorded hours for today and this week.',
    'Monthly hours & overtime': 'Review monthly working hours and overtime totals.',
    'Working-day timeline': 'Follow the timeline of your working day and breaks.',
    'Attendance & leave history': 'Look back at previous attendance records and leave.',
    'My projects': 'See the projects assigned to you and their progress.',
    'My tasks': 'Review assigned tasks and their current status.',
    'Performance': 'Review the performance summary shown in your workspace.',
    'My skills': 'See the skills recorded in your employee profile.',
    'Team, policies & holidays': 'Find team information, workplace policies and upcoming holidays.',
    'Team members': 'Find the people in your team and their roles.',
    'Notifications': 'Catch up on workspace notifications and updates.',
    'Meeting schedule': 'Check upcoming meetings and their scheduled times.',
    'Attendance & projects': 'Review attendance totals alongside the project summary.',
    'Clients & tasks': 'See client and task totals for a quick operational overview.',
    'Earnings & profit': 'Review the earnings and profit summaries shown here.',
    'Applicants & new hires': 'Follow applicant numbers and new employee totals.',
    'Employees by department': 'Compare the size of teams across departments.',
    'Employee status': 'Review the employee groups and statuses in your workforce.',
    'Attendance overview': 'See attendance totals and identify records that need review.',
    'Clock-in & clock-out': 'Review recorded arrival and departure times.',
    'Employee directory': 'Browse employee records and find your team members.',
    'Recruitment': 'Follow recruitment activity and candidate progress.',
    'Tasks & payroll planning': 'Review task totals and the payroll planning summary.',
    'Sales overview': 'Compare sales totals and trends in the overview.',
    'Invoices': 'Review invoice records and their current status.',
    'Project progress': 'See how projects are progressing against their plans.',
    'Task overview': 'Compare task status and identify outstanding work.',
    'Schedules': 'Review the upcoming work schedule.',
    'Recent activity': 'Catch up on the latest activity in the workspace.',
    'Birthdays': 'See upcoming employee birthdays.',
    'Employee status & type': 'Compare employee statuses and employment types.',
    'Headcount & new joiners': 'Track workforce size and recent joiners.',
    'Late arrivals & payroll cost': 'Review late arrival totals alongside the payroll cost summary.',
    'Leave distribution': 'Compare leave categories across the workforce.',
    'Attendance trends': 'Follow attendance patterns over time.',
    'Department distribution': 'See how employees are distributed across departments.',
    'Late arrivals': 'Find late arrival records that may need follow-up.',
    'Recruitment & training': 'Review recruitment activity and employee training summaries.',
    'Upcoming interviews': 'See scheduled interviews and candidate details.',
    'Payroll & benefits': 'Review the payroll and benefits summary.',
    'Pending approvals': 'Find requests waiting for an approval decision.'
  };
  const roles = {
    attendance: {label:'Mobile attendance', title:'Your workday. In your hands.', access:'Employee access', description:'Check attendance, review your hours and manage leave from your personal workspace.', cards:[employee[2], employee[1], employee[0], ...employee.slice(3)]},
    admin: {label:'Admin',title:'The whole operation. One view.',access:'Full administrative access',description:'Explore workforce visibility, employee records, recruitment, projects, schedules and financial overviews.',cards:admin},
    hrms: {label:'HRMS',title:'People first. Every day.',access:'HR workspace',description:'Explore headcount, leave, attendance, recruitment, interviews, payroll summaries and pending approvals.',cards:hr},
    employee: {label:'Employee',title:'Everything for your working day.',access:'Personal self-service',description:'See your profile, attendance, leave, projects, tasks, performance and team updates.',cards:employee}
  };
  const buttons = Object.entries(roles).map(([key,r])=>`<button type="button" data-phone-role="${key}">${r.label}</button>`).join('');
  // Replace the old text-only controls and their event listener.
  const entry = trigger.cloneNode(false);
  entry.innerHTML = buttons;
  trigger.replaceWith(entry);
  document.querySelector('.mobile-proof-detail')?.remove();
  const dialog = document.createElement('dialog');
  dialog.className='phone-tour';
  dialog.setAttribute('aria-labelledby','phone-tour-title');
  dialog.innerHTML=`<button class="pt-close" type="button" aria-label="Close phone tour" autofocus>×</button><div class="pt-layout"><div class="pt-copy"><span class="pt-eyebrow">GUIDED PHONE TOUR</span><nav class="pt-roles" aria-label="Choose a workspace">${buttons}</nav><p class="pt-access"></p><h2 id="phone-tour-title"></h2><p class="pt-description"></p><div class="pt-current"><span>ON YOUR SCREEN</span><strong></strong><small></small></div><div class="pt-controls"><button type="button" class="pt-next">Next feature ↓</button><button type="button" class="pt-play" aria-pressed="true">Pause tour</button><button type="button" class="pt-replay">Replay ↻</button></div><p class="pt-note">Watch the cursor explain each feature, then move to the next. Scroll or swipe to explore; the tour continues from your current feature.<br>Illustrative preview · screens are not live controls</p></div><div class="pt-stage"><div class="pt-halo"></div><div class="pt-phone"><div class="pt-island" aria-hidden="true"></div><div class="pt-status" aria-hidden="true"><span>9:41</span><span>● ▰</span></div><header class="pt-app-header"><b>Easytime <span>workspace</span></b><small></small></header><div class="pt-scroll" tabindex="0" role="region" aria-label="Scrollable workspace features"></div><div class="pt-tour-overlay" aria-live="polite"></div><div class="pt-home" aria-hidden="true"></div></div><span class="pt-scroll-label">SCROLL TO EXPLORE ↓</span></div></div>`;
  // Keep the popup inside the container that owns its scoped styles.
  (entry.closest('.easytime-page') || document.body).append(dialog);
  const viewport=dialog.querySelector('.pt-scroll'), phone=dialog.querySelector('.pt-phone');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active='attendance', current=0, motion, opener, timer, playing=false;
  function schedule() {
    clearTimeout(timer);
    if (!playing || !dialog.open) return;
    timer=setTimeout(() => {
      if (current === roles[active].cards.length-1) { setPlaying(false); return; }
      goTo(current+1);
      schedule();
    }, 3300);
  }
  function setPlaying(value) {
    playing=value;
    dialog.querySelector('.pt-play').textContent=value?'Pause tour':'Resume tour';
    dialog.querySelector('.pt-play').setAttribute('aria-pressed', String(value));
    dialog.querySelector('.pt-scroll-label').textContent=value?'GUIDED TOUR · AUTO-SCROLL ON':'TOUR PAUSED · SCROLL TO EXPLORE';
    schedule();
  }
  function goTo(index) {
    current=index;
    update();
    const card=viewport.querySelector(`[data-index="${index}"]`);
    viewport.scrollTo({top:card.offsetTop-12,behavior:reduced.matches?'instant':'smooth'});
  }
  function select(key) {
    active=key; current=0;
    const role=roles[key];
    dialog.querySelector('h2').textContent=role.title;
    dialog.querySelector('.pt-description').textContent=role.description;
    dialog.querySelector('.pt-access').textContent=role.access;
    dialog.querySelector('.pt-app-header small').textContent=role.label;
    document.querySelectorAll('[data-phone-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.phoneRole===key)));
    viewport.innerHTML=role.cards.map((p,i)=>`<article class="pt-card" data-index="${i}" style="--dx:${i%4===0?-90:i%4===1?90:0}px;--dy:${i%4===2?-65:i%4===3?65:20}px"><div class="pt-card-heading"><span>${String(i+1).padStart(2,'0')}</span><h3>${p.title}</h3><svg class="pt-card-pointer" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 3l6 17 3-7 7-3z"/></svg></div><div class="pt-crop" style="aspect-ratio:${p.w}/${p.h}"><img src="/easytime/assets/phone-tour/${p.file}.png" alt="${p.title} — SmartHR workflow reference" style="width:${1856/p.w*100}%;left:${-p.x/p.w*100}%;top:${-p.y/p.h*100}%" draggable="false"></div></article>`).join('')+'<p class="pt-end">You’ve explored this workspace.<br>Choose another role to continue.</p>';
    viewport.scrollTop=0;
    dialog.scrollTop=0;
    motion?.cancel();
    if(!reduced.matches) motion=phone.animate([{transform:'perspective(1200px) rotateY(-180deg) rotateZ(-9deg) scale(.88)',opacity:.25},{transform:'perspective(1200px) rotateY(18deg) rotateZ(3deg) scale(1)',opacity:1,offset:.7},{transform:'perspective(1200px) rotateY(0deg) rotateZ(0deg) scale(1)'}],{duration:550,easing:'cubic-bezier(.2,.75,.25,1)'});
    update();
    setPlaying(!reduced.matches);
  }
  viewport.addEventListener('scroll', () => {
    const cards = [...viewport.querySelectorAll('.pt-card')];
    const top = viewport.scrollTop, bottom = top + viewport.clientHeight;
    let mostVisible = 0;
    cards.forEach((card, index) => {
      const visible = Math.max(0, Math.min(bottom, card.offsetTop + card.offsetHeight) - Math.max(top, card.offsetTop));
      if (visible > mostVisible) { mostVisible = visible; current = index; }
    });
    update();
  }, { passive: true });
  function update(){
    const feature=roles[active].cards[current];
    const overlay=dialog.querySelector('.pt-tour-overlay');
    const guideKey=`${active}-${current}`;
    if(overlay.dataset.feature!==guideKey){
      overlay.dataset.feature=guideKey;
      overlay.innerHTML=`<article class="pt-tour-detail"><small>EASYTIME · FEATURE ${current+1}</small><strong>${feature.title}</strong><p>${explanations[feature.title]}</p><span>Scroll to explore · pause anytime</span></article>`;
    }
    viewport.querySelectorAll('.pt-card').forEach((card,index)=>card.classList.toggle('pt-active',index===current));dialog.querySelector('.pt-current strong').textContent=roles[active].cards[current].title;dialog.querySelector('.pt-current small').textContent=`${current+1} / ${roles[active].cards.length} features`;dialog.querySelector('.pt-next').textContent=current===roles[active].cards.length-1?'Back to first ↑':'Next feature ↓';}
  entry.addEventListener('click',e=>{const b=e.target.closest('[data-phone-role]');if(!b)return;opener=b;dialog.showModal();document.body.classList.add('phone-tour-open');select(b.dataset.phoneRole);});
  dialog.querySelector('.pt-roles').addEventListener('click',e=>{const b=e.target.closest('[data-phone-role]');if(b)select(b.dataset.phoneRole);});
  dialog.querySelector('.pt-close').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{setPlaying(false);motion?.cancel();document.body.classList.remove('phone-tour-open');opener?.focus();});
  dialog.querySelector('.pt-replay').onclick=()=>select(active);
  dialog.querySelector('.pt-next').onclick=()=>{goTo((current+1)%roles[active].cards.length);schedule();};
  dialog.querySelector('.pt-play').onclick=()=>{if(!playing && current===roles[active].cards.length-1)goTo(0);setPlaying(!playing);};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setPlaying(false);});
})();
