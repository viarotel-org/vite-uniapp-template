import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetApplet, presetRemRpx } from 'unocss-applet'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import presetWind from '@unocss/preset-wind'
import { primaryColor } from './src/configs/index.js'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') || false

const preset = isApplet ? presetApplet() : presetWind()

export default defineConfig({
  shortcuts: {
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
  },
  theme: {
    colors: {
      gray: preset?.theme?.colors?.neutral,
    },
  },
  presets: [
    preset,
    // @ts-expect-error
    presetShades(primaryColor),
    presetRemRpx(),
  ],
  transformers: [transformerDirectives()],
})
