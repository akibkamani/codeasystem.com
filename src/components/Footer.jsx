import { ArrowUpRight } from 'lucide-react'
import SectionLink from './SectionLink'

// The larger JPEG remains available for social previews. This compact WebP is
// sufficient for the footer's small rendered logo.
const logoPath = '/codeasystem-logo.webp'

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><a className="brand" href="/"><img className="brand-mark" src={logoPath} width="88" height="88" alt="" decoding="async"/><span>CodeASystem</span></a><p>AI products, backend systems and custom software built around the work that matters.</p></div><div className="footer-column"><span>Explore</span><SectionLink sectionId="solutions">Solutions</SectionLink><SectionLink sectionId="services">Services</SectionLink><SectionLink sectionId="products">Products</SectionLink><SectionLink sectionId="pricing">Pricing</SectionLink></div><div className="footer-column"><span>Connect</span>{[['LinkedIn', 'https://www.linkedin.com/company/codeasystem/'], ['Instagram', 'https://www.instagram.com/codeasystem'], ['Facebook', 'https://www.facebook.com/codeasystem'], ['YouTube', 'https://www.youtube.com/@codeasyst']].map(([label, url]) => <a href={url} target="_blank" rel="noreferrer" key={label}>{label} <ArrowUpRight size={12}/></a>)}</div><div className="footer-column"><span>Legal</span><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Use</a></div></div><div className="container footer-bottom"><span>© 2026 CodeASystem</span><span>Independent software studio</span></div></footer>
}
