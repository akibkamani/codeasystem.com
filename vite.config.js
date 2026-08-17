import { defineConfig } from 'vite'
import { readFile, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'

function inlineStylesheet() {
  return {
    name: 'inline-stylesheet',
    apply: 'build',
    async writeBundle(options) {
      const outputDir = options.dir || 'dist'
      const htmlPath = join(outputDir, 'index.html')
      const html = await readFile(htmlPath, 'utf8')
      const match = html.match(/<link rel="stylesheet"[^>]*href="\/?([^" ]+\.css)">/)
      if (!match) return

      const cssPath = join(outputDir, match[1])
      const css = await readFile(cssPath, 'utf8')
      await writeFile(htmlPath, html.replace(match[0], `<style>${css}</style>`))
      await unlink(cssPath)
    },
  }
}

export default defineConfig({ plugins: [react(), inlineStylesheet()] })
