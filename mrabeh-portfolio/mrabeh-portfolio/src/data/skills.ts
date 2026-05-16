export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Skill {
  name: string
  level: number // 1-5
  icon?: string
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Lenguajes & Frameworks',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'React', level: 4 },
      { name: 'FastAPI', level: 5 },
      { name: 'HTML/CSS', level: 5 },
      { name: 'Bash/Shell', level: 4 },
      { name: 'SQL', level: 4 },
    ],
  },
  {
    category: 'Infraestructura & DevOps',
    skills: [
      { name: 'Docker', level: 4 },
      { name: 'Linux', level: 5 },
      { name: 'Nginx', level: 4 },
      { name: 'Git / GitHub', level: 5 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'Redis', level: 3 },
      { name: 'Docker Compose', level: 4 },
      { name: 'Ubuntu Server', level: 4 },
    ],
  },
  {
    category: 'Ciberseguridad',
    skills: [
      { name: 'Kali Linux', level: 4 },
      { name: 'Wireshark', level: 3 },
      { name: 'Burp Suite', level: 3 },
      { name: 'OWASP Top 10', level: 4 },
      { name: 'Nmap / Netcat', level: 4 },
      { name: 'Análisis Forense', level: 3 },
      { name: 'Blue Team', level: 3 },
      { name: 'MITRE ATT&CK', level: 3 },
    ],
  },
  {
    category: 'Datos & IA',
    skills: [
      { name: 'Power BI', level: 3 },
      { name: 'Excel Avanzado', level: 5 },
      { name: 'scikit-learn', level: 3 },
      { name: 'Pandas / NumPy', level: 4 },
      { name: 'IA Generativa', level: 4 },
      { name: 'Automatización', level: 5 },
      { name: 'APIs REST', level: 5 },
      { name: 'Web Scraping', level: 4 },
    ],
  },
]

export const techStack = [
  'Python', 'FastAPI', 'React', 'TypeScript', 'Docker',
  'PostgreSQL', 'Linux', 'Nginx', 'Git', 'Redis',
  'Kali Linux', 'Wireshark', 'Burp Suite', 'OWASP',
  'Power BI', 'Excel', 'Bash', 'HTML', 'CSS', 'SQL',
]
