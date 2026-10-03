// Negociación de contenido HTML / Markdown según el encabezado Accept.
// Reglas (RFC 9110 §12.5.1 y https://acceptmarkdown.com/guides/accept-parsing):
// - Gana el mayor q. Con igual q, gana el rango más específico
//   (text/markdown > text/* > */*). Si sigue el empate, se sirve HTML (por defecto).
// - q=0 significa "no me envíes esto" y nunca se elige ese tipo.
// - Sin encabezado Accept, o con */*, se sirve HTML.
// - Un Accept que solo excluye tipos (todo q=0) acepta lo demás.
// - Si ningún tipo disponible es aceptable, el resultado es null (406 Not Acceptable).

/** Tipos que el sitio puede servir, en orden de preferencia por defecto. */
export const REPRESENTATIONS = [
  { key: 'html', type: 'text', subtype: 'html', mediaType: 'text/html' },
  { key: 'markdown', type: 'text', subtype: 'markdown', mediaType: 'text/markdown' },
];

/**
 * Convierte un encabezado Accept en rangos { type, subtype, q }.
 * Los rangos mal formados o con q inválido se ignoran.
 * @param {string} header
 */
export function parseAccept(header) {
  const ranges = [];
  for (const part of header.split(',')) {
    const [range, ...params] = part.split(';');
    const [type, subtype, extra] = range.trim().toLowerCase().split('/');
    if (!type || !subtype || extra !== undefined) continue;
    let q = 1;
    let valid = true;
    for (const param of params) {
      const [name, value = ''] = param.split('=');
      if (name.trim().toLowerCase() !== 'q') continue;
      const v = value.trim();
      if (!/^(0(\.\d{0,3})?|1(\.0{0,3})?)$/.test(v)) valid = false;
      else q = Number(v);
    }
    if (valid) ranges.push({ type, subtype, q });
  }
  return ranges;
}

const specificity = (range, rep) => {
  if (range.type === rep.type && range.subtype === rep.subtype) return 3;
  if (range.type === rep.type && range.subtype === '*') return 2;
  if (range.type === '*' && range.subtype === '*') return 1;
  return 0;
};

/**
 * Elige la representación para un encabezado Accept.
 * @param {string | null | undefined} header valor de Accept (null si no viene)
 * @returns {'html' | 'markdown' | null} null = 406 Not Acceptable
 */
export function chooseRepresentation(header) {
  if (header === null || header === undefined) return 'html';
  const ranges = parseAccept(header);
  if (ranges.length > 0 && ranges.every((r) => r.q === 0)) {
    ranges.push({ type: '*', subtype: '*', q: 1 });
  }

  const scored = REPRESENTATIONS.map((rep, order) => {
    let best = null;
    for (const range of ranges) {
      const s = specificity(range, rep);
      if (s > 0 && (!best || s > best.s)) best = { s, q: range.q };
    }
    return { key: rep.key, order, q: best ? best.q : 0, s: best ? best.s : 0 };
  }).filter((c) => c.q > 0);

  if (scored.length === 0) return null;
  scored.sort((a, b) => b.q - a.q || b.s - a.s || a.order - b.order);
  return scored[0].key;
}
