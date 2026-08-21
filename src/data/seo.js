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

  return { '@context': 'https://schema.org', '@graph': [webPage] }
}
