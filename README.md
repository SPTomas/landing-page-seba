# Sebastián Reynoso · Sitio profesional

Landing page para un abogado y profesor universitario de Córdoba. El proyecto parte de tres exploraciones visuales y evoluciona a la identidad **azul y bronce**, elegida por el cliente.

**Astro · TypeScript · CSS responsive · Playwright · axe-core**

![Inicio del sitio con la identidad azul y bronce](docs/capturas/inicio-escritorio.png)

[Vista móvil](docs/capturas/inicio-movil.png) · [Página completa](docs/capturas/pagina-completa.png) · [Caso de estudio](docs/caso-de-estudio.md) · [Decisiones de diseño](docs/decisiones-diseno.md) · [Flujo de versionado](docs/versionado.md)

## Alcance

- Identidad azul/bronce y monograma SR de la primera propuesta.
- Retrato suministrado por el cliente, sin regeneración ni retoques. PNG conservado y WebP optimizado.
- Perfil de abogado y profesor universitario, matrícula y jurisdicción.
- Seis áreas: Civil, Comercial, Laboral, Familia, Concursos y Quiebras (Insolvencia), y Penal.
- Detalles de cada área en ventanas accesibles, con selección automática en el formulario.
- Dirección con enlace a Maps, teléfono, correo y WhatsApp.
- Formulario validado: prepara el mensaje en WhatsApp; la persona confirma el envío en esa aplicación.
- Navegación móvil, preguntas desplegables, privacidad, foco visible y respeto por movimiento reducido.
- Fuentes autoalojadas, sin rastreadores, mapas embebidos ni backend.

## Datos proporcionados

La configuración central está en [`src/data/site.ts`](src/data/site.ts).

| Dato | Valor |
| --- | --- |
| Profesional | Sebastián Reynoso · Abogado y profesor universitario |
| Matrícula | Matrícula Provincial 1-42921 |
| Jurisdicción | Primera Circunscripción Judicial de la Provincia de Córdoba |
| Estudio | Juan del Campillo 747, barrio Cofico, Córdoba |
| Teléfono / WhatsApp | 351 530-7287 · Internacional: +54 9 351 530-7287 |
| Correo | reinososebastian8@gmail.com |

No se atribuyen instituciones académicas, cátedras, antigüedad, reseñas ni resultados no proporcionados. Los honorarios y la modalidad de cada consulta se coordinan con el profesional.

## Desarrollo local

Requiere **Node.js 22.12+**. El servidor se limita a `127.0.0.1:4322`.

```sh
npm ci
npm run dev
```

Abrir <http://127.0.0.1:4322/>. En Windows también se puede usar `INICIAR.cmd` o `npm run mostrar`.

## Validación

```sh
npm run check
npm run build
npm run preview
```

Con el servidor activo, en otra terminal:

```sh
npm test
npm run capturas
```

Las pruebas cubren la identidad elegida, el retrato, los datos profesionales, las seis áreas y sus ventanas, adaptación de 320 a 1440 px, menú móvil, privacidad y formularios. WhatsApp se intercepta localmente; no se envían mensajes de prueba a servicios reales. También se comprueban la descarga sin canales configurados, errores/éxito de un endpoint simulado y accesibilidad automática WCAG A/AA con axe-core. Estas comprobaciones no sustituyen una auditoría manual completa.

Las pruebas y capturas utilizan Edge o Chrome instalados. Si no hay un navegador disponible:

```sh
npx playwright install chromium
```

Se admiten las variables `BROWSER_PATH` y `SITE_URL`. `unifont` se fija en `0.7.4` para mantener la compatibilidad con Node 22.14. Las fuentes de la web se importan desde Fontsource.

## Comandos

| Comando | Función |
| --- | --- |
| `npm run mostrar` | Inicia el sitio elegido y abre el navegador. |
| `npm run check` | Revisa Astro y TypeScript. |
| `npm run build` | Compila el sitio estático en `dist/`. |
| `npm run preview` | Sirve la compilación localmente. |
| `npm test` | Ejecuta pruebas de navegador y accesibilidad. Requiere servidor. |
| `npm run capturas` | Guarda capturas actuales en `docs/capturas/`. Requiere servidor. |
| `npm run logos` | Regenera los SVG con textos convertidos a trazados. |
| `npm run exportar` | Reexporta las presentaciones de las tres propuestas. Requiere servidor. |
| `npm run entrega` | Empaqueta las láminas de propuestas. Requiere Python. |

## Formulario y privacidad

Prioridad de canales: `formEndpoint` → WhatsApp → correo → descarga local. Actualmente se utiliza **WhatsApp**, sin endpoint ni backend.

El formulario no almacena datos en el navegador y no anuncia un envío completado al abrir WhatsApp. La ventana de privacidad identifica al profesional, su domicilio y el correo para solicitudes sobre datos. Los enlaces a WhatsApp y teléfono siguen disponibles sin JavaScript.

`src/data/site.ts` es público en la compilación: **nunca colocar secretos allí**. Los archivos `.env` se excluyen de Git.

## Archivo de propuestas

Las exploraciones iniciales se conservan para documentar el proceso:

- `/propuestas/`: galería; `/oliva/` y `/grafito/`: alternativas navegables.
- `VER-PROPUESTAS.html`: presentación local sin servidor.
- `PARA-MOSTRAR/` y `entrega/Sebastian-Reynoso-propuestas.zip`: láminas y logos iniciales.

Las capturas y el ZIP de esa etapa pueden mostrar el retrato y los textos anteriores. **Las capturas actuales están en `docs/capturas/`.** La página elegida no muestra el selector de propuestas; las alternativas sí. `?presentacion=1` oculta los controles de presentación.

Los mockups de identidad son exploraciones con asistencia de IA. Los SVG son interpretaciones vectoriales adaptadas, no calcos exactos de esos mockups. No se modificó PagFausto ni se copiaron sus datos.

Para regenerar recursos: `npm run logos`, `python scripts/prepare-assets.py` (requiere Pillow), servidor activo, `npm run exportar` y `npm run entrega`. Este flujo actualiza las láminas de exploración; no es necesario para compilar el sitio elegido.

## Versionado

Cambios separados por responsabilidad:

| Rama | Alcance |
| --- | --- |
| `feat/identidad-azul-bronce` | Identidad elegida, retrato y navegación principal. |
| `feat/perfil-profesional` | Datos confirmados, áreas, docencia, contacto y pruebas. |
| `docs/caso-de-estudio` | Documentación del proceso y capturas para portfolio. |

Se integran a `main` mediante merges `--no-ff`, conservando los commits por tema. Ver [`docs/versionado.md`](docs/versionado.md).

## Publicación

El código está en GitHub; eso **no despliega el sitio**. `npm run build` genera `dist/`, apto para alojamiento estático.

Hasta definir el dominio y confirmar la revisión final, se conservan `noindex,nofollow` y el bloqueo de `public/robots.txt`. Antes del lanzamiento hay que configurar dominio/metadatos y revisar la información de privacidad, incluida la conservación de consultas en los canales externos. Las alternativas deben permanecer fuera de la indexación.
