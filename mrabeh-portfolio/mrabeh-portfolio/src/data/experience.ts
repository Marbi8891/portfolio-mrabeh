export interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  type: 'work' | 'education' | 'project' | 'milestone'
}

export const timeline: TimelineItem[] = [
  {
    year: '2018–2021',
    title: 'Administración en Sector Público y Privado',
    subtitle: 'Ayuntamiento de Leganés · COCEMFE · SANDO',
    description: 'Gestión administrativa en múltiples organismos públicos y privados. Coordinación de documentación, atención ciudadana, gestión de expedientes y digitalización de procesos.',
    type: 'work',
  },
  {
    year: '2022',
    title: 'Transición hacia Tecnología',
    subtitle: 'Decisión estratégica personal',
    description: 'Inicio de la transición profesional hacia el sector tecnológico. Formación autodidacta en Python, Linux, redes y fundamentos de ciberseguridad.',
    type: 'milestone',
  },
  {
    year: '2023',
    title: 'Formación DAW y DAM',
    subtitle: 'FP Aspasia / Alcazarén · Madrid',
    description: 'Inicio del ciclo formativo en Desarrollo de Aplicaciones Web (DAW) y Desarrollo de Aplicaciones Multiplataforma (DAM). Proyectos prácticos desde el primer módulo.',
    type: 'education',
  },
  {
    year: '2023–2024',
    title: 'Primeros Proyectos Propios',
    subtitle: 'NEXARO AI · CLAW · Golytics',
    description: 'Construcción de plataformas SaaS, frameworks de seguridad y aplicaciones de análisis de datos. Aplicación de Clean Architecture, Docker y buenas prácticas desde el inicio.',
    type: 'project',
  },
  {
    year: '2024',
    title: 'Especialización en Ciberseguridad',
    subtitle: 'eJPT · PCAP · Blue Team · GRC',
    description: 'Preparación activa para la certificación eJPT (Junior Penetration Tester). Formación en análisis forense, Blue Team, GRC y cumplimiento normativo.',
    type: 'education',
  },
  {
    year: '2025',
    title: 'Experiencia Internacional',
    subtitle: 'Arabia Saudí',
    description: 'Trabajo en entorno internacional en Arabia Saudí. Adaptación a entornos multiculturales y gestión de proyectos en contexto global.',
    type: 'work',
  },
  {
    year: '2025–2026',
    title: 'NEXARO TECH, S.L.',
    subtitle: 'Fundador · Proyecto en construcción',
    description: 'Fundación de NEXARO TECH, S.L. para comercializar soluciones SaaS de ciberseguridad y desarrollo web. Denominación reservada en el Registro Mercantil Central.',
    type: 'milestone',
  },
  {
    year: '2026+',
    title: 'Objetivo: Perfil Tech-Business-Cybersecurity',
    subtitle: 'Perfil híbrido senior',
    description: 'Consolidación como perfil híbrido con base administrativa, visión de negocio y especialización en ciberseguridad, desarrollo y automatización. OSCP en el horizonte.',
    type: 'milestone',
  },
]

export const services = [
  {
    icon: 'Code2',
    title: 'Desarrollo Web y SaaS',
    description: 'Construcción de aplicaciones web modernas, APIs REST y plataformas SaaS con React, FastAPI y PostgreSQL. Código limpio y arquitectura escalable.',
    color: '#00d4ff',
  },
  {
    icon: 'Shield',
    title: 'Diagnóstico de Seguridad Web',
    description: 'Análisis de la postura de seguridad web de tu empresa: detección de vulnerabilidades OWASP, configuraciones inseguras e informe de recomendaciones.',
    color: '#00ff88',
  },
  {
    icon: 'Zap',
    title: 'Automatización de Procesos',
    description: 'Automatización de tareas repetitivas, integración de herramientas, scripts de gestión y flujos de trabajo que ahorran tiempo y reducen errores humanos.',
    color: '#7c3aed',
  },
  {
    icon: 'Monitor',
    title: 'Soporte IT y Administración Digital',
    description: 'Soporte técnico, configuración de entornos, gestión de servidores Linux y asesoramiento en transformación digital para pequeñas empresas.',
    color: '#f59e0b',
  },
  {
    icon: 'BarChart2',
    title: 'Dashboards y Análisis de Datos',
    description: 'Creación de paneles de visualización en Power BI, Excel o web. Transformación de datos en decisiones con informes claros y accionables.',
    color: '#00d4ff',
  },
  {
    icon: 'FileText',
    title: 'Documentación Técnica',
    description: 'Redacción de documentación técnica, manuales de usuario, procedimientos de seguridad y guías de transformación digital adaptadas a tu organización.',
    color: '#00ff88',
  },
]
