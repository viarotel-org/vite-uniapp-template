import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
    },
  },
  pages: [
    {
      path: 'pages/login/index',
      style: {
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/index/index',
      style: {
        navigationStyle: 'custom',
      },
    },
  ],
  globalStyle: {
    navigationBarTitleText: 'uni-app',
  },
})
