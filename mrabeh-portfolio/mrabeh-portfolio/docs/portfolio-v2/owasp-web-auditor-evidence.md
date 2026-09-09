# Evidence — OWASP Web Auditor case study

Cada afirmación usada en la home y en `/proyectos/owasp-web-auditor` (case study
CASE 01), verificada contra el repositorio real
[`github.com/Marbi8891/owasp-web-auditor`](https://github.com/Marbi8891/owasp-web-auditor)
en el momento de escribir este documento (2026-09-09). "SAFE TO DISPLAY" es
"YES" solo cuando la afirmación se comprobó directamente contra código,
tests o commits reales — no contra memoria de conversación ni contra lo que
el prompt original asumía.

| # | CLAIM | EVIDENCE | SOURCE | SAFE TO DISPLAY |
|---|---|---|---|---|
| 1 | 19 reglas de seguridad activas | Array `RULESET` con 19 entradas | `packages/security-rules/src/index.ts` (leído directamente, contado) | YES |
| 2 | 492 tests, 55 archivos | Ejecución real de `pnpm test` | Salida de Vitest: "Test Files 55 passed (55) / Tests 492 passed (492)", 2026-09-09 | YES |
| 3 | `RULESET_VERSION` = 1.4.0 | Constante exportada | `packages/security-rules/src/index.ts:66` | YES |
| 4 | Licencia MIT, repositorio público | Archivo `LICENSE` en la raíz + repo con visibilidad pública | Commit `94bd5b4` (este mismo proyecto) + `github.com/Marbi8891/owasp-web-auditor` | YES |
| 5 | Los 19 IDs de regla y su categoría/severidad mostrados en la sección RULES | `grep` de `RULE_ID`/`category`/`severity` en cada archivo de `packages/security-rules/src/**` | Archivos fuente individuales (ver lista completa en el propio case study) | YES |
| 6 | Bloqueo de SSRF contra rangos privados/loopback/link-local/metadatos de nube, incluidas variantes IPv6-mapeadas | Rangos `IPV4_BLOCKED_RANGES` + lógica IPv6 completa | `packages/scanner-core/src/target/ip-classify.ts` | YES |
| 7 | DNS pinning para evitar rebinding (TOCTOU) | `pinnedLookup()` fuerza la dirección ya validada en la conexión TCP | `packages/scanner-core/src/http/pinned-lookup.ts` + doc-comment de `resolveSafely()` en `target/resolve.ts` | YES |
| 8 | Cada redirección se re-valida desde cero | `resolveSafely()` se llama de nuevo en cada iteración del bucle de redirecciones | `packages/scanner-core/src/http/fetch.ts` (línea con la llamada dentro del `while`) | YES |
| 9 | Inspección de certificado TLS (protocolo, tipo/tamaño de clave) | Captura en el propio handshake TLS | `packages/scanner-core/src/tls/inspect.ts` + reglas `tls/cert.ts`, `tls/key-strength.ts` | YES |
| 10 | Un fallo de red nunca se convierte en "sin hallazgos" (fail-closed) | `deriveScanStatus`/`computeCoverage` exigen al menos una evaluación genuina antes de contar NOT_APPLICABLE | `packages/scanner-core/src/runner/scan.ts`, `packages/scoring/src/coverage.ts` — con test de regresión explícito | YES |
| 11 | Contrato de códigos de salida de CLI (0/1/2/3) | Doc-comment "Exit code contract (spec #41...)" | `apps/cli/src/index.ts:10-22` | YES |
| 12 | "Passive only, no exploitation" / nunca envía payloads | Sección `## Passive only, no exploitation` | `docs/SECURITY_MODEL.md:7-10` | YES |
| 13 | Roadmap real (correo, superficie HTML, Certificate Transparency, remediación, baseline/diff) | Lista estructurada por versión | `docs/BACKLOG.md` (secciones "Email posture", "HTML/browser-surface", "Certificate Transparency", "Remediation engine", "Baseline/diff engine") | YES |
| 14 | No existe demo web pública | Ausencia de cualquier URL de demo en `README.md`, `docs/*.md` o `data/projects.ts` del portafolio | Búsqueda directa, ningún resultado | YES |
| 15 | No hay releases ni tags de GitHub todavía | `git tag -l` sin salida | Repositorio real, comprobado 2026-09-09 | YES |
| 16 | Categorías de test (golden, adversarial/SSRF, property-based/fuzzing, límites de recursos, CLI, scoring) | Listado de los 55 archivos `*.test.ts` agrupado por convención de nombre | `find . -name "*.test.ts"` sobre el repo real | YES |
| 17 | Estado "Activo" (no solo "completado" o "en pausa") | Último commit el mismo día que se escribe este documento, historial continuo desde V1.1 hasta V1.4.1 | `git log` del repositorio | YES |
| 18 | Dominio canónico del portafolio (`mrabehfathi.com`) usado en el `<Seo>` del case study | El `<link rel="canonical">` y el JSON-LD `Person.url` del sitio en producción real usan `.com`; ADR-002 (que decía `.es`) queda corregido por ADR-007 | `docs/portfolio-v2/DECISIONS.md` ADR-007 (2026-09-09), verificado contra el propio deploy de producción | YES |
| 19 | "TypeScript estricto en las cinco paquetes" (Technical Decision 01) | `exactOptionalPropertyTypes`/`noUncheckedIndexedAccess` en los `tsconfig.json` de cada paquete | Sesión de desarrollo previa (leído en su momento); **no re-verificado archivo por archivo en esta pasada** | NO — marcado en el case study como "motivación no documentada"; recomendado volver a comprobar los 5 `tsconfig.json` antes de citar esto en una entrevista |

## Nota sobre el punto 19

Es la única fila que no llega al mismo nivel de verificación que el resto:
se basa en conocimiento de sesiones anteriores de trabajo sobre ese repositorio,
no en una relectura línea por línea de esta pasada. El case study ya lo trata
como observación de código, no como afirmación de intención ("motivación no
documentada"), pero si se va a defender en una entrevista técnica, conviene
re-abrir los 5 `tsconfig.json` y confirmarlo de nuevo antes.

## Qué NO se afirma en el case study (a propósito)

- No se dice "production-ready", "enterprise-grade" ni "industry-leading" —
  ninguna evidencia objetiva lo justifica todavía (sin usuarios externos,
  sin SLA, sin releases).
- No se dice "penetration testing" ni "pentester" — el propio repositorio se
  define como herramienta pasiva, no ofensiva.
- No se muestran ratings, descargas ni número de usuarios — no existen.
