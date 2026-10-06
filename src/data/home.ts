// Textos de la página de inicio. Una sola fuente para el HTML (componentes)
// y para la versión Markdown que leen los agentes (/index.md).
// Los países y sus amigos están en src/data/paises.ts.
import type { IconName } from '../components/Icon.astro';

export const HERO = {
  eyebrow: 'Red latinoamericana de gerontología',
  titleStart: 'Longevidad activa con',
  titleAccent: 'voz latina',
  lead:
    'Somos una red de amigos de la gerontología latinoamericana. Educamos y asesoramos a instituciones, profesionales y familias para una longevidad activa y sin discriminaciones.',
  ctaPrimary: 'Recorre la red',
  ctaSecondary: 'Escríbenos',
  ayuda: 'Pasa el cursor sobre un país, o tócalo, para conocer a sus amigos.',
};

export const RED_INTRO = {
  eyebrow: 'La red',
  title: 'Seis países, un mismo tejido',
  lead: 'Baja para recorrer la red de norte a sur y conocer a los amigos de cada país.',
};

export const PROPOSITO = {
  eyebrow: 'Propósito',
  title: 'Muchas manos, un mismo tejido.',
  lead:
    'Existimos para reflejar lo que se está haciendo en Latinoamérica por las personas mayores, en cuidado, vida social, entretenimiento, tecnología y políticas públicas, y compartirlo con instituciones, profesionales y familias.',
};

export const VALORES = [
  { n: '01', titulo: 'Visión', texto: 'Mirar el envejecimiento a escala regional y global.', tone: 'terracota' },
  { n: '02', titulo: 'Innovación', texto: 'Tecnología y nuevas formas de cuidar.', tone: 'maiz' },
  { n: '03', titulo: 'Educación', texto: 'Compartir saber con instituciones, profesionales y familias.', tone: 'jade' },
  { n: '04', titulo: 'Inclusión', texto: 'Una longevidad activa, sin discriminaciones.', tone: 'cacao' },
];

export const SERVICIOS_INTRO = {
  eyebrow: 'Servicios',
  badge: 'Próximamente',
  title: 'Saber gerontológico para quienes cuidan',
  lead: 'Estamos preparando charlas, consultorías y asesorías para instituciones, residencias, profesionales y familias de toda Latinoamérica.',
  cta: 'Avísame cuando estén listos',
};

export const SERVICIOS: { icon: IconName; titulo: string; texto: string; tone: string }[] = [
  {
    icon: 'charlas',
    titulo: 'Charlas',
    texto: 'Charlas y talleres sobre longevidad, persona mayor y gerontología social para equipos y comunidades.',
    tone: 'terracota',
  },
  {
    icon: 'consultorias',
    titulo: 'Consultorías',
    texto: 'Asistencia gerontológica a instituciones públicas y privadas para diseñar mejores programas y servicios.',
    tone: 'maiz',
  },
  {
    icon: 'residencias',
    titulo: 'Residencias',
    texto: 'Asesoría a residencias de personas mayores en modelos de cuidado, calidad y buen trato.',
    tone: 'jade',
  },
  {
    icon: 'familias',
    titulo: 'Familias',
    texto: 'Orientación a familias que acompañan el envejecimiento de un ser querido.',
    tone: 'cacao',
  },
  {
    icon: 'tecnologia',
    titulo: 'Tecnología',
    texto: 'Tecnología para el cuidado: herramientas que suman autonomía, conexión y bienestar.',
    tone: 'maiz',
  },
  {
    icon: 'politicas',
    titulo: 'Políticas públicas',
    texto: 'Apoyo a gobiernos y ONG en el diseño de políticas sobre envejecimiento.',
    tone: 'jade',
  },
  {
    icon: 'tendencias',
    titulo: 'Tendencias',
    texto: 'Lectura de las tendencias del envejecimiento y la silver economy en la región.',
    tone: 'cacao',
  },
  {
    icon: 'redes',
    titulo: 'Redes sociales',
    texto: 'Contenidos y comunidad para conversar de longevidad con voz latina.',
    tone: 'terracota',
  },
];

export const AMIGOS = {
  eyebrow: 'Los amigos',
  title: 'Envejecer entre amigos',
  quote: 'Envejecer también se aprende. Y se aprende mejor entre amigos.',
  lead: 'Aquí se unen todos los países: profesionales de la gerontología que comparten lo que se hace en su tierra.',
  sumate: {
    title: 'Tu lugar en la red',
    text: '¿Trabajas en gerontología en Latinoamérica? Súmate a GeroAmigos y lleva la voz de tu país.',
    cta: 'Quiero sumarme',
  },
};

export const CONTACTO = {
  eyebrow: 'Contacto',
  title: 'Agenda una asesoría',
  lead: 'Cuéntanos qué necesita tu institución, residencia o equipo, y coordinamos una conversación.',
  cta: 'Escríbenos',
  para: ['Instituciones', 'Residencias', 'Profesionales', 'Familias'],
};
