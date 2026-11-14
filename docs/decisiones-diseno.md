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
