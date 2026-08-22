import Hero from '@/components/sections/Hero'
import Ticker from '@/components/sections/Ticker'
import Services from '@/components/sections/Services'
import Solutions from '@/components/sections/Solutions'
import WhyUs from '@/components/sections/WhyUs'
import Process from '@/components/sections/Process'
import Pricing from '@/components/sections/Pricing'
import Products from '@/components/sections/Products'
import Contact from '@/components/sections/Contact'
import PageShell from '@/components/PageShell'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.home)
export const metadata = pageMetadata(seo)

export default function HomePage() {
  return <PageShell structuredData={getStructuredData(seo)}><main id="top"><Hero /><Ticker /><Services /><Solutions /><WhyUs /><Process /><Pricing /><Products /><Contact /></main></PageShell>
}
