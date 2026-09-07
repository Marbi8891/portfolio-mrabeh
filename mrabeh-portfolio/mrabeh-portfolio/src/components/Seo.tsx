import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  /** Path only, e.g. "/sobre-mi". Combined with the site origin for canonical/OG URLs. */
  path: string
}

const SITE_URL = 'https://mrabehfathi.es'
const SITE_NAME = 'Mrabeh Fathi'

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Per-route document title + meta description/canonical/OG/Twitter tags.
 * index.html carries the default (homepage) values; this overrides them on
 * navigation so every route has distinct, accurate metadata instead of all
 * pages sharing the homepage's title/description.
 */
export default function Seo({ title, description, path }: SeoProps) {
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
  }, [title, description, path])

  return null
}
