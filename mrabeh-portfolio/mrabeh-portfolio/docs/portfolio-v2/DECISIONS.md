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
