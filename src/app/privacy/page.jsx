import PageShell from '@/components/PageShell'
import { legalPages } from '@/data/siteData'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.privacy)
export const metadata = pageMetadata(seo)

export default function PrivacyPage() {
  const page = legalPages.privacy
  return <PageShell structuredData={getStructuredData(seo)}><main className="legal-page"><div className="container legal-inner"><div className="eyebrow"><span />{page.eyebrow}</div><h1>{page.title}</h1><p className="legal-updated">{page.updated}</p><div className="legal-sections">{page.sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2><p>{content}</p></section>)}</div></div></main></PageShell>
}
