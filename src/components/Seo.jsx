import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { getPageSeo, getStructuredData, siteUrl } from '../data/seo'

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function Seo() {
  const { pathname } = useLocation()
  const seo = useMemo(() => getPageSeo(pathname), [pathname])
  const structuredData = useMemo(() => getStructuredData(seo), [seo])

  useEffect(() => {
    const title = `${seo.title} | CodeASystem`
    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: seo.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: seo.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: seo.type || 'website' })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: seo.url })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'CodeASystem' })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: `${siteUrl}/codeasystem-logo.jpg` })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: `${siteUrl}/codeasystem-logo.jpg` })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.url

    let structuredDataScript = document.head.querySelector('script[data-seo-json-ld]')
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.type = 'application/ld+json'
      structuredDataScript.dataset.seoJsonLd = 'true'
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData).replace(/</g, '\\u003c')
  }, [seo, structuredData])

  return null
}
