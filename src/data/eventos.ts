// Agenda de eventos internacionales de gerontología, geriatría y envejecimiento.
// Solo eventos con fecha y ciudad confirmadas en el sitio oficial del organizador.
// Alimenta /eventos/ (HTML) y /eventos/index.md (agentes).

export interface Evento {
  nombre: string;
  /** Qué es, en una frase */
  descripcion: string;
  organizador: string;
  ciudad: string;
  /** Sede, si está anunciada */
  lugar?: string;
  pais: string;
  /** Color del evento: Latinoamérica, España/Portugal o resto del mundo */
  region: 'latam' | 'iberia' | 'mundo';
  /** Fechas ISO (YYYY-MM-DD) */
  inicio: string;
  fin: string;
  /** El organizador anunció el mes pero no los días exactos */
  fechaPorConfirmar?: boolean;
  formato: 'Presencial' | 'Híbrido' | 'Virtual' | 'Formato por confirmar';
  url: string;
  /** Texto del enlace cuando no es el sitio propio del evento (p. ej. la agenda de quien lo difunde) */
  enlace?: string;
}

export const EVENTOS_PAGE = {
  title: 'Eventos internacionales',
  eyebrow: 'Agenda de gerontología',
  description:
    'Agenda de congresos y encuentros de gerontología, geriatría y envejecimiento en Latinoamérica y el mundo: país, ciudad, sede y fechas.',
  lead: 'Congresos y encuentros de gerontología, geriatría y envejecimiento en Latinoamérica y el mundo, para aprender y conectar con colegas.',
  verificado: '2026-10-09',
  nota: 'Fechas verificadas el 9 de octubre de 2026 en los sitios oficiales. Confirma siempre con cada organizador antes de planificar tu viaje.',
  invitacion: {
    title: '¿Organizas un evento?',
    texto:
      'Si organizas un congreso, una jornada o un curso de gerontología en Latinoamérica, escríbenos y lo sumamos a la agenda.',
    cta: 'Sumar un evento',
  },
};

