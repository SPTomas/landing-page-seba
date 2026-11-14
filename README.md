# Sebastián Reynoso · Identidad y página web

Tres propuestas distintas, inspiradas en la estructura editorial de `../PagFausto/landing-page`. **No se modificó PagFausto ni se copiaron sus datos de contacto.**

## Para mostrar ahora

- Abrir **`VER-PROPUESTAS.html`** con doble clic: presentación local, sin servidor ni internet.
- Abrir **`PARA-MOSTRAR/00-Comparativa-general.png`** para ver las tres opciones juntas.
- En **`PARA-MOSTRAR/`** cada propuesta tiene presentación PNG, identidad visual, vistas de escritorio/celular y logos SVG/PNG.
- **`entrega/Sebastian-Reynoso-propuestas.zip`** reúne todo para compartir. Subir el proyecto a GitHub no despliega el sitio web.
- Para navegar las páginas, abrir **`INICIAR.cmd`** o ejecutar `npm run mostrar`.

### Las opciones

| Propuesta | Dirección | Página local |
| --- | --- | --- |
| 01 · Noche & bronce | Clásica, firme y elegante. Punto de partida sugerido. | <http://127.0.0.1:4322/> |
| 02 · Marfil & oliva | Cálida, cercana, con retrato en arco. | <http://127.0.0.1:4322/oliva/> |
| 03 · Grafito editorial | Contemporánea, geométrica, retrato en blanco y negro. | <http://127.0.0.1:4322/grafito/> |
| Galería de propuestas | Identidades, páginas y descargas. | <http://127.0.0.1:4322/propuestas/> |

El selector inferior permite cambiar de propuesta. Agregar `?presentacion=1` a la URL lo oculta para una presentación limpia.

## Qué está funcionando

- Tres versiones estáticas completas; navegación móvil y enlaces internos.
- Foto **original del adjunto**, sin regenerar ni modificar la identidad de Sebastián. Se conserva el JPG; la página utiliza una copia WebP optimizada.
- Seis áreas con ventanas de detalle y selección automática del área de consulta.
- Preguntas frecuentes desplegables, ventanas de privacidad, navegación por teclado y foco visible.
- Formulario con validación y consentimiento. **Sin canal configurado no envía nada:** prepara una consulta descargable en texto, dentro del navegador. No guarda datos en almacenamiento local.
- Tipografías autoalojadas, sin llamadas a Google Fonts, mapas ni rastreadores.
- Tres monogramas vectoriales, logos de nombre con tipografía convertida a trazados, variantes blancas y PNG transparentes.
- Capturas reales de las páginas, láminas de presentación, comparativa y paquete ZIP.

Las láminas de identidad son exploraciones conceptuales generadas con asistencia de IA. Los SVG se dibujaron y compusieron para la web: **son interpretaciones, no reproducciones exactas de los logos de los mockups**. En el mockup grafito se reemplazó la tarjeta con datos ficticios por una aplicación neutra del logo real.

## Instalación y comandos

Requiere **Node.js 22.12+**. Probado con Node 22.14.0 en Windows. El servidor está limitado a `127.0.0.1`, puerto **4322**, para no interferir con PagFausto.

```powershell
npm install
npm run dev
```

| Comando | Función |
| --- | --- |
| `npm run mostrar` | Inicia la web y abre la galería; reutiliza el servidor si ya está activo. |
| `npm run check` | Revisa Astro y TypeScript. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve la compilación en el puerto 4322. |
| `npm test` | Pruebas de navegador, adaptación, formularios, descargas y accesibilidad automática. Requiere servidor activo. |
| `npm run logos` | Regenera los seis SVG con textos convertidos a trazados. |
| `npm run exportar` | Exporta capturas y presentaciones. Requiere servidor activo. |
| `npm run entrega` | Regenera la carpeta de presentación y el ZIP. Requiere Python. |

Las pruebas y exportaciones utilizan Microsoft Edge o Chrome ya instalados. Si no están disponibles, ejecutar `npx playwright install chromium`. Se puede indicar otro navegador con `BROWSER_PATH` y otro servidor con `SITE_URL`.

`unifont` se fija en `0.7.4` mediante `overrides` para mantener compatibilidad con Node 22.14; `0.7.5` requiere una versión de Node posterior por su dependencia de Undici. No se utiliza el servicio de fuentes de Astro: todas las fuentes se importan desde Fontsource. El lockfile incluye las versiones auditadas.

### Regenerar las imágenes

Las imágenes entregadas ya están listas. Sólo hace falta este flujo si se cambia el diseño:

1. `npm run logos`
2. `python scripts/prepare-assets.py` (requiere Pillow; prepara WebP, fuentes/licencias y sanea el mockup grafito si ya existe el PNG del logo).
3. Iniciar el servidor en otra terminal: `npm run dev`.
4. `npm run exportar`
5. Si fuera la primera exportación: `python scripts/prepare-assets.py` y luego `npm run exportar` nuevamente, para que la comparativa incluya el mockup sin datos ficticios.
6. `npm run entrega`
7. `npm run build` para que `dist/` incluya las últimas exportaciones.

## Antes de publicar: datos pendientes

Editar **`src/data/site.ts`**:

```ts
export const site = {
  name: 'Sebastián Reynoso',
  profession: 'Abogado',
  whatsapp: '', // Formato internacional, sólo dígitos.
  email: '',
  address: '',
  registration: '',
  formEndpoint: '',
};
```

Prioridad de envío: `formEndpoint` → WhatsApp → correo → descarga local. En WhatsApp/correo se prepara el mensaje y el usuario confirma el envío en esa aplicación. Un endpoint sólo muestra éxito después de recibir una respuesta HTTP satisfactoria. No colocar secretos en esta configuración, que se incluye en el navegador.

**Validar con Sebastián antes de publicar:**

- Condición profesional, matrícula, jurisdicción y áreas reales de práctica. Los textos y las seis áreas son **propuestos**, no antecedentes o especialidades verificados.
- Modalidad de atención y datos de contacto. No se inventaron teléfono, dirección, correo, experiencia, reseñas ni resultados.
- Honorarios y condiciones de la primera consulta; no se promete gratuidad, plazos o resultados.
- Responsable del tratamiento de datos, canal para ejercer derechos y conservación. La ventana de privacidad es una base para la propuesta, no una política definitiva.
- Elegir una identidad y retirar la galería/selector si no se desean públicos.
- Definir dominio, metadatos sociales y acceso a las imágenes de la foto, según corresponda.

Por ahora todas las páginas incluyen **`noindex,nofollow`** y `public/robots.txt` bloquea rastreadores. Retirar esas restricciones sólo al confirmar la versión pública y revisar los textos. Para publicar alcanza con desplegar el contenido de `dist/` en un alojamiento estático; no hay backend ni envío configurado.

## Estructura

```text
src/components/Site.astro     Página compartida de las tres identidades
src/components/Mark.astro     Monogramas utilizados en la web
src/data/site.ts              Datos, propuestas, áreas y preguntas
src/styles/global.css        Estilos, temas y adaptación
src/scripts/site.ts          Menú, ventanas y formulario
src/pages/                   Páginas de cada versión y galería
public/images/               Foto original y WebP
public/logos/                SVG vectoriales y blancos
public/propuestas/           Identidades, capturas y láminas PNG
public/fonts/                Fuentes para las láminas y licencias OFL
scripts/                     Pruebas, exportaciones y empaquetado
PARA-MOSTRAR/                 Archivos ordenados para presentar
entrega/                     ZIP para compartir
```
