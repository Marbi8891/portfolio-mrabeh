import { Github, FileText, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'

const REPO = 'https://github.com/Marbi8891/owasp-web-auditor'
const linkProps = { target: '_blank', rel: 'noopener noreferrer' } as const

/** One numbered dossier section. Keeps the "01 / LABEL" pattern consistent and gives every section a stable id for in-page anchors. */
function DossierSection({
  number,
  label,
  title,
  children,
}: {
  number: string
  label: string
  title?: string
  children: React.ReactNode
}) {
  return (
    <section id={`sec-${number}`} className="mb-16 scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-accent text-sm tracking-widest">{number}</span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text uppercase tracking-tight">
          {title ?? label}
        </h2>
      </div>
      <div className="space-y-4 text-text-dim leading-relaxed max-w-3xl">{children}</div>
    </section>
  )
}

interface Control {
  control: string
  risk: string
  implementation: string
  evidence: string
}

const controls: Control[] = [
  {
    control: 'SSRF / bloqueo de redes privadas',
    risk: 'Que el escáner sea usado para hacer peticiones desde el servidor hacia direcciones internas (127.0.0.1, 10.0.0.0/8, 169.254.169.254 y equivalentes de metadatos de nube), en vez de auditar únicamente el destino público que el usuario autorizó.',
    implementation: 'Antes de cualquier conexión, cada dirección candidata se clasifica contra rangos IPv4/IPv6 bloqueados (RFC 1918, loopback, link-local, ULA, documentación, multicast, y variantes IPv6-mapeadas/6to4/NAT64 que podrían esconder una IPv4 bloqueada). Si cualquier candidato resuelto está bloqueado, se rechaza toda la resolución.',
    evidence: 'scanner-core/src/target/ip-classify.ts · scanner-core/test/ssrf.test.ts, adversarial-ssrf.test.ts',
  },
  {
    control: 'DNS pinning (anti-rebinding)',
    risk: 'Que un objetivo cambie su respuesta DNS entre el momento en que se valida la IP y el momento en que se conecta realmente (TOCTOU), sirviendo una IP privada solo en el segundo lookup.',
    implementation: 'La resolución se hace una única vez; la dirección validada se fija (pin) mediante un `lookup` a medida que se pasa a `http.request`/`https.request` y que ignora cualquier hostname que Node quiera resolver de nuevo. La conexión TCP nunca hace una segunda resolución independiente.',
    evidence: 'scanner-core/src/http/pinned-lookup.ts · scanner-core/test/dns-rebinding.test.ts',
  },
  {
    control: 'Re-validación de cada salto de redirección',
    risk: 'Que un dominio público autorizado redirija (301/302) hacia una IP privada o hacia un segundo dominio que resuelva a una IP privada, colando una petición SSRF a través de un salto intermedio legítimo.',
    implementation: 'Cada redirección repite el proceso completo de resolución + validación + pinning desde cero, como si fuera un objetivo nuevo. No hay ninguna ruta de red que se salte esta política, incluidas las nuevas capacidades añadidas en versiones posteriores (V1.2-V1.4).',
    evidence: 'scanner-core/src/http/fetch.ts · scanner-core/test/redirect-ssrf.test.ts, redirect-matrix.test.ts',
  },
  {
    control: 'Inspección de certificado TLS',
    risk: 'Presentar como seguro un sitio cuyo certificado es inválido, ha expirado, o usa una clave criptográficamente débil (RSA < 2048 bits, EC < 224 bits).',
    implementation: 'Se captura el certificado del peer (protocolo negociado, tipo y tamaño de clave, cadena) durante el propio handshake TLS ya validado por Node, y dos reglas dedicadas evalúan validez del certificado y fuerza de la clave.',
    evidence: 'scanner-core/src/tls/inspect.ts · security-rules/src/tls/{cert,key-strength}.ts',
  },
  {
    control: 'Fallo cerrado ante errores de red',
    risk: 'Que una comprobación que no pudo ejecutarse (timeout, TLS caído, DNS sin respuesta) se reporte silenciosamente como "sin hallazgos", que un lector interpretaría como "está bien".',
    implementation: 'Cada regla devuelve un estado explícito (EVALUATED / PARTIAL / FAILED / UNKNOWN / NOT_APPLICABLE); un fallo de adquisición nunca se traduce en ausencia de hallazgo, y el estado global del escaneo y la cobertura solo cuentan como "hecho" lo que realmente se evaluó.',
    evidence: 'scanner-core/src/runner/scan.ts (deriveScanStatus) · scoring/src/coverage.ts · scanner-core/test/security-invariants.test.ts',
  },
]

const decisions: { title: string; body: string; documented: boolean }[] = [
  {
    title: 'TypeScript estricto en todo el monorepo',
    body: 'exactOptionalPropertyTypes y noUncheckedIndexedAccess activados en los cinco paquetes (contracts, scanner-core, security-rules, scoring, cli), no solo en el más crítico.',
    documented: false,
  },
  {
    title: 'Una sola política de red, reutilizada, nunca bypaseada',
    body: 'Toda funcionalidad de red nueva (TLS, y más tarde DNS) pasa por la misma resolución segura de target/resolve.ts. No existe una segunda ruta de conexión "rápida" que salte la validación.',
    documented: true,
  },
  {
    title: 'Reglas como funciones puras',
    body: 'Cada regla es (target, observations) → RuleResult: nunca hace I/O de red por sí misma. Esto es lo que permite que las 19 reglas se prueben con fixtures sintéticos, sin red real y con resultados deterministas.',
    documented: true,
  },
  {
    title: 'Estados de evaluación explícitos, no booleanos',
    body: 'EVALUATED/PARTIAL/FAILED/UNKNOWN/NOT_APPLICABLE en vez de un simple pass/fail, para que un fallo de red nunca se confunda con "todo correcto".',
    documented: true,
  },
  {
    title: 'Códigos de salida de CLI como contrato estable',
    body: '0 completado sin hallazgo HIGH/CRITICAL con confianza HIGH/MEDIUM · 1 hallazgo de ese tipo presente · 2 entrada inválida · 3 fallo de red/escáner. Pensado para integrarse en CI sin parsear el texto de salida.',
    documented: true,
  },
]

const ruleGroups: { category: string; count: number; rules: string[] }[] = [
  {
    category: 'TRANSPORT',
    count: 4,
    rules: [
      'WEB-HTTPS-001 · redirección forzada a HTTPS',
      'WEB-HSTS-001 · presencia de HSTS',
      'WEB-HSTS-002 · profundidad de HSTS (max-age, includeSubDomains, preload)',
      'WEB-REDIRECT-001 · calidad de la cadena de redirecciones',
    ],
  },
  {
    category: 'TLS',
    count: 2,
    rules: ['TLS-CERT-001 · validez del certificado', 'TLS-KEY-001 · fuerza de la clave del certificado'],
  },
  {
    category: 'HEADERS',
    count: 12,
    rules: [
      'WEB-CSP-001/002/003 · presencia, script-src inseguro, otras directivas',
      'WEB-NOSNIFF-001 · X-Content-Type-Options',
      'WEB-REFERRER-001 · Referrer-Policy',
      'WEB-PERMISSIONS-001 · Permissions-Policy',
      'WEB-FRAME-001 · protección contra framing',
      'WEB-COOKIES-001 · atributos de seguridad de cookies',
      'WEB-CORP-001 / WEB-COOP-001 / WEB-COEP-001 · aislamiento cross-origin',
      'WEB-CORS-001 · postura CORS básica',
    ],
  },
  {
    category: 'DNS',
    count: 1,
    rules: ['DNS-CAA-001 · presencia de registro CAA (con escalado a dominio registrable, RFC 8659)'],
  },
]

const testCategories: { label: string; detail: string }[] = [
  { label: 'Reglas (golden fixtures)', detail: '19 archivos, uno por regla — comportamiento esperado contra observaciones sintéticas fijas.' },
  { label: 'Adversarial / SSRF', detail: 'ssrf, adversarial-ssrf, redirect-ssrf, redirect-matrix, dns-rebinding — intentos deliberados de colar un destino privado.' },
  { label: 'Property-based & fuzzing', detail: 'property-ip-classify, property-score, property-fingerprint, fuzz-cookies, fuzz-csp, fuzz-header-parsers — invariantes sobre entradas generadas, no solo casos elegidos a mano.' },
  { label: 'Límites de recursos', detail: 'resource-exhaustion, cancellation, concurrency, determinism — qué pasa cuando el objetivo es lento, se cancela o se escanea dos veces.' },
  { label: 'CLI e integración', detail: 'args, e2e-stdio, external-consumer, format, scan-integration, cookies-integration, dns-caa-integration.' },
  { label: 'Scoring', detail: 'coverage, score, property-score — que la puntuación 0-100 sea determinista y que la cobertura nunca mienta sobre lo que realmente se evaluó.' },
]

const architectureSteps = [
  { label: 'TARGET URL', detail: 'URL o hostname proporcionado por el usuario' },
  { label: 'VALIDACIÓN Y RESOLUCIÓN SEGURA', detail: 'DNS + política SSRF (target/resolve.ts)' },
  { label: 'ADQUISICIÓN', detail: 'HTTP, TLS y DNS (observaciones crudas, sin evaluar)' },
  { label: 'EVALUACIÓN DE REGLAS', detail: '19 reglas puras: (target, observations) → RuleResult' },
  { label: 'HALLAZGOS', detail: 'Findings normalizados con severidad y confianza' },
  { label: 'PUNTUACIÓN', detail: 'Score 0-100 determinista + cobertura real' },
  { label: 'SALIDA', detail: 'CLI humano o JSON estable, versionado' },
]

export default function OwaspWebAuditor() {
  return (
    <article className="pt-24 pb-24">
      <Seo
        title="OWASP Web Auditor · TypeScript & Seguridad Web"
        description="Caso de estudio: escáner pasivo de postura de seguridad web en TypeScript, con 19 reglas, 492 tests y protección SSRF/DNS-rebinding verificable en un repositorio público bajo licencia MIT."
        path="/proyectos/owasp-web-auditor"
        jsonLd={{
          '@type': 'SoftwareSourceCode',
          name: 'OWASP Web Auditor',
          description:
            'Escáner pasivo, determinista y verificable de postura de seguridad web (HTTPS, cabeceras, cookies, CSP, HSTS, TLS y DNS), escrito en TypeScript.',
          codeRepository: REPO,
          license: 'https://opensource.org/licenses/MIT',
          programmingLanguage: 'TypeScript',
          author: { '@type': 'Person', name: 'Mrabeh Fathi Boussayff', url: 'https://mrabehfathi.com/' },
        }}
      />

      <div className="section-container max-w-3xl">
        {/* ── Dossier header ── */}
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8 font-mono"
        >
          <ArrowLeft size={14} />
          Todos los proyectos
        </Link>

        <p className="font-mono text-accent text-sm mb-3 tracking-widest">CASE 01 / SELECTED WORK</p>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-text mb-4 leading-tight text-balance">
          OWASP WEB AUDITOR
        </h1>
        <p className="text-text-dim text-lg leading-relaxed mb-8 max-w-2xl">
          Herramienta defensiva de auditoría de seguridad web: analiza controles y configuraciones de seguridad de
          aplicaciones web de forma pasiva, sin enviar payloads ni explotar nada.
        </p>

        {/* Meta grid */}
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 card-glass rounded-xl p-5 mb-6 font-mono text-sm">
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Status</dt>
            <dd className="text-accent-green flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" aria-hidden="true" />
              Activo · V1.4.1
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Type</dt>
            <dd className="text-text-dim">Security-aware development</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Role</dt>
            <dd className="text-text-dim">Proyecto personal</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Repository</dt>
            <dd>
              <a href={REPO} {...linkProps} className="text-accent hover:text-accent-dim break-all">
                github.com/Marbi8891/owasp-web-auditor
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">License</dt>
            <dd className="text-text-dim">MIT</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Evidence</dt>
            <dd className="text-text-dim">19 reglas · 492 tests</dd>
          </div>
        </dl>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          <a href={REPO} {...linkProps} className="btn-primary">
            <Github size={16} />
            Ver código fuente
            <ExternalLink size={14} />
          </a>
          <a href={`${REPO}/blob/main/README.md`} {...linkProps} className="btn-outline">
            <FileText size={16} />
            README
          </a>
          <span className="tag" title="Licencia MIT — código público, se puede inspeccionar y reutilizar">
            MIT Licensed
          </span>
        </div>

        {/* ── 01 PROBLEM ── */}
        <DossierSection number="01" label="Problem">
          <p>
            Comprobar a mano los controles básicos de seguridad de un sitio web — HTTPS forzado, cabeceras de
            seguridad, cookies bien configuradas, CSP, HSTS, un certificado TLS válido, registros DNS correctos —
            es repetitivo y fácil de hacer de forma incompleta. La mayoría de escáneres gratuitos existentes listan
            cabeceras faltantes sin explicar qué prueba exactamente cada comprobación, ni qué pasa cuando la propia
            comprobación falla por un problema de red.
          </p>
          <p>
            OWASP Web Auditor nace para resolver eso de forma honesta: automatizar únicamente comprobaciones pasivas
            y verificables, y que un fallo de red nunca se disfrace de "todo correcto".
          </p>
        </DossierSection>

        {/* ── 02 SOLUTION ── */}
        <DossierSection number="02" label="Solution">
          <p>
            Un escáner de línea de comandos escrito en TypeScript que recibe una URL, resuelve y valida su destino de
            forma segura, analiza la respuesta HTTP raíz, la cadena de redirecciones, las cabeceras de respuesta, el
            certificado TLS y los registros DNS relevantes, y evalúa esas observaciones contra 19 reglas alineadas
            con OWASP. El resultado es un JSON estable y versionado (o un informe legible en texto) con hallazgos
            explícitos por severidad y confianza, y una puntuación 0-100 desglosada, nunca una caja negra.
          </p>
          <p>
            Deliberadamente <strong className="text-text">no</strong> es una herramienta de pentesting: no envía
            payloads, no hace fuerza bruta, no intenta explotar nada. Solo observa lo que el servidor ya expone.
          </p>
        </DossierSection>

        {/* ── 03 ENGINEERING ── */}
        <DossierSection number="03" label="Engineering">
          <p>Decisiones reales, verificables en el propio código:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Monorepo con cinco paquetes de responsabilidad única (<code>contracts</code>, <code>scanner-core</code>,
              {' '}<code>security-rules</code>, <code>scoring</code>, <code>apps/cli</code>) y una dependencia en un
              solo sentido: <code>cli → scanner-core → {'{'}security-rules, scoring{'}'} → contracts</code>.
            </li>
            <li>
              Pipeline estrictamente secuencial: adquisición → observaciones → evaluación de reglas → hallazgos →
              puntuación → salida. Cada regla es una función pura, sin I/O propio.
            </li>
            <li>
              CLI con dos formatos de salida (<code>--format human|json</code>) y contrato de código de salida
              documentado (0/1/2/3) para poder integrarse en scripts o CI sin parsear texto libre.
            </li>
            <li>
              Escritura de fichero de salida atómica (<code>--output</code>): se escribe a un archivo temporal y se
              renombra, para que un lector nunca vea un informe a medio escribir.
            </li>
            <li>
              Manejo de errores en capas: cada acquisición devuelve un tipo de error explícito
              (<code>NetworkAcquisitionError</code>, <code>BlockedTargetError</code>...) que la CLI traduce a un
              mensaje limpio, nunca a una traza interna cruda.
            </li>
            <li>
              Fingerprint determinista por hallazgo (<code>computeFingerprint(ruleId, scope, discriminator)</code>)
              para que el mismo problema, en el mismo objetivo, produzca siempre el mismo identificador entre
              escaneos.
            </li>
          </ul>
        </DossierSection>

        {/* ── 04 SECURITY MODEL ── */}
        <DossierSection number="04" label="Security Model">
          <p className="mb-2">
            Los controles reales implementados y verificables — no una lista genérica de OWASP:
          </p>
          <div className="space-y-4">
            {controls.map((c) => (
              <div key={c.control} className="card-glass rounded-xl p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Control</p>
                <h3 className="font-display font-semibold text-text mb-3">{c.control}</h3>
                <div className="grid sm:grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted pt-0.5">Risk</span>
                  <p className="text-text-dim m-0">{c.risk}</p>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted pt-0.5">Implementation</span>
                  <p className="text-text-dim m-0">{c.implementation}</p>
                  <span className="font-mono text-xs uppercase tracking-widest text-text-muted pt-0.5">Evidence</span>
                  <p className="font-mono text-xs text-accent-dim m-0 break-all">{c.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </DossierSection>

        {/* ── 05 RULES ── */}
        <DossierSection number="05" label="Rules">
          <p>19 reglas activas (ruleset v1.4.0), agrupadas por categoría:</p>
          <div className="space-y-5">
            {ruleGroups.map((g) => (
              <div key={g.category}>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                  {g.category} <span className="text-text-muted">· {g.count}</span>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-text-dim">
                  {g.rules.map((r) => (
                    <li key={r} className="font-mono text-xs sm:text-sm">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DossierSection>

        {/* ── 06 TESTING ── */}
        <DossierSection number="06" label="Testing">
          <p>
            <span className="font-display font-black text-2xl text-text align-middle">492</span>{' '}
            <span className="text-text-dim">tests, en 55 archivos, todos deterministas y sin depender de red real.</span>
          </p>
          <p>
            Escribir el código fue la mitad del trabajo; la otra mitad fue decidir cómo comprobarlo. Por eso el
            grueso de los tests no son "casos felices" sino intentos deliberados de romper las garantías de
            seguridad: SSRF adversarial, DNS rebinding, redirecciones a IPs privadas, agotamiento de recursos,
            entradas generadas por fuzzing.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {testCategories.map((t) => (
              <div key={t.label} className="card-glass rounded-lg p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">{t.label}</p>
                <p className="text-sm text-text-dim m-0">{t.detail}</p>
              </div>
            ))}
          </div>
        </DossierSection>

        {/* ── 07 EVIDENCE ── */}
        <DossierSection number="07" label="Evidence">
          <div className="grid sm:grid-cols-3 gap-3">
            <a href={REPO} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <Github size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">VIEW SOURCE →</p>
              <p className="text-xs text-text-muted m-0">GitHub</p>
            </a>
            <a href={`${REPO}/blob/main/LICENSE`} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <FileText size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">LICENSE →</p>
              <p className="text-xs text-text-muted m-0">MIT</p>
            </a>
            <a href={`${REPO}/blob/main/README.md`} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <FileText size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">README →</p>
              <p className="text-xs text-text-muted m-0">GitHub README</p>
            </a>
          </div>
          <p className="text-sm text-text-muted mt-4">
            No hay demo web pública — es una herramienta de línea de comandos. El repositorio incluye la salida de
            ejemplo (JSON y texto) en su documentación.
          </p>
        </DossierSection>

        {/* ── 08 ARCHITECTURE ── */}
        <DossierSection number="08" label="Architecture">
          <p>El pipeline real, tal como está implementado (no un diagrama genérico de seguridad):</p>
          <ol className="flex flex-col gap-0 max-w-md" aria-label="Pipeline de OWASP Web Auditor, en orden">
            {architectureSteps.map((step, i) => (
              <li key={step.label} className="flex flex-col">
                <div className="card-glass rounded-lg px-4 py-3 border-l-2" style={{ borderLeftColor: '#00d4ff' }}>
                  <p className="font-mono text-xs text-accent mb-0.5">{String(i + 1).padStart(2, '0')}</p>
                  <p className="font-display font-semibold text-sm text-text">{step.label}</p>
                  <p className="text-xs text-text-muted m-0">{step.detail}</p>
                </div>
                {i < architectureSteps.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden="true">
                    <ArrowRight size={14} className="text-border-bright rotate-90" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </DossierSection>

        {/* ── 09 TECHNICAL DECISIONS ── */}
        <DossierSection number="09" label="Technical Decisions">
          <div className="space-y-4">
            {decisions.map((d, i) => (
              <div key={d.title} className="card-glass rounded-xl p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                  Decision {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display font-semibold text-text mb-2">{d.title}</h3>
                <p className="text-sm text-text-dim mb-2">{d.body}</p>
                <p className="text-xs font-mono text-text-muted m-0">
                  Motivación: {d.documented ? 'documentada en el propio repositorio' : 'no documentada más allá de lo observable en el código'}
                </p>
              </div>
            ))}
          </div>
        </DossierSection>

        {/* ── 10 LIMITATIONS ── */}
        <DossierSection number="10" label="Limitations">
          <ul className="list-disc pl-5 space-y-2">
            <li>No sustituye una auditoría de seguridad manual ni un pentest.</li>
            <li>
              Alcance limitado a controles concretos y pasivos (transporte, cabeceras, TLS, DNS) — no es un
              vulnerability scanner completo ni cubre lógica de negocio, autenticación o autorización.
            </li>
            <li>No analiza JavaScript ejecutado en el navegador ni contenido dinámico renderizado en cliente.</li>
            <li>No hace descubrimiento activo de subdominios ni prueba credenciales.</li>
            <li>El ruleset está deliberadamente acotado (objetivo 40-60 reglas) para mantener una tasa baja de falsos positivos, no para maximizar el número de hallazgos.</li>
          </ul>
        </DossierSection>

        {/* ── 11 NEXT ITERATION ── */}
        <DossierSection number="11" label="Next Iteration">
          <p>
            El repositorio mantiene un backlog público (<code>BACKLOG.md</code>) con el roadmap real, no aspiracional:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Postura de correo (SPF, DMARC, DKIM, MTA-STS)</li>
            <li>Superficie HTML/navegador (contenido mixto, Subresource Integrity)</li>
            <li>Certificate Transparency para descubrimiento de subdominios (nunca auto-escaneo sin autorización)</li>
            <li>Motor de remediación específico por tecnología</li>
            <li>Motor de baseline/diff entre escaneos</li>
          </ul>
        </DossierSection>

        <div className="pt-8 border-t border-border">
          <Link to="/proyectos" className="btn-outline inline-flex">
            <ArrowLeft size={16} />
            Volver a proyectos
          </Link>
        </div>
      </div>
    </article>
  )
}
