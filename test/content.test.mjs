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

  test('el correo de contacto del sitio es único; la portada suma solo los correos de los amigos', () => {
    const emailsOf = (file) => new Set(read(file).match(/[\w.+-]+@[\w-]+\.[\w.]+/g));
    for (const file of ['llms.txt', 'agents.md', 'contact/index.md', 'privacy/index.md']) {
      assert.deepEqual([...emailsOf(file)], [EMAIL], file);
    }
    const paises = readFileSync(new URL('../src/data/paises.ts', import.meta.url), 'utf8');
    const deAmigos = [...paises.matchAll(/mailto:([\w.+-]+@[\w-]+\.[\w.]+)/g)].map((m) => m[1]);
    for (const file of ['index.html', 'index.md']) {
      assert.deepEqual([...emailsOf(file)].sort(), [EMAIL, ...deAmigos].sort(), file);
    }
  });
});

describe('portada: mapa y recorrido por la red', () => {
  const html = read('index.html');
  const PAISES = ['mexico', 'costa-rica', 'colombia', 'venezuela', 'peru', 'chile'];
  const NOMBRES = ['México', 'Costa Rica', 'Colombia', 'Venezuela', 'Perú', 'Chile'];
  // HTML de la sección de un país: hasta donde empieza el siguiente (las tarjetas de amigos
  // también son <article>, así que no sirve cortar en el primer </article>)
  const seccion = (slug) => {
    const start = html.indexOf(`id="pais-${slug}"`);
    const next = html.indexOf('data-pais-section=', html.indexOf('data-pais-section=', start) + 1);
    return html.slice(start, next > 0 ? next : html.indexOf('id="proposito"'));
  };

  test('el mapa del hero enlaza los 6 países de la red, de norte a sur', () => {
    const hero = html.slice(html.indexOf('data-mapa="hero"'), html.indexOf('data-mapa="mini"'));
    const links = [...hero.matchAll(/<a href="#pais-([a-z-]+)" class="mapa__pais"[^>]*aria-label="([^"]+)"/g)];
    assert.deepEqual(links.map((m) => m[1]), PAISES);
    links.forEach((m, i) => assert.ok(m[2].startsWith(NOMBRES[i]), m[2]));
    const pills = [...hero.matchAll(/class="mapa__pill"[^>]*data-pais="([a-z-]+)"/g)].map((m) => m[1]);
    assert.deepEqual(pills, PAISES);
  });

  test('los países de contexto se dibujan una sola vez y el mini mapa los reutiliza', () => {
    assert.equal(html.match(/id="latam-base"/g).length, 1);
    assert.equal(html.match(/<use href="#latam-base"/g).length, 2);
  });

  test('cada país tiene su sección con hito, encuadre del mapa y 3 fotos', () => {
    for (const slug of PAISES) {
      assert.ok(html.includes(`id="pais-${slug}"`), slug);
      const section = seccion(slug);
      assert.match(section, /role="img" aria-label="Ilustración de [^"]+"/);
      const focus = section.match(/data-focus="translate\((-?[\d.]+)px, (-?[\d.]+)px\) scale\(([\d.]+)\)"/);
      assert.ok(focus, `${slug}: data-focus`);
      const scale = Number(focus[3]);
      assert.ok(scale >= 1.15 && scale <= 2.6, `${slug}: escala ${scale}`);
      assert.equal(section.match(/class="galeria__item"/g).length, 3, slug);
    }
  });

  test('la lista del recorrido sigue el mismo orden', () => {
    const rail = [...html.matchAll(/data-rail="([a-z-]+)"/g)].map((m) => m[1]);
    assert.deepEqual(rail, PAISES);
  });

  test('Chile presenta a Thomas Contreras; los demás países invitan a sumarse', () => {
    const chile = seccion('chile');
    assert.match(chile, /Thomas Contreras Gavilán/);
    assert.match(chile, /CEO &amp; Founder de MACA/);
    assert.match(chile, /<img[^>]+alt="Retrato de Thomas Contreras Gavilán"/);
    assert.match(chile, /Charlas online disponibles/);
    assert.match(chile, /“Cuando el mundo tenga canas”/);
    assert.match(chile, /“Desafíos para residencias”/);
    assert.match(chile, /href="https:\/\/www\.instagram\.com\/maca\.inn\/"/);
    const costaRica = seccion('costa-rica');
    assert.match(costaRica, /Pronto presentaremos a los amigos de Costa Rica/);
  });

  test('México presenta a Lilian y Colombia a Catalina y Natalia, con foto, ciudad y oferta', () => {
    const casos = [
      ['mexico', 'Lilian Pedroza Espinosa de los Monteros', 'Estado de México', 'Servicios en Altern Gerontológica', '@altern_gerontologica'],
      ['colombia', 'Laura Catalina Restrepo Barrientos', 'Bello, Antioquia', 'Servicios de Geronto Senior', 'gerontosenior2025@gmail.com'],
      ['colombia', 'Natalia Hurtado Alzate', 'Medellín', 'Charlas, talleres y acompañamientos', '@gerontologianathural'],
    ];
    for (const [slug, nombre, ciudad, oferta, red] of casos) {
      const html = seccion(slug);
      assert.ok(html.includes(nombre), nombre);
      assert.match(html, new RegExp(`<img[^>]+alt="Retrato de ${nombre}"`), `${nombre}: foto`);
      assert.ok(html.includes(`>${ciudad}</p>`), `${nombre}: ciudad`);
      assert.ok(html.includes(oferta), `${nombre}: oferta`);
      assert.ok(html.includes(red), `${nombre}: red`);
    }
  });

  test('la oferta abre un correo al amigo si tiene correo; si no, se muestra sin enlace', () => {
    const chile = seccion('chile');
    assert.match(chile, /href="mailto:thomas@macainn\.cl\?subject=Cuando%20el%20mundo%20tenga%20canas%20%C2%B7%20v%C3%ADa%20GeroAmigos"/);
    const mexico = seccion('mexico');
    assert.ok(!/<a class="oferta"/.test(mexico), 'Lilian no tiene correo publicado');
    assert.match(mexico, /<span class="oferta"/);
  });

  test('la invitación a sumarse lista solo los países sin amigos todavía', () => {
    const amigos = html.slice(html.indexOf('id="amigos"'), html.indexOf('id="contacto"'));
    assert.match(amigos, /Próximamente: Costa Rica · Venezuela · Perú/);
  });

  test('servicios figuran como próximamente y los amigos unen a los 6 países', () => {
    assert.match(html, /class="servicios__badge"[^>]*>Próximamente</);
    const amigos = html.slice(html.indexOf('id="amigos"'), html.indexOf('id="contacto"'));
    assert.equal(amigos.match(/class="anillo__circulo"/g).length, 6);
    for (const nombre of NOMBRES) assert.ok(amigos.includes(`>${nombre}</a>`), nombre);
  });

  test('index.md, llms.txt y el JSON-LD nombran los 6 países', () => {
    const md = read('index.md');
    NOMBRES.forEach((n, i) => assert.ok(md.includes(`### ${i + 1}. ${n}`), n));
    assert.match(md, /\*\*Thomas Contreras Gavilán\*\*/);
    assert.match(md, /Charlas online disponibles: «Cuando el mundo tenga canas»/);
    assert.match(md, /\*\*Lilian Pedroza Espinosa de los Monteros\*\* \(Estado de México\)/);
    assert.match(md, /\*\*Laura Catalina Restrepo Barrientos\*\* \(Bello, Antioquia\)/);
    assert.match(md, /Servicios de Geronto Senior: Acompañamiento gerontológico integral/);
    assert.match(md, /\*\*Natalia Hurtado Alzate\*\* \(Medellín\)/);
    for (const n of NOMBRES) assert.ok(read('llms.txt').includes(n), n);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const org = data['@graph'].find((x) => x['@type'] === 'Organization');
    assert.deepEqual(org.areaServed.filter((a) => a['@type'] === 'Country').map((a) => a.name), NOMBRES);
  });
});
