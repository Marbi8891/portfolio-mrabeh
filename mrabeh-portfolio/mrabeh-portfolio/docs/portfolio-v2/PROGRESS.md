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
- 8 commits pequeños y semánticos en `feat/portfolio-v2`.

## Pendiente / no tocado
- Los 6 proyectos marcados como no verificables en la auditoría (CLAW Framework, Golytics, Netseer, SYNAPSE/INTEL-LINK, SIGMA43, Calculadora Financiera Pro) — sin cambios, por instrucción explícita tuya (ver `DECISIONS.md` ADR-003). El hallazgo crítico de credibilidad sigue abierto si en algún momento quieres revisarlo.
- CV en PDF: generado por mí, pendiente de tu revisión antes de enviarlo a cualquier empresa.
- `mrabehfathi.com` → confirmar si tienes control del dominio para configurar el 301 hacia `.es` (fuera del repo).
- 1 case study completo de NEXARO en `/proyectos/nexaro` — no implementado por tiempo; queda en el roadmap si sobra margen antes del 16.
- i18n, `/lab`, `/writing`, rediseño visual completo — post-DTD, como decidiste en agosto.
- Aplanar la carpeta anidada `mrabeh-portfolio/mrabeh-portfolio/` — no se tocó (riesgo/beneficio no lo justificaba a 9 días del deadline).

## Bloqueado
Nada bloqueado ahora mismo. Sin push ni despliegue hasta que lo apruebes explícitamente.
