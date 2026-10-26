import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

const source = ts.transpileModule(readFileSync(new URL('../lib/sanity/client.ts', import.meta.url), 'utf8'), {
  compilerOptions: {module: ts.ModuleKind.CommonJS},
}).outputText;

function loadClient(env) {
  const context = {
    exports: {},
    process: {env},
    require: () => ({createClient: (config) => config}),
  };
  runInNewContext(source, context);
  return context.exports;
}

test('public default Sanity project remains enabled without deployment environment variables', () => {
  for (const env of [{}, {NEXT_PUBLIC_SANITY_PROJECT_ID: '', NEXT_PUBLIC_SANITY_DATASET: ''}]) {
    const client = loadClient(env);
    assert.equal(client.sanityClient.projectId, 'rmgfsayz');
    assert.equal(client.sanityClient.dataset, 'production');
    assert.equal(client.sanityConfigured, true);
    assert.equal(client.sanityClient.token, undefined);
  }
});

test('explicit Sanity configuration and server token are retained', () => {
  const client = loadClient({NEXT_PUBLIC_SANITY_PROJECT_ID: 'other123', NEXT_PUBLIC_SANITY_DATASET: 'preview', SANITY_API_READ_TOKEN: 'test-only-placeholder'});
  assert.equal(client.sanityClient.projectId, 'other123');
  assert.equal(client.sanityClient.dataset, 'preview');
  assert.equal(client.sanityConfigured, true);
  assert.equal(client.sanityClient.token, 'test-only-placeholder');
});
