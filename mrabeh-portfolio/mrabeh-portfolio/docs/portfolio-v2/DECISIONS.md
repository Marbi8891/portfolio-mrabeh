# DECISIONS — portfolio-mrabeh v2

## ADR-001 — Rediseño sobre repo existente, no reescritura
- Estado: DECIDIDO (confirmado 2026-09-07, ratifica decisión de agosto 2026)
- Contexto: prompt entrante pedía reescritura completa en Next.js/App Router/i18n con 20 fases. Memoria del usuario registra decisión previa de agosto: prohibido migrar a Next.js salvo bloqueante técnico real.
- Decisión: mantener stack actual (React 18 + Vite + TS + Tailwind + React Router). Rediseño de contenido y hardening, no reescritura de stack.
- Razón: no hay bloqueante técnico real; hay deadline duro (16 sept, Digital Talent Day) que hace inviable una reescritura completa.
- Trade-off aceptado: sin App Router/Server Components/i18n nativo de Next.js. i18n queda arquitecturado para después del 16 sept.

## ADR-002 — Dominio canónico
- Estado: DECIDIDO (2026-09-07)
- Decisión: `mrabehfathi.es` es el dominio canónico. El repo (README, index.html, footer, sitemap) usaba `mrabehfathi.com` — se corrige a `.es`.
- Pendiente `VERIFY` del usuario: si tiene control sobre `mrabehfathi.com` para configurar un 301 hacia `.es` (fuera de alcance de este repo, es config DNS/hosting).

## ADR-003 — Proyectos existentes en data/projects.ts
- Estado: DECIDIDO (2026-09-07)
- Contexto: auditoría (`AUDIT.md` §2) identificó 6 de 7 proyectos mostrados (CLAW Framework, Golytics, Netseer, SYNAPSE/INTEL-LINK, SIGMA43, Calculadora Financiera Pro) sin correspondencia verificable en el inventario de trabajo conocido del usuario, con enlaces GitHub/demo vacíos y estados `active`/`completed`.
- Se propusieron dos opciones: eliminarlos, o que el usuario confirmara que son reales. El usuario respondió explícitamente **"No los toques"** — instrucción de no modificar esas 6 entradas.
- Decisión: esas 6 entradas de `data/projects.ts` se dejan exactamente como están. No se han añadido, verificado ni tocado.
- Nota para el registro (no bloquea nada, solo queda documentado): esto deja en pie el hallazgo CRÍTICO de `AUDIT.md` §2 sobre credibilidad de esos 6 proyectos frente a la regla propia del usuario de "no inventar nada para parecer más experimentado". Si en algún momento quiere revisarlo, este ADR es el punto de partida.
- NEXARO AI sí se actualiza (no forma parte de los "6 no tocar"): se reposiciona de `active`/SaaS-en-producción a estado honesto de diseño (`development`), apoyado en la rama `nexaro/v1-design-package` del propio repo (10 ADRs + specs, sin código todavía).

## ADR-004 — CV en PDF
- Estado: DECIDIDO (2026-09-07)
- Decisión: se genera el PDF a partir de datos verificados (memoria del usuario + contenido ya corregido del repo), no a partir de un archivo que el usuario suba.
- Fuente de verdad para fechas de experiencia: informe de vida laboral (jul 2026) — OSSA/Trojena 05/01/2025–05/03/2025; Construcciones Sánchez Domínguez Sando 17/10/2023–15/12/2023; Ayuntamiento de Leganés 30/04/2021–29/10/2021; Agencia Local de Empleo 15/12/2017–14/06/2018. Estas fechas corrigen las que había en `CV.tsx`/`experience.ts`, que no coincidían.
- `VERIFY` pendiente del usuario: revisar el PDF generado antes de publicarlo/enviarlo a ninguna empresa.

## ADR-005 — Vulnerabilidades de dependencias (npm audit)
- Estado: DECIDIDO (2026-09-07), revisión pre-push
- `npm audit` encontró 12 vulnerabilidades (2 low, 4 moderate, 6 high). `npm audit fix` (no rompe compatibilidad) resolvió 8 de las 12.
- Las 4 restantes (3 moderate, 1 high) requieren saltos de versión mayor: `vite` 5→8 y `react-router-dom` 6→7.
- Decisión: NO forzar (`npm audit fix --force`) a 9 días del deadline. Razones: (1) `esbuild`/`vite` — la vulnerabilidad ("cualquier web puede leer respuestas del dev server") solo afecta al entorno de desarrollo local, no a la build estática de producción servida por Cloudflare Pages; (2) `react-router` — "open redirect" requiere un vector de redirección controlado por el usuario que este sitio no tiene (rutas estáticas, sin params de redirect); (3) saltar dos versiones mayores de React Router 9 días antes de una fecha límite, sin ventana para testear cada página, es más riesgoso que las vulnerabilidades que mitiga.
- `VERIFY` pendiente: revisar el upgrade a Vite 8 / React Router 7 después del 16 de septiembre, con tiempo para probar cada ruta.

