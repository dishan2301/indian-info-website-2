import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../public/easytime/contact-form.js', import.meta.url), 'utf8');

test('dashboard exists before scripts and both routes initialize the cached script', () => {
  const html = readFileSync(new URL('../public/easytime/index.html', import.meta.url), 'utf8');
  assert.match(html, /class="saas-playback"/);
  assert.match(html, /<img class="active" src="\/easytime\/assets\/software-demo\/admin.png"/);
  for (const file of ['../app/_components/easytime-page.tsx', '../app/solutions/[slug]/page.tsx']) {
    assert.match(readFileSync(new URL(file, import.meta.url), 'utf8'), /<EasytimeContactScript\s*\/>/);
  }
});

test('revisiting a page starts a new dashboard without duplicating markup or timers', () => {
  const timers = new Map();
  const listeners = new Map();
  let nextTimer = 0;
  const makePage = () => ({ dataset: {} });
  const makeShell = () => {
    const slides = Array.from({ length: 4 }, () => ({ classList: { toggle(_name, value) { this.active = value; } } }));
    const caption = {};
    const progress = { style: {}, offsetWidth: 1 };
    return {
      isConnected: true, slides,
      querySelector: selector => selector === '.saas-playback' ? {} : selector === '.saas-caption span' ? caption : progress,
      querySelectorAll: () => slides,
      insertAdjacentHTML() { assert.fail('server-rendered dashboard must be reused'); },
    };
  };
  let page = makePage(), shell = makeShell();
  const context = {
    document: {
      querySelector: selector => selector === '.easytime-page' ? page : selector === '.software-tour .tour-shell' ? shell : null,
      querySelectorAll: () => [], addEventListener() {},
    },
    window: {
      addEventListener(name, callback) { listeners.set(callback, name); },
      removeEventListener(name, callback) { listeners.delete(callback); },
      dispatchEvent() {},
    },
    CustomEvent: class {},
    setInterval(callback) { timers.set(++nextTimer, callback); return nextTimer; },
    clearInterval(id) { timers.delete(id); },
  };
  runInNewContext(source, context);
  assert.equal(timers.size, 1);
  assert.equal(shell.slides[0].classList.active, true);
  context.window.initializeEasytimeContact();
  assert.equal(timers.size, 1, 'same page is only initialized once');
  const oldShell = shell;
  oldShell.isConnected = false;
  page = makePage(); shell = makeShell();
  context.window.initializeEasytimeContact();
  assert.equal(shell.slides[0].classList.active, true);
  timers.get(1)();
  assert.equal(timers.size, 1, 'detached dashboard stops its timer');
  assert.equal(listeners.size, 1, 'detached dashboard removes its slide listener');
  timers.get(2)();
  assert.equal(shell.slides[1].classList.active, true);
});
