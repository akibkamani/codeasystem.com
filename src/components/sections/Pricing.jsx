import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SectionLink from '../SectionLink'
export default function Pricing() {
	const [currency, setCurrency] = useState('USD')

	useEffect(() => {
		const language = navigator.language || ''
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
		if (language.endsWith('-IN') || timeZone === 'Asia/Kolkata') {
			setCurrency('INR')
		}
	}, [])

	const prices = currency === 'INR' ? { starter: '₹50K', dedicated: '₹2L', period: '/month' } : { starter: '$600', dedicated: '$2.4K', period: '/month' }

	return <section className="container section pricing" id="pricing"><div className="section-intro"><div><div className="eyebrow"><span/> Pricing</div><h2>Flexible ways<br/>to work together.</h2></div><div className="pricing-note"><p>Every project is different. These starting points help you understand where we fit.</p><div className="currency-toggle" aria-label="Choose currency"><button className={currency === 'USD' ? 'active' : ''} onClick={() => setCurrency('USD')}>USD $</button><button className={currency === 'INR' ? 'active' : ''} onClick={() => setCurrency('INR')}>INR ₹</button></div></div></div><div className="price-grid"><article><span>Starter Build</span><h3>{prices.starter}<sup>+</sup></h3><p>Websites, integrations, small AI systems and automation.</p><SectionLink className="price-action" sectionId="contact">Talk about a starter build <ArrowRight size={16}/></SectionLink></article><article className="price-featured"><span>Custom Development</span><h3>Let’s talk</h3><p>SaaS products, AI platforms and backend systems built around your needs.</p><SectionLink className="button" sectionId="contact">Start a project <ArrowUpRight size={16}/></SectionLink></article><article><span>Dedicated Engineering</span><h3>{prices.dedicated}<sup>+</sup><small>{prices.period}</small></h3><p>Ongoing product and engineering work for teams that need momentum.</p><SectionLink className="price-action" sectionId="contact">Explore an engagement <ArrowRight size={16}/></SectionLink></article></div></section>
}
