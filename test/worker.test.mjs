// Pruebas del Worker contra el sitio construido (npm test ejecuta astro build antes).
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { isPagePath, markdownPathFor } from '../worker/index.js';
import { createAssets } from './helpers/assets.mjs';

const env = { ASSETS: createAssets() };
const call = (path, { accept, method = 'GET', assets = env } = {}) =>
  worker.fetch(
    new Request(`https://geroamigos.com${path}`, {
      method,
      headers: accept === undefined ? {} : { Accept: accept },
    }),
    assets,
  );
const varyHasAccept = (res) => /(^|,)\s*accept\s*(,|$)/i.test(res.headers.get('Vary') ?? '');

describe('negociación Markdown en la portada', () => {
  test('Accept: text/markdown devuelve Markdown con Vary: Accept', async () => {
    const res = await call('/', { accept: 'text/markdown' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.ok(varyHasAccept(res));
    assert.equal(res.headers.get('Link'), '<https://geroamigos.com/>; rel="canonical"');
    const body = await res.text();
    assert.match(body, /^# GeroAmigos/);
    assert.match(body, /hablemos@geroamigos\.com/);
  });

  test('Accept: text/html sigue devolviendo HTML, con Vary y enlace a la versión Markdown', async () => {
    const res = await call('/', { accept: 'text/html' });
    assert.equal(res.status, 200);
    assert.match(res.headers.get('Content-Type'), /^text\/html/);
    assert.ok(varyHasAccept(res));
    assert.equal(res.headers.get('Link'), '</index.md>; rel="alternate"; type="text/markdown"');
    assert.match(await res.text(), /<html lang="es"/);
  });

  test('un navegador o un cliente sin Accept reciben HTML', async () => {
    for (const accept of [undefined, 'text/html,application/xhtml+xml,*/*;q=0.8', '*/*']) {
      const res = await call('/', { accept });
      assert.match(res.headers.get('Content-Type'), /^text\/html/, String(accept));
    }
  });

  test('HEAD con Accept: text/markdown devuelve encabezados sin cuerpo', async () => {
    const res = await call('/', { accept: 'text/markdown', method: 'HEAD' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.equal(await res.text(), '');
  });

  test('un tipo que el sitio no ofrece recibe 406 con Vary: Accept', async () => {
    const res = await call('/', { accept: 'application/json' });
    assert.equal(res.status, 406);
    assert.ok(varyHasAccept(res));
  });
});

describe('páginas internas', () => {
  for (const [path, title] of [
    ['/about/', '# Nosotros'],
    ['/about', '# Nosotros'],
    ['/contact/', '# Contacto'],
    ['/privacy/', '# Política de privacidad'],
  ]) {
    test(`${path} en Markdown`, async () => {
      const res = await call(path, { accept: 'text/markdown' });
      assert.equal(res.status, 200);
      assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
      assert.ok((await res.text()).startsWith(title));
    });
  }

  test('/about en HTML conserva la redirección a /about/', async () => {
    const res = await call('/about', { accept: 'text/html' });
    assert.equal(res.status, 307);
    assert.equal(res.headers.get('Location'), '/about/');
  });
});

describe('404 para agentes', () => {
  const missing = '/__ora-404-probe-9rkz5js1';

  test('Accept: text/markdown → 404 con cuerpo Markdown y enlaces', async () => {
    const res = await call(missing, { accept: 'text/markdown' });
    assert.equal(res.status, 404);
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
    assert.ok(varyHasAccept(res));
    const body = await res.text();
    assert.ok(body.length >= 20);
    assert.match(body, /\(https:\/\/geroamigos\.com\/llms\.txt\)/);
    assert.match(body, /\(https:\/\/geroamigos\.com\/sitemap\.xml\)/);
    assert.equal(res.headers.get('Content-Length'), String(new TextEncoder().encode(body).length));
  });

  test('Accept: text/html → 404 con la página HTML de la marca', async () => {
    const res = await call(missing, { accept: 'text/html' });
    assert.equal(res.status, 404);
    assert.match(res.headers.get('Content-Type'), /^text\/html/);
    assert.match(await res.text(), /No encontramos esta página/);
  });

  test('una ruta inexistente responde 404 aunque el tipo no sea aceptable', async () => {
    const res = await call(missing, { accept: 'application/json' });
    assert.equal(res.status, 404);
  });
});

describe('archivos estáticos', () => {
  test('llms.txt se sirve tal cual', async () => {
    const res = await call('/llms.txt', { accept: 'text/markdown' });
    assert.equal(res.status, 200);
    assert.match(await res.text(), /^# GeroAmigos\n/);
  });

  test('los .md se sirven como text/markdown; charset=utf-8', async () => {
    const res = await call('/index.md');
    assert.equal(res.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  });

  test('las imágenes no se negocian ni reciben 406', async () => {
    const res = await call('/favicon.svg', { accept: 'image/avif,image/webp' });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('Content-Type'), 'image/svg+xml');
  });

  test('métodos que no son de lectura pasan directo a los archivos', async () => {
    const res = await call('/', { accept: 'text/markdown', method: 'POST' });
    assert.match(res.headers.get('Content-Type'), /^text\/html/);
  });

  test('un 304 de la versión Markdown se respeta', async () => {
    const assets = {
      ASSETS: { fetch: async () => new Response(null, { status: 304, headers: { ETag: '"x"' } }) },
    };
    const res = await call('/', { accept: 'text/markdown', assets });
    assert.equal(res.status, 304);
    assert.ok(varyHasAccept(res));
  });
});

describe('rutas', () => {
  test('isPagePath distingue páginas de archivos', () => {
    assert.ok(isPagePath('/'));
    assert.ok(isPagePath('/about'));
    assert.ok(isPagePath('/about/'));
    assert.ok(isPagePath('/about/index.html'));
    assert.ok(!isPagePath('/llms.txt'));
    assert.ok(!isPagePath('/index.md'));
    assert.ok(!isPagePath('/_astro/foto.webp'));
  });

  test('markdownPathFor sigue la convención de llmstxt.org', () => {
    assert.equal(markdownPathFor('/'), '/index.md');
    assert.equal(markdownPathFor('/about'), '/about/index.md');
    assert.equal(markdownPathFor('/about/'), '/about/index.md');
    assert.equal(markdownPathFor('/about/index.html'), '/about/index.md');
  });
});
