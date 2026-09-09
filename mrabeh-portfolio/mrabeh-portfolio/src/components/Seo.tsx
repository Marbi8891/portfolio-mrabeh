import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  /** Path only, e.g. "/sobre-mi". Combined with the site origin for canonical/OG URLs. */
  path: string
  /**
   * Optional route-specific JSON-LD (e.g. SoftwareSourceCode for a case
   * study). index.html only carries the homepage's Person JSON-LD, so this
   * injects/removes its own <script> tag per route instead of overwriting
   * that one. Pass a plain schema.org object; @context is added for you.
   */
  jsonLd?: Record<string, unknown>
}

const SITE_URL = 'https://mrabehfathi.com'
const SITE_NAME = 'Mrabeh Fathi'
const JSON_LD_ID = 'route-json-ld'

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Per-route document title + meta description/canonical/OG/Twitter tags,
 * plus an optional per-route JSON-LD block.
 * index.html carries the default (homepage) values; this overrides them on
 * navigation so every route has distinct, accurate metadata instead of all
 * pages sharing the homepage's title/description.
 */
export default function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} · ${SITE_NAME}`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('meta[name="title"]', 'content', fullTitle)
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="twitter:title"]', 'content', fullTitle)
    setMeta('meta[property="twitter:description"]', 'content', description)
    setMeta('meta[property="twitter:url"]', 'content', url)

    let script: HTMLScriptElement | null = null
    if (jsonLd) {
      script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = JSON_LD_ID
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...jsonLd })
    }

    return () => {
      // Route-specific JSON-LD only applies to the route that set it - drop
      // it on unmount/route change so a page without jsonLd never inherits
      // the previous route's structured data.
      const existing = document.getElementById(JSON_LD_ID)
      if (existing) existing.remove()
    }
  }, [title, description, path, jsonLd])

  return null
}