// Verificados el 2026-10-09 en el sitio de cada organizador (o en la agenda indicada en `enlace`).
export const EVENTOS: Evento[] = [
  {
    nombre: 'VII Congreso Regional Centro Bajío de Geriatría y Gerontología',
    descripcion: 'Congreso regional mexicano de geriatría y gerontología: «Claves para un envejecimiento activo y saludable».',
    organizador: 'Gobierno de Aguascalientes e ISSEA, con asociaciones de geriatría de la región Centro Bajío',
    ciudad: 'Aguascalientes',
    lugar: 'Universidad Autónoma de Aguascalientes, Unidad de Estudios Avanzados',
    pais: 'México',
    region: 'latam',
    inicio: '2026-10-21',
    fin: '2026-10-23',
    formato: 'Presencial',
    url: 'https://conameger.org/eventos.html',
    enlace: 'Agenda de CONAMEGER',
  },
  {
    nombre: 'Asia-Pacific Regional Conference on Population Ageing 2026',
    descripcion: 'Foro bienal de políticas públicas sobre envejecimiento de Asia-Pacífico: «Integration, Innovation and Sustainability».',
    organizador: 'HelpAge International, UNFPA y China National Committee on Ageing',
    ciudad: 'Hangzhou',
    pais: 'China',
    region: 'mundo',
    inicio: '2026-10-27',
    fin: '2026-10-30',
    formato: 'Formato por confirmar',
    url: 'https://www.helpage.org/aprc2026/',
  },
  {
    nombre: 'GSA 2026 Annual Scientific Meeting',
    descripcion: 'Reunión científica anual de la Gerontological Society of America, el mayor congreso interdisciplinario de gerontología de Estados Unidos.',
    organizador: 'The Gerontological Society of America (GSA)',
    ciudad: 'National Harbor (Maryland)',
    lugar: 'Gaylord National Resort & Convention Center',
    pais: 'Estados Unidos',
    region: 'mundo',
    inicio: '2026-11-04',
    fin: '2026-11-07',
    formato: 'Presencial',
    url: 'https://www.gsa2026.org/',
  },
  {
    nombre: '46.º Congresso Português de Geriatria e Gerontologia',
    descripcion: 'Congreso nacional anual de la Sociedad Portuguesa de Geriatría y Gerontología.',
    organizador: 'Sociedade Portuguesa de Geriatria e Gerontologia (SPGG)',
    ciudad: 'Lisboa',
    lugar: 'Hotel VIP Executive Entrecampos',
    pais: 'Portugal',
    region: 'iberia',
    inicio: '2026-11-19',
    fin: '2026-11-20',
    formato: 'Presencial',
    url: 'https://www.spgg.com.pt/46o-congresso-portugues-de-geriatria-e-gerontologia/',
  },
  {
    nombre: '21.º Congreso Internacional de Geriatría',
    descripcion: 'Congreso anual de geriatría dedicado este año a la infectología geriátrica y su interacción con las enfermedades sistémicas.',
    organizador: 'Instituto Nacional de Ciencias Médicas y Nutrición Salvador Zubirán',
    ciudad: 'Ciudad de México',
    lugar: 'Auditorio principal del INCMNSZ',
    pais: 'México',
    region: 'latam',
    inicio: '2026-12-03',
    fin: '2026-12-05',
    formato: 'Híbrido',
    url: 'https://conameger.org/eventos.html',
    enlace: 'Agenda de CONAMEGER',
  },
  {
    nombre: 'ICFSR 2027: Intrinsic Capacity, Frailty & Sarcopenia Research Conference',
    descripcion: 'Congreso internacional de investigación sobre capacidad intrínseca, fragilidad y sarcopenia en personas mayores.',
    organizador: 'ICFSR · The Journal of Frailty & Aging',
    ciudad: 'Cannes',
    lugar: 'JW Marriott Cannes',
    pais: 'Francia',
    region: 'mundo',
    inicio: '2027-03-03',
    fin: '2027-03-05',
    formato: 'Formato por confirmar',
    url: 'https://www.icfsr.com/',
  },
  {
    nombre: 'XXV Congresso Brasileiro de Geriatria e Gerontologia (CBGG 2027)',
    descripcion: 'Congreso nacional de la Sociedad Brasileña de Geriatría y Gerontología, el mayor del área en Brasil.',
    organizador: 'Sociedade Brasileira de Geriatria e Gerontologia (SBGG)',
    ciudad: 'Salvador de Bahía',
    lugar: 'Centro de Convenções Salvador',
    pais: 'Brasil',
    region: 'latam',
    inicio: '2027-04-21',
    fin: '2027-04-23',
    formato: 'Presencial',
    url: 'https://cbgg.com.br/cbgg2027',
  },
  {
    nombre: 'AAIC Satellite Symposium 2027',
    descripcion: 'Simposio latinoamericano de la Alzheimer’s Association sobre investigación en demencias.',
    organizador: 'Alzheimer’s Association',
    ciudad: 'Santiago',
    pais: 'Chile',
    region: 'latam',
    inicio: '2027-05-13',
    fin: '2027-05-14',
    formato: 'Híbrido',
    url: 'https://alz.org/research/for_researchers/scientific-conferences',
  },
  {
    nombre: '2027 AGS Annual Scientific Meeting',
    descripcion: 'Reunión científica anual de la American Geriatrics Society, referente en medicina geriátrica clínica.',
    organizador: 'American Geriatrics Society (AGS)',
    ciudad: 'Atlanta (Georgia)',
    pais: 'Estados Unidos',
    region: 'mundo',
    inicio: '2027-05-20',
    fin: '2027-05-22',
    formato: 'Formato por confirmar',
    url: 'https://meeting.americangeriatrics.org/',
  },
  {
    nombre: '67 Congreso de la Sociedad Española de Geriatría y Gerontología',
    descripcion: 'Congreso nacional anual de la SEGG, junto al 1.er congreso de la Sociedad Valenciana de Medicina Geriátrica y Ciencias Gerontológicas: «Ciencia y cuidados para envejecer con salud y autonomía».',
    organizador: 'Sociedad Española de Geriatría y Gerontología (SEGG) y SVMGCG',
    ciudad: 'Valencia',
    lugar: 'Palacio de Congresos de Valencia',
    pais: 'España',
    region: 'iberia',
    inicio: '2027-06-02',
    fin: '2027-06-04',
    formato: 'Presencial',
    url: 'https://congresosegg.es/',
  },
  {
    nombre: 'Alzheimer’s Association International Conference (AAIC) 2027',
    descripcion: 'El mayor congreso mundial de investigación sobre Alzheimer y otras demencias.',
    organizador: 'Alzheimer’s Association',
    ciudad: 'Chicago (Illinois)',
    lugar: 'McCormick Place',
    pais: 'Estados Unidos',
    region: 'mundo',
    inicio: '2027-07-18',
    fin: '2027-07-21',
    formato: 'Híbrido',
    url: 'https://aaic.alz.org/',
  },
  {
    nombre: 'XVII Congreso Científico Internacional de Medicina Geriátrica',
    descripcion: 'Congreso internacional del Colegio Nacional de Medicina Geriátrica de México: «Estrategias globales desde la Geriatría para el envejecimiento».',
    organizador: 'Colegio Nacional de Medicina Geriátrica (CONAMEGER)',
    ciudad: 'Saltillo (Coahuila)',
    pais: 'México',
    region: 'latam',
    inicio: '2027-08-26',
    fin: '2027-08-28',
    formato: 'Presencial',
    url: 'https://conameger2027.my.canva.site/congreso-2027',
  },
  {
    nombre: 'EuGMS 2027 Congress',
    descripcion: 'Congreso anual de la European Geriatric Medicine Society, el mayor encuentro europeo de medicina geriátrica.',
    organizador: 'European Geriatric Medicine Society (EuGMS)',
    ciudad: 'Florencia',
    lugar: 'Firenze Fiera',
    pais: 'Italia',
    region: 'mundo',
    inicio: '2027-09-22',
    fin: '2027-09-24',
    formato: 'Formato por confirmar',
    url: 'https://eugms.org/events/eugms-congress',
  },
  {
    nombre: 'GSA 2027 Annual Scientific Meeting',
    descripcion: 'Reunión científica anual de la Gerontological Society of America.',
    organizador: 'The Gerontological Society of America (GSA)',
    ciudad: 'Phoenix (Arizona)',
    pais: 'Estados Unidos',
    region: 'mundo',
    inicio: '2027-11-03',
    fin: '2027-11-06',
    formato: 'Formato por confirmar',
    url: 'https://www.geron.org/meetings-events',
  },
];

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const MESES_LARGOS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const partes = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d };
};

