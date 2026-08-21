import SeoHead from '../components/SeoHead'
import { legalPages } from '../data/siteData'
import { pageSeo, withSeoUrl } from '../data/seo'

export default function TermsPage() {
  const page = legalPages.terms
  const seo = withSeoUrl(pageSeo.terms)

  return (
    <>
      <SeoHead seo={seo} />
      <main className="legal-page">
        <div className="container legal-inner">
          <div className="eyebrow"><span />{page.eyebrow}</div>
          <h1>{page.title}</h1>
          <p className="legal-updated">{page.updated}</p>
          <div className="legal-sections">
            {page.sections.map(([heading, content]) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
