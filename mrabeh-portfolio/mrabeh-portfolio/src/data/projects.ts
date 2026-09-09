export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  category: 'cybersecurity' | 'web' | 'data' | 'automation' | 'ai'
  status: 'active' | 'development' | 'completed'
  featured: boolean
  icon: string
  color: string
  links?: {
    github?: string
    demo?: string
  }
  /**
   * Route to a dedicated case-study page for this project (e.g.
   * "/proyectos/owasp-web-auditor"). Optional: most projects only link out
   * via `links.github`/`links.demo`. When present, ProjectCard links here
   * instead of back to the project list, and shows a short evidence line.
   */
  caseStudyPath?: string
  /**
   * Short, verifiable facts shown on the card as proof, not adjectives
   * (e.g. "492 tests", "19 reglas"). Only for projects with a public,
   * checkable source - never a substitute for verifying the numbers.
   */
  evidence?: string[]
}

export const projects: Project[] = [
  {
    id: 'owasp-web-auditor',
    title: 'OWASP Web Auditor',
    subtitle: 'Passive Web Security Posture Scanner',
    description: 'Escáner pasivo de postura de seguridad web en TypeScript: analiza HTTPS, cabeceras, cookies, CSP, HSTS, certificado TLS y registros DNS de un dominio y devuelve hallazgos versionados con severidad y confianza explícitas. No es una herramienta de pentesting: nunca envía payloads ni explota nada.',
    longDescription: 'OWASP Web Auditor es un monorepo TypeScript (pnpm) con cinco paquetes: contracts (tipos compartidos), scanner-core (adquisición de red segura, resolución DNS validada, cliente HTTP/TLS), security-rules (19 reglas de auditoría organizadas en TRANSPORT/TLS/HEADERS/DNS) y scoring (puntuación 0-100 determinista). scanner-core resuelve el hostname, valida cada dirección candidata contra rangos privados/loopback/link-local/metadatos de nube, y ancla la conexión TCP a esa dirección ya validada para cerrar la ventana de DNS rebinding; cada redirección repite el proceso completo de forma independiente. Un check que falla nunca se reporta como "sin hallazgos": el estado queda en FAILED/UNKNOWN de forma explícita. Repositorio público bajo licencia MIT, con 492 tests (reglas doradas, fuzzing, invariantes de seguridad, SSRF adversarial, límites de recursos) verificados en el momento de escribir este caso.',
    tags: ['TypeScript', 'Node.js', 'Vitest', 'pnpm', 'CLI', 'Seguridad Web', 'OWASP'],
    category: 'cybersecurity',
    status: 'active',
    featured: true,
    icon: 'ShieldCheck',
    color: '#00d4ff',
    links: {
      github: 'https://github.com/Marbi8891/owasp-web-auditor',
    },
    caseStudyPath: '/proyectos/owasp-web-auditor',
    evidence: ['19 reglas', '492 tests', 'MIT · público'],
  },
  {
    id: 'nexaro-ai',
    title: 'NEXARO',
    subtitle: 'Vulnerability Intelligence & Risk Decision',
    description: 'NEXARO convierte hallazgos de seguridad (de escáneres que la empresa ya usa) en prioridades de remediación explicables: normaliza, deduplica, enriquece cada CVE con inteligencia de vulnerabilidades (ARGOS) y combina eso con exposición de activos y contexto de negocio.',
    longDescription: 'NEXARO no escanea: ingiere resultados de herramientas de seguridad ya existentes, los normaliza y deduplica, enriquece las CVEs subyacentes con ARGOS (modelo de riesgo propio) y las combina con exposición de activos, contexto de negocio y controles existentes para responder una pregunta: qué arreglar primero, y por qué. El diseño técnico completo (arquitectura, modelo de dominio, modelo de datos, modelo de riesgo ARGOS-RISK-V1, motor de decisión, API, seguridad, multi-tenancy, escalabilidad, pipeline de imports, UX y 10 Architecture Decision Records) está terminado. La implementación de código está en curso; todavía no hay una versión desplegada.',
    tags: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Python', 'React', 'ARGOS', 'CVSS/EPSS/KEV'],
    category: 'cybersecurity',
    status: 'development',
    featured: true,
    icon: 'Shield',
    color: '#00d4ff',
    links: {
      github: 'https://github.com/Marbi8891/portfolio-mrabeh/tree/nexaro/v1-design-package/nexaro',
    },
  },
  {
    id: 'claw-framework',
    title: 'CLAW Framework',
    subtitle: 'Auditoría y Análisis de Seguridad Linux',
    description: 'Framework de auditoría Linux con análisis de privilegios, generación de logs forenses, informes automatizados y automatización de tareas de seguridad.',
    longDescription: 'CLAW es un framework de análisis de seguridad orientado a entornos Linux. Permite auditar configuraciones del sistema, detectar escaladas de privilegios, analizar logs de forma forense y generar informes estructurados. Diseñado con arquitectura modular y enfocado en operaciones de Blue Team y análisis defensivo.',
    tags: ['Python', 'Linux', 'Bash', 'Forense Digital', 'FastAPI', 'React', 'MITRE ATT&CK'],
    category: 'cybersecurity',
    status: 'active',
    featured: true,
    icon: 'Terminal',
    color: '#00ff88',
    links: {},
  },
  {
    id: 'golytics',
    title: 'Golytics',
    subtitle: 'Análisis Deportivo con Machine Learning',
    description: 'Aplicación de análisis y predicción deportiva basada en datos reales, modelos ML y simulación de estrategias de juego.',
    longDescription: 'Golytics es una plataforma de analytics deportivo que integra datos de fuentes externas (football-data.org), aplica modelos de machine learning con scikit-learn y XGBoost para predicción de resultados, y ofrece un dashboard interactivo para visualizar métricas avanzadas y simular estrategias.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'scikit-learn', 'XGBoost', 'PostgreSQL', 'Power BI'],
    category: 'data',
    status: 'active',
    featured: true,
    icon: 'BarChart3',
    color: '#7c3aed',
    links: {},
  },
  {
    id: 'netseer',
    title: 'Netseer',
    subtitle: 'Analizador de Red y Detección de Amenazas',
    description: 'Analizador de tráfico de red con detección y categorización de amenazas, visualización en tiempo real y alertas automáticas.',
    longDescription: 'Netseer es una herramienta de análisis de red inspirada en Wireshark, orientada a la detección temprana de amenazas. Captura y categoriza paquetes de red, identifica patrones de ataque conocidos y visualiza el tráfico de forma intuitiva con alertas configurables por reglas personalizadas.',
    tags: ['Python', 'Scapy', 'FastAPI', 'React', 'Docker', 'Elasticsearch', 'Wireshark'],
    category: 'cybersecurity',
    status: 'development',
    featured: false,
    icon: 'Network',
    color: '#00d4ff',
    links: {},
  },
  {
    id: 'synapse',
    title: 'SYNAPSE / INTEL-LINK',
    subtitle: 'Asistente de Inteligencia para Decisiones',
    description: 'Sistema de apoyo a la toma de decisiones que analiza alternativas, riesgos, escenarios y consecuencias con IA aplicada.',
    longDescription: 'SYNAPSE es un asistente de inteligencia decisional que combina análisis estructurado, IA generativa y visualización de escenarios para ayudar a empresas y profesionales a tomar decisiones complejas. Integra modelos de análisis de riesgo, árboles de decisión y comparativas multi-criterio.',
    tags: ['FastAPI', 'React', 'TypeScript', 'Anthropic API', 'Python', 'Docker', 'PostgreSQL'],
    category: 'ai',
    status: 'completed',
    featured: false,
    icon: 'Brain',
    color: '#7c3aed',
    links: {},
  },
  {
    id: 'sigma43',
    title: 'SIGMA 43',
    subtitle: 'Simulador Enigma Retro en Python',
    description: 'Simulador funcional de la máquina Enigma histórica con interfaz visual, enfoque educativo y explicación de la criptografía clásica.',
    longDescription: 'SIGMA 43 es un simulador fiel de la máquina Enigma utilizada en la Segunda Guerra Mundial. Implementa los rotores, reflectores y plugboard originales en Python, con una interfaz visual retro que permite cifrar y descifrar mensajes en tiempo real. Incluye modo educativo explicando cada paso del proceso criptográfico.',
    tags: ['Python', 'Criptografía', 'Historia', 'Educación', 'CLI', 'Tkinter'],
    category: 'cybersecurity',
    status: 'completed',
    featured: false,
    icon: 'Lock',
    color: '#f59e0b',
    links: {},
  },
  {
    id: 'calculadora-financiera',
    title: 'Calculadora Financiera Pro',
    subtitle: 'Simulaciones Financieras Avanzadas',
    description: 'Aplicación para simulaciones de interés compuesto, amortización de préstamos, proyecciones de ahorro e inversión con exportación de informes.',
    longDescription: 'Herramienta financiera completa orientada a autónomos, inversores y pequeñas empresas. Incluye módulos para cálculo de interés compuesto, amortización francesa y alemana, simulación de préstamos hipotecarios, proyección de carteras de inversión y generación de informes PDF con gráficas.',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'ReportLab', 'Chart.js'],
    category: 'web',
    status: 'completed',
    featured: false,
    icon: 'Calculator',
    color: '#10b981',
    links: {},
  },
]
