import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Cloudflare Pages sirve desde /dist
    outDir: 'dist',

    // Limpieza antes de cada build
    emptyOutDir: true,

    // Minificación máxima con esbuild (más rápido que terser)
    minify: 'esbuild',

    // Target moderno: mejora rendimiento, reduce peso
    target: 'es2020',

    // Sourcemaps desactivados en producción
    sourcemap: false,

    // Aviso si un chunk supera 600KB
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Code-splitting: vendor, motion, icons en chunks separados
        // → mejor cache del navegador entre actualizaciones
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
        // Nombres con hash para cache busting automático
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // Preview local apunta al mismo puerto que Cloudflare
  preview: {
    port: 4173,
    strictPort: true,
  },

  // Dev server con historyApiFallback para SPA routing
  server: {
    port: 5173,
    strictPort: false,
  },
})
