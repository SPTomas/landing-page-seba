// Datos proporcionados por Sebastián. Esta configuración se incluye en el navegador.
export const site = {
  name: 'Sebastián Reinoso',
  profession: 'Abogado',
  academicRole: 'Profesor universitario',
  whatsapp: '5493515307287',
  telephone: '+5493515307287',
  phoneDisplay: '351 530-7287',
  email: 'reinososebastian8@gmail.com',
  address: 'Juan del Campillo 747, barrio Cofico, Córdoba',
  registration: 'Matrícula Provincial 1-42921',
  jurisdiction: 'Primera Circunscripción Judicial de la Provincia de Córdoba',
  formEndpoint: '', // Endpoint propio o de Formspree. Nunca guardar claves privadas acá.
};

export const themes = {
  noche: {
    number: '01', name: 'Noche & bronce', path: '/',
    description: 'Una identidad clásica, firme y sofisticada. Azul profundo, acentos de bronce y un monograma de inspiración editorial.',
    personality: 'Solidez · Confianza · Elegancia',
    colors: ['#101f30', '#c5a477', '#f5f1e9'],
    board: '/propuestas/01-noche-bronce.png',
    logo: '/logos/sr-noche.svg',
    headline: ['Claridad para decidir.', 'Respaldo para', 'avanzar.'],
  },
  oliva: {
    number: '02', name: 'Marfil & oliva', path: '/oliva/',
    description: 'Una propuesta cálida y cercana. Marfil, verde oliva y un monograma enmarcado para una presencia serena y personal.',
    personality: 'Cercanía · Equilibrio · Calidez',
    colors: ['#f4f1e9', '#34453b', '#78816c'],
    board: '/propuestas/02-marfil-oliva.png',
    logo: '/logos/sr-oliva.svg',
    headline: ['Una mirada cercana.', 'Una estrategia', 'clara.'],
  },
  grafito: {
    number: '03', name: 'Grafito editorial', path: '/grafito/',
    description: 'Una marca contemporánea y directa. Contrastes nítidos, tipografía sin serif y un símbolo geométrico de líneas continuas.',
    personality: 'Precisión · Carácter · Actualidad',
    colors: ['#222326', '#f7f6f2', '#bd795f'],
    board: '/propuestas/03-grafito-editorial.png',
    logo: '/logos/sr-grafito.svg',
    headline: ['Tu derecho.', 'Una dirección', 'clara.'],
  },
} as const;

export type Theme = keyof typeof themes;

// Áreas confirmadas por el profesional; el alcance se evalúa en cada consulta.
export const services = [
  { id: 'civil', title: 'Derecho civil', icon: 'document', description: 'Contratos, alquileres, sucesiones y reclamos. Asesoramiento para cuidar tus derechos y tu patrimonio.', detail: 'Orientación en conflictos de alquiler, contratos civiles, sucesiones y responsabilidad por daños. La consulta permite revisar la documentación, comprender los antecedentes y evaluar las alternativas para cada situación.', examples: ['Contratos y alquileres', 'Sucesiones', 'Responsabilidad civil y daños'] },
  { id: 'comercial', title: 'Derecho comercial', icon: 'building', description: 'Respaldo jurídico para tu actividad comercial. Contratos, relaciones empresariales y prevención de conflictos.', detail: 'Asesoramiento en las relaciones jurídicas de la actividad comercial, la revisión de contratos y los conflictos entre empresas o comerciantes. El trabajo se organiza según las necesidades y características de cada actividad.', examples: ['Contratos comerciales', 'Asesoramiento a empresas y comerciantes', 'Conflictos en la actividad comercial'] },
  { id: 'laboral', title: 'Derecho laboral', icon: 'briefcase', description: 'Despidos, condiciones de trabajo y derechos laborales. Claridad sobre tus alternativas y próximos pasos.', detail: 'Análisis de conflictos en la relación de trabajo, desvinculaciones, diferencias salariales y accidentes laborales. Antes de enviar un telegrama o firmar un acuerdo, es importante conocer su alcance.', examples: ['Despidos y diferencias salariales', 'Trabajo no registrado', 'Accidentes de trabajo y ART'] },
  { id: 'familia', title: 'Derecho de familia', icon: 'people', description: 'Acompañamiento en decisiones personales importantes, con una mirada respetuosa y enfocada en el diálogo.', detail: 'Asesoramiento en procesos de divorcio, acuerdos familiares, alimentos y organización del cuidado de hijos e hijas. Cada caso se aborda con especial atención a la situación de las personas involucradas.', examples: ['Divorcios y acuerdos', 'Cuota alimentaria', 'Cuidado personal y comunicación'] },
  { id: 'insolvencia', title: 'Concursos y quiebras (Insolvencia)', icon: 'branch', description: 'Orientación ante dificultades económicas. Análisis de deudas, alternativas concursales y derechos de los acreedores.', detail: 'Asesoramiento a personas y empresas en situaciones de insolvencia, concursos preventivos y quiebras, así como a acreedores que necesitan hacer valer sus derechos. Cada consulta requiere evaluar la situación patrimonial y las herramientas legales aplicables, sin prometer resultados.', examples: ['Evaluación de situaciones de insolvencia', 'Concursos preventivos y quiebras', 'Verificación de créditos y derechos de acreedores'] },
  { id: 'penal', title: 'Derecho penal', icon: 'shield', description: 'Asesoramiento y defensa de tus derechos, con atención a los detalles y a las particularidades de cada caso.', detail: 'Evaluación de consultas relacionadas con denuncias, investigaciones y procesos penales. La intervención y el alcance de la representación se acuerdan luego de analizar el caso y la jurisdicción correspondiente.', examples: ['Orientación ante denuncias', 'Defensa y representación', 'Asistencia a víctimas'] },
] as const;

export const faqs = [
  { question: '¿Cómo es la primera consulta?', answer: 'Es un espacio para escuchar tu situación, revisar los antecedentes y entender qué necesitás. A partir de esa información, se evalúan las alternativas legales y los pasos posibles. Las condiciones y honorarios de la consulta se acuerdan previamente.' },
  { question: '¿Dónde puedo realizar una consulta?', answer: `El estudio está en ${site.address}. Escribime por WhatsApp al ${site.phoneDisplay} o a ${site.email} para coordinar tu consulta y acordar la modalidad de atención.` },
  { question: '¿Qué documentación necesito?', answer: 'Depende del motivo de tu consulta. Para empezar, prepará un resumen de lo ocurrido, las fechas importantes y los documentos o comunicaciones relacionados. No envíes documentación sensible hasta acordar un canal adecuado.' },
  { question: '¿Cómo se acuerdan los honorarios?', answer: 'Los honorarios se informan y acuerdan antes de comenzar el trabajo, según el alcance de la intervención y la normativa aplicable. La idea es que sepas qué incluye el servicio y puedas decidir con información.' },
];
