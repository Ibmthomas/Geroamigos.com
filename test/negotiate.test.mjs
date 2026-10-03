import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { chooseRepresentation, parseAccept } from '../worker/negotiate.js';

const BROWSER = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';

describe('chooseRepresentation', () => {
  const cases = [
    ['sin encabezado Accept → HTML', null, 'html'],
    ['*/* → HTML (por defecto)', '*/*', 'html'],
    ['navegador típico → HTML', BROWSER, 'html'],
    ['text/html → HTML', 'text/html', 'html'],
    ['text/markdown → Markdown', 'text/markdown', 'markdown'],
    ['mayúsculas y parámetros', 'TEXT/MARKDOWN; charset=UTF-8', 'markdown'],
    ['Markdown con mayor q', 'text/markdown, text/html;q=0.9', 'markdown'],
    ['HTML con mayor q', 'text/html, text/markdown;q=0.9', 'html'],
    ['q fraccionarios', 'text/markdown;q=0.9, text/html;q=0.8', 'markdown'],
    ['empate exacto → HTML por defecto', 'text/markdown, text/html', 'html'],
    ['empate de q: gana el rango más específico', 'text/markdown, */*', 'markdown'],
    ['text/* empata → HTML', 'text/*', 'html'],
    ['text/markdown;q=0 → cualquier cosa menos Markdown', 'text/markdown;q=0', 'html'],
    ['q inválido se ignora', 'text/markdown;q=abc, text/html', 'html'],
    ['q mayor que 1 es inválido', 'text/markdown;q=2, text/html;q=0.5', 'html'],
    ['tipo no disponible → 406', 'application/json', null],
    ['ambos excluidos con q=0 → 406', 'text/html;q=0, text/markdown;q=0', null],
    ['encabezado vacío → 406', '', null],
  ];
  for (const [name, accept, expected] of cases) {
    test(name, () => assert.equal(chooseRepresentation(accept), expected));
  }
});

describe('parseAccept', () => {
  test('lee tipo, subtipo y q', () => {
    assert.deepEqual(parseAccept('text/markdown;q=0.5, */*'), [
      { type: 'text', subtype: 'markdown', q: 0.5 },
      { type: '*', subtype: '*', q: 1 },
    ]);
  });
  test('descarta rangos mal formados', () => {
    assert.deepEqual(parseAccept('text, /html, a/b/c'), []);
  });
});
