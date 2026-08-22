export const resumeStorageKey = 'codeasystem-resume-v2'

export const starterResume = {
  name: 'Alex Morgan', title: 'Senior Product & Technology Leader', email: 'alex.morgan@example.com', phone: '+1 202 555 0147', location: 'Austin, TX',
  socials: [{ label: 'Portfolio', url: 'alexmorgan.example.com' }, { label: 'LinkedIn', url: 'linkedin.com/in/alexmorgan' }],
  profile: { title: 'Profile', content: 'Product and technology leader with 12+ years of experience building customer-focused software and growing high-performing teams. Combines hands-on technical judgement with a practical approach to strategy, delivery, and measurable business outcomes.', markdown: false, layout: 1 },
  experience: {
    title: 'Experience', layout: 1, items: [
      { role: 'VP of Product & Engineering', company: 'Northstar Labs', dateMode: 'month', startDate: 'Jan 2022', endDate: '', current: true, content: '- Lead a 28-person product and engineering group across three SaaS products.\n- Improved release frequency by 40% while reducing critical incidents by 35%.', markdown: true },
      { role: 'Director of Engineering', company: 'BrightPath Systems', dateMode: 'month', startDate: 'Mar 2018', endDate: 'Dec 2021', current: false, content: '- Built the platform team and launched a self-service analytics product used by 60+ clients.\n- Introduced mentoring and career frameworks that raised team retention to 92%.', markdown: true },
      { role: 'Senior Software Engineer', company: 'Cedar Digital', dateMode: 'year', startDate: '2014', endDate: '2018', current: false, content: 'Designed reliable APIs, led cloud migrations, and partnered with product teams on customer-facing features.', markdown: false },
    ],
  },
  education: {
    title: 'Education', layout: 1, items: [
      { school: 'University of Texas at Austin', degree: 'M.S. in Technology Commercialisation', startYear: '2016', endYear: '2018' },
      { school: 'State University', degree: 'B.S. in Computer Science', startYear: '2010', endYear: '2014' },
    ],
  },
  sections: [
    { id: 'skills', title: 'Skills', content: '- Product strategy\n- Engineering leadership\n- System architecture\n- Team development\n- SaaS operations\n- Data-informed planning', markdown: true, layout: 2 },
    { id: 'projects', title: 'Projects', content: '- **Atlas Platform:** Unified reporting for 60+ enterprise clients.\n- **Launchpad:** Open-source release checklist adopted by 1,500+ developers.', markdown: true, layout: 2 },
    { id: 'certifications', title: 'Certificates', content: '- AWS Solutions Architect, 2024\n- Certified Scrum Professional, 2022\n- Pragmatic Product Management, 2020', markdown: true, layout: 2 },
    { id: 'publications', title: 'Publications', content: '- **Building Calm Engineering Teams**, Product & Tech Review, 2023', markdown: true, layout: 2 },
    { id: 'patents', title: 'Patents', content: '- US 11,234,567, Adaptive workflow routing, co-inventor, 2022', markdown: true, layout: 2 },
    { id: 'languages', title: 'Languages', content: 'English (native) · Spanish (professional) · French (conversational)', markdown: false, layout: 2 },
    { id: 'hobbies', title: 'Hobbies & interests', content: 'Trail running · Street photography · Community coding workshops', markdown: false, layout: 2 },
  ],
  sectionOrder: ['experience', 'education', 'skills', 'projects', 'certifications', 'publications', 'patents', 'languages', 'hobbies'],
  theme: { accent: '#635bff', font: 'sans', margin: 'balanced' },
}

function isLegacyStarter(data) {
  return data?.name === 'John Doe'
    && data?.title === 'Chief Technology Officer'
    && data?.experience?.items?.length === 1
    && data.experience.items[0]?.company === 'CodeASystem'
    && data?.education?.items?.length === 1
    && data.education.items[0]?.school === 'Best College'
    && data?.sections?.length === 1
    && data.sections[0]?.title === 'Skills'
}

export function normaliseResume(data) {
  if (!data?.profile || !data?.experience?.items) return starterResume
  const sections = (Array.isArray(data.sections) ? data.sections : []).map((item, index) => ({ ...item, id: item.id || 'custom-' + (index + 1) }))
  const available = ['experience', 'education', ...sections.map((item) => item.id)]
  const requested = Array.isArray(data.sectionOrder) ? data.sectionOrder.filter((item) => available.includes(item)) : []
  const sectionOrder = [...requested, ...available.filter((item) => !requested.includes(item))]
  const experienceItems = data.experience.items.map((item) => {
    if (item.startDate || item.endDate || item.current !== undefined) return { dateMode: 'year', ...item }
    const parts = String(item.dates || '').split(/\s+[–-]\s+/)
    return { ...item, dateMode: /[A-Za-z]/.test(parts[0] || '') ? 'month' : 'year', startDate: parts[0] || '', endDate: /present/i.test(parts[1] || '') ? '' : parts[1] || '', current: /present/i.test(parts[1] || '') }
  })
  const educationItems = (data.education?.items || []).map((item) => {
    if (item.startYear || item.endYear) return item
    const parts = String(item.dates || '').split(/\s+[–-]\s+/)
    return { ...item, startYear: parts[0] || '', endYear: parts[1] || '' }
  })
  return { ...starterResume, ...data, socials: Array.isArray(data.socials) ? data.socials : [], profile: { ...starterResume.profile, ...data.profile }, experience: { ...starterResume.experience, ...data.experience, items: experienceItems }, education: { ...starterResume.education, ...data.education, items: educationItems }, sections, sectionOrder, theme: { ...starterResume.theme, ...data.theme } }
}

export function loadSavedResume() {
  if (typeof window === 'undefined') return starterResume
  try {
    const saved = JSON.parse(window.localStorage.getItem(resumeStorageKey))
    return isLegacyStarter(saved) ? starterResume : normaliseResume(saved)
  } catch { return starterResume }
}

export function createResumeTemplate(data) {
  const resume = normaliseResume(data)
  return {
    ...resume,
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    socials: [],
    profile: { ...resume.profile, title: 'Profile', content: '' },
    experience: {
      ...resume.experience,
      title: 'Experience',
      items: [{ role: '', company: '', dateMode: 'year', startDate: '', endDate: '', current: false, content: '', markdown: false }],
    },
    education: {
      ...resume.education,
      title: 'Education',
      items: [{ degree: '', school: '', startYear: '', endYear: '' }],
    },
    sections: resume.sections.map((section, index) => ({ ...section, title: 'Custom section ' + (index + 1), content: '' })),
  }
}

function bytesToBase64(bytes) {
  let binary = ''
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64ToBytes(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4)
  const binary = atob(base64)
  return Uint8Array.from(binary, (character) => character.charCodeAt(0))
}

export async function encodeResume(data) {
  const bytes = new TextEncoder().encode(JSON.stringify(data))
  if (typeof CompressionStream === 'undefined') return 'b64.' + bytesToBase64(bytes)
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))
  return 'gz.' + bytesToBase64(new Uint8Array(await new Response(stream).arrayBuffer()))
}

export async function decodeResume(value) {
  const [format, encoded] = value.split('.', 2)
  if (!encoded || !['gz', 'b64'].includes(format)) throw new Error('Unsupported resume link')
  let bytes = base64ToBytes(encoded)
  if (format === 'gz') {
    if (typeof DecompressionStream === 'undefined') throw new Error('Compressed links are not supported by this browser')
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
    bytes = new Uint8Array(await new Response(stream).arrayBuffer())
  }
  return normaliseResume(JSON.parse(new TextDecoder().decode(bytes)))
}
