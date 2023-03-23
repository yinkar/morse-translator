import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/morse-translator/',
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: false,
        sourcemap: true,
      },
      includeAssets: [
        'favicon.png',
        'robots.txt',
        'icon-192.png',
        'icon-512.png',
      ],
      manifest: {
          "name": "Morse Translator",
          "short_name": "Morse Translator",
          "description": "Morse code to Latin and Latin to Morse code converter and player.",
          "theme_color": "#333",
          "background_color": "#444",
          "icons": [
              {
                  "src": "icon-192.png",
                  "sizes": "192x192",
                  "type": "image/png",
                  "purpose": "any maskable",
              },
              {
                  "src": "icon-512.png",
                  "sizes": "512x512",
                  "type": "image/png",
                  "purpose": "any maskable",
              }
          ],
      },
    }),
  ],
});