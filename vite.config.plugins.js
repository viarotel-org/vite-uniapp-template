import vitePluginUni from '@dcloudio/vite-plugin-uni'

import useUniPages from '@uni-helper/vite-plugin-uni-pages'
import useUnoCSS from 'unocss/vite'
import useAutoImport from 'unplugin-auto-import/vite'

import useAssetPathResolver from './helpers/vitePluginAssetPathResolver/index.js'

// @ts-ignore
const useUni = vitePluginUni?.default || vitePluginUni

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
    useUni(),
    useUnoCSS(),
    useAutoImport({
      imports: [
        'vue',
        'uni-app',
        'pinia',
        {
          from: 'uni-mini-router',
          imports: ['useRouter', 'useRoute'],
        },
      ],
      eslintrc: {
        enabled: true,
        globalsPropValue: true,
      },
    }),
  ]
}

export default plugins
