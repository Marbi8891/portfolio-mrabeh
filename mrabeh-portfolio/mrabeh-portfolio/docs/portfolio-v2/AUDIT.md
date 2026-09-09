# AUDIT — mrabehfathi.es (portfolio-mrabeh)

Fecha: 2026-09-07
Alcance: rediseño del repo existente `github.com/Marbi8891/portfolio-mrabeh` (React 18 + Vite + TS + Tailwind). NO reescritura desde cero. Deadline duro: **16 septiembre 2026 (Digital Talent Day)**.

## 1. Current Architecture

- Repo raíz: contiene `README.md` (placeholder de una línea), dos scripts Python de laboratorio (`lab_reverse_shell.py`, `tcp_forward.py`) y una carpeta anidada `mrabeh-portfolio/mrabeh-portfolio/` (doble nivel) con la app real.
- App: React 18 + Vite 5 + TypeScript + Tailwind 3 + React Router 6 + Framer Motion + Lucide.
- Rutas: `/`, `/sobre-mi`, `/proyectos`, `/servicios`, `/contacto`, `/cv`, `/legal/aviso-legal`, `/legal/privacidad`, `/legal/cookies`.
- Contenido dirigido por datos: `src/data/{projects,skills,experience}.ts`.
- Hosting objetivo: Cloudflare Pages (gratis), dominio en README apunta a `mrabehfathi.com`; `_headers` y `_redirects` ya configurados para Cloudflare Pages (SPA fallback + cabeceras de seguridad básicas).
- No hay `node_modules` instalados todavía, no hay `.gitignore` en ningún nivel.
- Existe una rama sin mergear `nexaro/v1-design-package` con un paquete de diseño completo de NEXARO (10 ADRs + 15 docs de arquitectura/producto/riesgo/seguridad), confirmando: **NEXARO no tiene código todavía**, es diseño pre-implementación. Esa rama también borró los dos scripts de laboratorio del root — indicio de que ya se identificaron como problema antes.

## 2. Problems Found

### CRÍTICO — Credibilidad de proyectos (bloqueante, ver sección 6)
`data/projects.ts` presenta 7 proyectos como `active`/`completed` con stacks elaborados (Stripe, Redis, Elasticsearch, XGBoost, MITRE ATT&CK...). Cruzando con tu inventario real de proyectos, **solo NEXARO AI es identificable como real** (y su único estado verificable es "diseño completo, cero código"). Los otros seis — CLAW Framework, Golytics, Netseer, SYNAPSE/INTEL-LINK, SIGMA43, Calculadora Financiera Pro — no aparecen en ningún área de tu trabajo conocido y tienen todos los enlaces `github`/`demo` vacíos. Esto viola directamente tu regla de "NO INVENTES NADA PARA HACERME PARECER MÁS EXPERIMENTADO" y "SHOW, DON'T CLAIM". Es el hallazgo más grave de la auditoría.

### ALTO — Posicionamiento contradice reglas ya fijadas
- Hero: "Especialista en Ciberseguridad" (texto rotatorio) — contradice tu regla explícita de no presentarte como especialista/experto en ciberseguridad.
- Timeline 2026+: "Perfil híbrido **senior**" — contradice tu regla de nunca presentarte como senior.
- Copy repetido: "portfolio de proyectos propios en producción" — no verificable con lo anterior.
- Stats inventados en Home: "Proyectos activos 7+", "Años en tech 3+" — sin fuente, y el propio prompt que me diste prohíbe estadísticas inventadas.
- Certificaciones: eJPT y PCAP se muestran correctamente como "En progreso" (esto SÍ está bien hecho, es coherente con tu regla).

### ALTO — Funcional roto
- `ContactForm.tsx` envía a `https://formspree.io/f/YOUR_FORM_ID` — el formulario de contacto **no funciona**, es un placeholder sin reemplazar.
- `/cv-mrabeh-fathi.pdf` se enlaza desde Home, CV y Navbar pero el archivo no existe en `public/`. Tres enlaces rotos.
- Dominio inconsistente: `index.html` (OG/canonical/Twitter) y README y Footer apuntan a `mrabehfathi.com`; `sitemap.xml` también usa `.com`; tú me diste la tarea sobre `mrabehfathi.es`. Hay que fijar un dominio canónico único.

### MEDIO — Higiene de repo / seguridad
- `lab_reverse_shell.py` y `tcp_forward.py` viven en la raíz del repo del portfolio, junto al README, sin ningún contexto visible (no hay README que explique que son herramientas de laboratorio autorizado). Para un reclutador que abre el repo desde el link del CV, esto es una señal de alarma antes de cualquier explicación. Recomiendo moverlos a un repo/carpeta de labs separada y explícitamente etiquetada, no la raíz del portfolio.
- Sin `.gitignore`: el primer `npm install` arriesga commitear `node_modules/` si no se añade antes.
- CSP no está definida en `_headers` (solo X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). Sin `Content-Security-Policy` explícita.
- Estructura anidada `mrabeh-portfolio/mrabeh-portfolio/` es confusa para cualquiera que clone el repo.

