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

// Menú principal. Las anclas son absolutas: funcionan en la portada y en las páginas internas.
export const NAV = [
  { label: 'Nosotros', href: '/about/' },
  { label: 'La red', href: '/#paises' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Eventos', href: '/eventos/' },
  { label: 'Contacto', href: '/#contacto' },
];

// Páginas publicadas: alimentan el sitemap, llms.txt y agents.md.
// `markdown` es la versión para agentes (llmstxt.org: las URL terminadas en / usan index.md).
// `footer`: aparece en la lista "Información" del pie de página.
export const PAGES = [
  { path: '/', label: 'Inicio', markdown: '/index.md' },
  { path: '/about/', label: 'Nosotros', markdown: '/about/index.md', footer: true },
  { path: '/recursos/', label: 'Recursos', markdown: '/recursos/index.md' },
  { path: '/blog/', label: 'Blog y multimedia', markdown: '/blog/index.md' },
  {
    path: '/blog/que-es-la-gerontologia/',
    label: '¿Qué es la gerontología y para qué sirve?',
    markdown: '/blog/que-es-la-gerontologia/index.md',
  },
  { path: '/eventos/', label: 'Eventos internacionales', markdown: '/eventos/index.md' },
  { path: '/contact/', label: 'Contacto', markdown: '/contact/index.md', footer: true },
  { path: '/privacy/', label: 'Privacidad', markdown: '/privacy/index.md', footer: true },
];

// Cursos online: se anuncian en el menú como "Pronto" mientras se preparan.
export const CURSOS = {
  label: 'Cursos online',
  badge: 'Pronto',
  mensaje: 'Estamos preparando cursos online de gerontología con la red GeroAmigos. Muy pronto podrás inscribirte aquí.',
};

export const mailto = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
