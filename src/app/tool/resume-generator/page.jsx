import ResumeGenerator from '@/components/ResumeGenerator'
import PageShell from '@/components/PageShell'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.resumeGenerator)
export const metadata = pageMetadata(seo)

export default function ResumeGeneratorToolPage() {
  return <PageShell structuredData={getStructuredData(seo)} hideHeader hideFooter><ResumeGenerator /></PageShell>
}
