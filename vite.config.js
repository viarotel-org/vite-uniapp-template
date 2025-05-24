import path from 'node:path'

import { defineConfig } from 'vite'

import { loadMapEnv } from './helpers/load-map-env/index.js'

import postcss from './postcss.config.js'

import plugins from './vite.config.plugins.js'

export default defineConfig(({ mode }) => {
  const env = loadMapEnv(mode)

  return {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '$uni-router': path.resolve('./helpers/uni-router/index.js'),
      },
    },
    css: {
      /** 解决外部 postcss.config.js 不被解析的问题 */
      postcss,
    },
    define: {
      'process.env': env,
    },
    plugins: plugins({ env }),
  }
})