### BAJO
- `robots.txt`/`sitemap.xml` no incluyen `/servicios`... sí lo incluyen, pero falta cualquier futuro `/proyectos/:slug`.
- Sin JSON-LD (Person/schema.org).
- Sin dark/light mode toggle (el prompt original de agosto lo pedía; el sitio actual es dark-only, lo cual es aceptable para MVP).
- `techStack` y `skillCategories` usan niveles 1-5 numéricos que se renderizan como barras (`SkillBadge`) — tu regla de agosto pide niveles Básico/Intermedio/Avanzado/En aprendizaje sin porcentajes; hay que revisar `SkillBadge.tsx`.

## 3. Content Audit (KEEP / REWRITE / MOVE / DELETE)

| Contenido | Decisión |
|---|---|
| NEOM/Trojena, SAP MM, admin pública | KEEP + MOVE (fuera del hero, a Experience/CV, como origen no protagonista) |
| Hero actual ("Especialista en Ciberseguridad", stats inventados) | REWRITE COMPLETO |
| 6 proyectos no verificables (CLAW, Golytics, Netseer, SYNAPSE, SIGMA43, Calculadora) | **DELETE** (pendiente tu confirmación — sección 6) |
| NEXARO AI | REWRITE (reposicionar como diseño/BUILDING, no SaaS activo) |
| Certificaciones (eJPT, PCAP en progreso) | KEEP, ya está bien |
| "Perfil híbrido senior" | DELETE (contradice tu regla) |
| Skills con niveles 1-5 tipo barra | REWRITE (a Básico/Intermedio/Avanzado/En aprendizaje) |
| Formulario de contacto | REWRITE (arreglar Formspree o cambiar a mailto directo) |
| CV PDF | PENDIENTE — no existe el archivo; necesito que me lo proporciones o lo generamos |
| Dominio .com vs .es | DECISIÓN NECESARIA |
| lab_reverse_shell.py / tcp_forward.py en raíz | MOVE fuera del repo del portfolio |

## 4. Proposed Architecture (sin romper lo existente)

Mantener exactamente el árbol actual (`src/{components,data,pages}`, React Router, Tailwind). Cambios estructurales mínimos y justificados:
- Aplanar `mrabeh-portfolio/mrabeh-portfolio/` → mover todo un nivel arriba (elimina la carpeta duplicada), o dejarlo si tú prefieres no tocar la estructura de carpetas por riesgo/tiempo antes del 16 sept (recomiendo aplanar, es mecánico y de bajo riesgo).
- Añadir `.gitignore` (node_modules, dist, .env).
- `public/og-image.png` — crear imagen social real (actualmente referenciada pero no verificada que exista).
- No se añade Next.js, no se añade i18n completo todavía (queda arquitecturado para después del 16 sept, tal como decidiste en agosto).
- `/proyectos/:slug` como ruta dinámica para 1-2 case studies (NEXARO como mínimo) — esto sí es factible antes del deadline y es justo lo que más valor aporta a un reclutador.

## 5. Proposed Homepage (ajustada a MVP + reglas ya fijadas)

Hero: quitar el texto rotatorio "Especialista en Ciberseguridad"; dejar algo verificable tipo "Desarrollador Web en formación (DAW/DAM) · Ciberseguridad en progreso (eJPT) · Automatización con Python". Quitar stats inventados o sustituir por hechos verificables (p.ej. "eJPT y PCAP en progreso" en vez de "Años en tech: 3+"). Mantener la estética terminal/dark actual (ya es sobria, no cae en los clichés que tu prompt prohíbe — nada de Matrix, calaveras, glitch). Sección de proyectos: solo los que confirmes como reales, con estado honesto visible (BUILDING/EXPERIMENT/COMPLETED). CTA de contacto funcional.

## 6. NEEDS_HUMAN — antes de escribir ninguna línea de copy nueva

Ver pregunta en el chat: qué proyectos reales mostrar (más allá de NEXARO) y sus enlaces/estado reales, dominio canónico, y si tienes el PDF del CV.

## 7. Files to Create
- `.gitignore`
- `docs/portfolio-v2/AUDIT.md` (este archivo)
- `docs/portfolio-v2/PROGRESS.md`
- `docs/portfolio-v2/DECISIONS.md`
- `src/pages/projects/[slug]` (case study dinámico) — pendiente de arquitectura exacta
- `public/og-image.png`

## 8. Files to Modify
`src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/CV.tsx`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`, `src/components/{Navbar,Footer,ContactForm,SkillBadge}.tsx`, `index.html`, `public/{sitemap.xml,_headers}`

## 9. Files to Delete / Move
`lab_reverse_shell.py`, `tcp_forward.py` (mover fuera del repo del portfolio, no borrar el trabajo — son código de laboratorio legítimo, solo mal ubicado)

## 10. Implementation Plan (realista para el 16 sept, 9 días)

1. Resolver NEEDS_HUMAN (proyectos reales, dominio, CV) — bloqueante.
2. Hero + Home honestos.
3. `data/projects.ts` con proyectos confirmados.
4. About/Experience/Contact/CV corregidos, formulario arreglado.
5. SEO/metadata + dominio canónico.
6. Higiene de repo (scripts fuera, .gitignore, CSP).
7. 1 case study completo (NEXARO) si hay tiempo.
8. Build, lint, typecheck, verificación responsive, commit por fases en `feat/portfolio-v2` — sin push sin tu aprobación explícita.

Todo lo demás del prompt original (i18n completo, /lab, /writing, rediseño visual completo tipo Linear/Vercel, 20 fases) queda en el roadmap post-DTD, tal como decidiste en agosto.
