import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import './styles.css'
import './ticker.css'
import './brand.css'
import './hero-visual.css'
import './interactions.css'

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)