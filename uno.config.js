import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
import {
  presetApplet,
  presetRemRpx,
} from 'unocss-applet'

import { presetShades } from './helpers/unocss-preset-shades/index.js'

import { primaryColor } from './src/settings/index.js'

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false

const presets = []
const transformers = []

presets.push(presetIcons())
presets.push(presetApplet())
presets.push(presetRemRpx({ mode: 'rpx2rem' }))
presets.push(presetShades(primaryColor, { root: isApplet ? 'page' : ':root' }))

transformers.push(transformerDirectives())

export default defineConfig({
  // @ts-ignore
  presets,
  transformers,
  shortcuts: {
    'h-safe-bottom': 'h-[constant(safe-area-inset-bottom)] h-[env(safe-area-inset-bottom)]',
    'h-safe-top': 'h-[var(--status-bar-height)]',
  },
})
