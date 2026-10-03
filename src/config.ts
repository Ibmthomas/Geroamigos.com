// Datos del sitio en un solo lugar: cambia aquí el correo, los enlaces o el menú.
export const SITE = {
  name: 'GeroAmigos',
  tagline: 'Longevidad activa con voz latina',
  description:
    'GeroAmigos es una red de profesionales de la gerontología en Latinoamérica. Charlas, consultorías y asesorías para instituciones, residencias, profesionales y familias.',
  url: 'https://geroamigos.com',
  email: 'thomas@macainn.cl',
  social: '@geroamigos',
};

export const NAV = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Contacto', href: '#contacto' },
];

export const mailto = (subject: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
