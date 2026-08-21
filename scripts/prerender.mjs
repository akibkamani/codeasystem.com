import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { createServer } from 'vite'
import { solutions, legalPages } from '../src/data/siteData.js'

const distDir = resolve('dist')
const templatePath = join(distDir, 'index.html')
const routes = [
  '/',
  '/case-study',
  ...solutions.map((solution) => `/case-study/${solution.slug}`),
  ...Object.keys(legalPages).map((page) => `/${page}`),
  '/404',
]

const vite = await createServer({
  appType: 'custom',
  server: { middlewareMode: true },
})

try {
  const template = await readFile(templatePath, 'utf8')
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

  await Promise.all(routes.map(async (route) => {
    const html = template.replace('<div id="root"></div>', `<div id="root">${render(route)}</div>`)
    const outputPath = route === '/' ? templatePath : join(distDir, route.slice(1), 'index.html')
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, html)
  }))
} finally {
  await vite.close()
}