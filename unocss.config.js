import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import { primaryColor } from './src/configs/index.js'

const presets = [
  presetUni({ attributify: false }),
  presetShades(primaryColor),
]

export default defineConfig({
  // @ts-ignore
  presets,
  theme: {},
  transformers: [transformerDirectives()],
  shortcuts: {
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
  },
})
