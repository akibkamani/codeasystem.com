'use client'

import { ArrowLeft, ChevronDown, ChevronUp, Download, FileImage, FileJson, FileText, FolderOpen, Plus, Share2, Trash2, X } from 'lucide-react'
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { decodeResume, encodeResume, loadSavedResume, normaliseResume, resumeStorageKey, starterResume } from '@/lib/resumeData'
import { A4_PREVIEW_HEIGHT, A4_PREVIEW_WIDTH } from '@/lib/resumeLayout'

const DESIGN_COLOURS = ['#635bff', '#2563eb', '#087f5b', '#c2410c', '#be123c', '#172033']
const DESIGN_FONTS = [['sans', 'Modern', 'Clear and neutral'], ['serif', 'Classic', 'Traditional and warm'], ['mono', 'Technical', 'Structured and precise']]
const DESIGN_MARGINS = [['comfy', 'Comfy', 'More breathing room'], ['balanced', 'Balanced', 'A practical default'], ['tight', 'Tight', 'Fit more on one page']]
const COLLECTIONS = {
  experience: { blank: { role: '', company: '', dateMode: 'year', startDate: '', endDate: '', current: false, content: '' }, itemLabel: 'experience' },
  education: { blank: { degree: '', school: '', startYear: '', endYear: '' }, itemLabel: 'education' },
}

export default function ResumeGenerator() {
  const [resume, setResume] = useState(starterResume)
  const [hydrated, setHydrated] = useState(false)
  const [tab, setTab] = useState('content')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [jpgPreview, setJpgPreview] = useState(null)
  const importRef = useRef(null)
  const paperRef = useRef(null)
  useEffect(() => {
    let active = true
    const hydrate = async () => {
      const encoded = new URLSearchParams(window.location.hash.slice(1)).get('resume')
      try {
        const initial = encoded ? await decodeResume(encoded) : loadSavedResume()
        if (active) setResume(initial)
      } catch {
        if (active) { setResume(loadSavedResume()); setError('This resume link is invalid or damaged. Your saved resume was opened instead.') }
      } finally {
        if (active) setHydrated(true)
      }
    }
    hydrate()
    return () => { active = false }
  }, [])
  useEffect(() => { if (!hydrated) return; try { window.localStorage.setItem(resumeStorageKey, JSON.stringify(resume)) } catch {} }, [resume, hydrated])
  const update = useCallback((field, value) => setResume((r) => ({ ...r, [field]: value })), [])
  const section = useCallback((name, field, value) => setResume((r) => ({ ...r, [name]: { ...r[name], [field]: value } })), [])
  const exportJson = () => { const url = URL.createObjectURL(new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = 'my-resume.json'; a.click(); URL.revokeObjectURL(url) }
  const importJson = (event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { setResume(normaliseResume(JSON.parse(String(reader.result)))); setError('') } catch { setError('That file is not valid resume JSON.') } }; reader.readAsText(file); event.target.value = '' }
  const createShareUrl = useCallback(async () => {
    try {
      const encoded = await encodeResume(resume)
      const shareUrl = window.location.origin + '/tool/resume-generator/preview/#resume=' + encoded
      setError('')
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(shareUrl)
          setNotice('Share link copied. Anyone with it can read the resume details.')
        } catch {
          setNotice('The preview link is ready. Copy it from the address bar to share it.')
          window.location.href = shareUrl
        }
      } else {
        window.location.href = shareUrl
      }
    } catch {
      setNotice('')
      setError('The share link could not be created in this browser.')
    }
  }, [resume])
  const createJpg = useCallback(async () => {
    try {
      setNotice('Preparing your JPG...')
      const preview = await exportJpg(paperRef.current, resume)
      setJpgPreview(preview)
      setNotice('JPG ready to review.')
      setError('')
    } catch {
      setNotice('')
      setError('The JPG could not be created in this browser.')
    }
  }, [resume])
  const printPdf = useCallback(() => window.print(), [])
  const closeJpgPreview = useCallback(() => {
    setJpgPreview((preview) => {
      if (preview) URL.revokeObjectURL(preview.url)
      return null
    })
    setNotice('')
  }, [])
  return <main className="rg-app">
    <header className="rg-toolbar no-print"><a href="/tools/"><ArrowLeft size={15} /> All tools</a><div><span>Saved on this device</span><ExportMenu onPdf={printPdf} onJpg={createJpg} onShare={createShareUrl} /></div></header>
    {(notice || error) && <div className={'rg-toast no-print ' + (error ? 'is-error' : '')} role="status">{error || notice}</div>}
    <section className="rg-workspace"><aside className="rg-editor no-print"><div className="rg-editor-nav"><nav className="rg-tabs"><button className={tab === 'content' ? 'active' : ''} onClick={() => setTab('content')}>Content</button><button className={tab === 'design' ? 'active' : ''} onClick={() => setTab('design')}>Design</button><button className={tab === 'json' ? 'active' : ''} onClick={() => setTab('json')}>JSON</button></nav>{tab === 'content' && <nav className="rg-jump-nav" aria-label="Jump to resume section"><a href="#rg-basics">Basics</a><a href="#rg-links">Links</a><a href="#rg-profile">Profile</a><a href="#rg-experience">Experience</a><a href="#rg-education">Education</a><a href="#rg-other">Other</a></nav>}</div>
      {tab === 'content' && <Content resume={resume} update={update} section={section} setResume={setResume} />}
      {tab === 'design' && <Design resume={resume} setResume={setResume} />}
      {tab === 'json' && <JsonEditor resume={resume} setResume={setResume} importRef={importRef} importJson={importJson} exportJson={exportJson} setError={setError} />}
    </aside><PreviewViewport resume={resume} paperRef={paperRef} /></section>
    {jpgPreview && <JpgPreview preview={jpgPreview} onClose={closeJpgPreview} />}
    <footer className="rg-footer">Built with 💚 by <a href="https://codeasystem.com">codeasystem.com</a></footer>
  </main>
}

