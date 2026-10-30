import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import test from 'node:test';

const source = readFileSync(new URL('../public/easytime/script.js', import.meta.url), 'utf8');

test('hero reveals despite stalled image decoding and initializes again on a new page', () => {
  const timers = [];
  let insertions = 0;
  const phone = { setAttribute() {} };
  const createScene = () => ({
    dataset: {}, isConnected: true,
    insertAdjacentHTML() { insertions++; },
    querySelector(selector) { return selector === '.saas-hero-art' ? phone : null; },
    querySelectorAll(selector) { return selector === 'img' ? [{ decode: () => new Promise(() => {}) }] : []; },
  });
  let page = { dataset: {} };
  let scene = createScene();
  const context = {
    window: {}, document: {
      querySelector(selector) { return selector === '.easytime-page' ? page : selector === '.mobile-product-scene' ? scene : null; },
      querySelectorAll: () => [],
      createElement: () => ({ dataset: {}, textContent: '' }),
      head: { append() {} }, documentElement: { classList: { add() {}, remove() {} } },
    },
    IntersectionObserver: class { observe() {} },
    matchMedia: () => ({ matches: true }),
    addEventListener() {}, requestAnimationFrame() {},
    setTimeout(callback, delay) { timers.push({ callback, delay }); }, clearTimeout() {},
  };
  runInNewContext(source, context);
  assert.equal(scene.dataset.heroReady, undefined);
  timers.find(timer => timer.delay === 1500).callback();
  assert.equal(scene.dataset.heroReady, 'true');
  const firstInsertions = insertions;
  context.window.initializeEasytime();
  assert.equal(insertions, firstInsertions, 'same page must not initialize twice');
  page = { dataset: {} };
  scene = createScene();
  context.window.initializeEasytime();
  assert.ok(insertions > firstInsertions, 'return navigation must initialize the new scene');
  timers.at(-1).callback();
  assert.equal(scene.dataset.heroReady, 'true');
});
