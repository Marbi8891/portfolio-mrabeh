import type { Project } from '@/data/projects'

export interface CommercialCaseDetails {
  sector: string
  challenge: string
  approach: string
  deliverables: string[]
  successMetrics: string[]
  constraints: string[]
}

export interface CommercialCaseProject extends Project {
  concept: true
  commercialCase: CommercialCaseDetails
}

export const commercialCases: CommercialCaseProject[] = [
  {
    id: 'lexforma-despacho',
    title: 'LexForma · Despacho jurídico',
    subtitle: 'Web corporativa orientada a consultas',
    description: 'Caso conceptual para un despacho local que necesita transmitir especialización, reducir fricción en móvil y convertir visitas en solicitudes de consulta.',
    longDescription: 'Propuesta conceptual de rediseño y desarrollo para un despacho jurídico pequeño. El objetivo no sería “hacer una web bonita”, sino ordenar servicios, autoridad profesional y contacto para que una persona entienda rápidamente si el despacho puede ayudarle y tenga un siguiente paso claro.',
    tags: ['React', 'TypeScript', 'SEO local', 'Accesibilidad', 'Conversión'],
    category: 'web',
    status: 'development',
    featured: true,
    icon: 'BriefcaseBusiness',
    color: '#00d4ff',
    caseStudyPath: '/proyectos/concepto/lexforma-despacho',
    evidence: ['Conceptual', 'No es cliente real', 'Alcance propuesto'],
    concept: true,
    commercialCase: {
      sector: 'Despacho jurídico local',
      challenge: 'Una presencia digital genérica obliga al visitante a buscar demasiado para entender servicios, especialización y cómo solicitar una primera consulta. En móvil, esa fricción suele ser todavía mayor.',
      approach: 'Arquitectura centrada en intenciones reales del visitante: problema → área de práctica → confianza → siguiente paso. El diseño priorizaría lectura, accesibilidad, velocidad y contacto sin recurrir a promesas legales o mensajes agresivos.',
      deliverables: [
        'Home orientada a propuesta de valor y confianza',
        'Páginas de áreas de práctica con estructura SEO',
        'Perfil profesional y señales de credibilidad verificables',
        'Formulario de consulta con clasificación básica del asunto',
        'Integración de contacto y analítica de conversiones',
        'Base técnica de rendimiento, accesibilidad y seguridad',
      ],
      successMetrics: [
        'Solicitudes de consulta completadas',
        'Tasa de conversión móvil',
        'Abandono del formulario',
        'Core Web Vitals',
        'Tráfico orgánico local a páginas de servicio',
      ],
      constraints: [
        'No inventar testimonios, casos ganados ni credenciales',
        'Tratamiento prudente de datos sensibles enviados por formulario',
        'Cumplimiento de privacidad y consentimiento cuando corresponda',
        'Lenguaje claro sin promesas de resultado jurídico',
      ],
    },
  },
  {
    id: 'nexo-clinica',
    title: 'Nexo Clínica · Rehabilitación',
    subtitle: 'Web accesible enfocada en reserva de cita',
    description: 'Caso conceptual para una clínica de rehabilitación que necesita explicar tratamientos con claridad y reducir pasos entre una búsqueda móvil y una solicitud de cita.',
    longDescription: 'Concepto de web comercial para una clínica pequeña de rehabilitación y fisioterapia. La propuesta parte de dos prioridades: accesibilidad real para usuarios con distintas necesidades y un recorrido sencillo desde “qué me pasa” hasta “cómo pido una cita”.',
    tags: ['React', 'Accesibilidad', 'Responsive', 'Local SEO', 'UX'],
    category: 'web',
    status: 'development',
    featured: true,
    icon: 'HeartPulse',
    color: '#00ff88',
    caseStudyPath: '/proyectos/concepto/nexo-clinica',
    evidence: ['Conceptual', 'No es cliente real', 'Accesibilidad primero'],
    concept: true,
    commercialCase: {
      sector: 'Clínica de rehabilitación y fisioterapia',
      challenge: 'Muchas webs de clínicas acumulan servicios, bloques de texto y botones sin una jerarquía clara. Para una persona que entra desde el móvil buscando ayuda concreta, cada paso adicional reduce la probabilidad de contacto.',
      approach: 'Diseño con jerarquía visual simple, lenguaje comprensible, navegación por necesidad y componentes accesibles. La reserva se plantearía como objetivo principal, sin sacrificar información clínica ni confianza.',
      deliverables: [
        'Home con servicios y vías de contacto prioritarias',
        'Páginas de tratamiento estructuradas por necesidad',
        'Perfil de profesionales y credenciales verificables',
        'Solicitud de cita optimizada para móvil',
        'Accesibilidad de teclado, contraste y estructura semántica',
        'SEO local y datos estructurados apropiados',
      ],
      successMetrics: [
        'Solicitudes de cita iniciadas y completadas',
        'Conversión desde móvil',
        'Tiempo hasta encontrar un tratamiento',
        'Errores de accesibilidad críticos',
        'Rendimiento real en dispositivos móviles',
      ],
      constraints: [
        'No presentar contenido informativo como diagnóstico médico',
        'Minimizar datos personales solicitados antes de la cita',
        'Evitar patrones de diseño que dificulten el uso con movilidad reducida',
        'Mantener tiempos de carga bajos incluso con contenido visual',
      ],
    },
  },
  {
    id: 'atlas-cae-portal',
    title: 'Atlas Obras · Portal CAE',
    subtitle: 'Portal documental y automatización administrativa',
    description: 'Caso conceptual para una empresa de obra que quiere sustituir correos, carpetas y hojas de cálculo por un flujo claro de documentación CAE, estados y vencimientos.',
    longDescription: 'Concepto de herramienta interna para coordinación documental en construcción. El foco está en reducir trabajo manual, saber qué documentación falta o caduca y mantener trazabilidad sin convertir el sistema en un ERP innecesariamente complejo.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Automatización', 'RBAC'],
    category: 'automation',
    status: 'development',
    featured: true,
    icon: 'HardHat',
    color: '#f59e0b',
    caseStudyPath: '/proyectos/concepto/atlas-cae-portal',
    evidence: ['Conceptual', 'No es cliente real', 'Flujo CAE propuesto'],
    concept: true,
    commercialCase: {
      sector: 'Construcción · coordinación CAE',
      challenge: 'Cuando la documentación de trabajadores, subcontratas y accesos se reparte entre email, carpetas y Excel, el equipo dedica tiempo a perseguir archivos y aumenta el riesgo de trabajar con documentación incompleta o caducada.',
      approach: 'Portal ligero centrado en estados documentales, vencimientos y responsabilidades. La automatización se usaría para avisar y ordenar, no para sustituir decisiones de PRL o validaciones que requieren criterio profesional.',
      deliverables: [
        'Panel por empresa, trabajador y estado documental',
        'Carga y clasificación de documentación',
        'Fechas de caducidad y alertas configurables',
        'Roles y permisos por tipo de usuario',
        'Historial de cambios y trazabilidad básica',
        'Exportación de estados para seguimiento operativo',
      ],
      successMetrics: [
        'Tiempo administrativo por alta documental',
        'Documentos vencidos detectados antes del bloqueo',
        'Número de seguimientos manuales por email',
        'Tiempo para conocer el estado de una subcontrata',
        'Errores de permisos o exposición documental',
      ],
      constraints: [
        'La herramienta no sustituye la validación profesional de PRL',
        'Principio de mínimo privilegio para documentación sensible',
        'Registro de cambios para acciones administrativas relevantes',
        'Retención y acceso definidos según política de la organización',
      ],
    },
  },
]
