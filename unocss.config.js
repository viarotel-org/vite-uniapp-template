import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetApplet, presetRemRpx, transformerApplet } from 'unocss-applet'

const primary = {
  DEFAULT: 'rgba(var(--color-primary), <alpha-value>)',
  50: 'rgba(var(--color-primary-50), <alpha-value>)',
  100: 'rgba(var(--color-primary-100), <alpha-value>)',
  200: 'rgba(var(--color-primary-200), <alpha-value>)',
  300: 'rgba(var(--color-primary-300), <alpha-value>)',
  400: 'rgba(var(--color-primary-400), <alpha-value>)',
  500: 'rgba(var(--color-primary-500), <alpha-value>)',
  600: 'rgba(var(--color-primary-600), <alpha-value>)',
  700: 'rgba(var(--color-primary-700), <alpha-value>)',
  800: 'rgba(var(--color-primary-800), <alpha-value>)',
  900: 'rgba(var(--color-primary-900), <alpha-value>)',
  950: 'rgba(var(--color-primary-950), <alpha-value>)',
}

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
      primary,
    },
  },
  presets: [appletPreset, presetRemRpx({ enable: isApplet })],
  transformers: [
    transformerApplet({ enable: isApplet }),
    transformerDirectives(),
  ],
})
