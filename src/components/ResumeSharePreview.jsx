'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ResumeDocument } from './ResumeGenerator'
import { createResumeTemplate, decodeResume, encodeResume } from '@/lib/resumeData'
import { A4_PREVIEW_HEIGHT, A4_PREVIEW_WIDTH } from '@/lib/resumeLayout'

export default function ResumeSharePreview() {
  const [resume, setResume] = useState(null)
  const [encoded, setEncoded] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [view, setView] = useState({ scale: .75, height: A4_PREVIEW_HEIGHT })
  const frameRef = useRef(null)
  const paperRef = useRef(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      const value = new URLSearchParams(window.location.hash.slice(1)).get('resume') || ''
      try {
        const decoded = await decodeResume(value)
        const template = await encodeResume(createResumeTemplate(decoded))
        if (active) { setEncoded(template); setResume(decoded) }
      } catch {
        if (active) setInvalid(true)
      }
    }
    load()
    return () => { active = false }
  }, [])

  useLayoutEffect(() => {
    const frame = frameRef.current
    const paper = paperRef.current
    if (!frame || !paper || !resume) return
    const fit = () => setView({ scale: Math.min(1, Math.max(.35, (frame.clientWidth - 32) / A4_PREVIEW_WIDTH)), height: Math.max(A4_PREVIEW_HEIGHT, paper.scrollHeight) })
    const observer = new ResizeObserver(fit)
    observer.observe(frame)
    observer.observe(paper)
    fit()
    return () => observer.disconnect()
  }, [resume])

  const pages = Math.max(1, Math.ceil(view.height / A4_PREVIEW_HEIGHT))
  const editUrl = '/tool/resume-generator/#resume=' + encoded

  return <main className="rsp-page">
    <nav className="rsp-actions" aria-label="Resume actions">
      <a href="/tool/resume-generator/">Build my resume</a>
      {encoded && <a className="primary" href={editUrl}>Use as a template</a>}
    </nav>
    {invalid ? <section className="rsp-invalid"><h2>This resume link is not available.</h2><p>It may be incomplete or damaged. You can still create your own resume for free.</p><a href="/tool/resume-generator/">Build my resume</a></section> : resume ? <section className="rsp-frame" ref={frameRef} aria-label="Shared resume"><div className="rsp-stage" style={{ width: A4_PREVIEW_WIDTH * view.scale, height: view.height * view.scale }}><ResumeDocument resume={resume} paperRef={paperRef} scale={view.scale} />{Array.from({ length: pages - 1 }, (_, index) => <div className="rsp-page-break" key={index} style={{ top: (index + 1) * A4_PREVIEW_HEIGHT * view.scale }} />)}</div></section> : <div className="rsp-loading">Opening resume...</div>}
    <footer className="rg-footer">Built with 💚 by <a href="https://codeasystem.com">codeasystem.com</a></footer>
  </main>
}
