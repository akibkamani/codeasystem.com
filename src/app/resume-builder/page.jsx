import { ArrowRight, Check, FileJson, LayoutTemplate, LockKeyhole, Sparkles } from 'lucide-react'
import PageShell from '@/components/PageShell'
import { pageSeo, withSeoUrl } from '@/data/seo'
import { getStructuredData, pageMetadata } from '@/data/nextSeo'

const seo = withSeoUrl(pageSeo.resumeBuilder)
export const metadata = pageMetadata(seo)

const benefits = [
  [LayoutTemplate, 'Write and preview together', 'Edit your content beside a true A4 preview, so you can see the final document take shape.'],
  [Sparkles, 'Keep the design focused', 'Choose the typeface, accent colour, margins and section order without fighting a complicated template editor.'],
  [FileJson, 'Take your data with you', 'Import or export JSON whenever you want. It is useful for backups, moving devices or working with an agent.'],
]

export default function ResumeBuilderPage() {
  return (
    <PageShell structuredData={getStructuredData(seo)}>
      <main className="rb-page">
        <section className="rb-hero">
          <div className="container rb-hero-grid">
            <div className="rb-hero-copy">
              <p className="rb-kicker"><span /> Free, private and practical</p>
              <h1>Make a resume that is easy to <em>read.</em></h1>
              <p className="rb-hero-sub">Build a clear one-page resume, see every change as you make it, then save it as a clean PDF. No account, watermark or paywall.</p>
              <div className="rb-hero-actions">
                <a className="rb-primary" href="/tool/resume-generator/">Start building <ArrowRight size={17} /></a>
                <span>Free forever. Your data stays local.</span>
              </div>
              <ul className="rb-checks" aria-label="Builder highlights">
                <li><Check size={15} /> A4 live preview</li>
                <li><Check size={15} /> ATS-friendly layout</li>
                <li><Check size={15} /> PDF and JSON export</li>
              </ul>
            </div>
            <div className="rb-preview" aria-hidden="true">
              <div className="rb-preview-toolbar"><i /><i /><i /><span>Live A4 preview</span></div>
              <div className="rb-preview-body">
                <aside><b>Content</b><span /><span /><span /><span /><strong>Experience</strong><span /><span /></aside>
                <article><header><div><b>John Doe</b><span>Chief Technology Officer</span></div><small>john.doe@example.com<br />Example City</small></header><section><b>Profile</b><p /><p /></section><section><b>Experience</b><h3>Chief Technology Officer</h3><span>CodeASystem</span><p /><p /><p /></section><section><b>Education</b><p /></section></article>
              </div>
            </div>
          </div>
        </section>

        <section className="rb-trust"><div className="container"><LockKeyhole size={18} /><p><strong>Your resume stays on your device.</strong> The builder stores your work in your browser and does not upload it to our servers.</p></div></section>

        <section className="rb-benefits container">
          <div className="rb-section-head"><p className="eyebrow"><span /> Built for the task</p><h2>Useful controls, without the clutter.</h2><p>Everything is arranged around one simple flow: write, review and export.</p></div>
          <div className="rb-benefit-grid">{benefits.map(([Icon, title, copy]) => <article key={title}><span><Icon size={20} /></span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>

        <section className="rb-steps-section"><div className="container rb-steps-layout"><div className="rb-section-head"><p className="eyebrow"><span /> How it works</p><h2>From blank page to PDF in three steps.</h2></div><ol className="rb-steps"><li><span>01</span><div><h3>Add your details</h3><p>Fill in your profile, experience, education and any sections you need.</p></div></li><li><span>02</span><div><h3>Shape the page</h3><p>Reorder sections and adjust the typography, colour and margins while watching the preview.</p></div></li><li><span>03</span><div><h3>Save your resume</h3><p>Export a polished A4 PDF, or save the JSON so you can continue later.</p></div></li></ol></div></section>

        <section className="rb-final"><div className="container"><div><p>Ready when you are</p><h2>Build the resume. Keep control of the data.</h2></div><a className="rb-primary" href="/tool/resume-generator/">Open the builder <ArrowRight size={17} /></a></div></section>
      </main>
    </PageShell>
  )
}
