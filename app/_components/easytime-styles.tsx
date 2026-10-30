import { readFileSync } from 'node:fs';

export function scopeEasytimeCss(css: string) {
  return `@scope (.easytime-page) { ${css.replace(/:root|\bhtml\b|\bbody\b/g, ':scope').replace(/url\((['"]?)(?!\/|data:|https?:|#)([^)'"\s]+)\1\)/g, 'url($1/easytime/$2$1)')} }`;
}

export function EasytimeStyles({ files }: { files: string[] }) {
  return <style dangerouslySetInnerHTML={{ __html: files.map((file) => scopeEasytimeCss(readFileSync(`${process.cwd()}/public/easytime/${file}`, 'utf8'))).join('\n') }} />;
}
