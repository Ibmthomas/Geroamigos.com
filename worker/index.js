// Worker de geroamigos.com: sirve el sitio estático (binding ASSETS) y negocia
// HTML / Markdown en las páginas según el encabezado Accept.
import { chooseRepresentation } from './negotiate.js';

const SITE = 'https://geroamigos.com';
const MARKDOWN = 'text/markdown; charset=utf-8';

// Páginas = rutas sin extensión o terminadas en .html (no imágenes, CSS, .md, .txt…).
export function isPagePath(pathname) {
  const last = pathname.split('/').pop();
  return last === '' || last.endsWith('.html') || !last.includes('.');
}

// Versión Markdown de cada página (llmstxt.org: las URL terminadas en / usan index.md).
export function markdownPathFor(pathname) {
  let path = pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (!path.endsWith('/')) path += '/';
  return `${path}index.md`;
}

const appendVary = (headers) => {
  const vary = headers.get('Vary');
  if (!vary) headers.set('Vary', 'Accept');
  else if (!/(^|,)\s*accept\s*(,|$)/i.test(vary)) headers.set('Vary', `${vary}, Accept`);
};

function notFoundMarkdown(pathname) {
  return [
    '# 404 · Página no encontrada',
    '',
    `No existe ninguna página en \`${pathname}\` dentro de geroamigos.com. Revisa la dirección o usa uno de estos enlaces:`,
    '',
    `- [Inicio](${SITE}/index.md)`,
    `- [Índice para agentes (llms.txt)](${SITE}/llms.txt)`,
    `- [Mapa del sitio](${SITE}/sitemap.xml)`,
    '',
  ].join('\n');
}

function markdownNotFound(request, url) {
  const body = notFoundMarkdown(url.pathname);
  return new Response(request.method === 'HEAD' ? null : body, {
    status: 404,
    headers: {
      'Content-Type': MARKDOWN,
      'Content-Length': String(new TextEncoder().encode(body).length),
      Vary: 'Accept',
      'Cache-Control': 'no-store',
    },
  });
}

function notAcceptable(request) {
  const body = '406 Not Acceptable: esta página está disponible como text/html y text/markdown.\n';
  return new Response(request.method === 'HEAD' ? null : body, {
    status: 406,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', Vary: 'Accept' },
  });
}

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: (req: Request) => Promise<Response> } }} env
   */
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRead = request.method === 'GET' || request.method === 'HEAD';

    // Archivos (imágenes, CSS, .md, llms.txt, sitemap…) y métodos que no son de lectura
    if (!isRead || !isPagePath(url.pathname)) {
      const response = await env.ASSETS.fetch(request);
      if (url.pathname.endsWith('.md') && response.ok) {
        const md = new Response(response.body, response);
        md.headers.set('Content-Type', MARKDOWN);
        return md;
      }
      return response;
    }

    const choice = chooseRepresentation(request.headers.get('Accept'));

    if (choice === 'markdown') {
      const mdUrl = new URL(markdownPathFor(url.pathname), url);
      const md = await env.ASSETS.fetch(new Request(mdUrl, { method: request.method, headers: request.headers }));
      if (md.status === 304) {
        const notModified = new Response(null, md);
        notModified.headers.set('Vary', 'Accept');
        return notModified;
      }
      if (!md.ok) return markdownNotFound(request, url);
      const response = new Response(md.body, md);
      response.headers.set('Content-Type', MARKDOWN);
      response.headers.set('Vary', 'Accept');
      response.headers.set('Link', `<${new URL(url.pathname, SITE).href}>; rel="canonical"`);
      return response;
    }

    const asset = await env.ASSETS.fetch(request);
    if (choice === null && asset.status !== 404) return notAcceptable(request);

    const response = new Response(asset.body, asset);
    appendVary(response.headers);
    if (asset.status === 200) {
      response.headers.set('Link', `<${markdownPathFor(url.pathname)}>; rel="alternate"; type="text/markdown"`);
    }
    return response;
  },
};
