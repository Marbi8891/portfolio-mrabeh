import { Github, FileText, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '@/components/Seo'

const REPO = 'https://github.com/Marbi8891/tor-osint'
const BLOB = 'https://github.com/Marbi8891/tor-osint/blob/main'
const linkProps = { target: '_blank', rel: 'noopener noreferrer' } as const

/** One numbered dossier section, same pattern as CASE 01. */
function DossierSection({
  number,
  label,
  children,
}: {
  number: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section id={`sec-${number}`} className="mb-16 scroll-mt-24">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-accent text-sm tracking-widest">{number}</span>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-text uppercase tracking-tight">{label}</h2>
      </div>
      <div className="space-y-4 text-text-dim leading-relaxed max-w-3xl">{children}</div>
    </section>
  )
}

const notDone = [
  'No descubre servicios .onion ni hace crawling recursivo: solo consulta las fuentes que el analista escribe en data/sources.txt, una petición por fuente.',
  'No sigue enlaces: los .onion encontrados se registran y el analista decide si añadirlos.',
  'No inicia sesión, no rellena formularios, no compra ni interactúa con servicios.',
  'No ejecuta JavaScript ni guarda ficheros descargados (salvo HTML de evidencia, opcional y explícito).',
  'No consulta servicios externos de forma automática (el enriquecimiento CVSS usa un fichero de NVD descargado a mano).',
]

interface Control {
  control: string
  risk: string
  implementation: string
  evidence: string
}

const controls: Control[] = [
  {
    control: 'Todo el tráfico por Tor, con DNS remoto',
    risk: 'Fugas de DNS o de tráfico fuera de Tor por variables de entorno del sistema o por redirecciones.',
    implementation:
      'Sesión HTTP con proxy socks5h:// (resolución dentro de Tor) que ignora HTTP(S)_PROXY del entorno. Las redirecciones se siguen a mano: máximo 5, con detección de bucles y solo hacia URLs .onion válidas; nunca a clearnet.',
    evidence: 'src/tor_osint/tor.py · tests/test_tor.py',
  },
  {
    control: 'Validación real de direcciones onion v3',
    risk: 'Aceptar como fuente una cadena con forma de .onion que no lo es (errores de copia o URLs manipuladas).',
    implementation:
      'Además de longitud y alfabeto base32, se verifica el checksum SHA3-256 y el byte de versión de la especificación rend-spec-v3; se rechazan credenciales embebidas en la URL.',
    evidence: 'src/tor_osint/sources.py · tests/test_sources.py',
  },
  {
    control: 'Contenido remoto tratado como no confiable',
    risk: 'XSS en el informe o en la interfaz a partir de títulos o texto de páginas, o ejecución de contenido descargado.',
    implementation:
      'Solo text/html y text/plain, con límite de bytes y de tiempo. HTML parseado sin JavaScript; informe con html.escape y CSP default-src none; la interfaz pinta siempre con textContent y un test falla si alguien introduce innerHTML.',
    evidence: 'src/tor_osint/parser.py, report.py, static/*.js · tests/test_web.py',
  },
  {
    control: 'No almacenar credenciales encontradas',
    risk: 'Que la base de datos, las exportaciones o el informe acaben conteniendo contraseñas, tokens o claves privadas filtradas.',
    implementation:
      'Antes de guardar nada se redactan combos email:password, pares password=/token=/api_key=, Bearer, credenciales en URLs, claves PEM, claves AWS y tokens de GitHub, Slack, Google, Stripe y JWT.',
    evidence: 'src/tor_osint/redact.py · tests/test_redact.py',
  },
  {
    control: 'Interfaz web local endurecida',
    risk: 'Que otra web abierta en el navegador use la interfaz local (CSRF, DNS rebinding) o que quede expuesta en la red.',
    implementation:
      'Solo loopback; validación de la cabecera Host; token CSRF por ejecución + Origin + Content-Type JSON en cada POST; CSP sin unsafe-inline; en Docker, doble confirmación y puerto publicado solo en 127.0.0.1.',
    evidence: 'src/tor_osint/web.py · tests/test_web.py',
  },
  {
    control: 'Cadena de custodia de las evidencias',
    risk: 'No poder demostrar que una exportación o un informe no se ha modificado después de generarse.',
    implementation:
      'Cada exportación e informe se registra con su SHA-256, tamaño, usuario y versión en un manifiesto; tor-osint verify detecta ficheros alterados o eliminados; las acciones quedan en un registro de auditoría.',
    evidence: 'src/tor_osint/custody.py · tests/test_interop_custody.py',
  },
]

const capabilities: { label: string; detail: string }[] = [
  { label: 'IOCs (13 tipos)', detail: 'Emails, dominios, URLs, IPv4, MD5/SHA-1/SHA-256, CVE, onion, Bitcoin, Ethereum, MITRE ATT&CK y huellas PGP, normalizados y con filtros de falsos positivos.' },
  { label: 'Historial y cambios', detail: 'Cada crawl guarda una versión; diff por palabras, cambios de estado, título e IOCs entre versiones.' },
  { label: 'Watchlist y alertas', detail: 'Términos e IOCs vigilados; una alerta por versión de contenido, sin repetirse si la página no cambia.' },
  { label: 'Búsqueda', detail: 'Texto completo con SQLite FTS5 (BM25, prefijos, sin tildes, resaltado), literal y regex sobre datos locales.' },
  { label: 'Correlación', detail: 'related <valor>, grafo página ↔ IOC y casi duplicados por SimHash, además de duplicados exactos por SHA-256.' },
  { label: 'Exportación', detail: 'JSON, CSV (anti CSV injection), STIX 2.1 y MISP, más un informe HTML autocontenido.' },
]

const testCategories: { label: string; detail: string }[] = [
  { label: 'Extractores y normalización', detail: 'Cada tipo de IOC con sus falsos positivos evidentes: logo@2x.png, index.html, 1.2.3.4.5, hashes de solo dígitos…' },
  { label: 'Vectores oficiales', detail: 'Onion v3 de The Tor Project, EIP-55, BIP-173/BIP-350 y Keccak-256 contra el vector conocido y contra hashlib.' },
  { label: 'Conformidad STIX 2.1', detail: 'El bundle se valida con la librería oficial de OASIS (stix2) y sus patrones con stix2-patterns.' },
  { label: 'Seguridad web', detail: 'Servidor real en un puerto libre: loopback, Host, CSRF, Origin, CSP, lista blanca de estáticos.' },
  { label: 'Datos y migraciones', detail: 'Historial, FTS5 sincronizado por triggers y migración real desde una base de datos v2.' },
  { label: 'Sin red', detail: 'Todo con HTTP simulado: ningún test necesita Tor ni acceso a internet.' },
]

const architectureSteps = [
  { label: 'FUENTES EXPLÍCITAS', detail: 'sources.txt o --url, validadas (checksum onion v3)' },
  { label: 'CLIENTE TOR', detail: 'socks5h, límites, rate limiting, redirecciones solo .onion' },
  { label: 'PARSEO', detail: 'Título, texto y enlaces; sin JavaScript' },
  { label: 'REDACCIÓN', detail: 'Credenciales y secretos eliminados antes de guardar' },
  { label: 'IOCs + HASH', detail: '13 tipos normalizados · SHA-256 y SimHash del texto' },
  { label: 'SQLITE', detail: 'Páginas, versiones, IOCs, FTS5, watchlist, notas, auditoría' },
  { label: 'ANÁLISIS Y SALIDA', detail: 'CLI, interfaz web local, informe, JSON/CSV/STIX/MISP' },
]

const decisions: { title: string; body: string }[] = [
  {
    title: 'Sin dependencias innecesarias',
    body: 'Dos dependencias de ejecución (requests[socks] y beautifulsoup4). La interfaz web usa http.server de la biblioteca estándar y JavaScript sin frameworks; STIX 2.1, Keccak-256 y Bech32 están implementados y verificados contra referencias externas en vez de añadir librerías.',
  },
  {
    title: 'Redactar antes de extraer y de calcular hashes',
    body: 'El orden parseo → redacción → IOCs/hash garantiza que ningún secreto llegue a la base de datos, a los IOCs exportados ni al hash que se publica como huella de la evidencia.',
  },
  {
    title: 'Umbral de SimHash medido, no supuesto',
    body: 'Se probaron shingles de 1, 2 y 3 palabras con texto sintético con distribución de Zipf: solo 3 separa casi duplicados (p95 ≤ 13 bits) de textos ajenos (≥ 20 bits). Con páginas de menos de ~50 palabras no es fiable, y así se documenta.',
  },
  {
    title: 'Alertas por versión de contenido',
    body: 'La clave única (vigilancia, página, hash) evita que un crawl periódico repita alertas de una página que no ha cambiado, sin perder las de una página que cambia y sigue coincidiendo.',
  },
]

const figures = [
  {
    src: '/images/tor-osint/grafo-correlacion.webp',
    alt: 'Interfaz de tor-osint: grafo de correlación con páginas (cuadrados) e indicadores (círculos de colores) unidos por líneas.',
    caption: 'Grafo de correlación página ↔ IOC (datos de prueba ficticios).',
    width: 1280,
    height: 860,
  },
  {
    src: '/images/tor-osint/diff-cambios.webp',
    alt: 'Interfaz de tor-osint: diferencias entre dos versiones de una página, con texto añadido e IOCs nuevos.',
    caption: 'Diff entre dos crawls: texto añadido e IOCs nuevos (datos de prueba ficticios).',
    width: 1280,
    height: 780,
  },
]

export default function TorOsint() {
  return (
    <article className="pt-24 pb-24">
      <Seo
        title="tor-osint · Plataforma local de investigación OSINT"
        description="Caso de estudio: plataforma local de investigación OSINT sobre fuentes .onion definidas explícitamente, con extracción de IOCs, historial de cambios, correlación, STIX 2.1 y cadena de custodia. Python, 245 tests, MIT."
        path="/proyectos/tor-osint"
        jsonLd={{
          '@type': 'SoftwareSourceCode',
          name: 'tor-osint',
          description:
            'Plataforma local de investigación OSINT sobre fuentes .onion definidas explícitamente: almacenamiento, IOCs, búsqueda, correlación, deduplicación e informes.',
          codeRepository: REPO,
          license: 'https://opensource.org/licenses/MIT',
          programmingLanguage: 'Python',
          author: { '@type': 'Person', name: 'Mrabeh Fathi Boussayff', url: 'https://mrabehfathi.com/' },
        }}
      />

      <div className="section-container max-w-3xl">
        <Link
          to="/proyectos"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors mb-8 font-mono"
        >
          <ArrowLeft size={14} />
          Todos los proyectos
        </Link>

        <p className="font-mono text-accent text-sm mb-3 tracking-widest">CASE 02 / SELECTED WORK</p>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-text mb-4 leading-tight text-balance">
          TOR-OSINT
        </h1>
        <p className="text-text-dim text-lg leading-relaxed mb-8 max-w-2xl">
          Plataforma local de investigación OSINT para laboratorio: recopila, normaliza, correlaciona y documenta
          información de fuentes .onion que el analista define explícitamente, siempre a través de Tor.
        </p>

        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5 card-glass rounded-xl p-5 mb-6 font-mono text-sm">
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Status</dt>
            <dd className="text-text-dim flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
              En desarrollo · v0.5.0
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Type</dt>
            <dd className="text-text-dim">OSINT · Threat intel</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Role</dt>
            <dd className="text-text-dim">Proyecto personal</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Repository</dt>
            <dd>
              <a href={REPO} {...linkProps} className="text-accent hover:text-accent-dim break-all">
                github.com/Marbi8891/tor-osint
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">License</dt>
            <dd className="text-text-dim">MIT</dd>
          </div>
          <div>
            <dt className="text-text-muted text-xs uppercase tracking-widest mb-1">Evidence</dt>
            <dd className="text-text-dim">245 tests · 13 tipos de IOC</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 mb-16">
          <a href={REPO} {...linkProps} className="btn-primary">
            <Github size={16} />
            Ver código fuente
            <ExternalLink size={14} />
          </a>
          <a href={`${BLOB}/README.md`} {...linkProps} className="btn-outline">
            <FileText size={16} />
            README
          </a>
          <span className="tag" title="Licencia MIT: código público, se puede inspeccionar y reutilizar">
            MIT Licensed
          </span>
        </div>

        <DossierSection number="01" label="Problem">
          <p>
            Seguir de forma manual un conjunto de fuentes .onion en una investigación (foros, canales o paneles de
            una campaña concreta) produce notas dispersas, capturas sin contexto y ninguna forma de saber qué cambió
            entre una visita y la siguiente, ni qué indicadores comparten las fuentes entre sí.
          </p>
          <p>
            Los crawlers genéricos resuelven otra cosa: recorren la red indiscriminadamente, que es justo lo que una
            investigación acotada y responsable no debe hacer.
          </p>
        </DossierSection>

        <DossierSection number="02" label="Solution">
          <p>
            Una herramienta en Python (CLI e interfaz web local) que consulta solo las fuentes indicadas, una vez cada
            una y siempre por Tor. Guarda cada versión en SQLite, extrae y normaliza indicadores, detecta cambios entre
            crawls y genera evidencias verificables: informe HTML, JSON/CSV, STIX 2.1 y MISP, todo con un manifiesto
            de hashes.
          </p>
          <div className="card-glass rounded-xl p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Lo que no hace, a propósito</p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {notDone.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </DossierSection>

        <DossierSection number="03" label="Security Model">
          <p className="mb-2">Controles implementados, cada uno con su código y sus tests:</p>
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

        <DossierSection number="04" label="Capabilities">
          <div className="grid sm:grid-cols-2 gap-3">
            {capabilities.map((c) => (
              <div key={c.label} className="card-glass rounded-lg p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-1">{c.label}</p>
                <p className="text-sm text-text-dim m-0">{c.detail}</p>
              </div>
            ))}
          </div>
        </DossierSection>

        <DossierSection number="05" label="Interface">
          {figures.map((f) => (
            <figure key={f.src} className="m-0">
              <img
                src={f.src}
                alt={f.alt}
                width={f.width}
                height={f.height}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-xl border border-border"
              />
              <figcaption className="text-xs text-text-muted font-mono mt-2">{f.caption}</figcaption>
            </figure>
          ))}
        </DossierSection>

        <DossierSection number="06" label="Testing">
          <p>
            <span className="font-display font-black text-2xl text-text align-middle">245</span>{' '}
            <span className="text-text-dim">
              tests con pytest y lint con ruff, ejecutados en Python 3.10, 3.12 y 3.13; CI configurado en GitHub
              Actions para 3.10–3.13 y una prueba con Docker contra la red Tor real.
            </span>
          </p>
          <p>
            Donde existía una referencia externa, se usó: vectores oficiales para las criptomonedas, la librería de
            OASIS para STIX. Durante el desarrollo, varios tests se comprobaron rompiendo el código a propósito y
            viendo que fallaban.
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

        <DossierSection number="07" label="Architecture">
          <p>El pipeline tal como está implementado:</p>
          <ol className="flex flex-col gap-0 max-w-md" aria-label="Pipeline de tor-osint, en orden">
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

        <DossierSection number="08" label="Technical Decisions">
          <div className="space-y-4">
            {decisions.map((d, i) => (
              <div key={d.title} className="card-glass rounded-xl p-5">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
                  Decision {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display font-semibold text-text mb-2">{d.title}</h3>
                <p className="text-sm text-text-dim m-0">{d.body}</p>
              </div>
            ))}
          </div>
        </DossierSection>

        <DossierSection number="09" label="Limitations">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Verificado con tests y con Tor simulado. Las pruebas contra la red Tor real y la imagen Docker del
              servicio Tor están pendientes: el entorno de desarrollo bloqueaba esas conexiones.
            </li>
            <li>La extracción de IOCs y la redacción de secretos son heurísticas: reducen errores, no los eliminan.</li>
            <li>Sin JavaScript: las páginas que generan su contenido en el cliente aparecen vacías.</li>
            <li>La interfaz web es local y monousuario; no tiene autenticación, por eso solo escucha en loopback.</li>
            <li>Herramienta de laboratorio y aprendizaje: no sustituye a una plataforma de inteligencia de amenazas.</li>
          </ul>
        </DossierSection>

        <DossierSection number="10" label="Evidence">
          <div className="grid sm:grid-cols-3 gap-3">
            <a href={REPO} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <Github size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">VIEW SOURCE →</p>
              <p className="text-xs text-text-muted m-0">GitHub</p>
            </a>
            <a href={`${BLOB}/LICENSE`} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <FileText size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">LICENSE →</p>
              <p className="text-xs text-text-muted m-0">MIT</p>
            </a>
            <a href={`${BLOB}/README.md`} {...linkProps} className="card-glass rounded-xl p-5 hover:-translate-y-0.5 transition-transform">
              <FileText size={18} className="text-accent mb-3" />
              <p className="font-mono text-sm text-text mb-1">README →</p>
              <p className="text-xs text-text-muted m-0">Documentación completa</p>
            </a>
          </div>
          <p className="text-sm text-text-muted mt-4">
            No hay demo pública: la interfaz web solo escucha en la máquina del analista, por diseño.
          </p>
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
