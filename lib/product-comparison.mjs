export function selectedProductSlugs(value, allowedSlugs) {
  const requested = (Array.isArray(value) ? value : [value]).flatMap((item) => String(item ?? '').split(','));
  const allowed = new Set(allowedSlugs);
  return [...new Set(requested.map((item) => item.trim()).filter((item) => allowed.has(item)))].slice(0, 3);
}
