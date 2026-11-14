// Completar estos datos con Sebastián antes de publicar. No se usan datos de Fausto.
export const site = {
  name: 'Sebastián Reynoso',
  profession: 'Abogado',
  whatsapp: '', // Formato internacional, solo dígitos: 549...
  email: '',
  address: '',
  registration: '',
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

// Áreas propuestas para la maqueta; validar alcance y especialidades antes de publicar.
export const services = [
  { id: 'civil', title: 'Civil y comercial', icon: 'document', description: 'Contratos, alquileres y reclamos. Asesoramiento para cuidar tus intereses y anticiparte a los conflictos.', detail: 'Orientación en la redacción y revisión de contratos, conflictos de alquiler, responsabilidad civil y reclamos por daños y perjuicios. La consulta permite evaluar los antecedentes y las alternativas aplicables a tu situación.', examples: ['Revisión y redacción de contratos', 'Alquileres y relaciones comerciales', 'Daños y perjuicios'] },
  { id: 'laboral', title: 'Derecho laboral', icon: 'briefcase', description: 'Despidos, condiciones de trabajo y derechos laborales. Claridad sobre tus alternativas y próximos pasos.', detail: 'Análisis de conflictos en la relación de trabajo, desvinculaciones, diferencias salariales y accidentes laborales. Antes de enviar un telegrama o firmar un acuerdo, es importante conocer su alcance.', examples: ['Despidos y diferencias salariales', 'Trabajo no registrado', 'Accidentes de trabajo y ART'] },
  { id: 'familia', title: 'Derecho de familia', icon: 'people', description: 'Acompañamiento en decisiones personales importantes, con una mirada respetuosa y enfocada en el diálogo.', detail: 'Asesoramiento en procesos de divorcio, acuerdos familiares, alimentos y organización del cuidado de hijos e hijas. Cada caso se aborda con especial atención a la situación de las personas involucradas.', examples: ['Divorcios y acuerdos', 'Cuota alimentaria', 'Cuidado personal y comunicación'] },
  { id: 'sucesiones', title: 'Sucesiones', icon: 'branch', description: 'Orientación para ordenar el patrimonio familiar y transitar cada etapa del proceso sucesorio.', detail: 'Asistencia para identificar la documentación necesaria, analizar la situación de los bienes y orientar el proceso sucesorio. Los pasos y plazos dependen de las circunstancias de cada familia y jurisdicción.', examples: ['Declaratoria de herederos', 'Sucesiones con o sin testamento', 'Partición y adjudicación de bienes'] },
  { id: 'penal', title: 'Derecho penal', icon: 'shield', description: 'Asesoramiento y defensa de tus derechos, con atención a los detalles y a las particularidades de cada caso.', detail: 'Evaluación de consultas relacionadas con denuncias, investigaciones y procesos penales. La intervención y el alcance de la representación se acuerdan luego de analizar el caso y la jurisdicción correspondiente.', examples: ['Orientación ante denuncias', 'Defensa y representación', 'Asistencia a víctimas'] },
  { id: 'accidentes', title: 'Accidentes de tránsito', icon: 'car', description: 'Reclamos por daños y lesiones. Evaluación de tu situación y de las vías para solicitar una reparación.', detail: 'Asesoramiento sobre documentación del siniestro, gestiones ante aseguradoras y evaluación de daños materiales o lesiones. Es conveniente conservar fotografías, constancias médicas y datos de las personas involucradas.', examples: ['Reclamos ante aseguradoras', 'Daños materiales y lesiones', 'Evaluación de acuerdos'] },
] as const;

export const faqs = [
  { question: '¿Cómo es la primera consulta?', answer: 'Es un espacio para escuchar tu situación, revisar los antecedentes y entender qué necesitás. A partir de esa información, se evalúan las alternativas legales y los pasos posibles. Las condiciones y honorarios de la consulta se acuerdan previamente.' },
  { question: '¿Puedo consultar de manera online?', answer: 'La propuesta contempla consultas a distancia, con coordinación previa. La modalidad y la posibilidad de intervenir en tu caso se confirman según el tipo de asunto y la jurisdicción.' },
  { question: '¿Qué documentación necesito?', answer: 'Depende del motivo de tu consulta. Para empezar, prepará un resumen de lo ocurrido, las fechas importantes y los documentos o comunicaciones relacionados. No envíes documentación sensible hasta acordar un canal adecuado.' },
  { question: '¿Cómo se acuerdan los honorarios?', answer: 'Los honorarios se informan y acuerdan antes de comenzar el trabajo, según el alcance de la intervención y la normativa aplicable. La idea es que sepas qué incluye el servicio y puedas decidir con información.' },
];
