import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Hero from '../components/sections/Hero'
import Ticker from '../components/sections/Ticker'

const Services = lazy(() => import('../components/sections/Services'))
const Solutions = lazy(() => import('../components/sections/Solutions'))
const WhyUs = lazy(() => import('../components/sections/WhyUs'))
const Process = lazy(() => import('../components/sections/Process'))
const Pricing = lazy(() => import('../components/sections/Pricing'))
const Products = lazy(() => import('../components/sections/Products'))
const Contact = lazy(() => import('../components/sections/Contact'))

function DeferredSection({ id, component: Component, minHeight }) {
  const ref = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) {
      setIsReady(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setIsReady(true)
      observer.disconnect()
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} id={isReady ? undefined : id} style={isReady ? undefined : { minHeight }}>
    {isReady && <Suspense fallback={null}><Component /></Suspense>}
  </div>
}

export default function HomePage() {
  return <main id="top"><Hero /><Ticker />
    <DeferredSection id="services" component={Services} minHeight="900px" />
    <DeferredSection id="solutions" component={Solutions} minHeight="850px" />
    <DeferredSection id="why" component={WhyUs} minHeight="650px" />
    <DeferredSection id="process" component={Process} minHeight="650px" />
    <DeferredSection id="pricing" component={Pricing} minHeight="700px" />
    <DeferredSection id="products" component={Products} minHeight="400px" />
    <DeferredSection id="contact" component={Contact} minHeight="650px" />
  </main>
}
