import { ArrowUpRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import PageShell from '@/components/PageShell'
import { solutions } from '@/data/siteData'
import { getCaseStudySeo } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

export const dynamicParams = false
export function generateStaticParams() { return solutions.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }) {
  const { slug } = await params
  const study = solutions.find((item) => item.slug === slug)
  return study ? pageMetadata(getCaseStudySeo(study.slug)) : {}
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const study = solutions.find((item) => item.slug === slug)
  if (!study) notFound()
  const seo = getCaseStudySeo(study.slug)
  return <PageShell structuredData={getStructuredData(seo)}><main className="case-study-page"><div className="case-study-content"><div className="container case-study-inner"><a className="case-study-back" href="/case-study/">← All case studies</a><div className="eyebrow"><span /> Solution case study</div><h1>{study.title}</h1><p className="case-study-lead">{study.text}</p><div className="case-study-grid"><article><span>The challenge</span><p>{study.challenge}</p></article><article><span>How we would build it</span><p>{study.approach}</p></article><article><span>How it helps your organisation</span><p>{study.impact}</p></article></div><a className="solutions-linkedin-banner" href="https://www.linkedin.com/company/codeasystem/" target="_blank" rel="noreferrer"><span className="linkedin-banner-mark">in</span><div><span className="linkedin-banner-eyebrow">Interested in this approach?</span><strong>Talk to us on LinkedIn.</strong><small>Tell us what you are working on and we will reply with the right next questions.</small></div><ArrowUpRight size={28} /></a></div></div></main></PageShell>
}
