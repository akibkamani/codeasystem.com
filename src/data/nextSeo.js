import { getStructuredData, siteUrl } from './seo'

export function pageMetadata(seo) {
  const title = seo.title
  const image = seo.image || '/codeasystem-logo.jpg'
  const imageAlt = seo.imageAlt || 'CodeASystem logo'
  return {
    title,
    description: seo.description,
    keywords: seo.schemaType === 'tool' ? ['free resume generator', 'resume builder', 'resume PDF', 'JSON resume', 'local resume builder'] : undefined,
    alternates: { canonical: seo.url },
    robots: seo.noIndex ? { index: false, follow: false } : { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
    openGraph: { title: `${title} | CodeASystem`, description: seo.description, url: seo.url, siteName: 'CodeASystem', type: seo.type || 'website', images: [{ url: image, width: seo.image ? 1200 : 1181, height: seo.image ? 630 : 1181, alt: imageAlt }] },
    twitter: { card: 'summary_large_image', title: `${title} | CodeASystem`, description: seo.description, images: [image] },
  }
}

export { getStructuredData, siteUrl }
