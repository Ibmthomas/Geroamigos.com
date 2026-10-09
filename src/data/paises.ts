// Países de la red GeroAmigos, de norte a sur: al bajar con el scroll, el recorrido
// avanza por el mapa hacia el sur.
//
// Fotos: agrega hasta 3 imágenes por país en src/assets/paises/<slug>/ (jpg, png o webp).
// Se usan en orden alfabético; mientras falten, se muestra un marco con la marca.
// Foto de cada amigo: src/assets/amigos/<id>.jpg (o .png / .webp).

export type Tono = 'terracota' | 'maiz' | 'jade';

export interface Red {
  tipo: 'instagram' | 'linkedin' | 'web' | 'correo';
  url: string;
  label: string;
}

export interface Oferta {
  /** Título del bloque, p. ej. "Charlas online disponibles" */
  titulo: string;
  /** charlas: los ítems son títulos de charla (se muestran entre comillas) */
  tipo: 'charlas' | 'servicios';
  items: { titulo: string; detalle: string }[];
}

export interface Amigo {
  id: string;
  nombre: string;
  ciudad?: string;
  rol: string;
  experiencia: string[];
  /** Lo que ofrece hoy; si tiene correo en `redes`, cada ítem abre un correo para solicitarlo */
  oferta?: Oferta;
  redes: Red[];
}

export interface Pais {
  slug: string;
  nombre: string;
  /** Código ISO 3166-1 numérico (world-atlas / Natural Earth) */
  iso: string;
  tono: Tono;
  hito: { nombre: string; lugar: string };
  frase: string;
  amigos: Amigo[];
}

