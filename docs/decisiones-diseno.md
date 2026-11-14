# Decisiones de diseño

## Identidad elegida

Sebastián eligió la primera propuesta: **azul y bronce** (`noche`) y su monograma SR.

- Azul `#101f30`, bronce `#c5a477` y marfil `#f5f1e9`.
- Cormorant Garamond para títulos y Manrope para texto, autoalojadas.
- La página principal `/` no muestra el selector de propuestas.
- `/propuestas/`, `/oliva/` y `/grafito/` conservan la exploración visual, separada de la navegación del sitio principal.

## Retrato aprobado

Se utiliza el PNG adjunto proporcionado por el cliente, sin regeneración, retoque ni filtros en la página principal.

- Fuente conservada: `public/images/sebastian-reynoso-retrato.png`.
- Copia para la web: `public/images/sebastian-reynoso.webp`, 768 × 1152 px.
- La compresión WebP conserva la proporción; el encuadre responsive se realiza con CSS.
- El JPG anterior y las láminas de propuestas se conservan como material de la exploración inicial.

## Versionado

La selección visual se implementa en `feat/identidad-azul-bronce`. Los cambios de información profesional se desarrollan por separado para que el historial muestre decisiones concretas, no una única entrega sin contexto.

## Información profesional confirmada por el cliente

- Abogado y profesor universitario, sin atribuir universidades o cátedras no informadas.
- Matrícula Provincial **1-42921**.
- Primera Circunscripción Judicial de la Provincia de Córdoba.
- Derecho Civil, Comercial, Laboral, Familia, Concursos y Quiebras (Insolvencia), y Penal.
- Juan del Campillo 747, barrio Cofico, Córdoba.
- Teléfono local **351 530-7287**; enlace internacional **+54 9 351 530-7287**.
- WhatsApp `5493515307287` y correo `reinososebastian8@gmail.com`.

Civil y Comercial se muestran por separado para reflejar las seis áreas indicadas. Sucesiones y daños quedan comprendidos en Civil, no como especialidades adicionales. La docencia aparece en el inicio, el retrato y un bloque propio del estudio.

## Contacto sin backend

El formulario prepara una consulta en WhatsApp con el área seleccionada. No se confunde abrir la aplicación con enviar el mensaje: la confirmación final corresponde a la persona que consulta.

El mapa es un enlace externo, no un recurso incrustado. No se cargan servicios de terceros al visitar la página. Las pruebas interceptan WhatsApp y simulan los endpoints para evitar envíos reales.

## Límites de esta entrega

La información profesional procede del cliente, no de una verificación independiente de matrícula. No se inventan honorarios, disponibilidad, plazos, resultados ni antecedentes académicos. La indexación permanece bloqueada hasta definir el dominio y revisar la versión pública.
