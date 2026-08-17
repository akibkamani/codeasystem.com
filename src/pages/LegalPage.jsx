import { Navigate, useParams } from 'react-router-dom'
import { legalPages } from '../data/siteData'

export default function LegalPage() { const { page: slug } = useParams(); const page = legalPages[slug]; if (!page) return <Navigate to="/404" replace />; return <main className="legal-page"><div className="container legal-inner"><div className="eyebrow"><span/>{page.eyebrow}</div><h1>{page.title}</h1><p className="legal-updated">{page.updated}</p><div className="legal-sections">{page.sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2><p>{content}</p></section>)}</div></div></main> }
