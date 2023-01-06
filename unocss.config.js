import { transformerDirectives } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { transformerClass } from 'unocss-preset-weapp/transformer'

import lineClamps from './src/utils/lineClamps/index.js'

const primary = {
  DEFAULT: '#2b9939',
}

// const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-')

const weappConfig = presetWeapp({
  whRpx: false,
})
// console.log(weappConfig)
export default {
  presets: [weappConfig],
  theme: {
    colors: {
      gray: weappConfig?.theme?.colors?.neutral,
      primary,
    },
  },
  rules: [...lineClamps],
  transformers: [transformerDirectives(), transformerClass()],
  shortcuts: {
    'container-fixed':
      'w-full sm:w-screen-lg 2xl:w-screen-xl sm:mx-auto px-4 sm:px-0',
    'position-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'position-center-x': 'absolute left-1/2 transform -translate-x-1/2',
    'position-center-y': 'absolute top-1/2 transform -translate-y-1/2',
    'fix-inset-0': 'top-0 bottom-0 left-0 right-0',
  },
}
