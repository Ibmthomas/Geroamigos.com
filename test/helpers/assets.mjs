// Simula el binding ASSETS de Cloudflare sobre la carpeta dist/ construida por Astro,
// con la misma configuración que wrangler.jsonc:
// - html_handling "auto-trailing-slash": /ruta/ sirve /ruta/index.html; /ruta redirige (307) a /ruta/
// - not_found_handling "404-page": lo que no existe devuelve /404.html con estado 404
import { readFile, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

const isFile = async (path) => {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
};

export function createAssets(dir = DIST) {
  const serve = async (file, status, method) =>
    new Response(method === 'HEAD' ? null : await readFile(file), {
      status,
      headers: { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream', ETag: `"${file.length}"` },
    });

  return {
    async fetch(request) {
      const path = decodeURIComponent(new URL(request.url).pathname);
      if (path.endsWith('/')) {
        const file = join(dir, path, 'index.html');
        if (await isFile(file)) return serve(file, 200, request.method);
      } else if (extname(path)) {
        const file = join(dir, path);
        if (await isFile(file)) return serve(file, 200, request.method);
      } else if (await isFile(join(dir, path, 'index.html'))) {
        return new Response(null, { status: 307, headers: { Location: `${path}/` } });
      }
      return serve(join(dir, '404.html'), 404, request.method);
    },
  };
}
