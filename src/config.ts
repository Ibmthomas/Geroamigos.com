// Datos del sitio en un solo lugar: cambia aquí el correo, los enlaces o el menú.
export const SITE = {
  name: 'GeroAmigos',
  tagline: 'Longevidad activa con voz latina',
  description:
    'GeroAmigos es una red de profesionales de la gerontología en Latinoamérica. Charlas, consultorías y asesorías para instituciones, residencias, profesionales y familias.',
  url: 'https://geroamigos.com',
  email: 'hablemos@geroamigos.com',
  social: '@geroa_migos',
  instagram: 'https://www.instagram.com/geroa_migos/',
  // Datos para el JSON-LD de la organización (schema.org PostalAddress / areaServed)
  addressCountry: 'CL',
  areaServed: 'Latinoamérica',
  language: 'es',
};

// Anclas absolutas: funcionan tanto en la portada como en las páginas internas.
export const NAV = [
  { label: 'La red', href: '/#paises' },
  { label: 'Propósito', href: '/#proposito' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Amigos', href: '/#amigos' },
  { label: 'Contacto', href: '/#contacto' },
];

// Páginas publicadas: alimentan el sitemap, llms.txt y los enlaces del pie de página.
// `markdown` es la versión para agentes (llmstxt.org: las URL terminadas en / usan index.md).
export const PAGES = [
  { path: '/', label: 'Inicio', markdown: '/index.md' },
  { path: '/about/', label: 'Nosotros', markdown: '/about/index.md' },
  { path: '/contact/', label: 'Contacto', markdown: '/contact/index.md' },
  { path: '/privacy/', label: 'Privacidad', markdown: '/privacy/index.md' },
];

export const mailto = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
