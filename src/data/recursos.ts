// Recursos de GeroAmigos: guías y materiales en PDF, Excel y Word.
// Por ahora son de DEMOSTRACIÓN: se muestran, pero no se descargan ni se venden.
// Alimenta /recursos/ (HTML) y /recursos/index.md (agentes).

export type Formato = 'PDF' | 'Excel' | 'Word';

export interface Recurso {
  id: string;
  /** Tipo de material, se muestra en la portada simulada */
  categoria: string;
  titulo: string;
  subtitulo: string;
  acceso: 'gratis' | 'pago';
  /** Solo recursos de pago; precio de ejemplo */
  precio?: string;
  formatos: Formato[];
  extension: string;
  publico: string;
  descripcion: string;
  incluye: string[];
  tono: 'terracota' | 'maiz' | 'jade';
}

export const RECURSOS_PAGE = {
  title: 'Recursos',
  eyebrow: 'Guías y materiales',
  description:
    'Guías y materiales de gerontología en PDF, Excel y Word para profesionales, instituciones y familias: recursos gratuitos y guías de autor.',
  lead: 'Guías, plantillas y materiales en PDF, Excel y Word para educar a profesionales, instituciones y familias. Algunos serán gratuitos y otros, guías de autor de pago.',
  aviso:
    'Vista previa: estos recursos son de demostración. Muy pronto podrás descargarlos o comprarlos aquí.',
  proximos: {
    title: 'Lo que viene',
    lead: 'Estamos preparando más guías descargables. Estos son los formatos con los que trabajaremos:',
    formatos: [
      { formato: 'PDF', texto: 'Guías y fichas para leer e imprimir.' },
      { formato: 'Excel', texto: 'Planillas de seguimiento y registro.' },
      { formato: 'Word', texto: 'Plantillas editables para instituciones.' },
    ],
  },
};

export const RECURSOS: Recurso[] = [
  {
    id: 'guia-gerontologica',
    categoria: 'Guía de autor',
    titulo: 'Guía gerontológica integral',
    subtitulo: 'Valoración y plan de cuidados centrado en la persona',
    acceso: 'pago',
    precio: 'USD 19',
    formatos: ['PDF', 'Excel'],
    extension: 'Guía en PDF + planilla de seguimiento en Excel',
    publico: 'Profesionales, residencias y equipos de cuidado',
    descripcion:
      'Una guía de autor de la red GeroAmigos para valorar de forma integral a la persona mayor y diseñar con ella un plan de cuidados.',
    incluye: [
      'Pautas de valoración gerontológica integral: física, cognitiva, emocional y social.',
      'Plan de cuidados centrado en la persona, paso a paso.',
      'Planilla en Excel para el seguimiento.',
      'Recomendaciones de buen trato y prevención del edadismo.',
    ],
    tono: 'terracota',
  },
  {
    id: 'tips-cuidados',
    categoria: 'Guía gratuita',
    titulo: 'Tips de cuidados en casa',
    subtitulo: 'Consejos prácticos para familias cuidadoras',
    acceso: 'gratis',
    formatos: ['PDF'],
    extension: 'Guía breve en PDF',
    publico: 'Familias y personas cuidadoras',
    descripcion:
      'Recomendaciones sencillas para acompañar el día a día de una persona mayor en casa, cuidando también a quien cuida.',
    incluye: [
      'Rutinas que favorecen la autonomía.',
      'Prevención de caídas en el hogar.',
      'Alimentación e hidratación.',
      'Autocuidado de la persona cuidadora.',
    ],
    tono: 'jade',
  },
];
