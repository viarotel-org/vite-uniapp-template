// TODO 目前仅作测试使用 插件问题 暂不生效
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
  50: '#e9f2f8',
  100: '#e8f2f9',
  200: '#d6e9f9',
  300: '#bfdef8',
  400: '#a7d3f7',
  500: '#8cc5f2',
  600: '#79baee',
  700: '#65aee9',
  800: '#53a0dd',
  900: '#4392d1',
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
