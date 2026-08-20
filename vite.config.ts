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
      includeAssets: ['stickers/morado.png'],
      manifest: {
        name: 'Orlando Trip 2026 — Familia',
        short_name: 'Orlando 2026',
        description: 'Planificador del viaje familiar a Universal + Disney, Agosto 2026',
        theme_color: '#6552b3',
        background_color: '#1a1530',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/stickers/morado.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/stickers/morado.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/stickers/morado.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,ico}'],
        globIgnores: ['stickers/**', 'maps/**', 'fondo.png'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg)$/,
            handler: 'NetworkFirst',
            options: { cacheName: 'images-cache-v2', networkTimeoutSeconds: 4, expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 7 } },
          },
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