function JpgPreview({ preview, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  return <div className="rg-jpg-backdrop no-print" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="rg-jpg-dialog" role="dialog" aria-modal="true" aria-labelledby="rg-jpg-title"><header><div><p>Image export</p><h2 id="rg-jpg-title">Review your JPG</h2><span>{preview.pages === 1 ? 'One A4 page' : preview.pages + ' A4 pages side by side'} · {preview.width} × {preview.height}px</span></div><button onClick={onClose} aria-label="Close JPG preview"><X size={19} /></button></header><div className="rg-jpg-image"><img src={preview.url} alt="JPG preview of the resume" /></div><footer><button onClick={onClose}>Keep editing</button><a href={preview.url} download={preview.filename}><Download size={16} /> Download JPG</a></footer></section></div>
}

const ExportMenu = memo(function ExportMenu({ onPdf, onJpg, onShare }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState('')
  const menuRef = useRef(null)
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' || (event.type === 'pointerdown' && !menuRef.current?.contains(event.target))) setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [])
  const run = async (name, action) => {
    setBusy(name)
    try { await action() } finally { setBusy(''); setOpen(false) }
  }
  return <div className="rg-export" ref={menuRef}><button aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}><Download size={16} /> Export <ChevronDown size={14} /></button>{open && <div className="rg-export-menu" role="menu"><button role="menuitem" onClick={() => run('pdf', onPdf)}><FileText size={17} /><span><b>PDF</b><small>Print-ready A4 document</small></span></button><button role="menuitem" disabled={Boolean(busy)} onClick={() => run('jpg', onJpg)}><FileImage size={17} /><span><b>{busy === 'jpg' ? 'Creating JPG...' : 'JPG'}</b><small>Optimised A4 image</small></span></button><button role="menuitem" disabled={Boolean(busy)} onClick={() => run('share', onShare)}><Share2 size={17} /><span><b>Share</b><small>Copy a shareable preview link</small></span></button></div>}</div>
})

