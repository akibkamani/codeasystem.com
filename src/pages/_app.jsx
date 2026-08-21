import '../styles.css'
import '../ticker.css'
import '../brand.css'
import '../hero-visual.css'
import '../interactions.css'
import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
    <>
      <SiteHeader />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
