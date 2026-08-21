import Link from 'next/link'
import { ArrowLeft, ArrowRight, Compass, FileText, Home } from 'lucide-react'
import SeoHead from '../components/SeoHead'
import { pageSeo, withSeoUrl } from '../data/seo'

const nextSteps = [
  { href: '/', icon: Home, label: 'Start from home', text: 'See what CodeASystem builds and how a project begins.' },
  { href: '/case-study', icon: Compass, label: 'Browse case studies', text: 'Explore practical AI, software and automation solutions.' },
  { href: '/terms', icon: FileText, label: 'Read site terms', text: 'Find the terms for using this website and its content.' },
]

export default function NotFoundPage() {
  const seo = withSeoUrl(pageSeo.notFound)

  return (
    <>
      <SeoHead seo={seo} />
      <main className="not-found-page">
        <div className="container not-found-inner">
          <div className="not-found-code" aria-hidden="true">404</div>
          <div className="eyebrow"><span /> Page not found</div>
          <h1>This link has gone <em>somewhere else.</em></h1>
          <p className="not-found-lead">The page may have moved, been removed, or the address may be incomplete. Here are a few useful ways back into the site.</p>
          <div className="not-found-actions">
            <Link className="button" href="/"><ArrowLeft size={16} /> Back to home</Link>
            <Link className="text-button" href="/case-study">View case studies <ArrowRight size={16} /></Link>
          </div>
          <nav className="not-found-links" aria-label="Helpful pages">
            {nextSteps.map(({ href, icon: Icon, label, text }) => (
              <Link key={href} href={href}>
                <Icon aria-hidden="true" size={19} />
                <span><strong>{label}</strong><small>{text}</small></span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            ))}
          </nav>
        </div>
      </main>
    </>
  )
}
