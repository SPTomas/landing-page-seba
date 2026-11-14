# De tres propuestas a un sitio profesional

## Contexto

Sebastián Reynoso necesitaba una presencia web que reuniera su práctica como abogado en Córdoba y su faceta de profesor universitario. La primera etapa exploró tres identidades; el cliente eligió **azul y bronce** y proporcionó un retrato actualizado junto con sus datos profesionales.

## Objetivos de la edición

- Convertir una maqueta comparativa en una página principal con identidad definida.
- Dar visibilidad a la docencia sin inventar universidades, cargos o antecedentes.
- Presentar las seis áreas confirmadas y facilitar una consulta contextualizada.
- Permitir contacto directo sin contratar ni mantener un backend.
- Conservar decisiones y cambios en un historial Git comprensible.

## Solución

**Identidad.** Se mantiene el monograma SR y la combinación azul, bronce y marfil. Cormorant Garamond aporta el tono editorial y Manrope acompaña la lectura.

**Retrato.** Se conserva el PNG suministrado, sin regenerarlo ni retocarlo. La web carga una copia WebP de 768 × 1152 px, de aproximadamente 51 KB; el encuadre se adapta con CSS.

**Arquitectura.** Astro genera páginas estáticas. Los datos, áreas y preguntas se centralizan en `src/data/site.ts`; la interfaz compartida permite mantener las alternativas sin duplicar contenido.

**Contenido.** Se distinguen Civil, Comercial, Laboral, Familia, Concursos y Quiebras (Insolvencia), y Penal. Matrícula, jurisdicción y dirección son visibles. La docencia tiene presencia en el inicio y en un bloque del estudio.

**Contacto.** Las ventanas de áreas preseleccionan el tema en el formulario. Al continuar, se prepara un mensaje en WhatsApp; la persona confirma el envío allí. Teléfono, correo y ubicación son enlaces directos, sin mapas embebidos ni rastreadores.

**Archivo.** Las propuestas y láminas anteriores se conservan como exploración, sin el selector en la página elegida. Así se diferencia el proceso de diseño de la experiencia principal.

## Verificación

En esta edición se ejecutaron:

- `npm run check`: sin errores ni advertencias.
- `npm run build`: compilación estática correcta.
- `npm test`: **243 comprobaciones**, sin errores de navegador.

Las pruebas incluyen datos, imágenes, seis áreas, selección del formulario, anchos de 320 a 1440 px, menú móvil, privacidad, descarga local, WhatsApp interceptado y endpoints simulados. axe-core revisa reglas WCAG A/AA; no se presenta esta prueba automática como certificación de accesibilidad ni como auditoría manual completa.

## Capturas reales

![Vista de escritorio del sitio elegido](capturas/inicio-escritorio.png)

[Vista móvil](capturas/inicio-movil.png) · [Página completa](capturas/pagina-completa.png)

Se regeneran con `npm run capturas` y el servidor activo. No son imágenes generadas de una interfaz inexistente.

## Historial y límites

La entrega se divide en ramas de identidad, perfil profesional y documentación. Los merges conservan cada unidad de trabajo, sin reescritura ni pull requests ficticios. Ver [flujo de versionado](versionado.md).

El repositorio no equivale a un despliegue. El dominio, la indexación pública y la revisión final de privacidad quedan pendientes del lanzamiento. No se afirman resultados comerciales, métricas de rendimiento o verificaciones profesionales que no se hayan medido o realizado.
