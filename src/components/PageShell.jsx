import SiteHeader from './SiteHeader'
import Footer from './Footer'

export function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export default function PageShell({ children, structuredData, hideHeader = false, hideFooter = false }) {
  return <>{structuredData && <JsonLd data={structuredData} />}{!hideHeader && <SiteHeader />}{children}{!hideFooter && <Footer />}</>
}
