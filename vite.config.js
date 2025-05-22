import path from 'node:path'

import { defineConfig } from 'vite'

import { loadMapEnv } from './helpers/loadMapEnv/index.js'

import plugins from './vite.config.plugins.js'

export default defineConfig(({ mode }) => {
  const env = loadMapEnv(mode)

  return {
    resolve: {
      alias: {
        '@': path.join(process.cwd(), './src'),
      },
    },
    define: {
      'process.env': env,
    },
    plugins: plugins({ env }),
  }
})
