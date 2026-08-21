import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionLink from './SectionLink'

// The larger JPEG remains available for social previews. This compact WebP is
// sufficient for the footer's small rendered logo.
const logoPath = `${import.meta.env.BASE_URL}codeasystem-logo.webp`

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Link className="brand" to="/"><img className="brand-mark" src={logoPath} width="88" height="88" alt="" decoding="async"/><span>CodeASystem</span></Link><p>AI products, backend systems and custom software built around the work that matters.</p></div><div className="footer-column"><span>Explore</span><SectionLink sectionId="solutions">Solutions</SectionLink><SectionLink sectionId="services">Services</SectionLink><SectionLink sectionId="products">Products</SectionLink><SectionLink sectionId="pricing">Pricing</SectionLink></div><div className="footer-column"><span>Connect</span>{[['LinkedIn', 'https://www.linkedin.com/company/codeasystem/'], ['Instagram', 'https://www.instagram.com/codeasystem'], ['Facebook', 'https://www.facebook.com/codeasystem'], ['YouTube', 'https://www.youtube.com/@codeasyst']].map(([label, url]) => <a href={url} target="_blank" rel="noreferrer" key={label}>{label} <ArrowUpRight size={12}/></a>)}</div><div className="footer-column"><span>Legal</span><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Use</Link></div></div><div className="container footer-bottom"><span>© 2026 CodeASystem</span><span>Independent software studio</span><a href="https://www.bidboard.lol/site/codeasystem-com" target="_blank" rel="noreferrer"><img src="https://www.bidboard.lol/badge/codeasystem.com" alt="Bidboard" /></a></div></footer>
}
