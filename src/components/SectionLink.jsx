'use client'

export default function SectionLink({ sectionId, children, className = '', onNavigate, ...props }) {
  const goToSection = () => {
    onNavigate?.()
  }
  return <a className={`section-link ${className}`.trim()} href={`/#${sectionId}`} onClick={goToSection} {...props}>{children}</a>
}
