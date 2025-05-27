import path from 'node:path'

import { defineConfig } from 'vite'

import { loadMapEnv } from './helpers/load-map-env/index.js'

import postcss from './postcss.config.js'

import plugins from './vite.config.plugins.js'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  const env = loadMapEnv(mode)

  return {
    server: {
      port: 1045,
    },
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@root': path.resolve('./'),
        '$uni-router': path.resolve('./helpers/uni-router'),
        '$unocss-preset-shades': path.resolve('./helpers/unocss-preset-shades'),
      },
    },
    css: {
      /** 解决外部 postcss.config.js 不被解析的问题 */
      postcss,
    },
    build: {
      /** 解决 Windows 下开发模式控制台提示崩溃的问题 */
      ...(isDevelopment
        ? {
            watch: {
              exclude: ['node_modules/**', '/__uno.css'],
            },
          }
        : {}),
      // minify: false,
    },
    define: {
      'process.env': env,
    },
    plugins: plugins({ env }),
  }
})
