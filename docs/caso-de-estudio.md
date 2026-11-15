# De tres propuestas a un sitio profesional

## Contexto

Sebastián Reinoso necesitaba una presencia web que reuniera su práctica como abogado en Córdoba y su faceta de profesor universitario. La primera etapa exploró tres identidades; el cliente eligió **azul y bronce** y proporcionó un retrato actualizado junto con sus datos profesionales.

## Objetivos de la edición

- Convertir una maqueta comparativa en una página principal con identidad definida.
- Dar visibilidad a la docencia sin inventar universidades, cargos o antecedentes.
- Presentar las seis áreas confirmadas y facilitar una consulta contextualizada.
- Permitir contacto directo sin contratar ni mantener un backend.
- Conservar decisiones y cambios en un historial Git comprensible.

## Solución

**Identidad.** Se mantiene el monograma SR y la combinación azul, bronce y marfil. Cormorant Garamond aporta el tono editorial y Manrope acompaña la lectura. Tras la corrección del cliente, el apellido es **Reinoso con i**: se actualizan la configuración, las consultas y los logos vectoriales y PNG.

**Retrato.** Se conserva el PNG suministrado, sin regenerarlo ni retocarlo. La web carga una copia WebP de 768 × 1152 px, de aproximadamente 51 KB; el encuadre se adapta con CSS.

**Arquitectura.** Astro genera páginas estáticas. Los datos, áreas y preguntas se centralizan en `src/data/site.ts`; la interfaz compartida permite mantener las alternativas sin duplicar contenido.

**Contenido.** Se distinguen Civil, Comercial, Laboral, Familia, Concursos y Quiebras (Insolvencia), y Penal. Matrícula, jurisdicción y dirección son visibles. La docencia tiene presencia en el inicio y en un bloque del estudio.

**Contacto.** Las ventanas de áreas preseleccionan el tema en el formulario. Al continuar, se prepara un mensaje en WhatsApp; la persona confirma el envío allí. El acceso flotante utiliza el ícono reconocible de WhatsApp y se acompaña de llamadas directas en el inicio y encabezado. Teléfono, correo y ubicación son enlaces directos, sin mapas embebidos ni rastreadores.

**Refinamiento.** Se mejora la legibilidad, se separan las tarjetas de áreas y se destaca el bloque de docencia con fondo azul. La navegación señala la sección actual y los controles reciben tamaños táctiles y estados de foco más claros.

**Archivo.** Las propuestas y láminas anteriores se conservan como exploración, sin el selector en la página elegida. Así se diferencia el proceso de diseño de la experiencia principal.

## Verificación

En esta edición se ejecutaron:

- `npm run check`: sin errores ni advertencias.
- `npm run build`: compilación estática correcta.
- `npm test`: **316 comprobaciones**, sin errores de navegador.

Las pruebas incluyen datos, apellido corregido, imágenes, seis áreas, selección del formulario, nueve anchos de 320 a 1440 px, menú móvil con retorno de foco, navegación activa, privacidad, descarga local, clic del botón flotante y formulario de WhatsApp interceptados y endpoints simulados. axe-core revisa reglas WCAG A/AA; no se presenta esta prueba automática como certificación de accesibilidad ni como auditoría manual completa.

## Capturas reales

![Vista de escritorio del sitio elegido](capturas/inicio-escritorio.png)

[Vista móvil](capturas/inicio-movil.png) · [Página completa](capturas/pagina-completa.png)

Se regeneran con `npm run capturas` y el servidor activo. No son imágenes generadas de una interfaz inexistente.

## Historial y límites

La entrega se divide en ramas de identidad, perfil profesional, documentación, corrección del apellido y pulido visual/WhatsApp. Los merges conservan cada unidad de trabajo, sin reescritura ni pull requests ficticios. Ver [flujo de versionado](versionado.md).

El repositorio no equivale a un despliegue. El dominio, la indexación pública y la revisión final de privacidad quedan pendientes del lanzamiento. No se afirman resultados comerciales, métricas de rendimiento o verificaciones profesionales que no se hayan medido o realizado.
