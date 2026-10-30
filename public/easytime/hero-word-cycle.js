const heroPill = document.querySelector('.hero-word-pill');
const heroWord = heroPill?.querySelector('.hero-word');
const heroWords = [
  ['align', 'tone-blue', '3.45em'],
  ['connect', 'tone-green', '4.25em'],
  ['flow', 'tone-yellow', '2.9em'],
  ['grow', 'tone-purple', '3.25em'],
  ['thrive', 'tone-coral', '3.8em']
];

if (heroPill && heroWord && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let heroWordIndex = 0;
  setInterval(() => {
    heroPill.classList.add('is-changing');
    setTimeout(() => {
      heroWordIndex = (heroWordIndex + 1) % heroWords.length;
      const [word, tone, width] = heroWords[heroWordIndex];
      heroWord.textContent = word;
      heroPill.style.setProperty('--pill-width', width);
      heroPill.className = `hero-word-pill ${tone} is-entering`;
      setTimeout(() => heroPill.classList.remove('is-entering'), 430);
    }, 300);
  }, 2400);
}
