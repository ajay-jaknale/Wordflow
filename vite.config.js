import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://getwordflow.com',
      dynamicRoutes: [
        '/',
        '/word-counter',
        '/text-cleaner',
        '/remove-duplicate-lines',
        '/text-case-converter',
        '/text-diff-checker',
        '/reading-time-calculator',
        '/pdf-line-break-cleaner',
        '/social-media-character-counter',
        '/blog',
        '/blog/architecture-of-client-side-text-utilities',
        '/blog/mastering-manuscript-metrics-and-pacing',
        '/blog/typography-and-copywriting-constraints',
        '/blog/text-diffing-algorithms-version-control',
        '/blog/psychology-of-clean-writing-minimalism',
        '/about',
        '/privacy-policy',
        '/terms-of-use'
      ],
      outDir: 'dist',
    }),
  ],
})