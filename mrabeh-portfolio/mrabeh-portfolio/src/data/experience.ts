export interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  type: 'work' | 'education' | 'project' | 'milestone'
}

export const timeline: TimelineItem[] = [
  {
    year: '2017–2021',
    title: 'Administración Pública y Privada',
    subtitle: 'Agencia Local de Empleo · Ayuntamiento de Leganés · COCEMFE · SANDO',
    description: 'Gestión administrativa en varios organismos públicos y privados: Agencia Local de Empleo (2017–2018), Ayuntamiento de Leganés (2021), Fundación COCEMFE y Construcciones Sando (2023), entre otras estancias. Coordinación de documentación, atención ciudadana y gestión de expedientes.',
    type: 'work',
  },
  {
    year: '2023',
    title: 'Transición hacia Tecnología',
    subtitle: 'Formación DAW/DAM · FP Aspasia, Leganés',
    description: 'Inicio del ciclo formativo en Desarrollo de Aplicaciones Web (DAW) y Desarrollo de Aplicaciones Multiplataforma (DAM). Formación en paralelo en Python, Linux y fundamentos de ciberseguridad.',
    type: 'education',
  },
  {
    year: '2024–2025',
    title: 'Preparación en Ciberseguridad',
    subtitle: 'eJPT · PCAP · Blue Team',
    description: 'Preparación activa para la certificación eJPT (Junior Penetration Tester) y PCAP (Python Certified Associate). Formación práctica en Linux, redes y fundamentos de Blue Team, ambas certificaciones en progreso.',
    type: 'education',
  },
  {
    year: '2025',
    title: 'Experiencia Internacional',
    subtitle: 'Proyecto NEOM–Trojena, Arabia Saudí (OSSA)',
    description: 'Apoyo administrativo en el proyecto NEOM–Trojena, Tabuk, Arabia Saudí. Adaptación a un entorno internacional y a la gestión de un proyecto complejo a gran escala.',
    type: 'work',
  },
  {
    year: '2025–2026',
    title: 'NEXARO TECH, S.L.',
    subtitle: 'Fundador · Diseño en curso',
    description: 'Fundación de NEXARO TECH, S.L., denominación reservada en el Registro Mercantil Central. Diseño técnico completo de NEXARO (arquitectura, modelo de datos, modelo de riesgo, seguridad) como primer proyecto propio; implementación en curso.',
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