## ADR-006 — OWASP Web Auditor como CASE 01 (case study)
- Estado: DECIDIDO (2026-09-09)
- Contexto: se pidió integrar `owasp-web-auditor` (repo público, MIT, verificado en profundidad en su propia sesión de trabajo: 19 reglas, 492 tests, ruleset v1.4.0) como el primer case study técnico del portafolio, con la regla explícita "EVIDENCE > CLAIMS" y sin inventar nada.
- Antes de escribir código se releyó `AUDIT.md` (§2) y `ADR-003`: los 6 proyectos "no tocar" ya tienen ese estado por instrucción explícita previa. OWASP Web Auditor es una entrada NUEVA, no toca ninguna de las 6 - sigue exactamente el mismo criterio que ya se aplicó a NEXARO (estado honesto, respaldado por evidencia real, no aspiracional).
- Decisión: `data/projects.ts` gana dos campos opcionales en `Project` (`caseStudyPath`, `evidence`) en vez de un componente de tarjeta aparte - un check de estos vale más que duplicar `ProjectCard.tsx` para un solo proyecto. OWASP se añade como primer elemento del array, `featured: true`, con evidencia verificada (no adjetivos).
- Nueva ruta `/proyectos/owasp-web-auditor` (página dedicada, primera vez que existe una page de case study individual en este repo - `NEXARO` sigue sin la suya, ver `PROGRESS.md`).
- Toda cifra o afirmación de seguridad usada en la página se verificó contra el código real de `owasp-web-auditor` (no contra memoria de conversación) - detalle completo en `docs/portfolio-v2/owasp-web-auditor-evidence.md`.
- Conflicto de dominio: resuelto, ver ADR-007. La página nueva usa `mrabehfathi.com`, consistente con el resto del repo ya corregido.
- Trade-off aceptado: la sección "Trabajo destacado" de Home pasa de 3 a 4 proyectos destacados (OWASP + los 3 que ya eran `featured`), lo que deja una tarjeta sola en la segunda fila de la rejilla de 3 columnas en desktop. No se ha ocultado ningún proyecto ya visible para evitarlo - es un efecto cosmético menor, no un bug, y corregirlo implicaría decidir ocultar a NEXARO/CLAW/Golytics de Home, que no es mi decisión.
- No se ha tocado `About.tsx` ni `skills.ts`: el nivel autoevaluado "Básico" en TypeScript/JavaScript ahí registrado no se ha subido a pesar de la evidencia nueva - es una autoevaluación tuya, no algo que yo deba corregir en tu nombre. Si quieres revisarlo a la luz de este proyecto, es una decisión tuya.
- Sin push - los cambios viven en `feat/portfolio-v2` en tu Mac, pendientes de tu aprobación explícita, igual que el resto de esta rama.

## ADR-007 — Corrección de ADR-002: dominio canónico es `.com`, no `.es`
- Estado: DECIDIDO (2026-09-09), corrige ADR-002
- Contexto: ADR-002 (2026-09-07) fijó `mrabehfathi.es` como canónico y corrigió 8 archivos de `.com` a `.es`. Al integrar CASE 01 (ADR-006) surgió un conflicto directo con memoria de otras sesiones, que registraba `.com` como el dominio canónico definitivo tras una revisión posterior.
- Verificación: se consultó el propio deploy de producción (`mrabehfathi-vercel-deploy.vercel.app`, confirmado por el usuario). Su `<link rel="canonical">`, `og:url`/`twitter:url` y JSON-LD `Person.url` usan `https://mrabehfathi.com/` — no hay ningún rastro de `.es` en el sitio realmente publicado.
- Decisión: `mrabehfathi.com` es el dominio canónico. ADR-002 queda corregido por este ADR (no se elimina, se documenta como superseded). Se revierte `.es` → `.com` en los mismos archivos que ADR-002 había tocado (`README.md`, `index.html`, `Footer.tsx`, `Seo.tsx`, `AvisoLegal.tsx`, `NotFound.tsx`, `public/sitemap.xml`, `public/robots.txt`) y en la página nueva de CASE 01 (`OwaspWebAuditor.tsx`), que ya se había escrito con `.es` siguiendo el estado del repo en ese momento.
- No se ha tocado `docs/portfolio-v2/AUDIT.md` (2026-09-07): es un registro histórico de lo que se decidió y por qué en ese momento, no una fuente activa que el código lea.
- `VERIFY` pendiente del usuario: si controla `mrabehfathi.es` como dominio, considerar un 301 hacia `.com` para no perder tráfico de ningún enlace que ya se haya compartido con `.es` — fuera de alcance de este repo (config DNS/hosting).
