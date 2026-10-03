// Páginas de contenido (/about/, /contact/, /privacy/) escritas en Markdown.
// Cada archivo de src/data/pages se publica como HTML y como index.md para agentes.
import type { MarkdownInstance } from 'astro';

export interface PageFrontmatter {
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
}

const modules = import.meta.glob<MarkdownInstance<PageFrontmatter>>('../data/pages/*.md', { eager: true });

export const contentPages = Object.entries(modules).map(([file, entry]) => ({
  slug: file.split('/').pop()!.replace(/\.md$/, ''),
  entry,
}));

export const contentPagePaths = () =>
  contentPages.map(({ slug, entry }) => ({ params: { slug }, props: { entry } }));
