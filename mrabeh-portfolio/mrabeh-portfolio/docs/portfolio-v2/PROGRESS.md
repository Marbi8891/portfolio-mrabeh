# PROGRESS — portfolio-mrabeh v2

Deadline: 16 septiembre 2026 (Digital Talent Day). Rama: `feat/portfolio-v2`. Sin push, sin despliegue — pendiente de tu aprobación explícita.

## Completado (2026-09-07)
- Auditoría completa del repo (`AUDIT.md`).
- Decisiones registradas (`DECISIONS.md`): rediseño sobre repo existente (no Next.js), dominio `.es`, proyectos "no tocar" confirmados por ti, CV generado por mí.
- Seguridad: `lab_reverse_shell.py`/`tcp_forward.py` movidos fuera de la raíz a `lab-scripts/` con README de contexto; `.gitignore` añadido; CSP añadida a `_headers`.
- Dominio: `.com` → `.es` en todo el repo (README, index.html, footer, sitemap, robots, legal).
- Home/About: eliminadas afirmaciones no verificables ("Especialista en Ciberseguridad", "perfil híbrido senior", "proyectos en producción", stats inventados). Timeline de experiencia corregido con fechas reales (informe de vida laboral). Nivel de inglés corregido (TOEIC 950 / TOEFL 102, no "básico").
- Skills: niveles 1-5 inflados sustituidos por autoevaluación real (Básico/Intermedio/Avanzado/En aprendizaje).
- NEXARO: reposicionado de "SaaS activo" a estado real (diseño completo, código en curso), enlazado a la rama real del design package.
- Contacto: formulario roto (Formspree placeholder) sustituido por envío funcional vía mailto.
- CV: PDF generado desde datos verificados; fechas de CV.tsx corregidas; 3 enlaces rotos al PDF ahora funcionan.
- SEO: metadata/OG/Twitter actualizados, JSON-LD Person añadido, imagen OG generada.
- Calidad: `.eslintrc.cjs` añadido (no existía, `npm run lint` fallaba). `tsc --noEmit` limpio, `npm run lint` limpio (0 warnings), `npm run build` correcto, smoke test headless en las 6 rutas sin errores de página/consola (solo bloqueos de red esperables del sandbox hacia Google Fonts).
- 9 commits pequeños y semánticos en `feat/portfolio-v2`.
- Revisión independiente (subagente sin contexto previo) encontró 3 problemas reales que se corrigieron en un 10º commit: NEXARO seguía etiquetado como "SaaS Cybersecurity" activo en `CV.tsx` (Proyectos destacados), una respuesta de FAQ en `Services.tsx` sonaba a especialización en seguridad no respaldada por el nivel autoevaluado, y el README documentaba un flujo de Formspree que ya no existe tras el cambio a mailto.

## Completado (2026-09-09)
- CASE 01 — OWASP Web Auditor integrado como primer case study técnico (ver `DECISIONS.md` ADR-006 para el detalle completo):
  - `data/projects.ts`: nuevos campos opcionales `caseStudyPath`/`evidence` en `Project`; entrada nueva `owasp-web-auditor`, primera del array, `featured: true`, con cifras verificadas contra el repositorio real (19 reglas, 492 tests, MIT).
  - `ProjectCard.tsx`: badge "Caso 01", línea de evidencia, enlace "ver_caso" — sin romper el resto de tarjetas (backward-compatible, campos opcionales).
  - Página nueva `src/pages/projects/OwaspWebAuditor.tsx` en `/proyectos/owasp-web-auditor`: 11 secciones (Problem/Solution/Engineering/Security Model/Rules/Testing/Evidence/Architecture/Technical Decisions/Limitations/Next Iteration), todas con evidencia verificada archivo por archivo — ver `owasp-web-auditor-evidence.md`.
  - `Seo.tsx`: nueva capacidad opcional de JSON-LD por ruta (`SoftwareSourceCode` para este case study), sin tocar el comportamiento de las rutas existentes.
  - `sitemap.xml`: ruta nueva añadida.
  - Home ("Trabajo destacado"): OWASP aparece primero automáticamente por orden en el array + `featured: true` — sin tocar `Home.tsx`.
  - Documentación nueva: `owasp-web-auditor-evidence.md` (tabla CLAIM/EVIDENCE/SOURCE/SAFE TO DISPLAY) y `owasp-web-auditor-github-audit.md` (auditoría de la presentación pública de ese repo, sin tocarlo).
  - Verificación: `tsc --noEmit` limpio, `npm run lint` limpio (0 warnings), `npm run build` correcto, smoke test headless (Playwright) en `/`, `/proyectos` y `/proyectos/owasp-web-auditor` sin errores de consola, capturas mobile (390×844) y desktop revisadas — el primer viewport móvil ya muestra nombre, qué es, evidencia y "Ver código fuente" sin scroll.

## Pendiente / no tocado
- Los 6 proyectos marcados como no verificables en la auditoría (CLAW Framework, Golytics, Netseer, SYNAPSE/INTEL-LINK, SIGMA43, Calculadora Financiera Pro) — sin cambios, por instrucción explícita tuya (ver `DECISIONS.md` ADR-003). El hallazgo crítico de credibilidad sigue abierto si en algún momento quieres revisarlo.
- CV en PDF: generado por mí, pendiente de tu revisión antes de enviarlo a cualquier empresa.
- `mrabehfathi.com` → ver bloqueante nuevo abajo, ya no es solo "confirmar el 301".
- 1 case study completo de NEXARO en `/proyectos/nexaro` — el patrón de página de case study ya existe (reutilizable, es el mismo que se acaba de construir para OWASP); sigue sin implementarse por tiempo, ahora es mecánico si sobra margen antes del 16.
- Niveles autoevaluados de `skills.ts` (p. ej. TypeScript/JavaScript en "Básico") no se han tocado a pesar de la evidencia nueva de OWASP Web Auditor — es tu autoevaluación, no la corrijo por mi cuenta. Si quieres revisarla, dime y lo hago.
- Recomendaciones del audit de GitHub sobre `owasp-web-auditor` (README con "8 V1 checks" desactualizado, sin topics, sin sección de testing) — documentadas en `owasp-web-auditor-github-audit.md`, no aplicadas: son cambios en OTRO repositorio, fuera de alcance de esta rama.
- i18n, `/lab`, `/writing`, rediseño visual completo — post-DTD, como decidiste en agosto.
- Aplanar la carpeta anidada `mrabeh-portfolio/mrabeh-portfolio/` — no se tocó (riesgo/beneficio no lo justificaba a 9 días del deadline).

## Bloqueado
- Todo: sin push ni despliegue hasta que lo apruebes explícitamente.

## Resuelto (2026-09-09)
- **Conflicto de dominio canónico**: confirmado contra el propio deploy de producción — `mrabehfathi.com` es el canónico real, no `.es`. Ver `DECISIONS.md` ADR-007 (corrige ADR-002). Se revirtió `.es` → `.com` en los 8 archivos que ADR-002 había tocado más la página nueva de CASE 01 — 9 archivos en total, ya corregidos en esta pasada.
