import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      navigateFallback: '/index.html',
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      includeAssets: 
      ['microscope.png', 'delete.png',
        'editer.png', 'telephone.png' ],
      manifest: {
        name: "Ticket Generator",
        start_url: '/',
        display: "browser",
        background_color: '#ffffff',
        theme_color: '#317EFB',
      }
    })
  ],
})
