import { solutions } from './siteData'

export const siteUrl = 'https://codeasystem.com'

export const defaultDescription = 'CodeASystem builds practical AI products, backend systems and custom software around the work that matters.'

export const pageSeo = {
  home: {
    title: 'AI Products, Backend Systems & Custom Software',
    description: defaultDescription,
    path: '/',
    type: 'website',
    schemaType: 'home',
  },
  caseStudies: {
    title: 'AI & Software Solution Case Studies',
    description: 'Explore practical starting points for AI, SaaS, backend and workflow automation projects built around real organisational needs.',
    path: '/case-study/',
    schemaType: 'collection',
  },
  resumeBuilder: {
    title: 'Free Resume Builder | Create & Download a Professional Resume',
    description: 'A free, local resume builder. Write, preview, and export a clean one-page resume as a PDF. No accounts, no ads, no watermarks.',
    path: '/resume-builder/',
    schemaType: 'tool',
    image: '/resume-generator-og.jpg',
    imageAlt: 'CodeASystem Free Resume Generator with a clean resume preview',
    applicationName: 'CodeASystem Free Resume Builder',
    features: ['Live A4 resume preview', 'PDF and JPG export', 'JSON import and export', 'Local browser storage', 'Custom sections and styling'],
  },
  resumeGenerator: {
    title: 'Free Resume Generator | Create & Download a Resume PDF',
    description: 'Create a professional resume for free, preview it live, import or export JSON, and download a PDF. Your resume data stays in your browser.',
    path: '/tool/resume-generator/',
    schemaType: 'tool',
    image: '/resume-generator-og.jpg',
    imageAlt: 'CodeASystem Free Resume Generator with a clean resume preview',
    applicationName: 'CodeASystem Free Resume Generator',
    features: ['Live A4 resume preview', 'PDF and JPG export', 'JSON import and export', 'Local browser storage', 'Custom sections and styling'],
  },
  tools: {
    title: 'Free Tools',
    description: 'Useful, simple tools from CodeASystem.',
    path: '/tools/',
    schemaType: 'collection',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Read the CodeASystem privacy policy and how this website handles information.',
    path: '/privacy/',
    schemaType: 'legal',
  },
  terms: {
    title: 'Terms of Use',
    description: 'Read the CodeASystem terms of use for this website and its content.',
    path: '/terms/',
    schemaType: 'legal',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you requested could not be found on CodeASystem.',
    path: '/404/',
    schemaType: 'notFound',
    noIndex: true,
  },
}

export function withSeoUrl(seo) {
  return {
    ...seo,
    url: `${siteUrl}${seo.path}`,
  }
}

export function getCaseStudySeo(slug) {
  const solution = solutions.find((item) => item.slug === slug)
  if (!solution) {
    return withSeoUrl(pageSeo.notFound)
  }

  return withSeoUrl({
    title: `${solution.title} Case Study`,
    description: `${solution.text} Explore the challenge, approach and organisational impact with CodeASystem.`,
    path: `/case-study/${slug}/`,
    schemaType: 'caseStudy',
    solution,
  })
}

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${siteUrl}/#organization`,
  name: 'CodeASystem',
  url: siteUrl,
  logo: `${siteUrl}/codeasystem-logo.jpg`,
  description: defaultDescription,
  sameAs: [
    'https://www.linkedin.com/company/codeasystem/',
    'https://www.instagram.com/codeasystem',
    'https://www.facebook.com/codeasystem',
    'https://www.youtube.com/@codeasyst',
  ],
  knowsAbout: ['Artificial intelligence', 'Generative AI', 'Backend development', 'SaaS development', 'Workflow automation', 'Technical SEO'],
}

export function getStructuredData(seo) {
  const webPage = {
    '@type': seo.schemaType === 'collection' ? 'CollectionPage' : 'WebPage',
    '@id': `${seo.url}#webpage`,
    url: seo.url,
    name: `${seo.title} | CodeASystem`,
    description: seo.description,
    isPartOf: { '@id': `${siteUrl}/#website` },
  }

  if (seo.schemaType === 'home') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'CodeASystem', publisher: { '@id': `${siteUrl}/#organization` } },
        organization,
        { ...webPage, '@type': 'WebPage', mainEntity: { '@id': `${siteUrl}/#organization` } },
      ],
    }
  }

  if (seo.schemaType === 'collection') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        webPage,
        {
          '@type': 'ItemList',
          name: 'CodeASystem solution case studies',
          itemListElement: solutions.map((solution, position) => ({
            '@type': 'ListItem',
            position: position + 1,
            url: `${siteUrl}/case-study/${solution.slug}/`,
            name: solution.title,
          })),
        },
      ],
    }
  }

  if (seo.schemaType === 'caseStudy') {
    const { solution } = seo
    return {
      '@context': 'https://schema.org',
      '@graph': [
        webPage,
        {
          '@type': 'Service',
          '@id': `${seo.url}#service`,
          name: solution.title,
          description: solution.text,
          provider: { '@id': `${siteUrl}/#organization` },
          serviceType: solution.title,
          url: seo.url,
          audience: { '@type': 'BusinessAudience', audienceType: 'Organisations seeking custom software' },
        },
      ],
    }
  }

  if (seo.schemaType === 'tool') {
    const applicationId = `${seo.url}#application`
    const breadcrumbId = `${seo.url}#breadcrumb`
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'CodeASystem', publisher: { '@id': `${siteUrl}/#organization` } },
        {
          ...webPage,
          primaryImageOfPage: { '@id': `${seo.url}#primaryimage` },
          breadcrumb: { '@id': breadcrumbId },
          mainEntity: { '@id': applicationId },
        },
        {
          '@type': 'ImageObject',
          '@id': `${seo.url}#primaryimage`,
          url: `${siteUrl}${seo.image}`,
          contentUrl: `${siteUrl}${seo.image}`,
          width: 1200,
          height: 630,
          caption: seo.imageAlt,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': breadcrumbId,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: `${siteUrl}/tools/` },
            { '@type': 'ListItem', position: 3, name: seo.applicationName, item: seo.url },
          ],
        },
        {
          '@type': 'WebApplication',
          '@id': applicationId,
          name: seo.applicationName,
          applicationCategory: 'BusinessApplication',
          applicationSubCategory: 'Resume builder',
          operatingSystem: 'Any',
          url: seo.url,
          description: seo.description,
          image: { '@id': `${seo.url}#primaryimage` },
          featureList: seo.features,
          browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          provider: { '@id': `${siteUrl}/#organization` },
        },
      ],
    }
  }

  return { '@context': 'https://schema.org', '@graph': [webPage] }
}
