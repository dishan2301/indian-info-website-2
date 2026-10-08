import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('hero preserves its original first scene, rotates, and follows interaction and motion preferences', () => {
  const states = [];
  const effects = [], dependencies = [], cleanups = [];
  let cursor, effectCursor, tick, delay;
  const react = {
    useRef() { return { current: null }; },
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (value) => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useEffect(callback, nextDependencies) {
      const index = effectCursor++;
      if (!dependencies[index] || nextDependencies.some((value, i) => value !== dependencies[index][i])) {
        effects[index] = callback;
        dependencies[index] = nextDependencies;
      }
    },
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const media = new Map();
  function matchMedia(query) {
    if (!media.has(query)) media.set(query, { matches: false, listeners: new Set(), addEventListener(type, listener) { this.listeners.add(listener); }, removeEventListener(type, listener) { this.listeners.delete(listener); } });
    return media.get(query);
  }
  const source = ts.transpileModule(readFileSync(new URL('../components/homepage/hero-poster-carousel.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(source, { exports, require: (name) => name === 'react' ? react : name === 'react/jsx-runtime' ? { jsx, jsxs: jsx } : { default: name }, window: { matchMedia, setInterval(callback, ms) { tick = callback; delay = ms; return 1; }, clearInterval() { tick = undefined; } } });
  function render() {
    cursor = 0;
    effectCursor = 0;
    const tree = exports.HeroPoster();
    effects.forEach((effect, index) => { if (effect) { cleanups[index]?.(); cleanups[index] = effect(); effects[index] = undefined; } });
    return tree.props.children;
  }
  render();
  assert.equal(states[0], 0);
  assert.equal(render().props.children[0].props['data-scene'], 'contract-labor');
  assert.equal(delay, 3000);
  tick(); render(); assert.equal(states[0], 1);
  for (let i = 0; i < 4; i++) { tick(); render(); }
  assert.equal(states[0], 0);
  let grid = render();
  grid.props.onMouseEnter();
  grid.props.children[2].props.onMouseEnter();
  render(); assert.equal(states[0], 2); assert.equal(tick, undefined);
  grid.props.onMouseLeave(); render(); tick(); render(); assert.equal(states[0], 3);
  grid = render(); grid.props.onFocusCapture(); render(); assert.equal(tick, undefined);
  grid.props.onBlurCapture({ currentTarget: { contains: () => false }, relatedTarget: null });
  render(); assert.equal(typeof tick, 'function');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  motion.matches = true;
  motion.listeners.forEach(listener => listener());
  assert.equal(tick, undefined);
  motion.matches = false;
  motion.listeners.forEach(listener => listener());
  assert.equal(typeof tick, 'function');
  const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  assert.doesNotMatch(styles, /Mobile home hero: five equally weighted, static stories/);
  assert.doesNotMatch(styles, /\.workforce-screen-card,\s*\.workforce-screen-card\[data-active='true'\]\s*\{\s*flex:\s*none;\s*height:\s*250px/s);
  cleanups.forEach(cleanup => cleanup?.());
  assert.equal(motion.listeners.size, 0);
});
