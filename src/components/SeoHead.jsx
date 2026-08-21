import Head from 'next/head'
import { getStructuredData, siteUrl } from '../data/seo'

export default function SeoHead({ seo }) {
  const title = `${seo.title} | CodeASystem`
  const structuredData = getStructuredData(seo)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={seo.description} key="description" />
      <meta
        name="robots"
        content={seo.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
        key="robots"
      />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={seo.description} key="og:description" />
      <meta property="og:type" content={seo.type || 'website'} key="og:type" />
      <meta property="og:url" content={seo.url} key="og:url" />
      <meta property="og:site_name" content="CodeASystem" key="og:site_name" />
      <meta property="og:image" content={`${siteUrl}/codeasystem-logo.jpg`} key="og:image" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={seo.description} key="twitter:description" />
      <meta name="twitter:image" content={`${siteUrl}/codeasystem-logo.jpg`} key="twitter:image" />
      <link rel="canonical" href={seo.url} key="canonical" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />
    </Head>
  )
}
