// ──────────────────────────────────────────────────────────────────────────────
// IMÁGENES POR SERVICIO — carga automática desde src/assets/[servicio]/
// Para agregar fotos: copia la imagen en la carpeta correspondiente.
// Formatos: .jpg .jpeg .webp .png .avif
// ──────────────────────────────────────────────────────────────────────────────
function imgs(modules) {
  return Object.keys(modules).sort().map((k) => modules[k].default);
}

const hospedajeImages    = imgs(import.meta.glob('../assets/hospedaje/*.{jpg,jpeg,webp,png,avif}',    { eager: true }));
const ruahImages         = imgs(import.meta.glob('../assets/ruah/*.{jpg,jpeg,webp,png,avif}',         { eager: true }));
const campamentoImages   = imgs(import.meta.glob('../assets/campamento/*.{jpg,jpeg,webp,png,avif}',   { eager: true }));
const experienciasImages = imgs(import.meta.glob('../assets/experiencias/*.{jpg,jpeg,webp,png,avif}', { eager: true }));
const productosImages    = imgs(import.meta.glob('../assets/productos/*.{jpg,jpeg,webp,png,avif}',    { eager: true }));

// PRECIOS: agrega `priceFrom: 55000` (en pesos, por persona) a un servicio para
// mostrar "Desde $55.000 por persona" en su tarjeta y en su ficha. Sin el campo no se muestra nada.
// ──────────────────────────────────────────────────────────────────────────────
const COP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
export const formatPrice = (value) => COP.format(value);

