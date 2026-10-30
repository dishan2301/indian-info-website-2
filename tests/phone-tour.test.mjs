import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../public/easytime/phone-tour.js', import.meta.url), 'utf8');

for (const scoped of [true, false]) {
  test(`phone tour mounts inside ${scoped ? 'the styled container' : 'the standalone body'}`, () => {
    const mounted = new Error('mounted');
    let parent;
    const page = { append() { parent = 'page'; throw mounted; } };
    const body = { append() { parent = 'body'; throw mounted; } };
    const entry = { closest(selector) { assert.equal(selector, '.easytime-page'); return scoped ? page : null; } };
    const trigger = { cloneNode: () => entry, replaceWith() {} };
    const dialog = { setAttribute() {} };
    assert.throws(() => runInNewContext(source, {
      document: {
        body,
        querySelector: selector => selector === '.mobile-proof' ? trigger : null,
        createElement: () => dialog,
      },
    }), error => error === mounted);
    assert.equal(parent, scoped ? 'page' : 'body');
    assert.match(dialog.innerHTML, /pt-phone/);
    for (const role of ['attendance', 'admin', 'hrms', 'employee']) {
      assert.ok(entry.innerHTML.includes(`data-phone-role="${role}"`));
    }
  });
}

for (const reduced of [true, false]) test(`workspace guide supports navigation and motion preference ${reduced}`, () => {
  const timers = new Map();
  let timerId = 0;
  const nodes = new Map();
  const node = key => {
    if (!nodes.has(key)) nodes.set(key, { dataset: {}, textContent: '', setAttribute() {}, animate: () => ({ cancel() {} }), addEventListener(type, handler) { this[type] = handler; } });
    return nodes.get(key);
  };
  const entry = { closest: () => null, addEventListener(type, handler) { this[type] = handler; } };
  const viewport = node('.pt-scroll');
  viewport.querySelector = () => ({ offsetTop: 200 });
  viewport.querySelectorAll = () => [];
  viewport.scrollTo = options => { viewport.lastScroll = options; };
  const dialog = {
    setAttribute() {}, querySelector: node, addEventListener() {},
    showModal() { this.open = true; },
  };
  runInNewContext(source, {
    document: {
      body: { append() {}, classList: { add() {} } },
      querySelector: selector => selector === '.mobile-proof' ? { cloneNode: () => entry, replaceWith() {} } : null,
      querySelectorAll: () => [], createElement: () => dialog, addEventListener() {},
    },
    matchMedia: () => ({ matches: reduced }),
    setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
  });
  for (const role of ['attendance', 'admin', 'hrms', 'employee']) {
    entry.click({ target: { closest: () => ({ dataset: { phoneRole: role } }) } });
    assert.equal(dialog.open, true);
    assert.match(viewport.innerHTML, /class="pt-card"/);
    assert.match(viewport.innerHTML, /src="\/easytime\/assets\/phone-tour\//);
    assert.ok(node('.pt-current strong').textContent);
    assert.match(node('.pt-tour-overlay').innerHTML, /class="pt-tour-detail"/);
    assert.ok(!viewport.innerHTML.includes('class="pt-guide"'));
    assert.ok(!viewport.innerHTML.includes('undefined'));
    assert.equal(timers.size, reduced ? 0 : 1);
    if (!reduced) {
      const tick = [...timers.values()][0];
      timers.clear();
      tick();
      assert.equal(viewport.lastScroll.top, 188);
      assert.match(node('.pt-current small').textContent, /^2 \/ /);
    }
    node('.pt-next').onclick();
    assert.equal(viewport.lastScroll.top, 188);
    const cards = [0, 220, 440].map(offsetTop => ({ offsetTop, offsetHeight: 200, classList: { toggle() {} } }));
    viewport.querySelectorAll = () => cards;
    viewport.clientHeight = 250;
    viewport.scrollTop = 400;
    viewport.scroll();
    assert.match(node('.pt-current small').textContent, /^3 \/ /);
    assert.match(node('.pt-tour-overlay').innerHTML, /FEATURE 3/);
    viewport.scrollTop = 0;
    viewport.scroll();
    assert.match(node('.pt-current small').textContent, /^1 \/ /);
    assert.match(node('.pt-tour-overlay').innerHTML, /FEATURE 1/);
    assert.equal(timers.size, reduced ? 0 : 1, 'manual scrolling preserves autoplay state');
    if (!reduced) {
      const tick = [...timers.values()][0];
      timers.clear();
      tick();
      assert.match(node('.pt-current small').textContent, /^2 \/ /);
      node('.pt-play').onclick();
      assert.equal(timers.size, 0, 'explicit pause stops autoplay');
    }
    viewport.querySelectorAll = () => [];
  }
});
