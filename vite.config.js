import { defineConfig } from 'vite'
import path from 'node:path'
import useUniapp from '@dcloudio/vite-plugin-uni'
import useUniPages from '@uni-helper/vite-plugin-uni-pages'
import useUniManifest from '@uni-helper/vite-plugin-uni-manifest'
import useUniMiddleware from '@uni-helper/vite-plugin-uni-middleware'
import useUnocss from 'unocss/vite'
import useEslint from 'vite-plugin-eslint'
import {
  useProxy,
  proxyPort,
  proxyPath,
  proxyURL,
  appBasePath,
} from './src/configs/devServer.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    useUnocss(),
    useUniPages({
      onAfterScanPages(ctx) {
        // console.log('onAfterScanPages.ctx', ctx)
        // TODO 禁用合并自动扫描到的pages
        ctx.pagesPathInfo = []
        return ctx
      },
    }),
    useUniManifest(),
    useUniMiddleware(),
    useUniapp(),
    useEslint(),
  ],
  server: {
    host: true,
    port: proxyPort,
    proxy: {
      ...(useProxy && proxyURL
        ? {
          /** 解决本地测试跨域问题 */
          [`${proxyPath}`]: {
            target: proxyURL,
            changeOrigin: true,
            rewrite: (path) => path.replace(new RegExp(`^${proxyPath}`), ''),
          },
        }
        : {}),
      // 解决开发环境上传图片无法直接显示的问题
      '/data/img': {
        target: proxyURL,
      },
      '/temp': {
        target: proxyURL,
      },
    },
  },
  build: {
    assetsDir: 'static',
    outDir: path.join('dist', appBasePath),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      // 临时解决 pinia使用异常问题
      // 'vue-demi': 'vue-demi/lib/v3/index.mjs',
    },
  },
  // define: {
  //   'process.env': {},
  // },
})