async function exportJpg(paper, resume) {
  if (!paper) throw new Error('Resume preview is unavailable')
  await document.fonts?.ready
  const pageCount = Math.max(1, Math.ceil(paper.scrollHeight / A4_PREVIEW_HEIGHT))
  const { toCanvas } = await import('html-to-image')
  const source = await toCanvas(paper, {
    backgroundColor: '#ffffff',
    height: pageCount * A4_PREVIEW_HEIGHT,
    width: A4_PREVIEW_WIDTH,
    pixelRatio: 2,
    style: { position: 'static', transform: 'none', boxShadow: 'none', height: pageCount * A4_PREVIEW_HEIGHT + 'px' },
  })
  const pageWidth = 1240
  const pageHeight = 1754
  const inset = 20
  const outer = pageCount === 1 ? 0 : 24
  const gap = pageCount === 1 ? 0 : 24
  const output = document.createElement('canvas')
  output.width = pageCount * pageWidth + gap * (pageCount - 1) + outer * 2
  output.height = pageHeight + outer * 2
  const context = output.getContext('2d', { alpha: false })
  context.fillStyle = pageCount === 1 ? '#ffffff' : '#e8ebe3'
  context.fillRect(0, 0, output.width, output.height)
  const sourcePageHeight = source.height / pageCount
  for (let page = 0; page < pageCount; page += 1) {
    const x = outer + page * (pageWidth + gap)
    context.fillStyle = '#ffffff'
    context.fillRect(x, outer, pageWidth, pageHeight)
    context.drawImage(source, 0, page * sourcePageHeight, source.width, sourcePageHeight, x + inset, outer + inset, pageWidth - inset * 2, pageHeight - inset * 2)
  }
  const blob = await new Promise((resolve) => output.toBlob(resolve, 'image/jpeg', .88))
  if (!blob) throw new Error('JPG encoding failed')
  return {
    url: URL.createObjectURL(blob),
    filename: (resume.name || 'my-resume').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg',
    pages: pageCount,
    width: output.width,
    height: output.height,
  }
}

