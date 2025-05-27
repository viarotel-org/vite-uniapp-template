import { createRequire } from 'node:module'
import antfu from '@antfu/eslint-config'

const require = createRequire(import.meta.url)

const autoImport = require('./.eslintrc-auto-import.json')

export default antfu({
  unocss: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  ignores: [
    '**/uni_modules',
  ],
}, {
  languageOptions: {
    globals: {
      uni: 'readonly',
      ...autoImport.globals,
    },
  },
  rules: {
    'node/prefer-global/process': 'off',

    'unused-imports/no-unused-vars': 'off',
    'no-console': 'off',

    'vue/no-unused-vars': 'off',
    'vue/html-self-closing': 'off',
  },
})
