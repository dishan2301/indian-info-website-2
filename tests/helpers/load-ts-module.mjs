import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
const require = createRequire(import.meta.url);

export function loadTsModule(path, dependencies = {}, globals = {}) {
  const source = ts.transpileModule(readFileSync(path, 'utf8'), {
    compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true},
  }).outputText;
  const context = {exports: {}, process, Buffer, Request, Response, Headers, console, ...globals, require: name => Object.hasOwn(dependencies, name) ? dependencies[name] : require(name)};
  runInNewContext(source, context);
  return context.exports;
}
