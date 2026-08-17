import { useNavigate } from 'react-router-dom'

export default function SectionLink({ sectionId, children, className = '', onNavigate, ...props }) {
  const navigate = useNavigate()
  const goToSection = (event) => {
    event.preventDefault()
    onNavigate?.()
    navigate('/', { state: { sectionId } })
  }
  return <a className={`section-link ${className}`.trim()} href="/" onClick={goToSection} {...props}>{children}</a>
}
