import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { solutions } from '../data/siteData'

export default function CaseStudiesPage() { return <main className="case-studies-page"><div className="container case-studies-inner"><div className="eyebrow"><span/> Case studies</div><h1>Practical starting points for complex work.</h1><p className="case-studies-lead">These are the kinds of systems we build when teams need useful software, not a long slide deck. Each approach starts with the real workflow, then adapts to your data, people and goals.</p><div className="case-studies-list">{solutions.map(({ slug, title, text, tags }, index) => <Link to={`/case-study/${slug}`} key={slug}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div><small>{tags}</small><ArrowUpRight size={20}/></Link>)}</div></div></main> }
