import assert from 'node:assert/strict';
import test from 'node:test';
import { selectedProductSlugs } from '../lib/product-comparison.mjs';

test('comparison query accepts unique known products and caps the shortlist', () => {
  assert.deepEqual(selectedProductSlugs(['i-18,ai-60', 'i-18', 'unknown', 'fbl-200', 'is-500'], ['i-18', 'ai-60', 'fbl-200', 'is-500']), ['i-18', 'ai-60', 'fbl-200']);
  assert.deepEqual(selectedProductSlugs(undefined, ['i-18']), []);
});