export const servicesData = [
  {
    id: 'hospedaje',
    title: 'Estadía en la naturaleza',
    subtitle: 'Cabañas de guadua en la naturaleza',
    icon: 'Home',
    tag: 'Más popular',
    color: '#2c7a4b',
    booking: {
      options: [
        { id: 'pasadia', label: 'Pasadía', mode: 'single' },
        { id: 'dos-dias', label: 'Dos días, una noche', mode: 'range' },
      ],
    },
    description:
      'Vive una experiencia única en nuestras acogedoras cabañas construidas en guadua, rodeadas de naturaleza exuberante. Despierta con el canto de los pájaros, respira aire puro y desconéctate del mundo moderno en un entorno mágico.',
    images: hospedajeImages,
    accordionItems: [
      {
        title: 'Pasadía',
        icon: 'Sun',
        color: '#2c7a4b',
        bullets: [
          'Bienvenida',
          'Visita a la granja',
          'Actividades de huerta',
          'Refrigerio',
          'Almuerzo campesino',
          'Despedida a las 5:00 pm',
        ],
        note: 'Disponible cualquier día',
      },
      {
        title: 'Dos días, una noche',
        icon: 'Moon',
        color: '#2c7a4b',
        bullets: [
          'Día 1: Bienvenida, visita a la granja, actividades de huerta, refrigerio, almuerzo campesino, fogata y cena',
          'Día 2: Desayuno, caminata, almuerzo, juegos y despedida a las 5:00 pm',
        ],
      },
    ],
  },
  {
    id: 'ruah',
    title: 'Experiencia RUAH',
    subtitle: 'Celebraciones familiares de dos días en la finca',
    icon: 'Users',
    tag: 'Familiar',
    color: '#8a6a32',
    booking: {
      options: [{ id: 'dos-dias', label: 'Dos días, una noche', mode: 'range' }],
      maxGuests: 30,
    },
    description:
      'Crea recuerdos inolvidables con tu familia en medio de la naturaleza. Ideal para cumpleaños, reuniones y celebraciones especiales. Un espacio donde los lazos familiares se fortalecen lejos del ruido de la ciudad.',
    images: ruahImages,
    accordionItems: [
      {
        title: 'Dos días, una noche',
        icon: 'PartyPopper',
        color: '#8a6a32',
        bullets: [
          'Capacidad: hasta 30 personas',
          'Día 1: Refrigerios, almuerzo y cena',
          'Día 2: Refrigerios, desayuno y almuerzo',
          'Conocimiento de permacultura en Ecogranja',
          'Visita a cafeteros en Finca La Conchita',
          'Mitos y leyendas en Finca El Corral del Agua',
          'Fotografías del evento',
          'Guianza incluida',
        ],
      },
    ],
  },
  {
    id: 'campamento',
    title: 'Campamento RUAH',
    subtitle: 'Aventura, supervivencia y trabajo en equipo',
    icon: 'Tent',
    tag: 'Aventura',
    color: '#8b4513',
    booking: {
      options: [{ id: 'dos-dias', label: 'Dos días, una noche', mode: 'range' }],
      minGuests: 10,
    },
    description:
      'Una experiencia de campamento que desafía límites, construye carácter y fortalece el trabajo en equipo. Actividades de supervivencia, exploración de la naturaleza y retos grupales que transforman a los participantes.',
    images: campamentoImages,
    accordionItems: [
      {
        title: 'Campamento de aventura',
        icon: 'Tent',
        color: '#8b4513',
        bullets: [
          'Edad: 14 años en adelante',
          'Duración: Dos días, una noche',
          'Grupos: Mínimo 10 participantes por campamento',
          'Actividades: Supervivencia, orientación en terreno, fogata, talleres, caminata, trabajo en equipo',
          'Día 1: Almuerzo, refrigerio y cena',
          'Día 2: Desayuno, refrigerio y almuerzo',
        ],
      },
    ],
  },
  {
    id: 'productos',
    title: 'Venta de Productos Orgánicos',
    subtitle: 'De la finca directo a tu mesa',
    icon: 'ShoppingBasket',
    tag: 'Orgánico',
    color: '#8a6a32',
    whatsappOnly: true,
    description:
      'Ofrecemos productos naturales cultivados en nuestra finca con amor y respeto por la tierra. Sin agroquímicos, sin aditivos — solo lo mejor que la naturaleza nos da.',
    images: productosImages,
    accordionItems: [
      {
        title: 'Productos disponibles',
        icon: 'Sprout',
        color: '#4a7f2f',
        bullets: [
          'Huevos de gallina criolla',
          'Conejo',
          'Pollo y gallina criolla',
          'Queso campesino',
          'Aguacate Hass',
          'Frutas: mora, lulo, tomate de árbol',
          'Verduras: espinaca, acelga, lechuga, repollo',
          'Otros: guadua, esterilla, suculentas',
        ],
      },
      {
        title: 'Entrega',
        icon: 'Truck',
        color: '#8a6a32',
        bullets: [
          'Directa en la finca',
          'Servicio a domicilio en Bogotá',
        ],
      },
    ],
  },
  {
    id: 'experiencias',
    title: 'Experiencias y Encuentros',
    subtitle: 'Encuentros empresariales y convivencias de colegio',
    icon: 'Sparkles',
    tag: 'Especial',
    color: '#2c7a4b',
    isExperiencias: true,
    booking: {
      options: [
        { id: 'empresarial', label: 'Encuentro empresarial', mode: 'multi', minGuests: 10, maxGuests: 30 },
        { id: 'colegio', label: 'Convivencia de colegio', mode: 'multi', minGuests: 20, maxGuests: 30 },
      ],
    },
    description:
      'Espacios diseñados para crecer, conectar y transformar. Encuentros empresariales, convivencias escolares y experiencias grupales en la naturaleza que fortalecen equipos y comunidades.',
    images: experienciasImages,
    subServices: [
      {
        id: 'empresarial',
        title: 'Encuentros Empresariales',
        icon: 'Briefcase',
        color: '#2c7a4b',
        description:
          'Potencia tu equipo de trabajo con experiencias transformadoras en la naturaleza. Talleres de liderazgo, dinámicas de integración y actividades diseñadas para fortalecer la comunicación y el trabajo colaborativo.',
        details: [
          { label: 'Para empresas', text: 'Pequeñas, medianas y grandes empresas' },
          { label: 'Grupos',        text: 'Desde 10 hasta 30 personas' },
          { label: 'Objetivos',     text: 'Team building, liderazgo, comunicación asertiva' },
          { label: 'Duración',      text: 'Desde 1 día hasta semana completa' },
        ],
        includes: [
          'Talleres personalizados',
          'Actividades de integración',
          'Alimentación completa',
          'Material didáctico',
          'Informe de resultados',
        ],
      },
      {
        id: 'colegio',
        title: 'Convivencias de Colegio',
        icon: 'GraduationCap',
        color: '#8a6a32',
        description:
          'Una experiencia pedagógica y recreativa que fortalece los lazos entre estudiantes y docentes. Actividades en la naturaleza, valores, trabajo en equipo y momentos de convivencia que quedan para siempre.',
        details: [
          { label: 'Para quién',   text: 'Estudiantes de primaria, bachillerato y universitarios' },
          { label: 'Duración',     text: '1 a 3 días según el programa' },
          { label: 'Grupos',       text: 'Desde 20 hasta 30 estudiantes' },
          { label: 'Actividades',  text: 'Talleres, juegos, caminatas, fogata y reflexión' },
        ],
        includes: [
          'Alimentación completa',
          'Monitores y guías',
          'Actividades pedagógicas',
          'Espacios de integración',
          'Certificado de participación',
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────────
// GALERÍA — auto-carga por carpeta. Añade imágenes a src/assets/[carpeta]/
// ──────────────────────────────────────────────────────────────────────────────
const pasadiaImages = imgs(import.meta.glob('../assets/pasadia/*.{jpg,jpeg,webp,png,avif}', { eager: true }));

export const galleryCategories = [
  { name: 'Estadía en la naturaleza',    images: hospedajeImages },
  { name: 'Campamento',   images: campamentoImages },
  { name: 'Experiencias', images: experienciasImages },
  { name: 'Productos',    images: productosImages },
  { name: 'Pasadía',      images: pasadiaImages },
].filter((cat) => cat.images.length > 0);
