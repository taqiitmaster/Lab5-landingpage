import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

/**
 *   npm run build       -> dist/       (deploy this)
 *   npm run build:solo  -> dist-solo/  one self-contained HTML file for sharing
 */
const SOLO = process.env.SOLO === '1'

/**
 * Content Security Policy, injected as a <meta> tag in the deployable build.
 * The site loads nothing from any other origin — scripts, styles, fonts and
 * images are all self-hosted — so the policy can be strict: 'self' only, no
 * inline scripts, no eval, no plugins, no forms, no framing.
 * (frame-ancestors can't be set from a meta tag; vercel.json sends it as a header.)
 *
 * The single-file build inlines its own script, which a strict policy would
 * rightly block, so the meta tag is left out of that build only.
 */
export const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ')

const cspMeta = () => ({
  name: 'csp-meta',
  transformIndexHtml(html) {
    if (SOLO) return html
    return html.replace('<!--csp-->', `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`)
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), cspMeta(), ...(SOLO ? [viteSingleFile()] : [])],
  define: { __SOLO__: JSON.stringify(SOLO) },
  build: {
    outDir: SOLO ? 'dist-solo' : 'dist',
    // Deployable build: never inline assets as data: URIs, so the CSP can keep
    // font-src at 'self' (a small font subset was being inlined and blocked).
    assetsInlineLimit: SOLO ? 100 * 1024 * 1024 : 0,
    cssCodeSplit: !SOLO,
    sourcemap: false, // don't publish source maps
  },
})
