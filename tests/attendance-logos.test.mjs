import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const publicRoot = new URL('../public/', import.meta.url);
const html = readFileSync(new URL('easytime/index.html', publicRoot), 'utf8');

test('every rotating testimonial has a client name and an existing logo', () => {
  const cards = [...html.matchAll(/<article class="testimonial-card">([\s\S]*?)<\/article>/g)];
  assert.equal(cards.length, 12);
  for (const [, card] of cards) {
    assert.match(card, /class="testimonial-client"/);
    assert.match(card, /<b>[^<]+<\/b>/);
    const image = card.match(/<img[^>]*src="([^"]+)"/);
    assert.ok(image);
    assert.ok(image[1].startsWith('/'));
    assert.ok(existsSync(new URL(image[1].slice(1), publicRoot)), image[1]);
  }
});

test('customer logo images load independently of the current page URL', () => {
  const logos = [...html.matchAll(/<img\b[^>]*class="(?:partner-logo-image|testimonial-logo)"[^>]*>/g)];
  assert.ok(logos.length > 20);
  for (const [tag] of logos) {
    const src = tag.match(/src="([^"]+)"/)[1];
    assert.ok(src.startsWith('/'));
    assert.ok(existsSync(new URL(src.slice(1), publicRoot)), src);
    assert.match(tag, /loading="eager"/);
  }
});
