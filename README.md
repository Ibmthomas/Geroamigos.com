# GeroAmigos · geroamigos.com

Landing page de **GeroAmigos**: longevidad activa con voz latina.
Construida con [Astro](https://astro.build) siguiendo el *Manual de marca 2026* (Tejido y Red).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ localmente
```

> **Nota Windows:** el proyecto usa Astro 6. Astro 7 trae un binario nativo (`satteri`)
> que Windows Smart App Control bloquea (error 4551). Si se actualiza a Astro 7, revisar eso primero.

## Estructura

```
src/
  config.ts            correo de contacto, menú y textos globales
  styles/global.css    tokens de marca (paleta, tipografías, botones)
  layouts/Base.astro   <head>, SEO y Open Graph
  components/          una sección por archivo (Hero, Valores, Servicios, ...)
  assets/img/          fotografías (Astro las optimiza a WebP en el build)
public/
  favicon.svg          isotipo
  trama.svg            patrón "Trama"
  og-image.jpg         imagen para compartir en redes
```

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

## Dominio

DNS de `geroamigos.com` administrado en Cloudflare (nameservers `nick` y `opal.ns.cloudflare.com`);
el registro del dominio sigue en GoDaddy.
