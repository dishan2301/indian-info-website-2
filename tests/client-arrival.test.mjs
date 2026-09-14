import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../components/homepage/home-curated-sections.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS } }).outputText;

function mount(reduced = false) {
  let effect;
  let observer;
  const animations = [];
  const cards = Array.from({ length: 21 }, (_, index) => ({
    offsetTop: Math.floor(index / 3) * 100,
    animate(keyframes, options) {
      const animation = { keyframes, options, playbackRate: 1, playState: 'running', currentTime: 0, play() { this.playState = 'running'; }, pause() { this.playState = 'paused'; }, cancel() { this.playState = 'idle'; } };
      animations.push(animation);
      return animation;
    },
  }));
  const grid = { children: cards, querySelectorAll: () => cards };
  const context = {
    exports: {}, innerWidth: 390, innerHeight: 800,
    matchMedia: () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }),
    IntersectionObserver: class { constructor(callback, options) { this.callback = callback; this.options = options; this.targets = []; observer = this; } observe(target) { this.targets.push(target); } disconnect() { this.targets = []; } },
    window: {},
    require: (name) => name === 'react' ? { useState: () => [0, () => {}], useRef: () => ({ current: grid }), useEffect: (fn) => { effect = fn; } }
      : name === 'react/jsx-runtime' ? { jsx() {}, jsxs() {} }
      : name === '@/app/content' ? { customerOrganizations: [] } : {},
  };
  vm.runInNewContext(compiled, context);
  context.exports.IndustriesAndClients();
  const cleanup = effect();
  return { animations, cleanup, observer };
}

test('client blocks cascade from top and leave in true reverse order near the viewport edge', () => {
  const app = mount();
  assert.equal(app.animations.length, 21);
  assert.equal(new Set(app.animations.map((a) => a.keyframes[0].translate)).size, 1);
  assert.match(app.animations[0].keyframes[0].translate, /^0px -/);
  assert.ok(app.animations.every((a) => a.playState === 'paused'));
  assert.equal(app.observer.options.rootMargin, '0px 0px -2% 0px');
  assert.equal(app.observer.options.threshold, .04);
  assert.equal(app.observer.targets.length, 1);
  assert.ok(app.animations[0].options.delay < app.animations[1].options.delay);
  assert.ok(app.animations[0].options.endDelay > app.animations[1].options.endDelay);
  app.observer.callback([{ target: app.observer.targets[0], isIntersecting: true, boundingClientRect: { top: 620 } }]);
  assert.ok(app.animations.every((a) => a.playState === 'running' && a.playbackRate === 1));
  app.animations.forEach((animation) => { animation.currentTime = 4000; });
  app.observer.callback([{ target: app.observer.targets[0], isIntersecting: false, boundingClientRect: { top: 700 } }]);
  assert.ok(app.animations.every((a) => a.playbackRate === -1), 'scrolling upward reverses the cascade');
  app.cleanup();
  assert.equal(app.observer.targets.length, 0);
});

test('reduced motion leaves every logo static and visible', () => {
  const app = mount(true);
  assert.equal(app.animations.length, 0);
  assert.equal(app.observer, undefined);
});