/** "12–15 nov 2026", "29 oct – 2 nov 2026", "nov 2026" (por confirmar) */
export function rangoFechas(e: Pick<Evento, 'inicio' | 'fin' | 'fechaPorConfirmar'>): string {
  const a = partes(e.inicio);
  const b = partes(e.fin);
  if (e.fechaPorConfirmar) return `${MESES[a.m]} ${a.y}`;
  if (e.inicio === e.fin) return `${a.d} ${MESES[a.m]} ${a.y}`;
  if (a.y !== b.y) return `${a.d} ${MESES[a.m]} ${a.y} – ${b.d} ${MESES[b.m]} ${b.y}`;
  if (a.m !== b.m) return `${a.d} ${MESES[a.m]} – ${b.d} ${MESES[b.m]} ${b.y}`;
  return `${a.d}–${b.d} ${MESES[a.m]} ${a.y}`;
}

/** Eventos ordenados por fecha y agrupados por mes de inicio */
export function eventosPorMes(lista: Evento[] = EVENTOS) {
  const grupos = new Map<string, Evento[]>();
  for (const e of [...lista].sort((x, y) => x.inicio.localeCompare(y.inicio))) {
    const { y, m } = partes(e.inicio);
    const clave = `${MESES_LARGOS[m]} ${y}`;
    grupos.set(clave, [...(grupos.get(clave) ?? []), e]);
  }
  return [...grupos].map(([mes, eventos]) => ({ mes, eventos }));
}
