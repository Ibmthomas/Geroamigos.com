// Pruebas de los archivos que genera el build (npm test ejecuta astro build antes).
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST } from './helpers/assets.mjs';

const read = (path) => readFileSync(join(DIST, path), 'utf8');
const config = readFileSync(new URL('../src/config.ts', import.meta.url), 'utf8');
const EMAIL = config.match(/email: '([^']+)'/)[1];

// Archivo de dist/ que corresponde a una URL del sitio
const distFileFor = (url) => {
  const { pathname } = new URL(url);
  return pathname.endsWith('/') ? `${pathname}index.html` : pathname;
};

const visibleText = (html) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const mainText = (html) => visibleText(html.slice(html.indexOf('<main'), html.indexOf('</main>')));

describe('llms.txt (formato de llmstxt.org)', () => {
  const lines = read('llms.txt').split('\n');
  const firstH2 = lines.findIndex((l) => l.startsWith('## '));

  test('empieza con un H1 y un resumen en blockquote', () => {
    assert.equal(lines[0], '# GeroAmigos');
    assert.match(lines.find((l, i) => i > 0 && l.trim() !== ''), /^> .{40,}/);
  });

  test('el texto libre antes de las secciones H2 no tiene títulos', () => {
    assert.ok(firstH2 > 0);
    assert.ok(lines.slice(1, firstH2).every((l) => !l.startsWith('#')));
  });

  test('incluye la guía de cuándo usar GeroAmigos y cómo contactarlo', () => {
    const intro = lines.slice(0, firstH2).join('\n');
    assert.match(intro, /When to use GeroAmigos/);
    assert.match(intro, /When not to use/);
    assert.ok(intro.includes(EMAIL));
  });

  test('las secciones H2 son listas de enlaces "- [nombre](url): notas"', () => {
    const sections = lines.slice(firstH2).filter((l) => l.trim() !== '' && !l.startsWith('## '));
    assert.ok(sections.length >= 5);
    for (const line of sections) assert.match(line, /^- \[[^\]]+\]\(https:\/\/[^)\s]+\)(: .+)?$/, line);
    assert.ok(lines.includes('## Optional'));
  });

  test('todos los enlaces a geroamigos.com existen en el build', () => {
    const urls = [...read('llms.txt').matchAll(/\((https:\/\/geroamigos\.com[^)\s]*)\)/g)].map((m) => m[1]);
    assert.ok(urls.length >= 5);
    for (const url of urls) assert.ok(existsSync(join(DIST, distFileFor(url))), url);
  });
});

describe('agents.md', () => {
  test('describe cuándo usar GeroAmigos y cómo derivar consultas', () => {
    const md = read('agents.md');
    assert.match(md, /^# GeroAmigos/);
    assert.match(md, /## When to use/);
    assert.match(md, /## Cómo derivar una consulta/);
    assert.ok(md.includes(EMAIL));
  });
});

describe('JSON-LD de la organización', () => {
  const html = read('index.html');
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const org = data['@graph'].find((n) => n['@type'] === 'Organization');

  test('incluye contactPoint con correo y tipo de contacto', () => {
    const [contact] = org.contactPoint;
    assert.equal(contact['@type'], 'ContactPoint');
    assert.equal(contact.email, EMAIL);
    assert.ok(contact.contactType);
  });

  test('incluye address como PostalAddress', () => {
    assert.equal(org.address['@type'], 'PostalAddress');
    assert.match(org.address.addressCountry, /^[A-Z]{2}$/);
  });

  test('mantiene logo, Instagram y declara el sitio web', () => {
    assert.equal(org.logo, 'https://geroamigos.com/logo.png');
    assert.ok(org.sameAs.some((u) => u.includes('instagram.com')));
    assert.ok(data['@graph'].some((n) => n['@type'] === 'WebSite' && n.name === 'GeroAmigos'));
  });
});

describe('páginas de confianza', () => {
  for (const [path, title] of [
    ['about', 'Nosotros'],
    ['contact', 'Contacto'],
    ['privacy', 'Política de privacidad'],
  ]) {
    test(`/${path}/ tiene contenido real en HTML y Markdown`, () => {
      const html = read(`${path}/index.html`);
      assert.match(html, new RegExp(`<h1[^>]*>${title}</h1>`));
      assert.ok(mainText(html).length >= 500, `${path}: ${mainText(html).length} caracteres`);
      assert.ok(read(`${path}/index.md`).length >= 500);
      assert.ok(html.includes(`mailto:${EMAIL}`));
    });
  }
});

describe('sitemap, robots y enlaces alternativos', () => {
  test('el sitemap lista las páginas publicadas y todas existen', () => {
    const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    assert.deepEqual(locs, [
      'https://geroamigos.com/',
      'https://geroamigos.com/about/',
      'https://geroamigos.com/contact/',
      'https://geroamigos.com/privacy/',
    ]);
    for (const loc of locs) assert.ok(existsSync(join(DIST, distFileFor(loc))), loc);
  });

  test('robots.txt apunta al sitemap', () => {
    assert.match(read('robots.txt'), /^Sitemap: https:\/\/geroamigos\.com\/sitemap\.xml$/m);
  });

  test('cada página HTML enlaza su versión Markdown existente', () => {
    for (const page of ['index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html']) {
      const href = read(page).match(/<link rel="alternate" type="text\/markdown" href="([^"]+)"/)?.[1];
      assert.ok(href && existsSync(join(DIST, href)), `${page} → ${href}`);
    }
  });

  test('la página 404 no se indexa ni anuncia versión Markdown', () => {
    const html = read('404.html');
    assert.match(html, /<meta name="robots" content="noindex">/);
    assert.ok(!html.includes('type="text/markdown"'));
  });
});

describe('una sola fuente de contenido', () => {
  test('cada servicio de la portada aparece en index.md', () => {
    const titles = [...read('index.html').matchAll(/class="servicio__title"[^>]*>([^<]+)</g)].map((m) => m[1]);
    assert.equal(titles.length, 8);
    const md = read('index.md');
    for (const title of titles) assert.ok(md.includes(`**${title}:**`), title);
  });

  test('todo el sitio usa el mismo correo de contacto', () => {
    for (const file of ['index.html', 'index.md', 'llms.txt', 'agents.md', 'contact/index.md', 'privacy/index.md']) {
      const emails = new Set(read(file).match(/[\w.+-]+@[\w-]+\.[\w.]+/g));
      assert.deepEqual([...emails], [EMAIL], file);
    }
  });
});
