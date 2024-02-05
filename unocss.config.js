import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetApplet, presetRemRpx } from 'unocss-applet'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import presetWind from '@unocss/preset-wind'
import { primaryColor } from './src/configs/index.js'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false

const presetMain = isApplet ? presetApplet() : presetWind()

const presets = [
  presetMain,
  presetShades(primaryColor),
  presetRemRpx(),
]

export default defineConfig({
  theme: {
    colors: {
      gray: presetMain?.theme?.colors?.neutral,
    },
  },
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
