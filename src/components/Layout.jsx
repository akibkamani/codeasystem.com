import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'
import SiteHeader from './SiteHeader'

export default function Layout({ children }) {
  const { pathname, state } = useLocation()
  useEffect(() => {
    if (state?.sectionId) {
      document.getElementById(state.sectionId)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, state])
  return <><SiteHeader />{children}<Footer /></>
}
