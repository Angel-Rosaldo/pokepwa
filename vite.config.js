import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'src/sw-custom.js', // ← archivo fuente
        swDest: 'public/sw.js'            // ← archivo generado en dist/
      },
      registerType: 'autoUpdate',
      manifest: {
        name: 'POKEPWA',
        short_name: 'PokePWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      devOptions: {
        enabled: true
      }
    })
  ]
})
