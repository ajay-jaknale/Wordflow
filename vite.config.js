import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://yourdomain.com',
      routes: [
        '/',
        '/word-counter',
        '/text-cleaner',
        '/remove-duplicate-lines',
        '/text-case-converter',
        '/text-diff-checker',
        '/reading-time-calculator',
        '/pdf-line-break-cleaner',
        '/social-media-character-counter',
        '/about',
        '/privacy-policy',
        '/terms-of-use'
      ],
      outDir: 'dist',
    }),
  ],
})