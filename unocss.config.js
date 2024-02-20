import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { primaryColor } from './src/configs/index.js'

const presetMain = presetUni({ attributify: false })

const presets = [
  presetMain,
  presetShades(primaryColor),
]

export default defineConfig({
  theme: {},
  // @ts-ignore
  presets,
  transformers: [transformerDirectives()],

  shortcuts: {
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
    'h-safe-bottom': 'h-[constant(safe-area-inset-bottom)] h-[env(safe-area-inset-bottom)]',
  },
})
