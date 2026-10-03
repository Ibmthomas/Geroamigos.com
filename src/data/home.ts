// Textos de la página de inicio. Una sola fuente para el HTML (componentes)
// y para la versión Markdown que leen los agentes (/index.md).
import type { IconName } from '../components/Icon.astro';

export const HERO = {
  titleStart: 'Longevidad activa con',
  titleAccent: 'voz latina',
  lead:
    'Somos una red de amigos de la gerontología latinoamericana. Educamos y asesoramos a instituciones, profesionales y familias para una longevidad activa y sin discriminaciones.',
  temas: ['Longevidad', 'Persona mayor', 'Gerontología', 'Silver economy', 'Tecnología'],
  ctaPrimary: 'Conoce nuestros servicios',
  ctaSecondary: 'Ver charlas',
};

export const VALORES_INTRO = {
  title: 'Muchas manos, un mismo tejido.',
  lead:
    'Tres círculos que se cruzan: profesionales, instituciones y personas mayores. Donde se tocan nace un color nuevo: la inclusión hecha forma.',
};

export const VALORES = [
  { n: '01', titulo: 'Visión', texto: 'Mirar el envejecimiento a escala regional y global.', tone: 'terracota' },
  { n: '02', titulo: 'Innovación', texto: 'Tecnología y nuevas formas de cuidar.', tone: 'maiz' },
  { n: '03', titulo: 'Educación', texto: 'Compartir saber con instituciones, profesionales y familias.', tone: 'jade' },
  { n: '04', titulo: 'Inclusión', texto: 'Una longevidad activa, sin discriminaciones.', tone: 'cacao' },
];

export const SERVICIOS_INTRO = {
  eyebrow: 'Servicios',
  title: 'Saber gerontológico para quienes cuidan',
  lead: 'Charlas, consultorías y asesorías para instituciones, residencias, profesionales y familias de toda Latinoamérica.',
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

export const ENCUENTRO = {
  eyebrow: 'Nuestra mirada',
  title: 'Envejecer entre amigos',
  quote: 'Envejecer también se aprende. Y se aprende mejor entre amigos.',
};

export const NOSOTROS = {
  eyebrow: 'Nosotros',
  title: 'Un grupo de amigos de la gerontología latinoamericana',
  paragraphs: [
    'GeroAmigos reúne a profesionales de la gerontología de distintos países de Latinoamérica. Nos une una idea simple: la longevidad se vive mejor cuando es activa, sin discriminaciones y con identidad propia.',
    'Queremos mostrar lo que se está haciendo en la región en cuidado, vida social, entretenimiento y tecnología para las personas mayores, y llevar ese conocimiento a quienes cuidan y deciden todos los días.',
  ],
  publicoTitle: 'Con quién trabajamos',
};

// "Hilos": barras redondeadas de color para listar con quién trabajamos.
export const PUBLICO = [
  [
    { label: 'Instituciones públicas y privadas', tone: 'terracota', grow: 3 },
    { label: 'Gobiernos', tone: 'maiz', grow: 1 },
  ],
  [
    { label: 'ONG', tone: 'jade', grow: 1 },
    { label: 'Residencias de personas mayores', tone: 'terracota', grow: 3 },
  ],
  [
    { label: 'Profesionales de la salud', tone: 'maiz', grow: 2 },
    { label: 'Gerontólogos', tone: 'jade', grow: 1.5 },
  ],
  [
    { label: 'Psicogerontólogos', tone: 'cacao', grow: 1.5 },
    { label: 'Familias', tone: 'jade', grow: 1 },
  ],
];

export const RECURSOS_INTRO = {
  eyebrow: 'Recursos',
  title: 'Charlas y conversaciones',
  lead: 'Llevamos la gerontología a auditorios, equipos de trabajo y redes sociales. Estos son algunos de los temas que nos mueven.',
};

export const RECURSOS = {
  charla: { tag: 'Charla · LATAM', title: 'Cuidar sin discriminar' },
  conversar: { title: 'Conversar también es cuidar' },
  tendencias: { tag: 'Tendencias', title: 'Silver economy en Latinoamérica' },
  residencias: { tag: 'Asesoría', title: 'Asesoría para residencias', cta: 'Agenda una reunión' },
};

export const CONTACTO = {
  eyebrow: 'Contacto',
  title: 'Agenda una asesoría',
  lead: 'Cuéntanos qué necesita tu institución, residencia o equipo, y coordinamos una conversación.',
  cta: 'Escríbenos',
  para: ['Instituciones', 'Residencias', 'Profesionales', 'Familias'],
};
