# Flujo de versionado

## Organización de esta entrega

El repositorio es exclusivo de `pagSeba`; no incluye el Git de carpetas superiores ni archivos de otros proyectos.

1. `feat/identidad-azul-bronce`: adopción de la identidad y el retrato aprobado; comprobaciones visuales.
2. `feat/perfil-profesional`: información confirmada, seis áreas, docencia, contacto y pruebas de WhatsApp.
3. `docs/caso-de-estudio`: documentación, decisiones y capturas reproducibles para portfolio.
4. `fix/apellido-reinoso`: corrección del apellido en la configuración, interfaz, metadatos, consultas, recursos y logos regenerados.
5. `feat/pulido-web-whatsapp`: ícono de WhatsApp, accesos directos y refinamiento visual, con pruebas de teclado y adaptación.
6. `feat/llamadas-contacto`: “Contactame”, “Contame tu caso” e invitación flotante visible, compacta al completar el formulario en celular.

Cada rama conserva commits descriptivos (`feat`, `test`, `docs`). Las integraciones en `main` usan `git merge --no-ff`: el punto de integración queda visible sin reescribir el historial. Las ramas se publican para poder recorrer el trabajo por responsabilidad.

Esta entrega se integra con merges locales; **no se simulan pull requests, revisiones de terceros ni CI que no se hayan realizado**.

Para ver el historial:

```sh
git log --graph --oneline --decorate --all
```

## Próximas modificaciones

Partir de un árbol de trabajo limpio y una rama principal actualizada:

```sh
git switch main
git pull --ff-only origin main
git switch -c feat/nombre-del-cambio
```

Implementar un cambio con alcance claro. Revisar `git diff` y añadir sólo los archivos relacionados:

```sh
git add ruta/del/archivo
git commit -m "feat(seccion): describir el cambio"
```

Validar **secuencialmente** `npm run check` y `npm run build`. Con `npm run preview` activo en otra terminal, ejecutar `npm test`; regenerar `npm run capturas` si cambió la interfaz. No ejecutar check y build simultáneamente: comparten cachés de Astro/Vite.

Publicar la rama:

```sh
git push -u origin feat/nombre-del-cambio
```

En un flujo colaborativo, abrir un pull request a `main` con resumen, capturas y resultados reales de pruebas. Si se integra localmente:

```sh
git switch main
git merge --no-ff feat/nombre-del-cambio -m "merge: describir la entrega"
git push origin main
```

No usar `push --force` ni reescribir commits publicados. Las futuras ramas pueden eliminarse una vez integradas; las de esta entrega se conservan como referencia del proceso.
