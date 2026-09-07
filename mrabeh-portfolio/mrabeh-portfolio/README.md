# Portfolio — Mrabeh Fathi Boussayff

> Portfolio profesional · React + Vite + TypeScript + Tailwind CSS  
> Desplegado **gratuitamente** en Cloudflare Pages · CDN global · SSL automático

**Dominio:** [mrabehfathi.es](https://mrabehfathi.es)

---

## Tabla de contenidos

1. [Stack técnico](#stack-técnico)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Desarrollo local](#desarrollo-local)
4. [Despliegue gratuito en Cloudflare Pages](#despliegue-gratuito-en-cloudflare-pages)
5. [Conectar dominio mrabehfathi.es](#conectar-dominio-mrabehfathicom)
6. [Variables de entorno en Cloudflare](#variables-de-entorno-en-cloudflare)
7. [Formulario de contacto (Formspree)](#formulario-de-contacto-formspree)
8. [SEO y rendimiento](#seo-y-rendimiento)
9. [Actualizar la web](#actualizar-la-web)
10. [Personalización de contenido](#personalización-de-contenido)
11. [Autohosting alternativo (VPS + Docker)](#autohosting-alternativo-vps--docker)

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite 5 + TypeScript |
| Estilos | Tailwind CSS v3 |
| Routing | React Router v6 |
| Iconos | Lucide React |
| Animaciones | Framer Motion |
| Hosting | **Cloudflare Pages** (gratis) |
| CDN | Cloudflare Global Network (300+ PoPs) |
| SSL | Automático (Let's Encrypt via Cloudflare) |
| Formulario | Formspree |

---

## Estructura del proyecto

```
mrabeh-portfolio/
├── public/
│   ├── _redirects          ← SPA routing en Cloudflare Pages
│   ├── _headers            ← Security headers en Cloudflare Pages
│   ├── favicon.svg
│   ├── robots.txt          ← (añadir)
│   ├── sitemap.xml         ← (añadir)
│   └── cv-mrabeh-fathi.pdf ← Tu CV (añadir manualmente)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBadge.tsx
│   │   ├── ContactForm.tsx
│   │   └── Timeline.tsx
│   ├── data/
│   │   ├── projects.ts      ← Editar proyectos aquí
│   │   ├── skills.ts        ← Editar stack tecnológico
│   │   └── experience.ts    ← Editar experiencia y timeline
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   ├── CV.tsx
│   │   ├── NotFound.tsx
│   │   └── legal/
│   │       ├── AvisoLegal.tsx
│   │       ├── Privacidad.tsx
│   │       └── Cookies.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Desarrollo local

### Requisitos
- Node.js 20+
- npm 10+
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/Marbi8891/mrabeh-portfolio.git
cd mrabeh-portfolio

# 2. Instalar dependencias
npm install

# 3. Arrancar en modo desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

```bash
# Verificar el build de producción en local antes de desplegar
npm run build
npm run preview
# Disponible en http://localhost:4173
```

---

## Despliegue gratuito en Cloudflare Pages

> **Completamente gratis.** Sin límite de ancho de banda, SSL automático,
> CDN global con 300+ ubicaciones, dominios personalizados incluidos.

### Paso 1 — Subir el proyecto a GitHub

```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "feat: portfolio inicial Mrabeh Fathi"

# Crear repositorio en github.com → New repository → mrabeh-portfolio
# Luego conectar el remoto:
git remote add origin https://github.com/Marbi8891/mrabeh-portfolio.git
git branch -M main
git push -u origin main
```

### Paso 2 — Crear el proyecto en Cloudflare Pages

1. Ir a [dash.cloudflare.com](https://dash.cloudflare.com)
2. En el menú izquierdo → **Workers & Pages**
3. Clic en **Create application** → pestaña **Pages**
4. Clic en **Connect to Git**
5. Autorizar Cloudflare a acceder a tu GitHub si es la primera vez
6. Seleccionar el repositorio `mrabeh-portfolio`
7. Clic en **Begin setup**

### Paso 3 — Configuración del build

En la pantalla "Set up builds and deployments", introducir **exactamente** estos valores:

| Campo | Valor |
|-------|-------|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(dejar vacío)* |
| **Node.js version** | `20` (en Environment variables: `NODE_VERSION = 20`) |

> El archivo `public/_redirects` ya está configurado para que el routing
> de React Router funcione correctamente en Cloudflare Pages.
> El archivo `public/_headers` añade security headers automáticamente.

### Paso 4 — Desplegar

Clic en **Save and Deploy**.

Cloudflare clonará el repo, ejecutará `npm run build` y desplegará `dist/` automáticamente.

En **1–2 minutos** la web estará disponible en:
```
https://mrabeh-portfolio.pages.dev
```

A partir de ahora, **cada `git push` a `main` redespliega automáticamente**.

---

## Conectar dominio mrabehfathi.es

### Paso 1 — Añadir el dominio raíz

1. En Cloudflare Pages → tu proyecto → pestaña **Custom domains**
2. Clic en **Set up a custom domain**
3. Escribir: `mrabehfathi.es`
4. Clic en **Continue** → **Activate domain**

### Paso 2 — Añadir www.mrabehfathi.es

1. Repetir el proceso anterior
2. Esta vez escribir: `www.mrabehfathi.es`
3. Cloudflare gestiona automáticamente la redirección entre raíz y www

### Paso 3 — Configurar DNS en Hostinger

Si el dominio está en Hostinger:

1. Acceder al panel de Hostinger → **DNS / Name Servers**
2. Añadir estos registros:

**Opción A — Transferir nameservers a Cloudflare (recomendado):**

En Cloudflare → **Add a site** → introducir `mrabehfathi.es` → plan Free.
Cloudflare dará dos nameservers (ej: `ada.ns.cloudflare.com`).
En Hostinger → cambiar los nameservers por los de Cloudflare.
Ventaja: propagación instantánea, mayor control, protección DDoS.

**Opción B — Solo CNAME (sin transferir):**

| Tipo | Nombre | Valor |
|------|--------|-------|
| `CNAME` | `@` (raíz) | `mrabeh-portfolio.pages.dev` |
| `CNAME` | `www` | `mrabeh-portfolio.pages.dev` |

> Si Hostinger no permite CNAME en apex (`@`), usa registro `A` con la IP
> que Cloudflare indica en el panel Custom domains.

### SSL

El certificado SSL se activa **automáticamente** una vez que el dominio apunta a Cloudflare.
No es necesario instalar ni renovar certificados manualmente.

---

## Variables de entorno en Cloudflare

Para configurar el ID de Formspree u otras variables:

1. Cloudflare Pages → tu proyecto → **Settings** → **Environment variables**
2. Clic en **Add variable**
3. Añadir:

| Variable | Valor |
|----------|-------|
| `NODE_VERSION` | `20` |
| `VITE_FORMSPREE_ID` | `tu_id_de_formspree` |

4. Clic en **Save**
5. Ir a **Deployments** → **Retry deployment** para aplicar los cambios

> Las variables `VITE_*` son públicas (se incluyen en el bundle del cliente).
> Nunca pongas secretos (API keys privadas) con prefijo `VITE_`.

---

## Formulario de contacto (Formspree)

1. Registrarse en [formspree.io](https://formspree.io) — gratis hasta 50 envíos/mes
2. Crear un nuevo formulario → copiar el ID (ej: `xpwzkvnb`)
3. Editar `src/components/ContactForm.tsx`:
   ```typescript
   // Línea ~31 — sustituir YOUR_FORM_ID por tu ID real
   const response = await fetch('https://formspree.io/f/xpwzkvnb', {
   ```
4. Commit y push → Cloudflare redespliega automáticamente

**Alternativa con Variable de Entorno:**

```typescript
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID
const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
```

Y añadir `VITE_FORMSPREE_ID` en Cloudflare → Settings → Environment variables.

---

## SEO y rendimiento

### Ya incluido en el proyecto

- `<title>` y `<meta name="description">` optimizados en `index.html`
- Open Graph (`og:title`, `og:description`, `og:image`) para LinkedIn
- Twitter Card
- `<link rel="canonical">`
- `lang="es"` en el elemento `<html>`
- Security headers en `public/_headers`
- Code-splitting (vendor / motion / icons en chunks separados)
- Cache `immutable` de 1 año para assets con hash

### Añadir manualmente (recomendado)

**`public/robots.txt`:**
```
User-agent: *
Allow: /
Sitemap: https://mrabehfathi.es/sitemap.xml
```

**`public/sitemap.xml`:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mrabehfathi.es/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mrabehfathi.es/sobre-mi</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mrabehfathi.es/proyectos</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mrabehfathi.es/servicios</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://mrabehfathi.es/contacto</loc>
    <priority>0.7</priority>
  </url>
</urlset>
```

**`public/og-image.png`:**
Imagen de 1200×630px para compartir en LinkedIn.
Fondo oscuro con tu nombre y rol. Referenciada en `index.html` como `/og-image.png`.

### Lighthouse esperado tras despliegue
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 95+

---

## Actualizar la web

Con Cloudflare Pages el flujo de actualización es completamente automático:

```bash
# Editar lo que necesites
# Por ejemplo, añadir un proyecto en src/data/projects.ts

git add .
git commit -m "feat: añadir proyecto XYZ"
git push origin main
```

Cloudflare detecta el push, construye y despliega en **1–2 minutos**.

Puedes ver el estado en: **Cloudflare Dashboard → Pages → tu proyecto → Deployments**

### Preview de cambios antes de publicar

```bash
git checkout -b nueva-funcionalidad
# Hacer cambios
git push origin nueva-funcionalidad
# Cloudflare genera una URL de preview: https://nueva-funcionalidad.mrabeh-portfolio.pages.dev
# Al hacer merge a main → se despliega en producción
```

---

## Personalización de contenido

### Proyectos → `src/data/projects.ts`

```typescript
{
  id: 'mi-nuevo-proyecto',
  title: 'Nombre del Proyecto',
  subtitle: 'Descripción corta para la card',
  description: 'Descripción visible en la card de proyecto',
  longDescription: 'Descripción completa para página de detalle',
  tags: ['React', 'Python', 'Docker'],
  category: 'cybersecurity', // cybersecurity | web | data | automation | ai
  status: 'active',          // active | development | completed
  featured: true,            // true → aparece en la sección Home
  icon: 'Shield',            // Shield | Terminal | BarChart3 | Network | Brain | Lock | Calculator
  color: '#00d4ff',          // Color del acento de la card
}
```

### Skills → `src/data/skills.ts`

Edita `skillCategories` (con nivel 1-5) y el array `techStack` (ticker del hero).

### Experiencia y servicios → `src/data/experience.ts`

Edita `timeline` (línea temporal) y `services` (página de servicios).

### CV PDF

```bash
# Colocar el archivo aquí:
public/cv-mrabeh-fathi.pdf
```

Se descarga automáticamente al pulsar "Descargar CV".

---

## Autohosting alternativo (VPS + Docker)

Si en el futuro necesitas más control o quieres un VPS propio, el proyecto incluye:

- `Dockerfile` (multi-stage build)
- `docker-compose.yml`
- `nginx.conf` (con security headers, gzip, cache)
- `deploy.sh` y `update.sh`

```bash
# En tu VPS Ubuntu 24.04
git clone https://github.com/Marbi8891/mrabeh-portfolio.git /opt/mrabeh-portfolio
cd /opt/mrabeh-portfolio
bash deploy.sh
```

---

## Comandos de referencia

```bash
npm run dev        # Servidor de desarrollo → localhost:5173
npm run build      # Build de producción   → carpeta dist/
npm run preview    # Preview del build     → localhost:4173
npm run lint       # Linter TypeScript
```

---

## Contacto

**Mrabeh Fathi Boussayff**  
[mrabehfathiprofesional@gmail.com](mailto:mrabehfathiprofesional@gmail.com)  
[linkedin.com/in/mrabehfathi](https://linkedin.com/in/mrabehfathi)  
Madrid / Leganés, España
