/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#080c14',
        surface: '#0d1422',
        'surface-2': '#111a2e',
        border: '#1a2540',
        'border-bright': '#1e2d4a',
        accent: '#00d4ff',
        'accent-dim': '#0099cc',
        'accent-2': '#7c3aed',
        'accent-green': '#00ff88',
        text: '#e2e8f0',
        'text-dim': '#94a3b8',
        'text-muted': '#475569',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff' },
          '100%': { boxShadow: '0 0 10px #00d4ff, 0 0 30px #00d4ff, 0 0 60px #00d4ff33' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, #0d1f3c 0%, #080c14 60%)',
        'card-gradient': 'linear-gradient(135deg, #0d1422 0%, #111a2e 100%)',
        'accent-gradient': 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