function Content({ resume, update, section, setResume }) {
  const item = (name, index, field, value) => setResume((r) => ({ ...r, [name]: { ...r[name], items: r[name].items.map((x, i) => i === index ? { ...x, [field]: value } : x) } }))
  return <div className="rg-editor-content"><section className="rg-panel" id="rg-basics"><h2>The basics</h2><div className="rg-grid"><Field label="Full name" value={resume.name} onChange={(v) => update('name', v)} /><Field label="Professional title" value={resume.title} onChange={(v) => update('title', v)} /><Field label="Email" value={resume.email} onChange={(v) => update('email', v)} /><Field label="Phone" value={resume.phone} onChange={(v) => update('phone', v)} /><Field label="Location" value={resume.location} onChange={(v) => update('location', v)} /></div></section>
    <div id="rg-links"><Links resume={resume} setResume={setResume} /></div>
    <section className="rg-panel" id="rg-profile"><SectionHead title="Profile" value={resume.profile} onTitle={(v) => section('profile', 'title', v)} onLayout={(v) => section('profile', 'layout', Number(v))} /><Area label="About you" value={resume.profile.content} onChange={(v) => section('profile', 'content', v)} /><Toggle value={resume.profile.markdown} onChange={(v) => section('profile', 'markdown', v)} /></section>
    <OrderedSections resume={resume} section={section} item={item} setResume={setResume} /></div>
}
function Links({ resume, setResume }) { const update = (i, f, v) => setResume((r) => ({ ...r, socials: r.socials.map((x, n) => n === i ? { ...x, [f]: v } : x) })); return <section className="rg-panel"><h2>Links & socials</h2>{resume.socials.map((x, i) => <div className="rg-social-row" key={i}><Field label="Label" value={x.label} onChange={(v) => update(i, 'label', v)} /><Field label="URL" value={x.url} onChange={(v) => update(i, 'url', v)} /><button aria-label={'Remove ' + (x.label || 'link')} className="rg-icon-button" onClick={() => confirmRemoval('Remove this link?', () => setResume((r) => ({ ...r, socials: r.socials.filter((_, n) => n !== i) })))}><Trash2 size={15} /></button></div>)}<button className="rg-add" onClick={() => setResume((r) => ({ ...r, socials: [...r.socials, { label: '', url: '' }] }))}><Plus size={15} /> Add link</button></section> }
function Collection({ title, name, value, fields, labels, onSection, onItem, setResume, move }) { const { blank, itemLabel } = COLLECTIONS[name]; return <section className="rg-panel rg-sortable-panel"><SectionHead title={title} value={value} onTitle={(v) => onSection(name, 'title', v)} onLayout={(v) => onSection(name, 'layout', Number(v))} move={move} />{value.items.map((x, i) => <div className="rg-item" key={i}><div className="rg-grid">{fields.map((f, n) => <Field key={f} label={labels[n]} value={x[f] || ''} onChange={(v) => onItem(name, i, f, v)} />)}{name === 'experience' ? <ExperienceDates item={x} onChange={(field, value) => onItem(name, i, field, value)} /> : <EducationDates item={x} onChange={(field, value) => onItem(name, i, field, value)} />}{name === 'experience' && <Area label="Description" value={x.content || ''} onChange={(v) => onItem(name, i, 'content', v)} />}</div>{name === 'experience' && <Toggle value={x.markdown} onChange={(v) => onItem(name, i, 'markdown', v)} />}<button className="rg-remove" onClick={() => confirmRemoval('Remove this ' + itemLabel + ' entry?', () => setResume((r) => ({ ...r, [name]: { ...r[name], items: r[name].items.filter((_, n) => n !== i) } })))}>Remove</button></div>)}<button className="rg-add" onClick={() => setResume((r) => ({ ...r, [name]: { ...r[name], items: [...r[name].items, { ...blank }] } }))}><Plus size={15} /> Add {itemLabel}</button></section> }
function OrderedSections({ resume, section, item, setResume }) {
  const customSections = useMemo(() => new Map(resume.sections.map((entry) => [entry.id, entry])), [resume.sections])
  const move = (id, direction) => setResume((current) => { const order = [...current.sectionOrder]; const index = order.indexOf(id); const target = index + direction; if (index < 0 || target < 0 || target >= order.length) return current; [order[index], order[target]] = [order[target], order[index]]; return { ...current, sectionOrder: order } })
  const controls = (id, index) => ({ up: index > 0 ? () => move(id, -1) : null, down: index < resume.sectionOrder.length - 1 ? () => move(id, 1) : null })
  const updateCustom = (id, field, value) => setResume((current) => ({ ...current, sections: current.sections.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry) }))
  const removeCustom = (id) => setResume((current) => ({ ...current, sections: current.sections.filter((entry) => entry.id !== id), sectionOrder: current.sectionOrder.filter((entry) => entry !== id) }))
  const addCustom = () => setResume((current) => { const id = 'custom-' + Date.now(); return { ...current, sections: [...current.sections, { id, title: 'New section', content: '', layout: 1 }], sectionOrder: [...current.sectionOrder, id] } })
  return <>{resume.sectionOrder.map((id, index) => {
    if (id === 'experience') return <div className="rg-sortable-section" id="rg-experience" key={id}><Collection title="Experience" name="experience" value={resume.experience} fields={['role', 'company']} labels={['Role', 'Company']} onSection={section} onItem={item} setResume={setResume} move={controls(id, index)} /></div>
    if (id === 'education') return <div className="rg-sortable-section" id="rg-education" key={id}><Collection title="Education" name="education" value={resume.education} fields={['degree', 'school']} labels={['Degree or course', 'School']} onSection={section} onItem={item} setResume={setResume} move={controls(id, index)} /></div>
    const custom = customSections.get(id)
    return custom ? <section className="rg-panel rg-sortable-section rg-sortable-panel" key={id}><SectionHead title="Custom section" value={custom} onTitle={(value) => updateCustom(id, 'title', value)} onLayout={(value) => updateCustom(id, 'layout', Number(value))} move={controls(id, index)} /><Area label="Content" value={custom.content || ''} onChange={(value) => updateCustom(id, 'content', value)} /><Toggle value={custom.markdown} onChange={(value) => updateCustom(id, 'markdown', value)} /><button className="rg-remove" onClick={() => confirmRemoval('Remove this section?', () => removeCustom(id))}>Remove section</button></section> : null
  })}<div className="rg-add-section" id="rg-other"><button className="rg-add" onClick={addCustom}><Plus size={15} /> Add section</button></div></>
}
function Design({ resume, setResume }) { const update = (f, v) => setResume((r) => ({ ...r, theme: { ...r.theme, [f]: v } })); return <div className="rg-design"><header><span>DESIGN</span><h2>Make it feel like yours</h2><p>Simple choices that keep the resume readable.</p></header><section className="rg-design-card"><div><b>Page margin</b><span>Used in both the preview and exported PDF</span></div><div className="rg-margin-grid">{DESIGN_MARGINS.map(([value, name, note]) => <button key={value} className={resume.theme.margin === value ? 'active' : ''} onClick={() => update('margin', value)}><i /><b>{name}</b><span>{note}</span></button>)}</div></section><section className="rg-design-card"><div><b>Accent colour</b><span>Used for headings and key details</span></div><div className="rg-colour-grid">{DESIGN_COLOURS.map((colour) => <button key={colour} aria-label={'Use ' + colour} className={resume.theme.accent === colour ? 'active' : ''} style={{ '--swatch': colour }} onClick={() => update('accent', colour)} />)}<label className="rg-custom-colour"><input type="color" value={resume.theme.accent} onChange={(e) => update('accent', e.target.value)} /><span>+</span></label></div></section><section className="rg-design-card"><div><b>Typeface</b><span>Applied across the whole document</span></div><div className="rg-font-grid">{DESIGN_FONTS.map(([value, name, note]) => <button key={value} className={(resume.theme.font === value ? 'active ' : '') + 'font-' + value} onClick={() => update('font', value)}><i>Aa</i><b>{name}</b><span>{note}</span></button>)}</div></section></div> }
function JsonEditor({ resume, setResume, importRef, importJson, exportJson, setError }) {
  const [draft, setDraft] = useState(() => JSON.stringify(resume, null, 2))
  useEffect(() => { setDraft(JSON.stringify(resume, null, 2)) }, [resume])
  const apply = () => { try { const parsed = JSON.parse(draft); if (!parsed?.profile || !parsed?.experience?.items) throw new Error(); setResume(normaliseResume(parsed)); setError('') } catch { setError('The JSON is invalid or is missing profile and experience.items.') } }
  return <section className="rg-json-panel"><header><h2>Edit the current resume JSON</h2><p>This is the live structure used by the editor. Change it here, then apply it to the preview.</p></header><div className="rg-json-actions"><button onClick={apply}>Apply JSON</button><button className="secondary" onClick={() => importRef.current?.click()}><FolderOpen size={16} /> Import</button><button className="secondary" onClick={exportJson}><FileJson size={16} /> Export</button></div><input ref={importRef} className="rg-file" type="file" accept=".json,application/json" onChange={importJson} /><textarea aria-label="Resume JSON" className="rg-json-editor" spellCheck="false" value={draft} onChange={(event) => setDraft(event.target.value)} /></section>
}
function ExperienceDates({ item, onChange }) { return <><label className="rg-label">Date format<select value={item.dateMode || 'year'} onChange={(event) => onChange('dateMode', event.target.value)}><option value="year">Year only</option><option value="month">Month and year</option></select></label><Field label="Start date" value={item.startDate || ''} placeholder={item.dateMode === 'month' ? 'Jan 2016' : '2016'} onChange={(value) => onChange('startDate', value)} /><Field label="End date" value={item.current ? 'Present' : item.endDate || ''} placeholder={item.dateMode === 'month' ? 'Mar 2020' : '2020'} disabled={item.current} onChange={(value) => onChange('endDate', value)} /><label className="rg-present-toggle"><input type="checkbox" checked={Boolean(item.current)} onChange={(event) => onChange('current', event.target.checked)} /><span>I currently work here</span></label></> }
function EducationDates({ item, onChange }) { return <><Field label="Start year" value={item.startYear || ''} placeholder="2016" onChange={(value) => onChange('startYear', value.replace(/\D/g, '').slice(0, 4))} /><Field label="End year" value={item.endYear || ''} placeholder="2020" onChange={(value) => onChange('endYear', value.replace(/\D/g, '').slice(0, 4))} /></> }
function SectionHead({ title, value, onTitle, onLayout, move }) { return <div className="rg-section-head"><Field label="Section title" value={value.title || title} onChange={onTitle} /><Layout value={value.layout} onChange={onLayout} />{move && <div className="rg-move-control"><span>Reorder section</span><div className="rg-move-buttons"><button disabled={!move.up} onClick={move.up} aria-label={'Move ' + (value.title || title) + ' up'}><ChevronUp size={15} /></button><button disabled={!move.down} onClick={move.down} aria-label={'Move ' + (value.title || title) + ' down'}><ChevronDown size={15} /></button></div></div>}</div> }
function Layout({ value, onChange }) { return <label className="rg-label">Layout<select value={value || 1} onChange={(e) => onChange(e.target.value)}><option value="1">Layout 1</option><option value="2">Layout 2</option></select></label> }
function Field({ label, value, onChange, placeholder = '', disabled = false }) { return <label className="rg-label">{label}<input value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} /></label> }
function Area({ label, value, onChange }) { return <label className="rg-label">{label}<textarea rows="4" value={value} onChange={(e) => onChange(e.target.value)} /></label> }
function Toggle({ value, onChange }) { return <label className="rg-toggle"><input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} /><span>Render this content as Markdown</span></label> }
const PreviewViewport = memo(function PreviewViewport({ resume, paperRef }) {
  const canvasRef = useRef(null)
  const [view, setView] = useState({ scale: .7, height: A4_PREVIEW_HEIGHT })
  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const paper = paperRef.current
    if (!canvas || !paper) return
    const fit = () => {
      const heightScale = window.innerWidth <= 850 ? 1 : Math.max(.35, (canvas.clientHeight - 36) / A4_PREVIEW_HEIGHT)
      const scale = Math.min(1, Math.max(.35, (canvas.clientWidth - 36) / A4_PREVIEW_WIDTH), heightScale)
      setView({ scale, height: Math.max(A4_PREVIEW_HEIGHT, paper.scrollHeight) })
    }
    const observer = new ResizeObserver(fit)
    observer.observe(canvas)
    observer.observe(paper)
    fit()
    return () => observer.disconnect()
  }, [resume])
  const pages = Math.max(1, Math.ceil(view.height / A4_PREVIEW_HEIGHT))
  return <section ref={canvasRef} className="rg-canvas" aria-label="Resume preview"><div className="rg-preview-status no-print"><b>A4 preview</b>{pages > 1 && <span>{pages} pages, shorten your resume</span>}</div><div className="rg-page-stage" style={{ width: A4_PREVIEW_WIDTH * view.scale, height: view.height * view.scale }}><ResumeDocument resume={resume} paperRef={paperRef} scale={view.scale} />{Array.from({ length: pages - 1 }, (_, index) => <div className="rg-page-break no-print" key={index} style={{ top: (index + 1) * A4_PREVIEW_HEIGHT * view.scale }}><span>Page break</span></div>)}</div></section>
})
export const ResumeDocument = memo(function ResumeDocument({ resume, paperRef, scale = 1 }) {
  const socials = resume.socials.filter((x) => x.url)
  const customSections = useMemo(() => new Map(resume.sections.map((entry) => [entry.id, entry])), [resume.sections])
  const renderSection = (id) => {
    if (id === 'experience') return <PSection data={resume.experience} key={id}>{resume.experience.items.filter((x) => x.role || x.company).map((x, i) => <article className="rg-experience" key={i}><div><h3>{x.role}</h3><b>{x.company}</b></div><time>{formatExperienceDate(x)}</time><Rich content={x.content} markdown={x.markdown} /></article>)}</PSection>
    if (id === 'education') return <PSection data={resume.education} key={id}>{resume.education.items.filter((x) => x.school || x.degree).map((x, i) => <article className="rg-education" key={i}><div><b>{x.degree}</b><span>{x.school}</span></div><time>{formatEducationDate(x)}</time></article>)}</PSection>
    const custom = customSections.get(id)
    return custom ? <PSection data={custom} key={id}><Rich content={custom.content} markdown={custom.markdown} /></PSection> : null
  }
  return <article ref={paperRef} className={'rg-paper rg-font-' + resume.theme.font + ' rg-margin-' + resume.theme.margin} style={{ '--accent': resume.theme.accent, transform: 'scale(' + scale + ')' }}><header><div><h1>{resume.name || 'Your name'}</h1><p>{resume.title}</p></div><div className="rg-contact">{[resume.email, resume.phone, resume.location].filter(Boolean).map((x) => <span key={x}>{x}</span>)}{socials.map((x) => <a key={x.url} href={url(x.url)}>{x.label || x.url}</a>)}</div></header><PSection data={resume.profile}><Rich content={resume.profile.content} markdown={resume.profile.markdown} /></PSection><div className="rg-resume-sections">{resume.sectionOrder.map(renderSection)}</div></article>
})
function PSection({ data, children }) { return data?.title ? <section className={'rg-preview-section layout-' + (data.layout || 1)}><h2>{data.title}</h2>{children}</section> : null }
function Rich({ content = '', markdown }) { if (!markdown) return <p>{content}</p>; const lines = content.split('\n'); const blocks = []; for (let index = 0; index < lines.length;) { if (!lines[index].trim()) { index += 1; continue } if (/^[-*]\s+/.test(lines[index])) { const items = []; while (index < lines.length && /^[-*]\s+/.test(lines[index])) { items.push(lines[index].replace(/^[-*]\s+/, '')); index += 1 } blocks.push(<ul key={'list-' + index}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>); continue } blocks.push(<p key={'text-' + index}>{inline(lines[index])}</p>); index += 1 } return <div className="rg-rich">{blocks}</div> }
function inline(text) { return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^ )]+\))/g).map((x, i) => { if (/^\*\*.*\*\*$/.test(x)) return <strong key={i}>{x.slice(2, -2)}</strong>; if (/^\*.*\*$/.test(x)) return <em key={i}>{x.slice(1, -1)}</em>; const match = x.match(/^\[([^\]]+)\]\(([^ )]+)\)$/); return match ? <a key={i} href={url(match[2])}>{match[1]}</a> : x }) }
function url(value) { return /^https?:\/\//i.test(value) ? value : 'https://' + value }
function formatExperienceDate(item) { return [item.startDate, item.current ? 'Present' : item.endDate].filter(Boolean).join(' – ') }
function formatEducationDate(item) { return [item.startYear, item.endYear].filter(Boolean).join(' – ') }
function confirmRemoval(message, action) { if (window.confirm(message)) action() }