export const PAISES: Pais[] = [
  {
    slug: 'mexico',
    nombre: 'México',
    iso: '484',
    tono: 'terracota',
    hito: { nombre: 'Chichén Itzá', lugar: 'Yucatán' },
    frase: 'Tradición y comunidad para envejecer acompañados.',
    amigos: [
      {
        id: 'lilian-pedroza',
        nombre: 'Lilian Pedroza Espinosa de los Monteros',
        ciudad: 'Estado de México',
        rol: 'Licenciada en Gerontología · Fundadora de Altern Gerontológica',
        experiencia: [
          'Formación y experiencia en la atención integral y centrada en las personas mayores, con trayectoria en docencia e investigación gerontológica.',
          'Fundadora del Club de Día Altern: un club de bienestar, dinamismo y compañía con talleres creativos, pilates adaptado, gimnasia cerebral y eventos para seguir disfrutando con independencia y vitalidad.',
          'Desarrolla programas multicomponentes para personas mayores y combina la práctica clínica, comunitaria y académica con la divulgación científica y la innovación social, desde un enfoque transdisciplinario y humano.',
        ],
        oferta: {
          titulo: 'Servicios en Altern Gerontológica',
          tipo: 'servicios',
          items: [
            { titulo: 'Club +50', detalle: 'Bienestar, movimiento y compañía' },
            { titulo: 'Centro de día', detalle: 'Para personas mayores' },
            { titulo: 'Centro de día', detalle: 'Para personas mayores con demencia' },
          ],
        },
        redes: [
          { tipo: 'instagram', url: 'https://www.instagram.com/lilian_gerontologa/', label: '@lilian_gerontologa' },
          { tipo: 'instagram', url: 'https://www.instagram.com/altern_gerontologica/', label: '@altern_gerontologica' },
        ],
      },
      {
        id: 'daisy-martinez',
        nombre: 'Daisy Karina Martínez Burgos',
        ciudad: 'Culiacán, Sinaloa',
        rol: 'Licenciada en Gericultura · Fundadora de Silver Society',
        experiencia: [
          'Licenciada en Gericultura y maestrante en Gerontología, con diplomados en administración gerontológica y gestión de servicios para personas mayores, bioética y gerontología.',
          'Siete años de experiencia en intervención gerontológica, estimulación cognitiva, terapia ocupacional, activación física y acompañamiento domiciliario, integrando lo físico, cognitivo, emocional y social desde la historia de vida de cada persona.',
          'Fundadora de Silver Society – Wellness & Health, un club social donde las personas mayores se mantienen activas, aprenden, conviven y crean nuevos vínculos: «envejecer no significa dejar de vivir».',
        ],
        oferta: {
          titulo: 'Servicios de Silver Society',
          tipo: 'servicios',
          items: [
            { titulo: 'Valoración gerontológica integral', detalle: 'Necesidades y capacidades' },
            { titulo: 'Estimulación cognitiva', detalle: 'Memoria, atención y lenguaje' },
            { titulo: 'Terapia ocupacional y activación física', detalle: 'Autonomía y movilidad' },
            { titulo: 'Talleres y gimnasia cerebral', detalle: 'Club de lectura y bienestar psicosocial' },
          ],
        },
        redes: [
          { tipo: 'instagram', url: 'https://www.instagram.com/silversocietymx/', label: '@silversocietymx' },
          { tipo: 'correo', url: 'mailto:silversociety2025@gmail.com', label: 'silversociety2025@gmail.com' },
        ],
      },
    ],
  },
  {
    slug: 'costa-rica',
    nombre: 'Costa Rica',
    iso: '188',
    tono: 'jade',
    hito: { nombre: 'Volcán Arenal', lugar: 'Alajuela' },
    frase: 'Tierra de longevidad: la península de Nicoya es una de las zonas azules del mundo.',
    amigos: [],
  },
  {
    slug: 'colombia',
    nombre: 'Colombia',
    iso: '170',
    tono: 'maiz',
    hito: { nombre: 'Valle de Cocora', lugar: 'Quindío' },
    frase: 'Redes de cuidado que crecen como las palmas de cera.',
    amigos: [
      {
        id: 'catalina-restrepo',
        nombre: 'Laura Catalina Restrepo Barrientos',
        ciudad: 'Bello, Antioquia',
        rol: 'Psicogerontología · Geronto Senior',
        experiencia: [
          'Desde Geronto Senior ofrece acompañamiento gerontológico integral y consulta psicogerontológica a personas mayores.',
          'Ofrece a empresas asesoría en prejubilación, retiro y transición laboral, con talleres, programas y orientación.',
          'Para centros gerontológicos y entidades públicas y privadas: asesoría en normatividad y buenas prácticas, capacitación del personal, campañas de sensibilización y políticas amigables con las personas mayores.',
        ],
        oferta: {
          titulo: 'Servicios de Geronto Senior',
          tipo: 'servicios',
          items: [
            { titulo: 'Acompañamiento gerontológico integral', detalle: 'Para personas mayores' },
            { titulo: 'Consulta psicogerontológica', detalle: 'Atención y acompañamiento' },
            { titulo: 'Prejubilación y transición laboral', detalle: 'Para empresas' },
            { titulo: 'Asesoría a centros gerontológicos', detalle: 'Normatividad y capacitación' },
          ],
        },
        redes: [{ tipo: 'correo', url: 'mailto:gerontosenior2025@gmail.com', label: 'gerontosenior2025@gmail.com' }],
      },
      {
        id: 'natalia-hurtado',
        nombre: 'Natalia Hurtado Alzate',
        ciudad: 'Medellín',
        rol: 'Gerontóloga y especialista en Psicogerontología · Creadora de Gerontología Nathural',
        experiencia: [
          'Tecnóloga en Gerontología, gerontóloga profesional de la Universidad Católica de Oriente y especialista en Psicogerontología de la Universidad de Envigado; ha sido docente universitaria en programas de Gerontología.',
          'Experiencia en la coordinación de modelos de atención para personas mayores, el acompañamiento a familias, la formación de cuidadores y el trabajo comunitario, con un vínculo especial con la danza y la cultura.',
          'Creó Gerontología Nathural, un proyecto de divulgación y acción gerontológica que cuestiona el edadismo y acerca la gerontología a la vida cotidiana: «donde la vejez comunica, inspira y transforma».',
        ],
        oferta: {
          titulo: 'Charlas, talleres y acompañamientos',
          tipo: 'servicios',
          items: [
            { titulo: 'Charlas y talleres', detalle: 'Vejez, curso de vida, derechos y edadismo' },
            { titulo: 'Procesos educativos y acompañamientos', detalle: 'Personas, familias e instituciones' },
            { titulo: 'Contenidos digitales', detalle: 'Cultura del envejecimiento' },
          ],
        },
        redes: [
          { tipo: 'instagram', url: 'https://www.instagram.com/gerontologianathural/', label: '@gerontologianathural' },
          { tipo: 'correo', url: 'mailto:gerontologianathural@gmail.com', label: 'gerontologianathural@gmail.com' },
        ],
      },
    ],
  },
  {
    slug: 'venezuela',
    nombre: 'Venezuela',
    iso: '862',
    tono: 'terracota',
    hito: { nombre: 'Salto Ángel', lugar: 'Canaima' },
    frase: 'Saberes que caen en cascada de una generación a otra.',
    amigos: [],
  },
  {
    slug: 'peru',
    nombre: 'Perú',
    iso: '604',
    tono: 'jade',
    hito: { nombre: 'Machu Picchu', lugar: 'Cusco' },
    frase: 'Sabiduría andina para una vejez con raíces.',
    amigos: [
      {
        id: 'rosaestela-gomez',
        nombre: 'Rosaestela Gómez Holguín',
        ciudad: 'Lima',
        rol: 'Abogada en Derecho de la Vejez y gerontóloga social · Presidenta de Nietos Itinerantes',
        experiencia: [
          'Abogada, magíster en Derecho de la Vejez y gerontóloga social, con más de 10 años de experiencia en derechos humanos de las personas mayores, gestión pública e innovación social.',
          'Cofundadora y presidenta de la Asociación Civil Nietos Itinerantes, fundadora de Kaniq y presidenta de la Asociación Gerontológica del Perú.',
          'Trabaja en voluntariado intergeneracional, alfabetización digital, salud cerebral y formación de personas cuidadoras; como consultora, docente y conferencista impulsa una longevidad digna, autónoma y libre de edadismo.',
        ],
        oferta: {
          titulo: 'Asesorías y programas',
          tipo: 'servicios',
          items: [
            { titulo: 'Asesoría legal para la autonomía', detalle: 'Apoyos, testamentos y protección de derechos' },
            { titulo: 'Orientación a familias cuidadoras', detalle: 'Cuidados, demencias y buen trato' },
            { titulo: 'Consultoría para instituciones', detalle: 'Enfoque de derechos y prevención del edadismo' },
            { titulo: 'Envejecimiento activo y salud cerebral', detalle: 'Inclusión digital e intergeneracionalidad' },
          ],
        },
        redes: [
          { tipo: 'instagram', url: 'https://www.instagram.com/rosaestela.gh/', label: '@rosaestela.gh' },
          { tipo: 'instagram', url: 'https://www.instagram.com/nietositinerantes/', label: '@nietositinerantes' },
          { tipo: 'linkedin', url: 'https://www.linkedin.com/in/rosaestela-g%C3%B3mez-holgu%C3%ADn-1119b142', label: 'LinkedIn' },
          { tipo: 'correo', url: 'mailto:rosaegomezholguin@gmail.com', label: 'rosaegomezholguin@gmail.com' },
        ],
      },
    ],
  },
  {
    slug: 'chile',
    nombre: 'Chile',
    iso: '152',
    tono: 'maiz',
    hito: { nombre: 'Torres del Paine', lugar: 'Patagonia' },
    frase: 'Del desierto a la Patagonia, tecnología y cuidado para las personas mayores.',
    amigos: [
      {
        id: 'thomas-contreras',
        nombre: 'Thomas Contreras Gavilán',
        rol: 'Tecnólogo en Informática Biomédica · CEO & Founder de MACA',
        experiencia: [
          'Más de 10 años de experiencia en salud digital, silver economy, emprendimiento e innovación.',
          'Premiado en dos oportunidades por BID Lab por llevar la digitalización a las residencias de personas mayores en Chile y Latinoamérica.',
          'Creó el modelo MACA (Modelo de Alianzas del Cuidado del Adulto Mayor), un ecosistema digital del cuidado donde la información de la persona mayor fluye entre ficha clínica digital, telemedicina senior, soluciones corporativas, orientación familiar y, próximamente, educación.',
        ],
        oferta: {
          titulo: 'Charlas online disponibles',
          tipo: 'charlas',
          items: [
            { titulo: 'Cuando el mundo tenga canas', detalle: 'Emprendimiento e innovación' },
            { titulo: 'Desafíos para residencias', detalle: 'Para residencias' },
          ],
        },
        redes: [
          { tipo: 'web', url: 'https://macainn.cl', label: 'macainn.cl' },
          { tipo: 'instagram', url: 'https://www.instagram.com/maca.inn/', label: '@maca.inn' },
          { tipo: 'correo', url: 'mailto:thomas@macainn.cl', label: 'thomas@macainn.cl' },
        ],
      },
    ],
  },
];

export const TONO_HEX: Record<Tono, string> = {
  terracota: '#D2532C',
  maiz: '#E8A922',
  jade: '#1F7A73',
};
