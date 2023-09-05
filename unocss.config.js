import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetApplet, presetRemRpx, transformerApplet } from 'unocss-applet'
import { presetShades } from '@viarotel-org/unocss-preset-shades'
import { primaryColor } from './src/configs/index.js'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') || false

const appletPreset = presetApplet({ enable: isApplet })

export default defineConfig({
  shortcuts: {
    'inset-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-x-center': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-y-center': 'absolute top-1/2 transform -translate-y-1/2',
  },
  theme: {
    colors: {
      gray: appletPreset?.theme?.colors?.neutral,
    },
  },
  presets: [
    appletPreset,
    presetShades(primaryColor),
    presetRemRpx({ enable: isApplet }),
  ],
  transformers: [
    transformerApplet({ enable: isApplet }),
    transformerDirectives(),
  ],
})
