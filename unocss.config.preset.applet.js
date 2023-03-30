import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import {
  presetApplet,
  presetRemToRpx,
  transformerApplet,
  transformerAttributify,
} from 'unocss-applet'

const primary = {
  DEFAULT: '#2b9939',
}

const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-')

const appletConfig = presetApplet({ enable: isApplet })
// console.log(appletConfig)

export default defineConfig({
  presets: [
    presetApplet({ enable: isApplet }),
    presetRemToRpx({ enable: isApplet }),
  ],
  theme: {
    colors: {
      gray: appletConfig?.theme?.colors?.neutral,
      primary,
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    // 不要更改以下顺序
    transformerAttributify({ enable: isApplet }),
    transformerApplet({ enable: isApplet }),
  ],
  shortcuts: {
    'container-fixed':
      'w-full sm:w-screen-lg 2xl:w-screen-xl sm:mx-auto px-4 sm:px-0',
    'position-center':
      'absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2',
    'position-center-x': 'absolute left-1/2 transform -translate-x-1/2',
    'position-center-y': 'absolute top-1/2 transform -translate-y-1/2',
    'fix-inset-0': 'top-0 bottom-0 left-0 right-0',
  },
})
