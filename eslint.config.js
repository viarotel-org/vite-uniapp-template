const uni = require('@uni-helper/eslint-config')

module.exports = uni({
  typescript: false,
  ignores: [
    'src/uni_modules',
    'node_modules',
    'dist',
    'public',
    'index.html',
  ],
}, {
  languageOptions: {
    globals: {
      uni: 'readonly',
      wx: 'readonly',
    },
  },
  rules: {
    'jsdoc/check-param-names': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/require-returns-description': 'off',

    'node/prefer-global/process': 'off',

    'no-console': 'off',
    'curly': 'off',
    'eqeqeq': 'off',

    'unused-imports/no-unused-vars': 'off',

    'vue/html-self-closing': 'off',
    'vue/block-order': 'off',
  },
})
