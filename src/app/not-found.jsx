import { ArrowLeft, ArrowRight, Compass, FileText, Home } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.notFound)
export const metadata = pageMetadata(seo)
const nextSteps = [{ href: '/', icon: Home, label: 'Start from home', text: 'See what CodeASystem builds and how a project begins.' }, { href: '/case-study/', icon: Compass, label: 'Browse case studies', text: 'Explore practical AI, software and automation solutions.' }, { href: '/terms/', icon: FileText, label: 'Read site terms', text: 'Find the terms for using this website and its content.' }]

export default function NotFound() {
  return <PageShell structuredData={getStructuredData(seo)}><main className="not-found-page"><div className="container not-found-inner"><div className="not-found-code" aria-hidden="true">404</div><div className="eyebrow"><span /> Page not found</div><h1>This link has gone <em>somewhere else.</em></h1><p className="not-found-lead">The page may have moved, been removed, or the address may be incomplete. Here are a few useful ways back into the site.</p><div className="not-found-actions"><a className="button" href="/"><ArrowLeft size={16} /> Back to home</a><a className="text-button" href="/case-study/">View case studies <ArrowRight size={16} /></a></div><nav className="not-found-links" aria-label="Helpful pages">{nextSteps.map(({ href, icon: Icon, label, text }) => <a href={href} key={href}><Icon aria-hidden="true" size={19} /><span><strong>{label}</strong><small>{text}</small></span><ArrowRight aria-hidden="true" size={18} /></a>)}</nav></div></main></PageShell>
}
