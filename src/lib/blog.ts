// Artículos del blog: un archivo Markdown por artículo en src/data/blog/.
// Cada uno se publica en /blog/<slug>/ (HTML) y /blog/<slug>/index.md (agentes).
import type { MarkdownInstance } from 'astro';

export interface PostFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  /** Fecha de publicación (YYYY-MM-DD) */
  date: string;
  autor: string;
  /** Minutos de lectura */
  lectura: number;
  tema: string;
}

const modules = import.meta.glob<MarkdownInstance<PostFrontmatter>>('../data/blog/*.md', { eager: true });

// YAML convierte una fecha sin comillas en Date: se normaliza a 'YYYY-MM-DD'.
for (const entry of Object.values(modules)) {
  const date = entry.frontmatter.date as string | Date;
  if (date instanceof Date) entry.frontmatter.date = date.toISOString().slice(0, 10);
}

export const posts = Object.entries(modules)
  .map(([file, entry]) => ({ slug: file.split('/').pop()!.replace(/\.md$/, ''), entry }))
  .sort((a, b) => b.entry.frontmatter.date.localeCompare(a.entry.frontmatter.date));

export const postPaths = () => posts.map(({ slug, entry }) => ({ params: { slug }, props: { entry } }));

export const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const BLOG_PAGE = {
  title: 'Blog y multimedia',
  eyebrow: 'Aprender juntos',
  description:
    'Artículos, noticias y contenidos de GeroAmigos sobre gerontología, persona mayor, buen trato e inclusión, con fuentes confiables.',
  lead: 'Artículos, noticias y eventos sobre los pilares de GeroAmigos: persona mayor, buen trato, inclusión y nueva longevidad, siempre con fuentes confiables.',
  multimedia: {
    title: 'Multimedia',
    badge: 'Próximamente',
    lead: 'Pronto sumaremos charlas grabadas, videos y podcasts con amigos de toda la red.',
    formatos: ['Charlas grabadas', 'Videos breves', 'Podcast'],
  },
};
