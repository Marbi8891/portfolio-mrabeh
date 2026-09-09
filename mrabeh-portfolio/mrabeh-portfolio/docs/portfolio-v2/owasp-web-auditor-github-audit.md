# GitHub presentation audit — owasp-web-auditor

Auditoría de la presentación pública del repositorio
[`github.com/Marbi8891/owasp-web-auditor`](https://github.com/Marbi8891/owasp-web-auditor)
tal como la vería un recruiter o Tech Lead que llega desde el link del case
study del portafolio. **No se ha modificado el repositorio OWASP desde este
proyecto** — solo se documenta lo encontrado y se recomienda.

## Resumen

El repositorio está en buen estado técnico (README claro, LICENSE presente,
estructura de monorepo legible) pero tiene tres problemas de presentación
concretos, y varias mejoras de discoverability sin implementar. Nada de esto
es bloqueante para enlazarlo desde el portafolio — ya se puede hacer con
seguridad — pero vale la pena corregirlo pronto, idealmente antes de que
alguien lo abra desde el case study.

## Hallazgos

### ALTO — El README describe un estado ya superado
`README.md`, sección "Workspace layout" (línea ~64):
```
security-rules/   the 8 V1 checks
```
Esto describe el estado de la V1 original. El repositorio real tiene **19
reglas** (ruleset v1.4.0, verificado por conteo directo del array `RULESET`
en `packages/security-rules/src/index.ts`). Es exactamente el tipo de
desajuste entre documentación y código que el propio proyecto se propone
evitar en el resto de su disciplina (contratos versionados, tests dorados).
**Recomendación**: cambiar esa línea a algo que no quede desactualizado con
cada versión, p. ej. "the security rules (see `docs/SCANNER.md` for the
current count and list)" en vez de fijar un número en el README.

### MEDIO — Sin "topics" de GitHub
El repositorio no tiene ningún topic configurado (`topics: []`, comprobado
vía API). Los topics son gratis para discoverability y para que un
visitante entienda el proyecto en el primer vistazo, antes de leer nada.
**Recomendación**: añadir algo como `typescript`, `security`,
`web-security`, `owasp`, `cli`, `vitest`, `ssrf`, `static-analysis`, `nodejs`.

### MEDIO — Sin sección de testing en el README
El README no menciona en ningún punto cuántos tests tiene el proyecto ni
cómo ejecutarlos, a pesar de que la disciplina de testing (492 tests,
fuzzing, property-based, SSRF adversarial) es uno de los argumentos más
fuertes del proyecto — y del case study que se acaba de construir sobre él.
**Recomendación**: una sección corta "## Testing" con `pnpm test` y una
frase sobre las categorías (reglas doradas, adversarial, fuzzing, límites de
recursos), enlazando si se quiere a un futuro `docs/TESTING.md`.

### BAJO — Sin ejemplo de salida real en el README
El Quickstart muestra los comandos (`pnpm scan --url ...`) pero no un
fragmento de salida real (ni en formato humano ni JSON). Para alguien que
evalúa el proyecto sin clonarlo, ver la forma real de un hallazgo (severidad,
confianza, fingerprint) es más convincente que la promesa de que existe.
**Recomendación**: pegar un bloque de salida `--format json` truncado (un
hallazgo, el bloque de score) directamente en el README.

### BAJO — `docs/BACKLOG.md` no se enlaza desde el README
El roadmap real (postura de correo, superficie HTML, Certificate
Transparency, motor de remediación, baseline/diff) vive en `docs/BACKLOG.md`
pero el README no lo menciona ni enlaza. Alguien que solo lee el README no
sabe que ese roadmap existe.
**Recomendación**: una línea en el README apuntando a `docs/BACKLOG.md`.

### BAJO — Sin `CONTRIBUTING.md`
No es bloqueante para un proyecto personal, pero si el repositorio se enlaza
públicamente desde un portafolio y alguien quisiera abrir una issue o PR, no
hay ninguna guía. **Recomendación**: opcional, un `CONTRIBUTING.md` de 5-10
líneas (cómo correr tests, estilo de commits, que el roadmap sigue un orden
estricto de versiones) sería suficiente — no es urgente.

### INFO — Sin releases/tags de GitHub todavía
`git tag -l` no devuelve nada. El proyecto usa versionado semántico interno
(`RULESET_VERSION`, `scoringVersion`) pero no releases de GitHub. No es un
problema en sí — es una decisión válida para un proyecto que aún no ha
llegado a v2.0 — pero si en algún momento se quiere un badge de "última
versión" o un changelog visible en la página de releases de GitHub, haría
falta empezar a etiquetar versiones (`git tag v1.4.1`, etc.).

### Lo que ya está bien (no toca cambiarse)
- `README.md`: Quickstart, uso de CLI, API de librería y layout del
  workspace están claros y son correctos.
- `LICENSE`: presente, MIT, coherente con `package.json`.
- `docs/SECURITY_MODEL.md`: enlazado desde el README, explica exactamente
  qué hace y qué NO hace la herramienta ("Passive only, no exploitation").
- Estructura de monorepo (`packages/`, `apps/cli/`) legible desde el primer
  vistazo al árbol de archivos.
- Historial de commits limpio y semántico (`feat(dns): ...`,
  `docs(release): ...`), sin ruido.

## Prioridad sugerida si se quiere corregir
1. Corregir la línea "8 V1 checks" del README (ALTO, 2 minutos).
2. Añadir topics de GitHub (MEDIO, 2 minutos, se hace desde la configuración
   del repositorio, no requiere código).
3. Sección de testing en el README (MEDIO, 10 minutos).
4. Ejemplo de salida real + enlace a BACKLOG.md (BAJO, 15 minutos).
5. `CONTRIBUTING.md` (BAJO, opcional).

Nada de esto se ha tocado en este documento ni en el repositorio OWASP — son
recomendaciones para una sesión de trabajo aparte, específica sobre ese
repositorio.
