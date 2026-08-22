'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import SectionLink from './SectionLink'

const sections = [['01', 'Solutions', 'solutions'], ['02', 'Services', 'services'], ['03', 'Products', 'products'], ['04', 'Pricing', 'pricing']]
const logoPath = '/codeasystem-logo.webp'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  useEffect(() => {
    const onEscape = (event) => event.key === 'Escape' && closeMenu()
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', menuOpen)
    return () => document.body.classList.remove('mobile-nav-active')
  }, [menuOpen])

  return <header className={`nav-wrap ${menuOpen ? 'menu-open' : ''}`}>
    <nav className="nav container">
      <a className="brand" href="/" aria-label="CodeASystem home"><img className="brand-mark" src={logoPath} width="44" height="44" alt="" decoding="async"/><span>CodeASystem</span></a>
      <div className="nav-links">{sections.map(([, label, id]) => <SectionLink sectionId={id} key={id}>{label}</SectionLink>)}</div>
      <SectionLink className="button button-small" sectionId="contact">Start a project <ArrowUpRight size={15}/></SectionLink>
      <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X/> : <Menu/>}</button>
    </nav>
    {menuOpen && <><button className="mobile-menu-backdrop" onClick={closeMenu} aria-label="Close navigation" />
      <div className="mobile-menu" id="mobile-navigation"><div className="mobile-menu-inner container"><p className="mobile-menu-label">Explore CodeASystem</p><div className="mobile-menu-links">{sections.map(([number, label, id]) => <SectionLink sectionId={id} onNavigate={closeMenu} key={id}><span>{number}</span><strong>{label}</strong><ArrowUpRight size={19}/></SectionLink>)}</div><SectionLink className="mobile-menu-cta" sectionId="contact" onNavigate={closeMenu}><span>Have a project in mind?</span><strong>Start a project <ArrowUpRight size={17}/></strong></SectionLink><div className="mobile-menu-note"><span></span> Independent software studio</div></div></div>
    </>}
  </header>
}
