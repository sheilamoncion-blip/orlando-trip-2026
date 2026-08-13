import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Orlando Trip 2026 — Familia',
        short_name: 'Orlando 2026',
        description: 'Planificador del viaje familiar a Universal + Disney, Agosto 2026',
        theme_color: '#6552b3',
        background_color: '#1a1530',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: '/icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.themeparks\.wiki\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'wait-times-cache', expiration: { maxEntries: 20, maxAgeSeconds: 300 } },
          },
          {
            urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'weather-cache', expiration: { maxEntries: 5, maxAgeSeconds: 600 } },
          },
        ],
      },
    }),
  ],
})
