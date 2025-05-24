import useUni from '@dcloudio/vite-plugin-uni'

import useUniPages from '@uni-helper/vite-plugin-uni-pages'
import useUnoCSS from 'unocss/vite'
import useAutoImport from 'unplugin-auto-import/vite'
import useUniRouter from 'unplugin-uni-router/dist/vite.js'

import useAssetPathResolver from './helpers/vite-plugin-asset-path-resolver/index.js'

/**
 * 解决插件不支持标准 ES 模块的问题
 */
function resolvePlugin(module, options) {
  return (module?.default || module)(options)
}

function plugins({ env }) {
  return [
    useAssetPathResolver({
      cdn: `${env.VITE_ASSETS_CDN}/assets`,
      remote: env.VITE_ASSETS_MODE === 'remote',
    }),
    useUniPages({
      dts: false,
      mergePages: false,
    }),
    resolvePlugin(useUni),
    resolvePlugin(useUniRouter),
    useUnoCSS(),
    useAutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
      ],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
      dirs: [
        './src/hooks/**',
        './src/store/**',
        './helpers/uni-router/index.js',
      ],
    }),
  ]
}

export default plugins
