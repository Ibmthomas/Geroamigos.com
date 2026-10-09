# GeroAmigos · geroamigos.com

Landing page de **GeroAmigos**: longevidad activa con voz latina.
Construida con [Astro](https://astro.build) siguiendo el *Manual de marca 2026* (Tejido y Red).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ localmente
npm test         # build + pruebas (node:test) del Worker y de los archivos generados
```

> **Nota Windows:** el proyecto usa Astro 6. Astro 7 trae un binario nativo (`satteri`)
> que Windows Smart App Control bloquea (error 4551). Si se actualiza a Astro 7, revisar eso primero.

## Estructura

```
src/
  config.ts            correo, menú, páginas publicadas y datos de la organización
  data/home.ts         textos de la portada (fuente única para HTML y Markdown)
  data/pages/*.md      Nosotros, Contacto y Privacidad (se publican en HTML y en index.md)
  data/blog/*.md       artículos del blog: uno por archivo → /blog/<archivo>/
  data/recursos.ts     guías y materiales de /recursos/ (hoy: vista previa de demostración)
  data/eventos.ts      agenda de /eventos/ (solo eventos con fecha confirmada por el organizador)
  lib/agent-docs.ts    genera index.md, llms.txt, agents.md y sitemap.xml
  styles/global.css    tokens de marca (paleta, tipografías, botones)
  layouts/             Base (<head>, SEO, JSON-LD) y Page (páginas de texto)
  components/          una sección por archivo (Hero, Valores, Servicios, ...)
  assets/img/          fotografías (Astro las optimiza a WebP en el build)
worker/                Worker de Cloudflare: negociación HTML / Markdown, 404 y 406
test/                  pruebas con node:test sobre el build
public/
  favicon.svg          isotipo
  trama.svg            patrón "Trama"
  og-image.jpg         imagen para compartir en redes
```

## Accesibilidad: modo oscuro y texto grande

La barra superior tiene un control `A` / `A+` / tema:

- **Tema:** `data-theme="light|dark"` en `<html>`. Sin elección guardada sigue la preferencia del
  sistema (`prefers-color-scheme`). Un script en `<head>` lo aplica antes de pintar (sin parpadeo).
- **Texto grande:** `data-text="lg"` sube la fuente base a 118,75 %; como el sitio usa `rem`, escala
  todo el contenido. El encabezado usa tamaños propios (`em` sobre 16 px) para que el menú no se desborde.
- La elección se guarda en `localStorage` (`ga-theme`, `ga-text`).
- Los componentes usan **tokens semánticos** (`--bg`, `--surface`, `--ink`, `--ink-soft`, `--line`,
  `--block`, `--on-block`, `--link`, `--accent-text`), que `global.css` redefine en modo oscuro. La
  paleta de marca (`--terracota`, `--papel`, …) no cambia: úsala solo para colores de marca fijos
  (p. ej. texto Papel sobre un círculo Jade), no para fondo o texto de página.

## Marca

| Token      | Hex       | Uso                                   |
|------------|-----------|---------------------------------------|
| Terracota  | `#D2532C` | color principal, CTA                  |
| Maíz       | `#E8A922` | acentos                               |
| Jade       | `#1F7A73` | acentos, enlaces                      |
| Cacao      | `#2A1D14` | texto, fondos oscuros                 |
| Papel      | `#FBF6EE` | fondo principal                       |
| Algodón    | `#F3E8D6` | fondo alterno                         |
| Fuego / Monte / Noche | `#BF3706` / `#1C510F` / `#1A2814` | cruces de círculos (solo apoyo) |

- Titulares: **Bricolage Grotesque** · Textos: **Figtree** (autoalojadas vía Fontsource).
- Sin degradados: los cruces de círculos se resuelven por multiplicación de color.

## Agentes de IA

- Cada página tiene versión Markdown (`/index.md`, `/about/index.md`, …) y la anuncia con
  `<link rel="alternate" type="text/markdown">`.
- El Worker negocia por `Accept` ([acceptmarkdown.com](https://acceptmarkdown.com)): `text/markdown`
  recibe Markdown, navegadores reciben HTML, siempre con `Vary: Accept`; tipos no disponibles → 406;
  rutas inexistentes → 404 en HTML o en Markdown según lo pedido.
- `/llms.txt` sigue el formato de [llmstxt.org](https://llmstxt.org) e incluye cuándo recomendar
  GeroAmigos; `/agents.md` amplía esa guía.

Comprobar en producción:

```bash
curl -sS -i -H 'Accept: text/markdown' https://geroamigos.com/
```

## Dominio

DNS de `geroamigos.com` administrado en Cloudflare (nameservers `nick` y `opal.ns.cloudflare.com`);
el registro del dominio sigue en GoDaddy.
