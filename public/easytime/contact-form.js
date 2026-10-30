const contactModal = document.querySelector('.contact-modal');
const contactForm = document.querySelector('.contact-form');

const openContactModal = () => {
  if (!contactModal) return;
  contactModal.hidden = false;
  document.body.classList.add('contact-modal-open');
  contactModal.querySelector('input')?.focus();
};

const closeContactModal = () => {
  if (!contactModal) return;
  contactModal.hidden = true;
  document.body.classList.remove('contact-modal-open');
};

document.querySelectorAll('a[href="#contact"], [data-open-contact]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openContactModal();
  });
});

contactModal?.querySelector('.contact-close')?.addEventListener('click', closeContactModal);
contactModal?.addEventListener('click', event => {
  if (event.target === contactModal) closeContactModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !contactModal?.hidden) closeContactModal();
});

contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  contactForm.classList.remove('is-sent');
  void contactForm.offsetWidth;
  contactForm.classList.add('is-sent');
  status.textContent = 'Thanks — your message is ready for our team.';
  contactForm.reset();
});

const tourViews = {
  today: ['ILLUSTRATIVE OVERVIEW', 'Today’s attendance', ['42|Present', '3|Late', '4|Absent'], ['RK|Ravi Kumar|09:28 AM · Present', 'PS|Priya Shah|09:24 AM · Present', 'AS|Amit Singh|09:19 AM · Late']],
  team: ['TEAM VIEW', 'Your workforce', ['18|Operations', '16|Production', '9|HR'], ['RK|Ravi Kumar|Operations · Present', 'PS|Priya Shah|Production · Present', 'AK|Anjali Kapoor|HR · Present']],
  late: ['EXCEPTIONS', 'Late arrivals', ['3|Today', '11|This week', '91%|On time'], ['AS|Amit Singh|19 min late', 'NR|Neha Rao|31 min late', 'DV|Dev Verma|18 min late']],
  report: ['REPORTING', 'Attendance report', ['87%|Present', '91%|On time', '23|Working days'], ['OCT|October summary|Attendance data ready', 'HR|Human Resources|100% present', 'OPS|Operations|94% present']]
};
document.querySelectorAll('.tour-tab').forEach(button => button.addEventListener('click', () => {
  const view = tourViews[button.dataset.tour];
  document.querySelector('#tour-label').textContent = view[0];
  document.querySelector('#tour-title').textContent = view[1];
  document.querySelector('#tour-stats').innerHTML = view[2].map(item => { const [value, label] = item.split('|'); return `<span><b>${value}</b>${label}</span>`; }).join('');
  document.querySelector('#tour-list').innerHTML = view[3].map(item => { const [initials, name, detail] = item.split('|'); return `<p><i>${initials}</i><b>${name}</b><small>${detail}</small></p>`; }).join('');
  document.querySelectorAll('.tour-tab').forEach(tab => tab.classList.toggle('active', tab === button));
}));

const tourShell = document.querySelector('.software-tour .tour-shell');
if (tourShell) {
  const screens = [
    ['assets/software-demo/admin.png', 'Attendance overview', 'Daily arrivals, departments, and attendance status'],
    ['assets/software-demo/employee.png', 'Employee self-service', 'Personal attendance, working hours, and leave details'],
    ['assets/software-demo/hr.png', 'HR approvals', 'Employee status, leave distribution, and workforce trends'],
    ['assets/software-demo/attendance.png', 'Workforce reports', 'Present, late, absent, and regularization insights']
  ];
  tourShell.insertAdjacentHTML('beforeend', `<div class="saas-playback"><div class="saas-screen-brand" aria-label="EasyTime Online"><span aria-hidden="true">E</span><strong>EasyTime <small>Online</small></strong></div>${screens.map(([src]) => `<img src="${src}" alt="SmartHR illustrative workflow screen">`).join('')}<div class="saas-caption"><small>SMARTHR WORKFLOW REFERENCE</small><span></span></div><div class="saas-progress"><i></i></div></div>`);
  const slides = [...tourShell.querySelectorAll('.saas-playback img')]; const caption = tourShell.querySelector('.saas-caption span'); let slide = 0;
  const showSlide = () => { slides.forEach((image, index) => image.classList.toggle('active', index === slide)); caption.textContent = `${screens[slide][1]} · ${screens[slide][2]}`; const progress = tourShell.querySelector('.saas-progress i'); progress.style.animation = 'none'; void progress.offsetWidth; progress.style.animation = ''; };
  showSlide();
  setInterval(() => {
    slide = (slide + 1) % slides.length;
    showSlide();
    window.dispatchEvent(new CustomEvent('easytime-slide-change', { detail: slide }));
  }, 10000);
  window.addEventListener('easytime-feature-step', (event) => {
    slide = event.detail % slides.length;
    showSlide();
  });
}
