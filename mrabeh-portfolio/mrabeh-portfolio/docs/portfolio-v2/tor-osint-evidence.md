# Evidence — tor-osint case study

Cada afirmación usada en `/proyectos/tor-osint` (CASE 02) y en su tarjeta de
`data/projects.ts`, verificada contra el código real de
[`Marbi8891/tor-osint`](https://github.com/Marbi8891/tor-osint)
(extraído de este repositorio con su historial, ver ADR-009; 2026-10-08). Las rutas de la
columna SOURCE son relativas a ese repositorio. "SAFE TO DISPLAY" es "YES" solo cuando
la afirmación se comprobó ejecutando o leyendo el código, no de memoria.

| # | CLAIM | EVIDENCE | SOURCE | SAFE TO DISPLAY |
|---|---|---|---|---|
| 1 | 245 tests | `pytest` completo | Salida "245 passed" con Python 3.10, 3.12 y 3.13 (entornos `uv`), 2026-10-08 | YES |
| 2 | CI en Python 3.10–3.13 y prueba de extremo a extremo con Docker contra la red Tor real | Run de GitHub Actions en verde: 4 jobs de tests + job «Docker + Tor real» (build de imágenes, bootstrap de Tor al 100 %, `tor-check` IsTor=True, crawl de la onion oficial de The Tor Project, informe, STIX, `verify`, web solo en loopback) | `Marbi8891/tor-osint`, run 37734513252 (commit `fd1459f`), 2026-10-08 | YES |
| 3 | 13 tipos de IOC | Tupla `IOC_TYPES` | `src/tor_osint/ioc.py` (contada: email, domain, url, ipv4, md5, sha1, sha256, cve, onion, btc, eth, attack, pgp) | YES |
| 4 | 2 dependencias de ejecución | `dependencies` | `pyproject.toml`: `requests[socks]`, `beautifulsoup4` | YES |
| 5 | Licencia MIT, repositorio público | `LICENSE` + visibilidad | `LICENSE`; repo `Marbi8891/tor-osint` público con el código subido (consultado vía API de GitHub, 2026-10-08) | YES |
| 6 | socks5h, ignora `HTTP(S)_PROXY`, redirecciones manuales (máx. 5, solo .onion, bucles) | `build_session`, `TorClient.fetch` | `src/tor_osint/tor.py` · `tests/test_tor.py` | YES |
| 7 | Checksum SHA3-256 de onion v3 | `onion_version()` | `src/tor_osint/sources.py` · test con la onion oficial de torproject.org | YES |
| 8 | HTML sin JavaScript, informe escapado con CSP, frontend con `textContent`, test que falla con `innerHTML` | `parser.py`, `report.py`, `test_frontend_never_injects_html` | `src/tor_osint/` · `tests/test_web.py` | YES |
| 9 | Redacción de credenciales antes de guardar (lista de formatos) | `_PATTERNS` | `src/tor_osint/redact.py` · `tests/test_redact.py` | YES |
| 10 | Web solo loopback, Host, CSRF + Origin + JSON, CSP sin `unsafe-inline`, doble confirmación en Docker | `make_server`, `_read_json`, `APP_CSP` | `src/tor_osint/web.py` · `tests/test_web.py` | YES |
| 11 | Manifiesto SHA-256 y `verify` | `record_artifact`, `verify_manifest` | `src/tor_osint/custody.py` · `tests/test_interop_custody.py` | YES |
| 12 | Bundle STIX 2.1 validado con la librería oficial de OASIS | `stix2.parse(..., allow_custom=False)` + `stix2patterns` | `tests/test_interop_custody.py` | YES |
| 13 | Vectores oficiales EIP-55, BIP-173, BIP-350, Keccak-256 | Tests con los vectores | `tests/test_crypto.py` | YES |
| 14 | Umbral SimHash calibrado (p95 ≤ 13 bits casi duplicados, ≥ 20 ajenos, shingles de 3) | Experimento con texto Zipf sintético (150 pares por tamaño) | Medición en la sesión de desarrollo; umbral y justificación en `dedup.py` (`DEFAULT_NEAR_DISTANCE`) | YES |
| 15 | "Varios tests se comprobaron rompiendo el código a propósito" | Mutaciones manuales (filtro de dominios, redacción, migración FTS, dedup de alertas, timestamps STIX, `innerHTML`) que hicieron fallar los tests correspondientes | Sesión de desarrollo (no automatizado en el repo) | YES, redactado como "durante el desarrollo" |
| 16 | Capturas de la interfaz | Generadas con la interfaz real y datos de prueba ficticios | `public/images/tor-osint/*.webp`; el pie de foto lo indica | YES |
| 17 | Verificado contra la red Tor real | Ver fila 2. Antes de eso solo había tests con HTTP simulado (el entorno de desarrollo bloqueaba Tor y `deb.debian.org`) | Run 37734513252 | YES |
| 18 | Estado "Activo" | La verificación de la fila 17 era la condición puesta en ADR-008; ver ADR-010 | `docs/portfolio-v2/DECISIONS.md` | YES |
| 19 | Timeout por defecto subido de 30 a 60 s por un fallo real | Primer run contra Tor real: `IsTor: True` pero `ConnectTimeout` a los 30 s en la primera conexión a la onion; con 60/120 s el crawl pasa | Runs 37734288098 (fallo) y 37734513252 (verde); commit `fd1459f` | YES |
