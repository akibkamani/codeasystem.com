import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import HeroVisual from '../HeroVisual'
import SectionLink from '../SectionLink'

export default function Hero() {
  return <section className="hero container"><div className="hero-copy"><div className="eyebrow"><span/> Independent software studio</div><h1>Software that<br/><em>moves things forward.</em></h1><p>We build production-ready AI products, backend systems and custom software, from first idea to deployment.</p><div className="hero-actions"><SectionLink className="button" sectionId="contact">Start a project <ArrowUpRight size={17}/></SectionLink><SectionLink className="text-button" sectionId="solutions">Explore solutions <ArrowRight size={17}/></SectionLink></div><div className="hero-note"><Check size={15}/> Async-first. No unnecessary sales meetings.</div></div><HeroVisual /></section>
}
