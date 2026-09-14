import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('client logos use a reversible three-row scroll reveal', () => {
  const component = readFileSync(new URL('../components/homepage/home-curated-sections.tsx', import.meta.url), 'utf8');
  const styles = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');

  assert.match(component, /else if \(repeat\) delete node\.dataset\.visible/);
  assert.match(component, /<Reveal className="home-client-grid" repeat>/);
  assert.match(styles, /translateY\(-72px\).*transform 1\.1s/);
  assert.match(styles, /nth-child\(n\+8\):nth-child\(-n\+14\).*transition-delay: \.65s/);
  assert.match(styles, /nth-child\(n\+15\).*transition-delay: 1\.3s/);
});
