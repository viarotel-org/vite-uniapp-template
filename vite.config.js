import path from 'node:path'

import { isH5 } from '@uni-helper/uni-env'

import { defineConfig } from 'vite'

import { loadMapEnv } from './helpers/load-map-env/index.js'

import postcss from './postcss.config.js'

import plugins from './vite.config.plugins.js'

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development'
  const env = loadMapEnv(mode)

  const isUseProxy = env.VITE_PROXY_USE === '1'

  const appBase = env.VITE_APP_BASE

  const proxy = {}

  if (isUseProxy && isH5) {
    const proxyPath = env.VITE_PROXY_PATH
    const apiOrigin = env.VITE_API_ORIGIN
    const apiPath = env.VITE_API_PATH

    proxy[proxyPath] = {
      target: apiOrigin,
      changeOrigin: true,
      rewrite: (path) => {
        return path.replace(new RegExp(`^${proxyPath}`), apiPath)
      },
    }
  }

  return {
    base: appBase,
    server: {
      port: 1045,
      cors: true,
      proxy: {
        ...proxy,
      },
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
