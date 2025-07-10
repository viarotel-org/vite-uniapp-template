import { isMp } from '@uni-helper/uni-env'
import { presetUni } from '@uni-helper/unocss-preset-uni'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

import { defineConfig } from 'unocss'

import { presetShades } from './helpers/unocss-preset-shades/index.js'

import { primaryColor } from './src/settings/index.mjs'

const presets = []
const transformers = []

presets.push(presetIcons())
presets.push(presetUni({ attributify: false }))
presets.push(presetShades(primaryColor, { root: isMp ? 'page' : ':root' }))

transformers.push(transformerDirectives())

export default defineConfig({
  // @ts-ignore
  presets,
  transformers,
  shortcuts: {
    'text-2xs': 'text-[0.625rem] leading-[0.875rem]',
    'inset-0': 'top-0 bottom-0 left-0 right-0',
    'inset-center': 'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'inset-center-x': 'absolute left-1/2 transform -translate-x-1/2',
    'inset-center-y': 'absolute top-1/2 transform -translate-y-1/2',
  },
})
