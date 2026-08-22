import PageShell from '@/components/PageShell'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.tools)
export const metadata = pageMetadata(seo)

export default function ToolsPage() {
  return <PageShell structuredData={getStructuredData(seo)}><main className="tools-page"><section className="container tools-intro"><p className="eyebrow"><span /> CodeASystem tools</p><h1>Small tools for <em>meaningful</em> work.</h1><p>Practical, free tools designed to take a little friction out of your day.</p></section><section className="container tools-grid" aria-label="Available tools"><article className="tool-card"><span className="tool-number">01</span><div className="tool-card-copy"><h2>Resume Builder</h2><p>Write, preview, and save a clean, professional resume as a PDF. Your details stay in your browser.</p><div className="tool-card-actions"><a href="/resume-builder/">Learn more</a><a className="tool-card-primary" href="/tool/resume-generator/">Open builder <span aria-hidden="true">↗</span></a></div></div></article></section></main></PageShell>
}
