export interface SkillCategory {
  category: string
  skills: Skill[]
}

export type SkillLevel = 'Básico' | 'Intermedio' | 'Avanzado' | 'En aprendizaje'

export interface Skill {
  name: string
  level: SkillLevel
}

// Niveles autoevaluados sobre evidencia demostrada (explicar + implementar + debuggear +
// verificar + hacerlo con autonomía), no sobre exposición o potencial.
export const skillCategories: SkillCategory[] = [
  {
    category: 'Lenguajes',
    skills: [
      { name: 'Python', level: 'Intermedio' },
      { name: 'SQL', level: 'Básico' },
      { name: 'TypeScript / JavaScript', level: 'Básico' },
      { name: 'Java', level: 'Básico' },
      { name: 'Bash', level: 'Básico' },
      { name: 'C', level: 'En aprendizaje' },
    ],
  },
  {
    category: 'Web',
    skills: [
      { name: 'HTML / CSS', level: 'Intermedio' },
      { name: 'React', level: 'Básico' },
      { name: 'APIs / FastAPI', level: 'Intermedio' },
      { name: 'Bases de datos relacionales', level: 'Intermedio' },
    ],
  },
  {
    category: 'Infraestructura',
    skills: [
      { name: 'Linux', level: 'Básico' },
      { name: 'Redes (subnetting, routing, DNS, NAT)', level: 'Intermedio' },
      { name: 'Git / GitHub', level: 'Básico' },
      { name: 'Docker', level: 'En aprendizaje' },
      { name: 'Cloud (fundamentos)', level: 'Básico' },
    ],
  },
  {
    category: 'Ciberseguridad',
    skills: [
      { name: 'Seguridad ofensiva (eJPT en progreso)', level: 'Básico' },
      { name: 'Seguridad defensiva', level: 'Básico' },
      { name: 'Kali Linux / Nmap / Wireshark / Burp Suite', level: 'En aprendizaje' },
      { name: 'OWASP Top 10', level: 'En aprendizaje' },
    ],
  },
]

export const techStack = [
  'Python', 'FastAPI', 'React', 'TypeScript', 'SQL',
  'Linux', 'Git', 'Redes', 'Docker', 'Ciberseguridad',
]
