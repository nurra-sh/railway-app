import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPublicBase = env.VITE_API_PUBLIC_URL ?? ''
  const apiOrigin = (() => {
    if (!apiPublicBase) return ''
    try {
      return new URL(apiPublicBase).origin
    } catch {
      return ''
    }
  })()

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: apiPublicBase,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        ...(apiOrigin
          ? {
              '/v3.0': {
                target: apiOrigin,
                changeOrigin: true,
              },
            }
          : {}),
      },
    },
  }
})