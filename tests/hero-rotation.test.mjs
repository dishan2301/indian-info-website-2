import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

test('hero defaults to EasyTime, rotates every five seconds, loops and pauses on interaction', () => {
  const states = [];
  let cursor, effect, previousDependencies, cleanup, tick, delay;
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (value) => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useEffect(callback, dependencies) {
      if (!previousDependencies || dependencies.some((value, i) => value !== previousDependencies[i])) {
        effect = callback;
        previousDependencies = dependencies;
      }
    },
  };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const source = ts.transpileModule(readFileSync(new URL('../components/homepage/hero-poster-carousel.tsx', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(source, { exports, require: (name) => name === 'react' ? react : name === 'react/jsx-runtime' ? { jsx, jsxs: jsx } : { default: name }, window: { setInterval(callback, ms) { tick = callback; delay = ms; return 1; }, clearInterval() { tick = undefined; } } });
  function render() {
    cursor = 0;
    const tree = exports.HeroPoster();
    if (effect) { cleanup?.(); cleanup = effect(); effect = undefined; }
    return tree.props.children[0];
  }
  render();
  assert.equal(states[0], 0);
  assert.equal(delay, 5000);
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
  cleanup?.();
});
